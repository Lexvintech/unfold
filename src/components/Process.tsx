import { ArrowUpRight, ClipboardList, Handshake, PoundSterling, SearchCheck } from 'lucide-react'
import { delay } from '../lib/motion'
import { MagneticLink } from './MagneticLink'

const steps = [
  {
    icon: ClipboardList,
    title: 'Tell us about the property',
    text: 'Share a few details using the enquiry form, by phone or by text. Any home, any age, any condition.',
  },
  {
    icon: SearchCheck,
    title: 'We review it on its merits',
    text: 'We look at the property and its circumstances, then come back to you with clear next steps.',
  },
  {
    icon: PoundSterling,
    title: 'Receive an all-cash offer',
    text: 'A fair offer for your property, explained plainly so you can decide with confidence.',
  },
  {
    icon: Handshake,
    title: 'Agree and complete',
    text: 'If you accept, we move forward to completion and keep you informed at every step.',
  },
]

export function Process() {
  return (
    <section className="process-section section-pad" id="process" aria-labelledby="process-title">
      <div className="page-container">
        <div className="section-heading heading-split">
          <div>
            <p className="eyebrow" data-reveal><span />How it works</p>
            <h2 id="process-title" className="section-title" data-reveal style={delay(1)}>
              A clear path from <em>hello to sold.</em>
            </h2>
          </div>
          <p className="heading-aside" data-reveal style={delay(2)}>
            Selling a difficult property should not be complicated. Here is what to expect when you get in touch.
          </p>
        </div>

        <ol className="process-track" data-reveal>
          {steps.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="process-step" style={delay(i)}>
              <div className="process-marker">
                <span className="process-icon"><Icon size={22} strokeWidth={1.5} aria-hidden="true" /></span>
                <span className="process-number">Step 0{i + 1}</span>
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>

        <div className="process-cta" data-reveal>
          <p>Ready when you are. <span>Tell us about your property today.</span></p>
          <MagneticLink className="button button-ink" href="#contact">
            Start your enquiry <ArrowUpRight size={17} aria-hidden="true" />
          </MagneticLink>
        </div>
      </div>
    </section>
  )
}
