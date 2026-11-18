import { ArrowUpRight, Check, Expand } from 'lucide-react'
import { useMemo, useState } from 'react'
import before1 from '../assets/photos/before1-1100.webp'
import before1Sm from '../assets/photos/before1-640.webp'
import before2 from '../assets/photos/before2-1100.webp'
import before2Sm from '../assets/photos/before2-640.webp'
import before3 from '../assets/photos/before3-1100.webp'
import before3Sm from '../assets/photos/before3-640.webp'
import before4 from '../assets/photos/before4-1100.webp'
import before4Sm from '../assets/photos/before4-640.webp'
import after1 from '../assets/photos/after1-1100.webp'
import after1Sm from '../assets/photos/after1-640.webp'
import after2 from '../assets/photos/after2-1100.webp'
import after2Sm from '../assets/photos/after2-640.webp'
import { delay } from '../lib/motion'
import { Lightbox } from './Lightbox'

type Stage = 'Before' | 'After'

export interface ProjectPhoto {
  src: string
  thumb: string
  stage: Stage
  alt: string
  caption: string
}

export interface PortfolioProps {
  photos?: ProjectPhoto[]
}

const projectPhotos: ProjectPhoto[] = [
  { src: after2, thumb: after2Sm, stage: 'After', alt: 'Front elevation after refurbishment, with renewed render and paintwork', caption: 'Front elevation, renewed finish' },
  { src: before3, thumb: before3Sm, stage: 'Before', alt: 'Front elevation before refurbishment, with patched render around the porch', caption: 'Front elevation, patch-repaired render' },
  { src: before2, thumb: before2Sm, stage: 'Before', alt: 'Side wall before refurbishment, with stained and patched render beside the downpipe', caption: 'Side wall during repairs' },
  { src: after1, thumb: after1Sm, stage: 'After', alt: 'Side view of the house after refurbishment with a fresh exterior finish', caption: 'Side view, completed exterior' },
  { src: before1, thumb: before1Sm, stage: 'Before', alt: 'Close-up of damaged render below a first-floor window before refurbishment', caption: 'Render damage below the window' },
  { src: before4, thumb: before4Sm, stage: 'Before', alt: 'Patch repairs around a window and brick lintel before refurbishment', caption: 'Repairs around the lintel' },
]

const filters = ['All', 'Before', 'After'] as const
type Filter = (typeof filters)[number]

const scope = ['Render patch repairs', 'Full exterior repaint', 'Brick detailing retained']

export function Portfolio({ photos = projectPhotos }: PortfolioProps) {
  const [filter, setFilter] = useState<Filter>('All')
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const visible = useMemo(
    () => (filter === 'All' ? photos : photos.filter((photo) => photo.stage === filter)),
    [filter, photos],
  )
  const lightboxItems = useMemo(
    () => visible.map((photo) => ({ src: photo.src, alt: photo.alt, label: photo.stage, caption: photo.caption })),
    [visible],
  )
  // The first before/after photos in the list form the featured comparison.
  const featuredBefore = photos.find((photo) => photo.stage === 'Before')
  const featuredAfter = photos.find((photo) => photo.stage === 'After')

  return (
    <section className="portfolio-section section-pad" id="portfolio" aria-labelledby="portfolio-title">
      <div className="page-container">
        <div className="section-heading heading-split">
          <div>
            <p className="eyebrow" data-reveal><span />Selected work</p>
            <h2 id="portfolio-title" className="section-title" data-reveal style={delay(1)}>
              Spaces with <em>more to give.</em>
            </h2>
          </div>
          <p className="heading-aside" data-reveal style={delay(2)}>
            A look at an exterior refurbishment, from damaged render to a fresh painted finish.
          </p>
        </div>

        {featuredBefore && featuredAfter && (
          <article className="project-feature" data-reveal>
            <div className="project-compare">
              {[featuredBefore, featuredAfter].map((photo) => (
                <figure key={photo.src} className="project-panel">
                  <img src={photo.thumb} srcSet={`${photo.thumb} 640w, ${photo.src} 1100w`} sizes="(max-width: 700px) 92vw, 34vw" alt={photo.alt} width={640} height={853} loading="lazy" decoding="async" />
                  <figcaption className={`photo-label photo-label-${photo.stage.toLowerCase()}`}>{photo.stage}</figcaption>
                </figure>
              ))}
            </div>
            <div className="project-details">
              <div className="project-meta">
                <span>Project 01 · Residential exterior</span>
                <span className="project-status"><Check size={14} aria-hidden="true" />Completed</span>
              </div>
              <h3>Exterior, thoughtfully improved</h3>
              <p>Repairs and improvements refreshed the property&rsquo;s exterior, from damaged render to a fresh painted finish.</p>
              <ul className="project-scope" aria-label="Scope of work">
                {scope.map((item) => <li key={item}><Check size={15} aria-hidden="true" />{item}</li>)}
              </ul>
              <div className="project-foot">
                <span>Strategy <b>Exterior refurbishment</b></span>
                <a className="text-link" href="#contact">Discuss a property <ArrowUpRight size={17} aria-hidden="true" /></a>
              </div>
            </div>
          </article>
        )}

        <div className="gallery-head" data-reveal>
          <h3>From the site</h3>
          <div className="filter-group" role="group" aria-label="Filter project photos">
            {filters.map((option) => (
              <button
                key={option}
                type="button"
                className="filter-btn"
                aria-pressed={filter === option}
                onClick={() => setFilter(option)}
              >
                {option}
                <span className="filter-count">{option === 'All' ? photos.length : photos.filter((p) => p.stage === option).length}</span>
              </button>
            ))}
          </div>
        </div>

        <ul className="gallery-grid" key={filter}>
          {visible.map((photo, i) => (
            <li key={photo.src} className="gallery-item" style={delay(i)}>
              <button type="button" className="gallery-btn" onClick={() => setOpenIndex(i)} aria-label={`View larger: ${photo.caption} (${photo.stage.toLowerCase()})`}>
                <img src={photo.thumb} alt={photo.alt} width={640} height={853} loading="lazy" decoding="async" />
                <span className={`photo-label photo-label-${photo.stage.toLowerCase()}`}>{photo.stage}</span>
                <span className="gallery-caption">{photo.caption}<Expand size={16} aria-hidden="true" /></span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Lightbox items={lightboxItems} index={openIndex} onClose={() => setOpenIndex(null)} onNavigate={setOpenIndex} />
    </section>
  )
}
