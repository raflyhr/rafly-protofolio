import { useEffect, useState } from 'react'
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
import { SiExpress, SiFirebase, SiMysql, SiPostgresql, SiTypescript, SiJavascript, SiVercel, SiPostman, SiCplusplus } from 'react-icons/si'
import { VscVscode } from 'react-icons/vsc'
import { RiSupabaseFill } from 'react-icons/ri'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import CursorGrid from './components/CursorGrid'
import './App.css'

const projects = [
  ['Minbako', 'Minbako is a web-based SaaS designed to improve internal communication within a company. It provides a secure and organized discussion forum, announcements, and idea sharing space for all members of the organization.', ['React', 'Go', 'PostgreSQL'], 'https://lh3.googleusercontent.com/aida-public/AB6AXuCq-uuq0DuciT5Jau5GUCwuVsuPAmw73CwSLArq92zDH2XI5RSqdBZlrfWyThJ4pDDot0Zaut7CE4-J_Sxvgr53ET-42ienb7mlQuSYA3iqgwFvvqYmHjWQsemGWCcbkeFZnQ4Yhat1ZUtFwJa_CHvEOPj5Ru7Kz0qyviwRJfovyxr1lP1pwCIpV6cp9_evTD4rD4xVJySwXwnLBwGgYPKJ689P52_QA6ksmKssB-LtN2EpnDcYkzKEVg'],
  ['QuickCheck', 'A web-based service platform that provides online document correction, essay, and interview practice, specifically for students taking the Japanese university entrance selection.', ['Next.js', 'NestJS'], 'https://lh3.googleusercontent.com/aida-public/AB6AXuD__c1NYYgAqU_l29VULCzFT2vCtD-CWfnPANKX2Y30x_55bfYgjwjUDNDgl8wIp5pPKaG62hS-tpgCZHtVnFpFpRrVLNwNV8x22Tkihgks20W9uqewhCIawogPupqV5u0I4GHFa2sbSlz1VMcvwVk5Zsh-WesXc1whasW7RsnnVy6_ncW_vK2el9o5ru_GAxKLCkYKlvfriIbKAPvm1DIl6BQvvNxUUWrVkxrbRffGCT1RJikgOxUAlw'],
  ['Kinesis HR', 'A web-based platform designed to automate the recruitment process by HR teams, from initial candidate screening to applicant data management. This system makes it easier for HR to assess, sort, and process applicants efficiently.', ['Laravel', 'MySQL'], 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPV1ux5KhxfO3sw2DbkfnoiwlLx5hD1fq1QW2BHziIDVuO18LND7VrsL8X-W_CQeGOANzo5w-NJxUfthzIKooYPsPKjuyZEfqWjcXrOx4ywSOS_cLP4w3W7BxxOu5F9b35HdecqWBLDLG4954vDPm0fEYekAdYJStvJEpd69es0_FM1YdWDXjlrfZ-q9JE1cn54i4H6N5kJAvNrc_Budhz8iJOzOZUyWRlpHWWu7J-md3BwZWqfq0b1Q'],
  ['Job Matcher AI', 'A full-stack web platform that uses AI to analyze user CVs and provide the most relevant job recommendations. Built with Next.js for the frontend and Go microservices for the backend.', ['Next.js', 'Go', 'Python'], 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqg7TNyf-NhwjTe5QKWvF70pWoF1rYWZb0DTQZKxPm78awJAwJg5gR7l9Ea6UutRPlqktW8eDxCNdIMVyqBOM4gg5h6_D3ukgXWdnoXJvg8KJnve0zhiUvappZwSS2_WpiYzzcj6ABNvZsCT5pWypgz8aRN_IBsa2yNETNnqjNEXIxXl_lY6fjLQmsn15qHfyyhKyGltcGdQDXQGi_SolB09Huv4w9WSnmUIJwlMntaFe5yoEMAuYywQ'],
  ['Item Tracker', 'Item Tracker is an innovative web-based application designed to help users effortlessly track and recover lost items. With its intuitive features, it bridges the gap between lost and found.', ['React', 'Node.js'], 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTJTwSZWqYMEaS3oKZw0rgIiq8CWm1YZkgm-6gGlo_-G8W0NCeCAnV9e9DKnOm3QmuolZzJhrMPKBXI9f9fyzLi07rIND_sgK715wKuxADI6Q1XKS_r-58iWg9fluSCLSaR_W4zLK8UcMY70a5ep4f9meNNNnqoaVyTHADwz5tdG_y0aLgIKS4PJxafYz9P4DXUmB0Gg6TznCJFIErC4sq5XZHMA2G4WAqHzPAafvFvANd1TLUzpq8jw'],
  ['Ride Hailing API', 'Ride Hailing is a food delivery app that users can use to buy food and drinks. Built robust backend services to handle complex geo-spatial queries and real-time updates.', ['Go', 'Redis'], 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8qAxXMUzFr-Jt6usVLdipZ6SWUEvzSmId4rmbWVNGA7b5S7hqFom3jz1smagV2Ld-WO45ZMJOql7Utp46J3L5888d41mljIIwxIGpfaJcbA-GFNlcUWhKsOf2AbQahdUd_FVE66ovNG3Nmr0KFAuNuHG7SY_d1cKhuoaPB2ty2xXsbR0eEQLKKGiWYRaC4Q3_LJDkrpkecFItoqeDrGgYgE1q2afLBwrCNAvjgnGkxOQm3yP4UFgWFw'],
]

const skillGroups = [
  ['Frontend', 'web', 'Building responsive and interactive user interfaces', ['HTML', 'CSS', 'Javascript', 'Typescript', 'React', 'C++']],
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
  'Node.js': [FaNodeJs, '#22C55E'],
  Express: [SiExpress, '#E5E7EB'],
  Laravel: [FaLaravel, '#FF2D20'],
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
const Glass = ({ children, className = '' }) => <div className={`glass ${className}`}>{children}</div>

function StackBadge({ name }) {
  const [Logo, color] = stackIcons[name] ?? [RiSupabaseFill, '#22D3EE']
  return <div className="skill-item" title={name}><Logo className="stack-logo" style={{ color }} /><small>{name}</small></div>
}

function App() {
  const [activeSection, setActiveSection] = useState('hero')
  const [scrollProgress, setScrollProgress] = useState(0)

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

  return <div className="site-shell"><CursorGrid cellSize={45} color="#8b5cf6" radius={170} falloff="smooth" holdTime={400} fadeDuration={800} lineWidth={0.9} maxOpacity={1} fillOpacity={0} gridOpacity={0} cellRadius={0} clickPulse pulseSpeed={600} />
    <div className="scroll-progress" aria-hidden="true"><span style={{ transform: `scaleX(${scrollProgress / 100})` }} /></div><nav className="navbar" aria-label="Primary navigation"><div className="nav-dock">{navItems.map(([id, icon]) => <a className={`dock-item${activeSection === id ? ' active' : ''}`} href={`#${id}`} aria-label={id} key={id}><Icon>{icon}</Icon></a>)}</div></nav>
    <main>
      <section className="hero section" id="hero"><div className="hero-copy"><h1><span className="hero-line">Hello,</span><span className="hero-line hero-name">My name is <em>Rafly Hermansyah.</em></span><span className="hero-line">I am a Full Stack Developer</span><span className="hero-line">specializing in</span><span className="hero-line"><em className="typing-text">Frontend Engineering.</em></span></h1><div className="social-row hero-socials"><a href="https://github.com/raflyhr" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a><a href="https://www.tiktok.com/@raflyhermansyah27" target="_blank" rel="noreferrer" aria-label="TikTok"><FaTiktok /></a><a href="https://www.linkedin.com/in/rafly-hermansyah-0893b02b9/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin /></a><a href="https://www.instagram.com/rafly_hernyeni/?hl=en" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a></div><div className="button-row"><a className="button outline" href="#contact">CONTACT ME <Icon>person</Icon></a><a className="button primary" href="#contact">GET RESUME <Icon>download</Icon></a></div></div><Glass className="code-card"><div className="dots"><i /><i /><i /></div><div className="terminal-divider" /><pre><span>coder</span> := <b>Coder</b> {'{'}{`\n  `}<label>Name:</label> <strong>"Rafly Hermansyah"</strong>,{`\n  `}<label>Skills:</label> []<span>string</span> {'{'} <strong>"HTML"</strong>, <strong>"CSS"</strong>, <strong>"JavaScript"</strong>, <strong>"TypeScript"</strong>,{`\n  `}<strong>"React.js"</strong>, <strong>"Tailwind"</strong>, <strong>"PHP"</strong>, <strong>"Laravel"</strong>,{`\n  `}<strong>"Node.js"</strong>, <strong>"Express"</strong>, <strong>"Python"</strong>, <strong>"C++"</strong>,{`\n  `}<strong>"MySQL"</strong>, <strong>"PostgreSQL"</strong>, <strong>"Linux"</strong>, <strong>"Docker"</strong>,{`\n  `}<strong>"Firebase"</strong>, <strong>"Supabase"</strong>, <strong>"Vercel"</strong>, <strong>"Postman"</strong>,{`\n  `}<strong>"Git"</strong>, <strong>"Figma"</strong>, <strong>"VS Code"</strong>{'}'},{`\n  `}<label>HardWorker:</label> <b>true</b>,{`\n  `}<label>ProblemSolver:</label> <b>true</b>{`\n`}<label>  QuickLearner:</label> <b>true</b>{`\n`}{'}'}</pre></Glass></section>

      <section className="section" id="about"><SectionTitle>About Me</SectionTitle><Glass className="about-box about-tag-box"><div className="portrait-stage"><div className="portrait-static"><img alt="Rafly portrait" src="/rafly.jpeg" /></div></div><div className="about-copy"><h2>Tentang <em>Saya</em></h2><p className="lead">Perpaduan logika kode dan estetika desain.</p><p>Frontend Developer yang membangun antarmuka responsif menggunakan HTML, CSS, JavaScript, TypeScript, React, Tailwind CSS, Vite, serta dasar C++.</p><p>Memahami pengembangan backend dengan PHP, Laravel, Node.js, Express, Python, serta pengelolaan MySQL dan PostgreSQL. Terbiasa memakai Git, Linux, Figma, Postman, Firebase, Vercel, dan Supabase untuk membangun produk web yang rapi dan mudah dikembangkan.</p><div className="stats"><div><b>1+</b><small>Year Freelance</small></div><div><b>13+</b><small>Projects</small></div><div><b>15+</b><small>Tech Stack</small></div></div></div></Glass></section>

      <section className="section" id="experience"><SectionTitle>Experiences</SectionTitle><div className="experience-layout"><div className="experience-animation" aria-hidden="true"><DotLottieReact src="https://lottie.host/2fcf89e3-1c77-4b84-8801-92978ce544c7/Ons2Og5fZ0.json" loop autoplay renderConfig={{ autoResize: true }} style={{ width: '100%', height: '100%' }} /></div><div className="timeline"><Glass className="timeline-card featured"><div><small className="green experience-date">2024 — Present</small><h3>Freelance Full Stack Developer</h3><p className="experience-meta"><span><Icon>work</Icon> Independent Projects</span><span><Icon>location_on</Icon> Yogyakarta, Indonesia</span></p></div><div className="experience-icon"><Icon>laptop_mac</Icon></div><details open><summary>Key highlights <Icon>expand_more</Icon></summary><ul><li>Built responsive portfolio and landing page interfaces</li><li>Translated design concepts into accessible React experiences</li><li>Developed reusable UI components with Tailwind CSS</li><li>Collaborated directly with clients to refine project requirements</li></ul></details></Glass></div></div></section>

      <section className="section" id="skills"><SectionTitle>Skills</SectionTitle><div className="skills-list">{skillGroups.map(([name, icon, desc, items]) => <Glass className="skill-row" key={name}><div className="skill-intro"><div className="skill-icon"><Icon>{icon}</Icon></div><h3>{name}</h3><p>{desc}</p></div><div className="skill-items">{items.map(item => <StackBadge key={item} name={item} />)}</div></Glass>)}</div></section>

      <section className="section" id="projects"><SectionTitle>Projects</SectionTitle><div className="project-grid">{projects.map(([title, desc, stack, image]) => <Glass className="project-card" key={title}><div className="project-image"><img src={image} alt={`${title} project`} /></div><div className="project-content"><h3>{title}</h3><p>{desc}</p><div className="stack">{stack.map(item => <span key={item}>{item}</span>)}</div></div></Glass>)}</div><div className="pagination"><button>Previous</button><span>Page 1 of 2</span><button>Next</button></div></section>

      <section className="section" id="education"><SectionTitle>Education</SectionTitle><div className="education-layout"><div className="education-animation" aria-hidden="true"><DotLottieReact src="https://lottie.host/db1313ee-d1a3-41c5-a481-e8cb897f25b7/PrwsIAlDVT.lottie" loop autoplay renderConfig={{ autoResize: true }} style={{ width: '100%', height: '100%' }} /></div><Glass className="education-card"><div><small className="green experience-date">Sep 2022 - Apr 2026</small><h3>BACHELOR OF INFORMATICS</h3><p>Universitas Amikom Yogyakarta</p><b className="education-gpa">GPA: 3.93 / 4.00</b></div><div className="experience-icon"><Icon>school</Icon></div><details open><summary>Key highlights <Icon>expand_more</Icon></summary><ul><li>Relevant Coursework: Data Structures, Algorithms, Database Systems, Web Development</li><li>Active member of the University Programming Club</li><li>Participated in national level Hackathons</li></ul></details></Glass></div><SectionTitle>Bootcamps &amp; Training</SectionTitle><div className="bootcamp-grid">{[['Oct 2025 - Dec 2025', 'FULL STACK JAVA DEVELOPMENT BOOTCAMP', 'BPSDM Komdigi (Kominfo) x Metrodata Academy'], ['Sep 2024 - Dec 2024', 'FULL STACK WEB DEVELOPMENT (MERN STACK) — MSIB BATCH 7', 'Yayasan Adipurna Inovasi Asia (Vocasia)'], ['May 2024 - Jun 2024', 'BACKEND ENGINEERING TRAINEE', 'ProjectSprint.id']].map(([date, title, org]) => <Glass className="bootcamp" key={title}><small className="green">{date}</small><h3>{title}</h3><p>{org}</p><small>Show highlights <Icon>expand_more</Icon></small></Glass>)}</div></section>

      <section className="section contact-section" id="contact"><SectionTitle>Contact</SectionTitle><div className="contact-grid"><div><h2 className="contact-label">CONTACT WITH ME</h2><form className="contact-form" onSubmit={handleContactSubmit}><p>Terbuka untuk proyek baru atau sekadar obrolan. Kirim pesan kapan saja.</p><label>Your Name<input name="name" required /></label><label>Your Email<input name="email" type="email" required /></label><label>Your Message<textarea name="message" required /></label><button className="send-button" type="submit">SEND MESSAGE <Icon>send</Icon></button></form></div><div className="contact-info"><a className="contact-card" href="mailto:raflyhermansyah565@gmail.com"><Icon>alternate_email</Icon><b>raflyhermansyah565@gmail.com</b></a><div className="contact-card"><Icon>location_on</Icon><b>Sleman, Daerah Istimewa Yogyakarta 55281</b></div><div className="contact-socials"><a href="https://github.com/raflyhr" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a><a href="https://www.tiktok.com/@raflyhermansyah27" target="_blank" rel="noreferrer" aria-label="TikTok"><FaTiktok /></a><a href="https://www.linkedin.com/in/rafly-hermansyah-0893b02b9/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin /></a><a href="https://www.instagram.com/rafly_hernyeni/?hl=en" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a></div></div></div></section>
    </main><footer><span>© 2024 Rafly Hermansyah. All rights reserved.</span><div><a href="#contact">LinkedIn</a><a href="#contact">GitHub</a><a href="mailto:raflyhermansyah565@gmail.com">Email</a></div></footer>
  </div>
}

export default App
