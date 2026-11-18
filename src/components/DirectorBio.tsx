import { ArrowUpRight, Quote } from 'lucide-react'
import beforeWall from '../assets/photos/before1-640.webp'
import afterFront from '../assets/photos/after2-640.webp'
import { company } from '../content/company'
import { delay } from '../lib/motion'

export interface DirectorBioProps {
  directorName?: string
  role?: string
  /** Optional real portrait of the director. Falls back to an initials monogram. */
  portraitSrc?: string
}

const values = [
  { title: 'Thoughtful acquisition', text: 'Every opportunity assessed on its merits.' },
  { title: 'Responsible ownership', text: 'Quality improvements with lasting value.' },
]

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter((part) => /^[A-Za-z]{2,}/.test(part))
    .map((part) => part[0])
    .slice(0, 2)
    .join('')

export function DirectorBio({
  directorName = company.director.name,
  role = company.director.role,
  portraitSrc,
}: DirectorBioProps) {
  return (
    <section className="about-section section-pad" id="about" aria-labelledby="about-title">
      <div className="page-container about-grid">
        <div className="about-visual" data-reveal>
          <figure className="about-figure about-figure-before">
            <img src={beforeWall} alt="Property exterior before refurbishment, with patched and stained render" width={640} height={853} loading="lazy" decoding="async" />
            <figcaption>Before</figcaption>
          </figure>
          <figure className="about-figure about-figure-after">
            <img src={afterFront} alt="Property exterior after refurbishment, with renewed render and paintwork" width={640} height={853} loading="lazy" decoding="async" />
            <figcaption>After</figcaption>
          </figure>
          <span className="about-visual-arrow" aria-hidden="true"><ArrowUpRight size={20} /></span>
        </div>

        <div className="about-copy">
          <p className="eyebrow" data-reveal><span />Who we are</p>
          <h2 id="about-title" className="section-title" data-reveal style={delay(1)}>
            We see what a place <em>could become.</em>
          </h2>
          <p className="section-lead" data-reveal style={delay(2)}>
            We are an independent property investment company focused on buying, improving and holding residential and selected commercial assets across the UK.
          </p>
          <p className="body-copy" data-reveal style={delay(3)}>
            We take a hands-on approach from first conversation to completion and beyond. That means considered underwriting, practical project management and a long-term view of the places we bring into our portfolio.
          </p>
          <ol className="about-values" data-reveal style={delay(4)}>
            {values.map((value, i) => (
              <li key={value.title}>
                <span>0{i + 1}</span>
                <p><b>{value.title}</b><small>{value.text}</small></p>
              </li>
            ))}
          </ol>
          <a className="text-link" href="#contact" data-reveal style={delay(5)}>
            Get to know us <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="page-container">
        <aside className="director-card" data-reveal aria-label="Meet the director">
          <div className="director-portrait">
            {portraitSrc
              ? <img src={portraitSrc} alt={`Portrait of ${directorName}`} loading="lazy" decoding="async" />
              : <span aria-hidden="true">{initials(directorName)}</span>}
          </div>
          <div className="director-text">
            <p className="eyebrow"><span />Meet the director</p>
            <h3>{directorName}</h3>
            <span className="director-role">{role}</span>
            <p>Bringing experience across property renovation, project management and development, our director leads each project with a personal commitment to sound decisions and careful delivery.</p>
          </div>
          <Quote className="director-mark" size={44} strokeWidth={1} aria-hidden="true" />
        </aside>
      </div>
    </section>
  )
}
