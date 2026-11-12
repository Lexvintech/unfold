import { useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowUpRight, CheckCircle2, Mail, MapPin, Phone } from 'lucide-react'

export interface ContactProps {
  email?: string
  phone?: string
  officeAddress?: string
}

export function Contact({
  email = 'acquisitions@example.co.uk',
  phone = '+44 (0) 1632 960 000',
  officeAddress = 'Registered office address to be added',
}: ContactProps) {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.reportValidity()) return

    const data = new FormData(form)
    const subject = `Property enquiry: ${data.get('address')}`
    const body = [
      `Name: ${data.get('name')}`,
      `Email: ${data.get('email')}`,
      `Phone: ${data.get('phone') || 'Not provided'}`,
      `Property address: ${data.get('address')}`,
      `Asking price: ${data.get('price') || 'Not provided'}`,
      `Property condition: ${data.get('condition')}`,
      '',
      String(data.get('message') || ''),
    ].join('\n')
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSubmitted(true)
    form.reset()
  }

  return (
    <section className="contact-section section-pad" id="contact">
      <div className="page-container contact-layout">
        <div className="contact-copy">
          <p className="eyebrow eyebrow-light"><span />Start a conversation</p>
          <h2>Every good deal<br />starts with <em>a hello.</em></h2>
          <p className="contact-intro">Have a property to discuss, or simply want to understand how we work? We would be glad to hear from you.</p>
          <div className="contact-details">
            <a href={`mailto:${email}`}><span className="contact-icon"><Mail size={17} /></span><span><small>Email us</small><b>{email}</b></span><ArrowUpRight size={15} /></a>
            <a href={`tel:${phone.replace(/[^\d+]/g, '')}`}><span className="contact-icon"><Phone size={17} /></span><span><small>Call our team</small><b>{phone}</b></span><ArrowUpRight size={15} /></a>
            <div><span className="contact-icon"><MapPin size={17} /></span><span><small>Office</small><b>{officeAddress}</b></span></div>
          </div>
          <p className="contact-note">Contact details shown are placeholders. Please replace with verified company information before publishing.</p>
        </div>
        <div className="contact-form-panel">
          <div className="form-heading"><span>PROPERTY ENQUIRY</span><span>01 — 06</span></div>
          <h3>Tell us a little about it.</h3>
          <p>We will review your details and get back to you.</p>
          {submitted && <div className="form-success" role="status"><CheckCircle2 size={17} />Your email app should open with the enquiry details. If it does not, contact us directly.</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <label>Your name<input name="name" autoComplete="name" required maxLength={100} placeholder="e.g. Alex Morgan" /></label>
              <label>Email address<input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" /></label>
            </div>
            <div className="form-row">
              <label>Phone number <span>(optional)</span><input name="phone" type="tel" autoComplete="tel" maxLength={30} placeholder="+44" /></label>
              <label>Asking price <span>(optional)</span><input name="price" inputMode="decimal" maxLength={30} placeholder="£" /></label>
            </div>
            <label>Property address<input name="address" autoComplete="street-address" required maxLength={250} placeholder="Street, town or postcode" /></label>
            <label>Property condition
              <select name="condition" defaultValue="" required>
                <option value="" disabled>Select the closest match</option>
                <option>Requires modernisation</option>
                <option>Major refurbishment required</option>
                <option>Probate or inherited property</option>
                <option>Commercial or mixed-use</option>
                <option>HMO or potential HMO</option>
                <option>Other / not sure</option>
              </select>
            </label>
            <label>Anything else we should know? <span>(optional)</span><textarea name="message" rows={3} maxLength={1500} placeholder="A few details about the property or your ideal timeline..." /></label>
            <button className="button button-gold form-submit" type="submit">Send property enquiry <ArrowUpRight size={16} /></button>
            <p className="form-privacy">By sending this enquiry, you agree that we may contact you about the property.</p>
          </form>
        </div>
      </div>
    </section>
  )
}
