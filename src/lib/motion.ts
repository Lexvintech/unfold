import { useEffect, useRef } from 'react'
import type { CSSProperties, PointerEvent as ReactPointerEvent } from 'react'

const reducedMotionQuery = '(prefers-reduced-motion: reduce)'
const finePointerQuery = '(hover: hover) and (pointer: fine)'

export const prefersReducedMotion = () => window.matchMedia(reducedMotionQuery).matches

/**
 * Reveals every `[data-reveal]` element once it scrolls into view by adding `.is-visible`.
 * The hidden starting state lives in CSS and only applies when motion is allowed,
 * so content is never hidden for reduced-motion users.
 */
export function useRevealOnScroll() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (!('IntersectionObserver' in window) || prefersReducedMotion()) {
      elements.forEach((el) => el.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0 },
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

/**
 * Pulls an element slightly toward the pointer. Only on devices with a fine pointer
 * and when motion is allowed. Writes the offset to the CSS `translate` property via
 * custom properties so it never fights with hover `transform`s.
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.22) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion() || !window.matchMedia(finePointerQuery).matches) return

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      const x = (event.clientX - (rect.left + rect.width / 2)) * strength
      const y = (event.clientY - (rect.top + rect.height / 2)) * strength
      el.style.setProperty('--mag-x', `${x.toFixed(1)}px`)
      el.style.setProperty('--mag-y', `${y.toFixed(1)}px`)
    }
    const onLeave = () => {
      el.style.setProperty('--mag-x', '0px')
      el.style.setProperty('--mag-y', '0px')
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [strength])

  return ref
}

/** Records the pointer position inside an element as `--spot-x` / `--spot-y` for spotlight effects. */
export function trackSpotlight(event: ReactPointerEvent<HTMLElement>) {
  const el = event.currentTarget
  const rect = el.getBoundingClientRect()
  el.style.setProperty('--spot-x', `${event.clientX - rect.left}px`)
  el.style.setProperty('--spot-y', `${event.clientY - rect.top}px`)
}

/** Inline style that sets a stagger step for CSS entrance animations. */
export const delay = (step: number) => ({ '--d': step }) as CSSProperties
