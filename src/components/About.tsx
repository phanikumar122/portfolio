import { Award, Cloud, Code2, Cpu, GitBranch, Layers, MapPin, TerminalSquare } from 'lucide-react'
import { motion } from 'motion/react'
import { portfolio } from '../data/portfolio'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { Reveal } from './Reveal'
import { SectionReveal } from './SectionReveal'

const bentoContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}
const bentoItem = {
  hidden: { opacity: 0, y: 22, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
}

export function About() {
  const reducedMotion = useReducedMotion()

  return (
    <SectionReveal className="about section-shell section-padding" id="about" aria-labelledby="about-title">
      <div className="section-heading section-heading--split">
        <Reveal delay={0.08} className="section-title-wrap">
          <h2 id="about-title">Engineering<br /><em>at depth.</em></h2>
          <p className="section-lead-desc">
            I treat every project as an end-to-end production system — cleanly typed, tested, containerized, and deployed.
          </p>
        </Reveal>
      </div>

      <motion.div
        className="bento-grid"
        variants={reducedMotion ? undefined : bentoContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.08 }}
      >
        {/* Big statement tile */}
        <motion.div
          className="bento-tile bento-tile--lead"
          variants={reducedMotion ? undefined : bentoItem}
          whileHover={reducedMotion ? undefined : { y: -4, transition: { duration: 0.25 } }}
        >
          <span className="mono-label bento-eyebrow">Who I am</span>
          <p className="bento-lead-text">
            A Computer Science engineer focused on building{' '}
            <span className="bento-accent">full-stack software</span>,{' '}
            <span className="bento-accent">cloud systems</span>, and{' '}
            <span className="bento-accent">agentic AI</span> — from resilient
            frontend interactions to multi-modal data pipelines.
          </p>
          <div className="bento-lead-foot">
            <span className="bento-loc"><MapPin size={13} /> {portfolio.education.institution}</span>
          </div>
        </motion.div>

        {/* Pillar tiles */}
        {[
          { icon: Code2, title: 'Architecture & Code', desc: 'Deterministic, type-safe services in Java, TypeScript & Python that stay maintainable under growth.' },
          { icon: Cloud, title: 'Cloud & Infra', desc: 'Docker containers, CI/CD pipelines and AWS-backed deployments designed for scale.' },
          { icon: Cpu, title: 'Intelligent Systems', desc: 'RAG pipelines, LLM tool execution and real-time streaming architectures in real products.' },
        ].map(({ icon: Icon, title, desc }) => (
          <motion.div
            key={title}
            className="bento-tile"
            variants={reducedMotion ? undefined : bentoItem}
            whileHover={reducedMotion ? undefined : { y: -4, transition: { duration: 0.25 } }}
          >
            <div className="bento-icon"><Icon size={18} /></div>
            <h3>{title}</h3>
            <p>{desc}</p>
          </motion.div>
        ))}

        {/* Wide "currently" tile */}
        <motion.div
          className="bento-tile bento-tile--wide bento-now"
          variants={reducedMotion ? undefined : bentoItem}
        >
          <div className="bento-now-head"><span className="mono-label">Currently / in progress</span></div>
          <p className="bento-now-text">
            Pursuing B.Tech Computer Science — shipping side projects across web, data &amp; AI while interning in cloud computing.
          </p>
          <ul className="bento-now-ledger">
            <li><GitBranch size={13} /><span>Open-source</span><b>Active</b></li>
            <li><TerminalSquare size={13} /><span>Shipped apps</span><b>07+</b></li>
            <li><Award size={13} /><span>Hackathon wins</span><b>02</b></li>
          </ul>
        </motion.div>

        {/* Focus stack tile */}
        <motion.div
          className="bento-tile bento-tile--stack"
          variants={reducedMotion ? undefined : bentoItem}
          whileHover={reducedMotion ? undefined : { y: -4, transition: { duration: 0.25 } }}
        >
          <div className="bento-icon"><Layers size={18} /></div>
          <h3>Daily stack</h3>
          <ol className="bento-stack-list">
            {['TypeScript', 'React', 'Spring Boot', 'Python', 'Docker', 'AWS'].map((s, index) => (
              <motion.li
                key={s}
                whileHover={reducedMotion ? undefined : { x: 3, transition: { duration: 0.15 } }}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>{s}
              </motion.li>
            ))}
          </ol>
        </motion.div>
      </motion.div>
    </SectionReveal>
  )
}
