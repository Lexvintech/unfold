import { ArrowUpRight, Building2, KeyRound, Users, Wrench } from 'lucide-react'
import { delay, trackSpotlight } from '../lib/motion'

export interface CriteriaProps {
  region?: string
}

const opportunities = [
  {
    number: '01',
    icon: Wrench,
    title: 'Distressed properties',
    description: 'Dated, unmodernised or damaged homes, including properties that need significant work.',
    tags: ['Refurbishment', 'Value-add'],
  },
  {
    number: '02',
    icon: KeyRound,
    title: 'Probate properties',
    description: 'A straightforward, respectful route for executors and families seeking a clear sale process and dependable communication.',
    tags: ['Sensitive sales', 'Direct purchase'],
  },
  {
    number: '03',
    icon: Users,
    title: 'Homes with problem tenants',
    description: 'We consider tenanted properties and complex occupancy situations, including HMOs.',
    tags: ['Tenanted', 'HMO'],
  },
  {
    number: '04',
    icon: Building2,
    title: 'Undesirable properties & more',
    description: 'Unusual, vacant, commercial and mixed-use properties are welcome. We consider every property on its merits.',
    tags: ['Any condition', 'All property types'],
  },
]

export function Criteria({ region = 'Any home, any age, any condition' }: CriteriaProps) {
  return (
    <section className="criteria-section section-pad" id="criteria" aria-labelledby="criteria-title">
      <div className="page-container">
        <div className="section-heading heading-split">
          <div>
            <p className="eyebrow eyebrow-light" data-reveal><span />Acquisition criteria</p>
            <h2 id="criteria-title" className="section-title" data-reveal style={delay(1)}>
              We look for potential.<br /><em>Not perfection.</em>
            </h2>
          </div>
          <div className="heading-aside" data-reveal style={delay(2)}>
            <p>From a single home to a complex opportunity, we consider each property on its own merits and respond with clarity.</p>
            <span className="region-note">{region}</span>
          </div>
        </div>

        <ul className="criteria-grid">
          {opportunities.map(({ number, icon: Icon, title, description, tags }, i) => (
            <li key={number} className="criteria-item" data-reveal style={delay(i + 1)}>
              <article className="criteria-card" onPointerMove={trackSpotlight}>
                <div className="criteria-card-top">
                  <span className="criteria-icon"><Icon size={22} strokeWidth={1.5} aria-hidden="true" /></span>
                  <span className="card-number">{number}</span>
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
                <div className="tag-row">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <a className="card-link" href="#contact">
                  Discuss a property <ArrowUpRight size={16} aria-hidden="true" />
                  <span className="visually-hidden">: {title}</span>
                </a>
              </article>
            </li>
          ))}
        </ul>

        <div className="criteria-bottom" data-reveal>
          <span>Have a property in mind?</span>
          <a className="text-link text-link-light" href="#contact">Tell us about it <ArrowUpRight size={17} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  )
}
