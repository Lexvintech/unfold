import { ArrowUpRight } from 'lucide-react'
import beaverLogo from '../assets/Beaver.svg'

export interface FooterProps {
  companyName?: string
  registrationNumber?: string
  registeredOffice?: string
  registrationRegion?: string
}

export function Footer({
  companyName = 'BEAVERS PROPERTY LTD',
  registrationNumber = '15451127',
  registeredOffice = '[Insert official registered office address]',
  registrationRegion = 'England & Wales',
}: FooterProps) {
  return (
    <footer className="site-footer" id="company-info">
      <div className="page-container">
        <div className="footer-top">
          <a className="brand footer-brand" href="#home" aria-label={`${companyName} home`}>
            <img className="brand-logo" src={beaverLogo} alt={companyName} />
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
          <span>© {new Date().getFullYear()} {companyName}. All rights reserved.</span>
          <span>All property information is illustrative and subject to verification.</span>
          <a href="#contact">Privacy & enquiries</a>
        </div>
      </div>
    </footer>
  )
}
