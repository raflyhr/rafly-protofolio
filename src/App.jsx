import { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
  FaCss3Alt,
  FaTiktok,
  FaDocker,
  FaFigma,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaInstagram,
  FaLinkedin,
  FaLaravel,
  FaLinux,
  FaNodeJs,
  FaPhp,
  FaPython,
  FaReact,
} from 'react-icons/fa'
import { SiExpress, SiFirebase, SiMysql, SiPostgresql, SiTypescript, SiJavascript, SiVercel, SiPostman, SiCplusplus, SiTailwindcss } from 'react-icons/si'
import { VscVscode } from 'react-icons/vsc'
import { RiSupabaseFill } from 'react-icons/ri'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import CursorGrid from './components/CursorGrid'
import './App.css'

const projects = [
  ['NeoRain', 'NeoRain is a modern mental health tracking app powered by AI. It helps users monitor their mood, receive deeper emotional insights, and interact with an empathetic virtual assistant for more supportive daily self-reflection.', ['React', 'Tailwind CSS', 'Firebase'], '/porto 1.png', 'https://neorain.vercel.app/'],
  ['Priorin', 'Priorin is a personal planning app concept for university students that turns free time into more intentional activities. It is designed to reduce unproductive holiday patterns such as doomscrolling, academic burnout, and FOMO.', ['Laravel', 'Inertia', 'Supabase', 'Tailwind CSS', 'Typescript'], '/porto6.png', null, 'Ongoing'],
  ['Deep Chock Ubi', 'Deep Chock Ubi is a modern digital storefront built for a local food business. It helps customers explore products and place orders through a fast, accessible, and responsive shopping experience.', ['React', 'Tailwind CSS', 'Laravel', 'MySQL'], '/porto2.png', null],
  ['Magang-in', 'Magang-in is an AI-powered platform that connects university students with internship opportunities matched to their skills. The platform supports three core roles: students, company partners, and admins, making the internship process more organized, relevant, and efficient.', ['React', 'Tailwind CSS', 'Express', 'Supabase'], '/porto3.png', null],
  ['TukangAja', 'TukangAja is a service marketplace that helps users quickly find trusted nearby workers for household repairs, electrical installations, moving assistance, and other everyday needs.', ['React', 'Tailwind CSS', 'Supabase', 'Laravel'], '/porto4.png', null],
  ['Nusify', 'Nusify is a premium agency website for website development, redesign services, online shops, portfolios, pricing pages, blogs, dashboards, and direct WhatsApp-based project orders.', ['React', 'Tailwind CSS'], '/porto5.png', null],
]

const credentials = [
  ['Course', 'Pengenalan ke Logika Pemrograman', '/sertif1.png', 'Mempelajari konsep dasar logika pemrograman untuk membangun solusi terstruktur.'],
  ['Course', 'Belajar Dasar AI', '/sertif2.png', 'Mempelajari konsep, peluang, dan penerapan dasar kecerdasan artifisial.'],
  ['Course', 'Belajar Fundamental Aplikasi Web dengan React', '/sertif3.png', 'Mempelajari dasar React untuk membangun aplikasi web interaktif.'],
  ['Course', 'Belajar Membuat Aplikasi Web dengan React', '/sertif4.png', 'Membangun aplikasi web modern menggunakan komponen dan state React.'],
  ['Course', 'Belajar Membuat Front-End Web untuk Pemula', '/sertif5.png', 'Mempelajari dasar pengembangan antarmuka web responsif.'],
  ['Course', 'Belajar Fundamental Back-End dengan JavaScript', '/sertif6.png', 'Mempelajari konsep back-end, API, dan JavaScript di sisi server.'],
  ['Course', 'Belajar Back-End Pemula dengan JavaScript', '/sertif7.png', 'Mempelajari dasar pengembangan layanan back-end dengan JavaScript.'],
  ['Course', 'Belajar Dasar Pemrograman JavaScript', '/sertif8.png', 'Mempelajari sintaks dan konsep dasar JavaScript untuk pengembangan web.'],
  ['Course', 'Belajar Dasar Cloud dan Gen AI di AWS', '/sertif9.png', 'Mempelajari dasar cloud computing dan generative AI di AWS.'],
  ['Course', 'Memulai Dasar Pemrograman untuk Menjadi Pengembang Software', '/sertif10.png', 'Mempelajari fondasi pemrograman untuk memulai karier pengembang software.'],
  ['Course', 'Belajar Dasar Pemrograman Web', '/sertif11.png', 'Mempelajari fondasi HTML, CSS, dan konsep dasar pengembangan web.'],
]

const CREDENTIALS_PER_PAGE = 6

const skillGroups = [
  ['Frontend', 'web', 'Building responsive and interactive user interfaces', ['HTML', 'CSS', 'Javascript', 'Typescript', 'React', 'Tailwind CSS', 'C++']],
  ['Backend', 'dns', 'Building robust server-side applications and APIs', ['Node.js', 'Express', 'Laravel', 'PHP', 'Python']],
  ['Data & Caching', 'database', 'Storing, managing and caching application data', ['MySQL', 'PostgreSQL']],
  ['DevOps & Tools', 'build', 'Tools and environments for development and deployment', ['Git', 'Docker', 'Linux', 'Firebase', 'Figma', 'VS Code', 'Vercel', 'Supabase', 'Postman']],
]

const stackIcons = {
  HTML: [FaHtml5, '#E34F26'],
  CSS: [FaCss3Alt, '#1572B6'],
  Javascript: [SiJavascript, '#F7DF1E'],
  Typescript: [SiTypescript, '#3B82F6'],
  React: [FaReact, '#22D3EE'],
  'Tailwind CSS': [SiTailwindcss, '#38BDF8'],
  'Node.js': [FaNodeJs, '#22C55E'],
  Express: [SiExpress, '#E5E7EB'],
  Laravel: [FaLaravel, '#FF2D20'],
  Inertia: [FaLaravel, '#9553E9'],
  PHP: [FaPhp, '#AEB2D5'],
  Python: [FaPython, '#FFD43B'],
  MySQL: [SiMysql, '#60A5FA'],
  PostgreSQL: [SiPostgresql, '#60A5FA'],
  Git: [FaGitAlt, '#F97316'],
  Docker: [FaDocker, '#38BDF8'],
  Linux: [FaLinux, '#E5E7EB'],
  Firebase: [SiFirebase, '#FBBF24'],
  Figma: [FaFigma, '#F87171'],
  'VS Code': [VscVscode, '#3B82F6'],
  Vercel: [SiVercel, '#F5F5F5'],
  Supabase: [RiSupabaseFill, '#3ECF8E'],
  Postman: [SiPostman, '#FF6C37'],
  'C++': [SiCplusplus, '#659AD2'],
}

const navItems = [['hero', 'home'], ['about', 'person'], ['experience', 'business_center'], ['skills', 'code'], ['projects', 'rocket_launch'], ['education', 'school'], ['contact', 'mail']]
const Icon = ({ children }) => <span className="material-symbols-outlined">{children}</span>
const SectionTitle = ({ children }) => <div className="section-title">{children}</div>
const Glass = ({ children, className = '', ...props }) => <div className={`glass ${className}`} {...props}>{children}</div>

function StackBadge({ name }) {
  const [Logo, color] = stackIcons[name] ?? [RiSupabaseFill, '#22D3EE']
  return <div className="skill-item" title={name}><Logo className="stack-logo" style={{ color }} /><small>{name}</small></div>
}

function App() {
  const [activeSection, setActiveSection] = useState('hero')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [credentialsPage, setCredentialsPage] = useState(1)
  const credentialsTotalPages = Math.ceil(credentials.length / CREDENTIALS_PER_PAGE)
  const visibleCredentials = credentials.slice((credentialsPage - 1) * CREDENTIALS_PER_PAGE, credentialsPage * CREDENTIALS_PER_PAGE)

  const handleContactSubmit = event => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const name = form.get('name')
    const email = form.get('email')
    const message = form.get('message')
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
    window.location.href = `mailto:raflyhermansyah565@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${body}`
  }

  useEffect(() => {
    AOS.init({ duration: 700, easing: 'ease-out', once: true, offset: 80 })
  }, [])

  useEffect(() => {
    AOS.refresh()
  }, [credentialsPage])

  useEffect(() => {
    const updateScrollState = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0)
      const sections = navItems.map(([id]) => document.getElementById(id)).filter(Boolean)
      const current = sections.reduce((selected, section) => window.scrollY + 180 >= section.offsetTop ? section.id : selected, 'hero')
      setActiveSection(current)
    }
    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)
    return () => { window.removeEventListener('scroll', updateScrollState); window.removeEventListener('resize', updateScrollState) }
  }, [])

  return <div className="site-shell">
    <div className="scroll-progress" aria-hidden="true"><span style={{ transform: `scaleX(${scrollProgress / 100})` }} /></div><nav className="navbar" aria-label="Primary navigation"><div className="nav-dock">{navItems.map(([id, icon]) => <a className={`dock-item${activeSection === id ? ' active' : ''}`} href={`#${id}`} aria-label={id} key={id}><Icon>{icon}</Icon></a>)}</div></nav>
    <main>
      <section className="hero section" id="hero"><CursorGrid cellSize={45} color="#8b5cf6" radius={170} falloff="smooth" holdTime={400} fadeDuration={800} lineWidth={0.9} maxOpacity={1} fillOpacity={0} gridOpacity={0} cellRadius={0} clickPulse pulseSpeed={600} /><div className="hero-copy" data-aos="fade-right"><h1><span className="hero-line">Hello,</span><span className="hero-line hero-name">My name is <em>Rafly Hermansyah.</em></span><span className="hero-line">I am a Full Stack Developer</span><span className="hero-line">specializing in</span><span className="hero-line"><em className="typing-text">Frontend Engineering.</em></span></h1><div className="social-row hero-socials"><a href="https://github.com/raflyhr" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a><a href="https://www.tiktok.com/@raflyhermansyah27" target="_blank" rel="noreferrer" aria-label="TikTok"><FaTiktok /></a><a href="https://www.linkedin.com/in/rafly-hermansyah-0893b02b9/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin /></a><a href="https://www.instagram.com/rafly_hernyeni/?hl=en" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a></div><div className="button-row"><a className="button outline" href="#contact">CONTACT ME <Icon>person</Icon></a><a className="button primary" href="#contact">GET RESUME <Icon>download</Icon></a></div></div><Glass className="code-card" data-aos="fade-left" data-aos-delay="120"><div className="dots"><i /><i /><i /></div><div className="terminal-divider" /><pre><span>coder</span> := <b>Coder</b> {'{'}{`\n  `}<label>Name:</label> <strong>"Rafly Hermansyah"</strong>,{`\n  `}<label>Skills:</label> []<span>string</span> {'{'} <strong>"HTML"</strong>, <strong>"CSS"</strong>, <strong>"JavaScript"</strong>, <strong>"TypeScript"</strong>,{`\n  `}<strong>"React.js"</strong>, <strong>"Tailwind"</strong>, <strong>"PHP"</strong>, <strong>"Laravel"</strong>,{`\n  `}<strong>"Node.js"</strong>, <strong>"Express"</strong>, <strong>"Python"</strong>, <strong>"C++"</strong>,{`\n  `}<strong>"MySQL"</strong>, <strong>"PostgreSQL"</strong>, <strong>"Linux"</strong>, <strong>"Docker"</strong>,{`\n  `}<strong>"Firebase"</strong>, <strong>"Supabase"</strong>, <strong>"Vercel"</strong>, <strong>"Postman"</strong>,{`\n  `}<strong>"Git"</strong>, <strong>"Figma"</strong>, <strong>"VS Code"</strong>{'}'},{`\n  `}<label>HardWorker:</label> <b>true</b>,{`\n  `}<label>ProblemSolver:</label> <b>true</b>{`\n`}<label>  QuickLearner:</label> <b>true</b>{`\n`}{'}'}</pre></Glass></section>

      <section data-aos="fade-up" className="section" id="about"><SectionTitle>About Me</SectionTitle><Glass className="about-box about-tag-box"><div className="portrait-stage"><div className="portrait-static"><img alt="Rafly portrait" src="/rafly.jpeg" /></div></div><div className="about-copy"><h2>Tentang <em>Saya</em></h2><p className="lead">Perpaduan logika kode dan estetika desain.</p><p>Frontend Developer yang membangun antarmuka responsif menggunakan HTML, CSS, JavaScript, TypeScript, React, Tailwind CSS, Vite, serta dasar C++.</p><p>Memahami pengembangan backend dengan PHP, Laravel, Node.js, Express, Python, serta pengelolaan MySQL dan PostgreSQL. Terbiasa memakai Git, Linux, Figma, Postman, Firebase, Vercel, dan Supabase untuk membangun produk web yang rapi dan mudah dikembangkan.</p><div className="stats"><div><b>1+</b><small>Year Freelance</small></div><div><b>5+</b><small>Projects</small></div><div><b>15+</b><small>Tech Stack</small></div></div></div></Glass></section>

      <section data-aos="fade-up" className="section" id="experience"><SectionTitle>Experiences</SectionTitle><div className="experience-layout"><div className="experience-animation" data-aos="fade-right" aria-hidden="true"><DotLottieReact src="https://lottie.host/2fcf89e3-1c77-4b84-8801-92978ce544c7/Ons2Og5fZ0.json" loop autoplay renderConfig={{ autoResize: true }} style={{ width: '100%', height: '100%' }} /></div><div className="timeline" data-aos="fade-left"><Glass className="timeline-card featured"><div><small className="green experience-date">2024 — Present</small><h3>Freelance Full Stack Developer</h3><p className="experience-meta"><span><Icon>work</Icon> Independent Projects</span><span><Icon>location_on</Icon> Yogyakarta, Indonesia</span></p></div><div className="experience-icon"><Icon>laptop_mac</Icon></div><details><summary>show highlights <Icon>expand_more</Icon></summary><ul><li>Built responsive portfolio and landing page interfaces</li><li>Translated design concepts into accessible React experiences</li><li>Developed reusable UI components with Tailwind CSS</li><li>Collaborated directly with clients to refine project requirements</li></ul></details></Glass></div></div></section>

      <section data-aos="fade-up" className="section" id="skills"><SectionTitle>Skills</SectionTitle><div className="skills-list">{skillGroups.map(([name, icon, desc, items]) => <Glass className="skill-row" key={name}><div className="skill-intro"><div className="skill-icon"><Icon>{icon}</Icon></div><h3>{name}</h3><p>{desc}</p></div><div className="skill-items">{items.map(item => <StackBadge key={item} name={item} />)}</div></Glass>)}</div></section>

      <section data-aos="fade-up" className="section" id="projects"><SectionTitle>Projects</SectionTitle><div className="project-grid">{projects.map(([title, desc, stack, image, url, status = 'Closed']) => url ? <a className="project-link" href={url} target="_blank" rel="noreferrer" key={title}><Glass className="project-card"><div className="project-image"><img src={image} alt={`${title} project`} /></div><div className="project-content"><h3>{title}</h3><p>{desc}</p><div className="stack">{stack.map(item => <span key={item}>{item}</span>)}</div></div></Glass></a> : <Glass className="project-card" key={title}><div className="project-image"><img src={image} alt={`${title} project`} /></div><div className="project-content"><h3>{title}</h3><span className={`project-status ${status.toLowerCase()}`}>{status}</span><p>{desc}</p><div className="stack">{stack.map(item => <span key={item}>{item}</span>)}</div></div></Glass>)}</div><div className="pagination"><button>Previous</button><span>Page 1 of 1</span><button>Next</button></div></section>

      <section data-aos="fade-up" className="section" id="education"><SectionTitle>Education</SectionTitle><div className="education-layout"><div className="education-animation" data-aos="fade-right" aria-hidden="true"><DotLottieReact src="https://lottie.host/db1313ee-d1a3-41c5-a481-e8cb897f25b7/PrwsIAlDVT.lottie" loop autoplay renderConfig={{ autoResize: true }} style={{ width: '100%', height: '100%' }} /></div><Glass className="education-card" data-aos="fade-left"><div><small className="green experience-date">Sep 2025 - Apr 2026</small><h3>BACHELOR OF INFORMATICS</h3><p>Universitas Amikom Yogyakarta</p><b className="education-gpa">GPA: 3.90 / 4.00</b></div><div className="experience-icon"><Icon>school</Icon></div><details><summary>show highlights <Icon>expand_more</Icon></summary><ul><li>Relevant Coursework: Data Structures, Algorithms, Database Systems, Web Development</li><li>Active member of the University Programming Club</li><li>Participated in national level Hackathons</li></ul></details></Glass></div><div className="credentials-section"><SectionTitle>Achievements &amp; Courses</SectionTitle><div className="credentials-grid">{visibleCredentials.map(([type, title, image, description], index) => <Glass data-aos="fade-up" className="project-card credential-project-card" key={`${credentialsPage}-${index}`}><div className="project-image credential-image"><img src={image} alt="Temporary certificate preview" /></div><div className="project-content credential-content"><h3>{title}</h3><span className="project-status credential-status">{type}</span><p>{description}</p></div></Glass>)}</div><div className="pagination"><button disabled={credentialsPage === 1} onClick={() => setCredentialsPage(page => page - 1)}>Previous</button><span>Page {credentialsPage} of {credentialsTotalPages}</span><button disabled={credentialsPage === credentialsTotalPages} onClick={() => setCredentialsPage(page => page + 1)}>Next</button></div></div><div className="bootcamp-section"><SectionTitle>Bootcamps &amp; Training</SectionTitle><div className="bootcamp-grid"><Glass className="bootcamp"><small className="green">February — July 2026</small><h3>CODING CAMP POWERED BY DBS FOUNDATION</h3><p>Dicoding Indonesia x DBS Foundation</p><p className="bootcamp-description">A structured learning program focused on practical software engineering skills, combining curated Dicoding courses, hands-on projects, and career preparation in the digital technology industry.</p><details><summary>Show highlights <Icon>expand_more</Icon></summary><ul><li>Completed structured learning paths in Front-End and Back-End Web Development.</li><li>Built practical projects using modern web development tools and best practices.</li><li>Strengthened programming fundamentals, Git workflow, and software development skills.</li></ul></details></Glass></div></div></section>

      <section data-aos="fade-up" className="section contact-section" id="contact"><SectionTitle>Contact</SectionTitle><div className="contact-grid"><div data-aos="fade-right"><h2 className="contact-label">CONTACT WITH ME</h2><form className="contact-form" onSubmit={handleContactSubmit}><p>Terbuka untuk proyek baru atau sekadar obrolan. Kirim pesan kapan saja.</p><label>Your Name<input name="name" required /></label><label>Your Email<input name="email" type="email" required /></label><label>Your Message<textarea name="message" required /></label><button className="send-button" type="submit">SEND MESSAGE <Icon>send</Icon></button></form></div><div className="contact-info" data-aos="fade-left"><a className="contact-card" href="mailto:raflyhermansyah565@gmail.com"><Icon>alternate_email</Icon><b>raflyhermansyah565@gmail.com</b></a><div className="contact-card"><Icon>location_on</Icon><b>Sleman, Daerah Istimewa Yogyakarta 55281</b></div><div className="contact-socials"><a href="https://github.com/raflyhr" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a><a href="https://www.tiktok.com/@raflyhermansyah27" target="_blank" rel="noreferrer" aria-label="TikTok"><FaTiktok /></a><a href="https://www.linkedin.com/in/rafly-hermansyah-0893b02b9/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin /></a><a href="https://www.instagram.com/rafly_hernyeni/?hl=en" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a></div></div></div></section>
    </main><footer><span>© 2026 Rafly Hermansyah. All rights reserved.</span><div><a href="#contact">LinkedIn</a><a href="#contact">GitHub</a><a href="mailto:raflyhermansyah565@gmail.com">Email</a></div></footer>
  </div>
}

export default App
