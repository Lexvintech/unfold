import { ArrowUpRight, Building2, KeyRound, Leaf, Wrench } from 'lucide-react'

export interface CriteriaProps {
  region?: string
}

const opportunities = [
  {
    number: '01',
    icon: Wrench,
    title: 'Homes ready for a new chapter',
    description: 'Unmodernised, dated or distressed residential property where careful refurbishment can unlock its next life.',
    tags: ['Refurbishment', 'Value-add'],
  },
  {
    number: '02',
    icon: KeyRound,
    title: 'Probate & inherited property',
    description: 'A straightforward, respectful route for executors and families seeking a clear sale process and dependable communication.',
    tags: ['Sensitive sales', 'Direct purchase'],
  },
  {
    number: '03',
    icon: Building2,
    title: 'Commercial & mixed-use assets',
    description: 'Selected commercial properties with potential for adaptive reuse, including appropriate residential conversion opportunities.',
    tags: ['Change of use', 'Selective'],
  },
  {
    number: '04',
    icon: Leaf,
    title: 'Houses in multiple occupation',
    description: 'Existing HMOs and properties with potential to provide well-considered, modern shared accommodation.',
    tags: ['HMO', 'Long-term hold'],
  },
]

export function Criteria({ region = 'Our target regions' }: CriteriaProps) {
  return (
    <section className="criteria-section section-pad" id="criteria">
      <div className="page-container">
        <div className="section-heading heading-split">
          <div>
            <p className="eyebrow eyebrow-light"><span />Acquisition criteria</p>
            <h2>We look for potential.<br /><em>Not perfection.</em></h2>
          </div>
          <div className="heading-aside">
            <p>From a single home to a complex opportunity, we consider each property on its own merits and respond with clarity.</p>
            <span className="region-note">{region} <i>— Update with your coverage area</i></span>
          </div>
        </div>
        <div className="criteria-grid">
          {opportunities.map(({ number, icon: Icon, title, description, tags }) => (
            <article className="criteria-card" key={number}>
              <div className="criteria-card-top"><span className="card-number">{number}</span><Icon size={22} strokeWidth={1.45} /></div>
              <h3>{title}</h3>
              <p>{description}</p>
              <div className="tag-row">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <a href="#contact" aria-label={`Discuss ${title}`}><ArrowUpRight size={17} /></a>
            </article>
          ))}
        </div>
        <div className="criteria-bottom">
          <span>Have a property in mind?</span>
          <a className="text-link text-link-light" href="#contact">Tell us about it <ArrowUpRight size={15} /></a>
        </div>
      </div>
    </section>
  )
}
