import { useEffect, useRef } from 'react'
import './CursorGrid.css'

const falloffCurves = {
  linear: value => value,
  smooth: value => value * value * (3 - 2 * value),
  sharp: value => value * value * value,
}

const hexToRgb = hex => {
  const value = hex.replace('#', '')
  const normalized = value.length === 3 ? value.split('').map(char => char + char).join('') : value
  const number = Number.parseInt(normalized.slice(0, 6), 16)
  return [(number >> 16) & 255, (number >> 8) & 255, number & 255]
}

function CursorGrid({
  cellSize = 70,
  color = '#D946EF',
  radius = 140,
  falloff = 'smooth',
  holdTime = 400,
  fadeDuration = 800,
  lineWidth = 1.2,
  maxOpacity = 1,
  fillOpacity = 0,
  gridOpacity = 0,
  cellRadius = 0,
  clickPulse = true,
  pulseSpeed = 600,
  className = '',
}) {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const propsRef = useRef({})
  const wakeRef = useRef(null)

  propsRef.current = { cellSize, color, radius, falloff, holdTime, fadeDuration, lineWidth, maxOpacity, fillOpacity, gridOpacity, cellRadius, clickPulse, pulseSpeed }

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return undefined

    const context = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let columns = 0
    let rows = 0
    let offsetX = 0
    let offsetY = 0
    let alphas = new Float32Array(0)
    let touched = new Float64Array(0)
    let width = 0
    let height = 0
    const pulses = []
    let frame = 0
    let running = false
    let lastFrame = 0

    const rebuild = () => {
      const props = propsRef.current
      width = container.offsetWidth
      height = container.offsetHeight
      canvas.width = Math.max(1, Math.round(width * dpr))
      canvas.height = Math.max(1, Math.round(height * dpr))
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      columns = Math.ceil(width / props.cellSize) + 1
      rows = Math.ceil(height / props.cellSize) + 1
      offsetX = (width - columns * props.cellSize) / 2
      offsetY = (height - rows * props.cellSize) / 2
      alphas = new Float32Array(columns * rows)
      touched = new Float64Array(columns * rows)
    }

    const center = index => {
      const props = propsRef.current
      return [offsetX + (index % columns) * props.cellSize + props.cellSize / 2, offsetY + Math.floor(index / columns) * props.cellSize + props.cellSize / 2]
    }

    const energize = (x, y, boost = 1) => {
      const props = propsRef.current
      const currentRadius = Math.max(props.radius, 1)
      const ease = falloffCurves[props.falloff] ?? falloffCurves.linear
      const now = performance.now()
      const minColumn = Math.max(0, Math.floor((x - currentRadius - offsetX) / props.cellSize))
      const maxColumn = Math.min(columns - 1, Math.floor((x + currentRadius - offsetX) / props.cellSize))
      const minRow = Math.max(0, Math.floor((y - currentRadius - offsetY) / props.cellSize))
      const maxRow = Math.min(rows - 1, Math.floor((y + currentRadius - offsetY) / props.cellSize))

      for (let row = minRow; row <= maxRow; row += 1) {
        for (let column = minColumn; column <= maxColumn; column += 1) {
          const index = row * columns + column
          const [centerX, centerY] = center(index)
          const distance = Math.hypot(centerX - x, centerY - y)
          if (distance > currentRadius) continue
          const level = ease(1 - distance / currentRadius) * props.maxOpacity * boost
          if (level > alphas[index]) alphas[index] = level
          if (level > 0) touched[index] = now
        }
      }
    }

    const draw = now => {
      const props = propsRef.current
      const elapsed = Math.min(now - lastFrame, 50)
      lastFrame = now
      context.clearRect(0, 0, width, height)
      const [red, green, blue] = hexToRgb(props.color)

      if (props.gridOpacity > 0) {
        context.strokeStyle = `rgba(${red}, ${green}, ${blue}, ${props.gridOpacity})`
        context.lineWidth = 1
        context.beginPath()
        for (let column = 0; column <= columns; column += 1) {
          const x = Math.round(offsetX + column * props.cellSize) + 0.5
          context.moveTo(x, 0)
          context.lineTo(x, height)
        }
        for (let row = 0; row <= rows; row += 1) {
          const y = Math.round(offsetY + row * props.cellSize) + 0.5
          context.moveTo(0, y)
          context.lineTo(width, y)
        }
        context.stroke()
      }

      for (let pulseIndex = pulses.length - 1; pulseIndex >= 0; pulseIndex -= 1) {
        const pulse = pulses[pulseIndex]
        const ringRadius = ((now - pulse.startedAt) / 1000) * props.pulseSpeed
        if (ringRadius > Math.hypot(width, height)) {
          pulses.splice(pulseIndex, 1)
          continue
        }
        const band = props.cellSize
        for (let index = 0; index < alphas.length; index += 1) {
          const [centerX, centerY] = center(index)
          if (Math.abs(Math.hypot(centerX - pulse.x, centerY - pulse.y) - ringRadius) < band / 2) {
            alphas[index] = props.maxOpacity
            touched[index] = now
          }
        }
      }

      let visible = pulses.length > 0
      const fadeStep = elapsed / Math.max(props.fadeDuration, 16)
      const half = props.cellSize / 2
      for (let index = 0; index < alphas.length; index += 1) {
        let alpha = alphas[index]
        if (alpha <= 0) continue
        if (now - touched[index] > props.holdTime) {
          alpha = Math.max(0, alpha - fadeStep)
          alphas[index] = alpha
          if (alpha <= 0) continue
        }
        visible = true
        const [centerX, centerY] = center(index)
        const gradient = context.createRadialGradient(centerX, centerY, half * 0.1, centerX, centerY, props.cellSize)
        gradient.addColorStop(0, `rgba(${red}, ${green}, ${blue}, ${alpha})`)
        gradient.addColorStop(1, `rgba(${red}, ${green}, ${blue}, 0)`)
        const x = centerX - half + 0.5
        const y = centerY - half + 0.5
        const size = props.cellSize - 1
        context.beginPath()
        if (props.cellRadius > 0) context.roundRect(x, y, size, size, props.cellRadius)
        else context.rect(x, y, size, size)
        if (props.fillOpacity > 0) {
          context.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha * props.fillOpacity})`
          context.fill()
        }
        context.strokeStyle = gradient
        context.lineWidth = props.lineWidth
        context.stroke()
      }

      if (visible) frame = requestAnimationFrame(draw)
      else running = false
    }

    const wake = () => {
      if (running) return
      running = true
      lastFrame = performance.now()
      frame = requestAnimationFrame(draw)
    }
    wakeRef.current = wake

    const pointerPosition = event => {
      const rectangle = canvas.getBoundingClientRect()
      return [event.clientX - rectangle.left, event.clientY - rectangle.top]
    }
    const onPointerMove = event => {
      const [x, y] = pointerPosition(event)
      energize(x, y)
      wake()
    }
    const onPointerDown = event => {
      if (!propsRef.current.clickPulse) return
      const [x, y] = pointerPosition(event)
      pulses.push({ x, y, startedAt: performance.now() })
      wake()
    }
    const observer = new ResizeObserver(() => {
      rebuild()
      wake()
    })

    observer.observe(container)
    rebuild()
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerdown', onPointerDown)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerdown', onPointerDown)
    }
  }, [cellSize])

  useEffect(() => {
    wakeRef.current?.()
  }, [gridOpacity, color, lineWidth, maxOpacity, fillOpacity, cellRadius])

  return <div ref={containerRef} className={`cursor-grid${className ? ` ${className}` : ''}`}><canvas ref={canvasRef} className="cursor-grid__canvas" /></div>
}

export default CursorGrid
