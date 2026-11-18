import { ArrowDown, ArrowRight, BadgeCheck, Clock3, Landmark } from 'lucide-react'
import type { CSSProperties } from 'react'
import heroPhoto from '../assets/photos/after2-1200.webp'
import heroPhotoSmall from '../assets/photos/after2-640.webp'
import { MagneticLink } from './MagneticLink'

export interface HeroProps {
  eyebrow?: string
}

const proofPoints = [
  { icon: Clock3, title: 'Responsive', text: 'Clear, timely decisions' },
  { icon: BadgeCheck, title: 'Discreet', text: 'Direct, considered offers' },
  { icon: Landmark, title: 'Committed', text: 'Reliable capital deployment' },
]

const step = (i: number) => ({ '--i': i }) as CSSProperties

export function Hero({ eyebrow = 'The Home of All Property Types' }: HeroProps) {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero-bg" aria-hidden="true">
        <img
          src={heroPhoto}
          srcSet={`${heroPhotoSmall} 640w, ${heroPhoto} 1200w`}
          sizes="100vw"
          alt=""
          width={1200}
          height={1600}
          fetchPriority="high"
          decoding="async"
        />
      </div>
      <div className="hero-overlay" aria-hidden="true" />

      <div className="page-container hero-layout">
        <div className="hero-copy">
          <p className="eyebrow eyebrow-light hero-in" style={step(0)}><span />{eyebrow}</p>
          <h1 id="hero-title" className="hero-title">
            <span className="hero-line"><span style={step(1)}>Smarty Properties.</span></span>
            <span className="hero-line"><span style={step(2)}><em>Re-engineered</em></span></span>
            <span className="hero-line"><span style={step(3)}>from the Ground Up.</span></span>
          </h1>
          <p className="hero-intro hero-in" style={step(5)}>
            You can count on us for swift property conveyancing processes. We close deals backed by reliable investors and specialty lenders combined. Bringing unparalleled value creation to all stakeholders.
          </p>
          <div className="hero-actions hero-in" style={step(6)}>
            <MagneticLink className="button button-gold" href="#contact">
              Get a cash offer <ArrowRight size={17} aria-hidden="true" />
            </MagneticLink>
            <a className="button button-ghost" href="#criteria">
              See what we buy
            </a>
          </div>
        </div>
      </div>

      <div className="page-container hero-footer">
        <ul className="hero-proof" aria-label="How we work">
          {proofPoints.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="hero-in" style={step(7 + i)}>
              <Icon size={19} strokeWidth={1.6} aria-hidden="true" />
              <span><b>{title}</b><small>{text}</small></span>
            </li>
          ))}
        </ul>
        <a className="hero-scroll" href="#about">
          Discover our approach <ArrowDown size={15} aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
