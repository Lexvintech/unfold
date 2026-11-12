import { Criteria } from './components/Criteria'
import { DirectorBio } from './components/DirectorBio'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Portfolio } from './components/Portfolio'
import { Contact } from './components/Contact'
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <DirectorBio />
        <Criteria />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
