import { ArrowDown, ArrowRight, BadgeCheck, Clock3, Landmark } from 'lucide-react'

export interface HeroProps {
  eyebrow?: string
}

export function Hero({ eyebrow = 'The Home of All Property Types' }: HeroProps) {
  return (
    <section className="hero" id="home">
      <div className="hero-image" aria-hidden="true" />
      <div className="hero-overlay" aria-hidden="true" />
      <div className="hero-content page-container">
        <div className="hero-copy">
          <p className="eyebrow eyebrow-light"><span />{eyebrow}</p>
          <h1>Smarty Properties.<br /><em>Re-engineered</em><br />from the Ground Up.</h1>
          <p className="hero-intro">
             You can count on us for swift property conveyancing processes. We close deals backed by reliable investors and specialty lenders combined. Bringing Unparalleled value creation to all stakeholders
          </p>
          <div className="hero-actions">
            <a className="button button-gold" href="#criteria">Our investment criteria <ArrowRight size={16} /></a>
            <a className="button button-quiet" href="#contact">Start a conversation <ArrowRight size={16} /></a>
          </div>
        </div>
        <a className="hero-scroll" href="#about"><span>Discover our approach</span><ArrowDown size={15} /></a>
        <div className="hero-proof" aria-label="How we work">
          <div><Clock3 size={18} /><span><b>Responsive</b><small>Clear, timely decisions</small></span></div>
          <div><BadgeCheck size={18} /><span><b>Discreet</b><small>Direct, considered offers</small></span></div>
          <div><Landmark size={18} /><span><b>Committed</b><small>Reliable capital deployment</small></span></div>
        </div>
        <span className="hero-index">01 <i /> 05</span>
      </div>
    </section>
  )
}
