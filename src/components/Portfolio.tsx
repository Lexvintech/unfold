import { ArrowUpRight, Check } from 'lucide-react'
import propertyAfterSide from '../assets/property-after-side.jpg'
import propertyBeforeWall from '../assets/property-before-wall.jpg'

export interface PropertyProject {
  id: string
  location: string
  title: string
  strategy: string
  status: string
  description: string
  beforeImage: string
  afterImage: string
  beforeAlt: string
  afterAlt: string
}

export interface PortfolioProps {
  projects?: PropertyProject[]
}

const sampleProjects: PropertyProject[] = [
  {
    id: '01',
    location: 'Residential · Exterior',
    title: 'Exterior, thoughtfully improved',
    strategy: 'Exterior refurbishment',
    status: 'Before & after',
    description: "Repairs and improvements refreshed the property's exterior, from damaged render to a fresh painted finish.",
    beforeImage: propertyBeforeWall,
    afterImage: propertyAfterSide,
    beforeAlt: 'Damaged exterior render before refurbishment',
    afterAlt: 'Improved painted exterior after refurbishment',
  },
]

export function Portfolio({ projects = sampleProjects }: PortfolioProps) {
  return (
    <section className="portfolio-section section-pad" id="portfolio">
      <div className="page-container">
        <div className="section-heading portfolio-heading">
          <div>
            <p className="eyebrow"><span />Selected work</p>
            <h2>Spaces with <em>more to give.</em></h2>
          </div>
          <p className="heading-aside">A look at an exterior refurbishment, from damaged render to a fresh painted finish.</p>
        </div>
        <div className="project-grid">
          {projects.map((project) => {
            return (
              <article className="project-card project-card-comparison" key={project.id}>
                <figure className="project-image-panel">
                  <figcaption>Before</figcaption>
                  <img className="project-image" src={project.beforeImage} alt={project.beforeAlt} />
                </figure>
                <figure className="project-image-panel">
                  <figcaption>After</figcaption>
                  <img className="project-image" src={project.afterImage} alt={project.afterAlt} />
                </figure>
                <div className="project-details project-details-comparison">
                  <div className="project-meta"><span>{project.location}</span><span><Check size={13} />{project.status}</span></div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-foot"><span>Strategy <b>{project.strategy}</b></span><a href="#contact" aria-label={`Ask about ${project.title}`}><ArrowUpRight size={17} /></a></div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
