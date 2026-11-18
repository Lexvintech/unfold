import { useState } from 'react'
import type { ChangeEvent, FocusEvent, FormEvent, ReactNode } from 'react'
import { AlertCircle, ArrowUpRight, CheckCircle2, Mail, MapPin, MessageCircle, Phone, RotateCcw } from 'lucide-react'
import { company, phoneHref } from '../content/company'
import { delay } from '../lib/motion'

export interface ContactProps {
  email?: string
  phone?: string
  officeAddress?: string
}

type FieldName = 'name' | 'email' | 'address' | 'condition'
type Errors = Partial<Record<FieldName, string>>

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const validators: Record<FieldName, (value: string) => string | undefined> = {
  name: (v) => (v.trim().length < 2 ? 'Please enter your name.' : undefined),
  email: (v) => (!v.trim() ? 'Please enter your email address.' : !emailPattern.test(v.trim()) ? 'Please enter a valid email address, e.g. you@example.com.' : undefined),
  address: (v) => (v.trim().length < 3 ? 'Please enter the property address or postcode.' : undefined),
  condition: (v) => (!v ? 'Please choose the closest match.' : undefined),
}

const isValidated = (name: string): name is FieldName => name in validators

/** Form-level events bubble from individual controls; read the control that fired them. */
const controlOf = (target: EventTarget) => target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement

export function Contact({
  email = company.email,
  phone = company.phone,
  officeAddress = company.office,
}: ContactProps) {
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)

  const validateField = (name: string, value: string) => {
    if (!isValidated(name)) return
    setErrors((prev) => ({ ...prev, [name]: validators[name](value) }))
  }

  const onBlur = (event: FocusEvent<HTMLFormElement>) => {
    const target = controlOf(event.target)
    if (target.name && target.value !== '') validateField(target.name, target.value)
  }

  // Once a field shows an error, re-check it as the user types so the message clears promptly.
  const onChange = (event: ChangeEvent<HTMLFormElement>) => {
    const target = controlOf(event.target)
    if (isValidated(target.name) && errors[target.name]) validateField(target.name, target.value)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const value = (key: string) => String(data.get(key) ?? '')

    const nextErrors: Errors = {}
    for (const key of Object.keys(validators) as FieldName[]) {
      const message = validators[key](value(key))
      if (message) nextErrors[key] = message
    }
    setErrors(nextErrors)
    const firstInvalid = (Object.keys(validators) as FieldName[]).find((key) => nextErrors[key])
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
      return
    }

    const subject = `Property enquiry: ${value('address')}`
    const body = [
      `Name: ${value('name')}`,
      `Email: ${value('email')}`,
      `Phone: ${value('phone') || 'Not provided'}`,
      `Property address: ${value('address')}`,
      `Asking price: ${value('price') || 'Not provided'}`,
      `Property condition: ${value('condition')}`,
      '',
      value('message'),
    ].join('\n')
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSubmitted(true)
    form.reset()
  }

  const fieldProps = (name: FieldName) => ({
    name,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  })

  const error = (name: FieldName): ReactNode =>
    errors[name] && (
      <span className="field-error" id={`${name}-error`}>
        <AlertCircle size={14} aria-hidden="true" />{errors[name]}
      </span>
    )

  const tel = phoneHref(phone)

  return (
    <section className="contact-section section-pad" id="contact" aria-labelledby="contact-title">
      <div className="contact-glow" aria-hidden="true" />
      <div className="page-container contact-layout">
        <div className="contact-copy">
          <p className="eyebrow eyebrow-light" data-reveal><span />Start a conversation</p>
          <h2 id="contact-title" className="section-title" data-reveal style={delay(1)}>
            Every good deal<br />starts with <em>a hello.</em>
          </h2>
          <p className="contact-intro" data-reveal style={delay(2)}>
            Speak to {company.director.name}, {company.director.role}, for a fair and fast sale. Get an all-cash offer on your property today. Visit <a href={company.website} target="_blank" rel="noreferrer">{company.websiteLabel}</a> or get in touch.
          </p>
          <ul className="contact-details" data-reveal style={delay(3)}>
            <li><a href={`mailto:${email}`}><span className="contact-icon"><Mail size={18} aria-hidden="true" /></span><span><small>Email us</small><b>{email}</b></span><ArrowUpRight size={17} aria-hidden="true" /></a></li>
            <li><a href={`tel:${tel}`}><span className="contact-icon"><Phone size={18} aria-hidden="true" /></span><span><small>Call us</small><b>{phone}</b></span><ArrowUpRight size={17} aria-hidden="true" /></a></li>
            <li><a href={`sms:${tel}`}><span className="contact-icon"><MessageCircle size={18} aria-hidden="true" /></span><span><small>Text us</small><b>{phone}</b></span><ArrowUpRight size={17} aria-hidden="true" /></a></li>
            <li><div><span className="contact-icon"><MapPin size={18} aria-hidden="true" /></span><span><small>Office</small><b>{officeAddress}</b></span></div></li>
          </ul>
        </div>

        <div className="contact-form-panel" data-reveal style={delay(2)}>
          {submitted ? (
            <div className="form-success" role="status" tabIndex={-1} ref={(el) => el?.focus()}>
              <span className="form-success-icon"><CheckCircle2 size={34} strokeWidth={1.6} aria-hidden="true" /></span>
              <h3>Thank you, nearly there.</h3>
              <p>Your email app should now open with your enquiry filled in. Press send there to reach us. If nothing opened, email <a href={`mailto:${email}`}>{email}</a> or call <a href={`tel:${tel}`}>{phone}</a>.</p>
              <button className="button button-outline" type="button" onClick={() => setSubmitted(false)}>
                <RotateCcw size={16} aria-hidden="true" /> Send another enquiry
              </button>
            </div>
          ) : (
            <>
              <div className="form-heading"><span>Property enquiry</span><span>Fields are required unless marked optional</span></div>
              <h3>Tell us a little about it.</h3>
              <p className="form-intro">We will review your details and get back to you.</p>
              <form onSubmit={handleSubmit} onBlur={onBlur} onChange={onChange} noValidate>
                <div className="form-row">
                  <label className="field"><span className="field-label">Your name</span>
                    <input {...fieldProps('name')} autoComplete="name" maxLength={100} placeholder="e.g. Alex Morgan" />
                    {error('name')}
                  </label>
                  <label className="field"><span className="field-label">Email address</span>
                    <input {...fieldProps('email')} type="email" autoComplete="email" maxLength={254} placeholder="you@example.com" />
                    {error('email')}
                  </label>
                </div>
                <div className="form-row">
                  <label className="field"><span className="field-label">Phone number <span className="optional">(optional)</span></span>
                    <input name="phone" type="tel" autoComplete="tel" maxLength={30} placeholder="+44" />
                  </label>
                  <label className="field"><span className="field-label">Asking price <span className="optional">(optional)</span></span>
                    <input name="price" inputMode="decimal" maxLength={30} placeholder="£" />
                  </label>
                </div>
                <label className="field"><span className="field-label">Property address</span>
                  <input {...fieldProps('address')} autoComplete="street-address" maxLength={250} placeholder="Street, town or postcode" />
                  {error('address')}
                </label>
                <label className="field"><span className="field-label">Property condition</span>
                  <select {...fieldProps('condition')} defaultValue="">
                    <option value="" disabled>Select the closest match</option>
                    <option>Requires modernisation</option>
                    <option>Major refurbishment required</option>
                    <option>Probate or inherited property</option>
                    <option>Commercial or mixed-use</option>
                    <option>HMO or potential HMO</option>
                    <option>Other / not sure</option>
                  </select>
                  {error('condition')}
                </label>
                <label className="field"><span className="field-label">Anything else we should know? <span className="optional">(optional)</span></span>
                  <textarea name="message" rows={3} maxLength={1500} placeholder="A few details about the property or your ideal timeline..." />
                </label>
                <button className="button button-gold form-submit" type="submit">
                  Send property enquiry <ArrowUpRight size={18} aria-hidden="true" />
                </button>
                <p className="form-privacy">By sending this enquiry, you agree that we may contact you about the property.</p>
              </form>
            </>
          )}
        </div>
      </div>

    </section>
  )
}
