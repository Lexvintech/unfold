import { ArrowUpRight, MoveUpRight } from 'lucide-react'
import propertyPurpose from '../assets/property-purpose.jpg'
import propertyAfterFront from '../assets/after2.jpeg'

export interface DirectorBioProps {
  directorName?: string
  role?: string
}

export function DirectorBio({
  directorName = 'Benson A. Meli',
  role = 'Managing Director',
}: DirectorBioProps) {
  return (
    <section className="about-section section-pad" id="about">
      <div className="page-container about-grid">
        <div className="about-visual">
          <figure>
            <img src={propertyPurpose} alt="Property exterior before refurbishment" />
            <figcaption>Before refurbishment</figcaption>
          </figure>
          <figure>
            <img src={propertyAfterFront} alt="Property exterior after refurbishment" />
            <figcaption>After refurbishment</figcaption>
          </figure>
        </div>
        <div className="about-copy">
          <p className="eyebrow"><span />Who we are</p>
          <h2>We see what a place <em>could become.</em></h2>
          <p className="section-lead">
            We are an independent property investment company focused on buying, improving and holding residential and selected commercial assets across the UK.
          </p>
          <p className="body-copy">
            We take a hands-on approach from first conversation to completion and beyond. That means considered underwriting, practical project management and a long-term view of the places we bring into our portfolio.
          </p>
          <div className="about-values">
            <div><span>01</span><p><b>Thoughtful acquisition</b><small>Every opportunity assessed on its merits.</small></p></div>
            <div><span>02</span><p><b>Responsible ownership</b><small>Quality improvements with lasting value.</small></p></div>
          </div>
          <a className="text-link" href="#contact">Get to know us <ArrowUpRight size={15} /></a>
        </div>
      </div>
      <div className="director-strip page-container">
        <div className="director-portrait">
          <img
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=640&q=85"
            alt="Portrait of the company's director"
          />
        </div>
        <div className="director-text">
          <p className="eyebrow"><span />Meet the director</p>
          <h3>{directorName}</h3>
          <span className="director-role">{role}</span>
          <p>Bringing experience across property renovation, project management and development, our director leads each project with a personal commitment to sound decisions and careful delivery.</p>
        </div>
        <MoveUpRight className="director-mark" size={34} strokeWidth={1} aria-hidden="true" />
      </div>
    </section>
  )
}
