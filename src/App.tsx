import { BackToTop } from './components/BackToTop'
import { SiteNav } from './components/SiteNav'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Expertise } from './components/Expertise'
import { ProjectShowcase } from './components/ProjectShowcase'
import { Philosophy } from './components/Philosophy'
import { Education } from './components/Education'
import { Credentials } from './components/Credentials'
import { Achievements } from './components/Achievements'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <div className="site-shell theme-ivory-cobalt">
      <SiteNav />
      <main id="main-content">
        <Hero />
        <About />
        <Expertise />
        <ProjectShowcase />
        <Philosophy />
        <Education />
        <Credentials />
        <Achievements />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}
