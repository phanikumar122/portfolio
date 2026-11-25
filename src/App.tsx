import { SiteNav } from './components/SiteNav'
import { Hero } from './components/Hero'
import { Expertise } from './components/Expertise'
import { ProjectShowcase } from './components/ProjectShowcase'
import { MotionConfig } from 'motion/react'
import { Education } from './components/Education'
import { Credentials } from './components/Credentials'
import { Achievements } from './components/Achievements'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <MotionConfig reducedMotion="user"><div className="site-shell theme-monochrome">
      <SiteNav />
      <main id="main-content">
        <Hero />
        <ProjectShowcase />
        <Expertise />
        <Education />
        <Credentials />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </div></MotionConfig>
  )
}
