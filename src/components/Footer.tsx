import { ArrowUp, ArrowUpRight } from 'lucide-react'
import footerLogo from '../assets/Beaver-light.svg'
import { company, navLinks, phoneHref } from '../content/company'

export interface FooterProps {
  companyName?: string
  registrationNumber?: string
  registeredOffice?: string
  registrationRegion?: string
}

export function Footer({
  companyName = company.name,
  registrationNumber = company.registrationNumber,
  registeredOffice = company.office,
  registrationRegion = company.registrationRegion,
}: FooterProps) {
  return (
    <footer className="site-footer" id="company-info">
      <div className="page-container">
        <div className="footer-top">
          <div className="footer-brand-col">
            <a className="brand footer-brand" href="#home" aria-label={`${companyName} home`}>
              <img className="brand-logo" src={footerLogo} alt={companyName} width={1000} height={300} loading="lazy" />
            </a>
            <p className="footer-tagline">Property with purpose.<br /><em>Partnership built on trust.</em></p>
          </div>

          <nav className="footer-col" aria-label="Footer navigation">
            <span className="footer-heading">Explore</span>
            <ul>
              {navLinks.map((link) => <li key={link.href}><a href={link.href}>{link.label}</a></li>)}
            </ul>
          </nav>

          <div className="footer-col">
            <span className="footer-heading">Get in touch</span>
            <ul>
              <li><a href={`mailto:${company.email}`}>{company.email}</a></li>
              <li><a href={`tel:${phoneHref(company.phone)}`}>{company.phone}</a></li>
              <li><a href={company.website} target="_blank" rel="noreferrer">{company.websiteLabel} <ArrowUpRight size={14} aria-hidden="true" /></a></li>
            </ul>
          </div>
        </div>

        <div className="legal-grid">
          <div className="legal-intro"><span>Company information</span><p>For statutory purposes</p></div>
          <dl>
            <div><dt>Registered company name</dt><dd>{companyName}</dd></div>
            <div><dt>Company number</dt><dd>{registrationNumber}</dd></div>
            <div><dt>Place of registration</dt><dd>Registered in {registrationRegion}</dd></div>
            <div><dt>Registered office</dt><dd>{registeredOffice}</dd></div>
          </dl>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {companyName}. All rights reserved.</span>
          <span>All property information is illustrative and subject to verification.</span>
          <span className="footer-bottom-links">
            <a href="#contact">Privacy &amp; enquiries</a>
            <a className="back-to-top" href="#home">Back to top <ArrowUp size={15} aria-hidden="true" /></a>
          </span>
        </div>
      </div>
    </footer>
  )
}
