import { ScrollBackground } from './components/ScrollBackground'
import { SiteNav } from './components/SiteNav'
import { Hero } from './components/Hero'
import { Expertise } from './components/Expertise'
import { ProjectShowcase } from './components/ProjectShowcase'
import { Education } from './components/Education'
import { Credentials } from './components/Credentials'
import { Achievements } from './components/Achievements'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <div className="site-shell theme-monochrome">
      <ScrollBackground />
      <SiteNav />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <ProjectShowcase />
        <Expertise />
        <Education />
        <Credentials />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}