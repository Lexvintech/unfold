import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useState } from 'react'

export interface NavbarProps {
  companyName?: string
}

export function Navbar({ companyName = 'Hearth & Field' }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const links = [
    { label: 'About', href: '#about' },
    { label: 'Acquisition criteria', href: '#criteria' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Company info', href: '#company-info' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <header className="site-header">
      <div className="nav-shell">
        <a className="brand" href="#home" aria-label={`${companyName} home`}>
          <span className="brand-symbol" aria-hidden="true"><span /></span>
          <span className="brand-name">{companyName}<small>PROPERTY PARTNERS</small></span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav className={`main-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>
          ))}
          <a className="nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>
            Submit a property <ArrowUpRight size={15} strokeWidth={1.8} />
          </a>
        </nav>
      </div>
    </header>
  )
}
