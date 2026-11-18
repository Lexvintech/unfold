import { Contact } from './components/Contact'
import { Criteria } from './components/Criteria'
import { DirectorBio } from './components/DirectorBio'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Portfolio } from './components/Portfolio'
import { Process } from './components/Process'
import { useRevealOnScroll } from './lib/motion'
import './App.css'

function App() {
  useRevealOnScroll()

  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Hero />
        <DirectorBio />
        <Criteria />
        <Process />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
