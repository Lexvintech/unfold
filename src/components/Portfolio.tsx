import { useState } from 'react'
import { ArrowUpRight, Check, ChevronLeft, ChevronRight } from 'lucide-react'

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
    location: 'North London · Residential',
    title: 'A period home, renewed',
    strategy: 'Full refurbishment',
    status: 'Illustrative project',
    description: 'A considered renovation bringing a tired family home back to modern life while retaining its original character.',
    beforeImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1100&q=85',
    afterImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1100&q=85',
    beforeAlt: 'Living room before refurbishment',
    afterAlt: 'Refurbished living room with contemporary finishes',
  },
  {
    id: '02',
    location: 'South East · Residential',
    title: 'Room to grow',
    strategy: 'Value-add & hold',
    status: 'Illustrative project',
    description: 'Reworking a well-located property to create a more functional, comfortable home for the long term.',
    beforeImage: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1100&q=85',
    afterImage: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1100&q=85',
    beforeAlt: 'Residential interior before improvements',
    afterAlt: 'Bright, improved residential interior',
  },
]

export function Portfolio({ projects = sampleProjects }: PortfolioProps) {
  const [showAfter, setShowAfter] = useState<Record<string, boolean>>({})

  const toggleImage = (projectId: string, value: boolean) => {
    setShowAfter((current) => ({ ...current, [projectId]: value }))
  }

  return (
    <section className="portfolio-section section-pad" id="portfolio">
      <div className="page-container">
        <div className="section-heading portfolio-heading">
          <div>
            <p className="eyebrow"><span />Selected work</p>
            <h2>Spaces with <em>more to give.</em></h2>
          </div>
          <p className="heading-aside">A glimpse of the kinds of transformations we pursue. Replace these illustrative examples with verified completed projects.</p>
        </div>
        <div className="project-grid">
          {projects.map((project) => {
            const isAfter = showAfter[project.id] ?? true
            return (
              <article className="project-card" key={project.id}>
                <div className="project-image-wrap">
                  <img
                    className="project-image"
                    src={isAfter ? project.afterImage : project.beforeImage}
                    alt={isAfter ? project.afterAlt : project.beforeAlt}
                  />
                  <div className="project-number">{project.id} <span>/ 02</span></div>
                  <div className="image-state">{isAfter ? 'AFTER' : 'BEFORE'}</div>
                  <div className="image-toggle" role="group" aria-label={`Before and after images for ${project.title}`}>
                    <button type="button" aria-label="Show before image" aria-pressed={!isAfter} onClick={() => toggleImage(project.id, false)}><ChevronLeft size={16} /></button>
                    <span>{isAfter ? 'After' : 'Before'}</span>
                    <button type="button" aria-label="Show after image" aria-pressed={isAfter} onClick={() => toggleImage(project.id, true)}><ChevronRight size={16} /></button>
                  </div>
                </div>
                <div className="project-details">
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
