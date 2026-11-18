import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import beaverLogo from '../assets/Beaver.svg'
import type { CSSProperties } from 'react'
import { company, navLinks, phoneHref } from '../content/company'

export interface NavbarProps {
  companyName?: string
}

export function Navbar({ companyName = company.name }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const progressRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  // Scroll progress bar + "scrolled" header state, batched to one frame.
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? window.scrollY / max : 0
      progressRef.current?.style.setProperty('transform', `scaleX(${progress.toFixed(4)})`)
      setScrolled(window.scrollY > 12)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // Highlight the nav link for the section crossing the middle of the viewport.
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null)
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((section) => observer.observe(section))
    const hero = document.getElementById('home')
    const heroObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setActive('')
    }, { rootMargin: '-45% 0px -50% 0px' })
    if (hero) heroObserver.observe(hero)
    return () => {
      observer.disconnect()
      heroObserver.disconnect()
    }
  }, [])

  // Mobile menu: lock page scroll, close on Escape, close when resized to desktop.
  useEffect(() => {
    if (!menuOpen) return
    document.documentElement.classList.add('menu-locked')
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        toggleRef.current?.focus()
      }
    }
    const desktop = window.matchMedia('(min-width: 861px)')
    const onDesktop = () => desktop.matches && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    desktop.addEventListener('change', onDesktop)
    return () => {
      document.documentElement.classList.remove('menu-locked')
      window.removeEventListener('keydown', onKey)
      desktop.removeEventListener('change', onDesktop)
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}${menuOpen ? ' is-menu-open' : ''}`}>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="nav-shell">
        <a className="brand" href="#home" aria-label={`${companyName} home`} onClick={closeMenu}>
          <img className="brand-logo" src={beaverLogo} alt={companyName} width={210} height={63} />
        </a>

        <nav className="main-nav" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={active === link.href.slice(1) ? 'is-active' : undefined}
              aria-current={active === link.href.slice(1) ? 'true' : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a className="nav-cta" href="#contact">
          <span>Get a cash offer</span>
          <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
        </a>

        <button
          ref={toggleRef}
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div className="scroll-progress" aria-hidden="true"><div ref={progressRef} /></div>

      <div className="mobile-menu" id="mobile-menu" hidden={!menuOpen}>
        <nav aria-label="Mobile navigation">
          {navLinks.map((link, index) => (
            <a key={link.href} href={link.href} onClick={closeMenu} style={{ '--i': index } as CSSProperties}>
              <span className="mobile-menu-index">0{index + 1}</span>
              {link.label}
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          ))}
        </nav>
        <a className="button button-gold mobile-menu-cta" href="#contact" onClick={closeMenu}>
          Get a cash offer <ArrowUpRight size={17} aria-hidden="true" />
        </a>
        <p className="mobile-menu-meta">
          <a href={`mailto:${company.email}`}>{company.email}</a>
          <a href={`tel:${phoneHref(company.phone)}`}>{company.phone}</a>
        </p>
      </div>
    </header>
  )
}
