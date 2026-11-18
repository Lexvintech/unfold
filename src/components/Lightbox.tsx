import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import type { KeyboardEvent, MouseEvent } from 'react'

export interface LightboxItem {
  src: string
  alt: string
  label: string
  caption: string
}

interface LightboxProps {
  items: LightboxItem[]
  index: number | null
  onClose: () => void
  onNavigate: (index: number) => void
}

/** Modal image viewer built on the native <dialog> element (focus trap + Escape for free). */
export function Lightbox({ items, index, onClose, onNavigate }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const item = index === null ? null : items[index]

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (item && !dialog.open) dialog.showModal()
    if (!item && dialog.open) dialog.close()
  }, [item])

  if (items.length === 0) return null

  const go = (delta: number) => {
    if (index === null) return
    onNavigate((index + delta + items.length) % items.length)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'ArrowRight') go(1)
    if (event.key === 'ArrowLeft') go(-1)
  }

  // A click on the dialog element itself (not its content) is a click on the backdrop.
  const onBackdrop = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) onClose()
  }

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      aria-label="Project photo viewer"
      onClose={onClose}
      onKeyDown={onKeyDown}
      onClick={onBackdrop}
    >
      {item && index !== null && (
        <div className="lightbox-inner">
          <figure key={item.src} className="lightbox-figure">
            <img src={item.src} alt={item.alt} />
            <figcaption>
              <span className={`photo-label photo-label-${item.label.toLowerCase()}`}>{item.label}</span>
              <span>{item.caption}</span>
              <span className="lightbox-count">{index + 1} / {items.length}</span>
            </figcaption>
          </figure>
          <button className="lightbox-btn lightbox-close" type="button" onClick={onClose} aria-label="Close photo viewer" autoFocus>
            <X size={22} />
          </button>
          {items.length > 1 && (
            <>
              <button className="lightbox-btn lightbox-prev" type="button" onClick={() => go(-1)} aria-label="Previous photo">
                <ChevronLeft size={24} />
              </button>
              <button className="lightbox-btn lightbox-next" type="button" onClick={() => go(1)} aria-label="Next photo">
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </div>
      )}
    </dialog>
  )
}
