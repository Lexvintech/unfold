import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { useMagnetic } from '../lib/motion'

interface MagneticLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
  strength?: number
}

/** An anchor that drifts gently toward the pointer on desktop. */
export function MagneticLink({ children, className = '', strength, ...rest }: MagneticLinkProps) {
  const ref = useMagnetic<HTMLAnchorElement>(strength)
  return (
    <a ref={ref} className={`magnetic ${className}`.trim()} {...rest}>
      {children}
    </a>
  )
}
