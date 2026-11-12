import { ArrowUpRight } from 'lucide-react'

export interface FooterProps {
  companyName?: string
  registrationNumber?: string
  registeredOffice?: string
  registrationRegion?: string
}

export function Footer({
  companyName = '[Insert full registered company name] Ltd',
  registrationNumber = '[Insert 8-digit Companies House number]',
  registeredOffice = '[Insert official registered office address]',
  registrationRegion = 'England & Wales',
}: FooterProps) {
  return (
    <footer className="site-footer" id="company-info">
      <div className="page-container">
        <div className="footer-top">
          <a className="brand footer-brand" href="#home" aria-label="Hearth and Field home">
            <span className="brand-symbol" aria-hidden="true"><span /></span>
            <span className="brand-name">Hearth & Field<small>PROPERTY PARTNERS</small></span>
          </a>
          <p>Property with purpose.<br /><em>Partnership built on trust.</em></p>
          <a className="footer-top-link" href="#home">Back to top <ArrowUpRight size={15} /></a>
        </div>
        <div className="footer-rule" />
        <div className="legal-grid">
          <div className="legal-intro"><span>COMPANY INFORMATION</span><p>For statutory purposes</p></div>
          <dl>
            <div><dt>Registered company name</dt><dd>{companyName}</dd></div>
            <div><dt>Company number</dt><dd>{registrationNumber}</dd></div>
            <div><dt>Place of registration</dt><dd>Registered in {registrationRegion}</dd></div>
            <div><dt>Registered office</dt><dd>{registeredOffice}</dd></div>
          </dl>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Hearth & Field Property Partners. All rights reserved.</span>
          <span>All property information is illustrative and subject to verification.</span>
          <a href="#contact">Privacy & enquiries</a>
        </div>
      </div>
    </footer>
  )
}
