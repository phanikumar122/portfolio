import { Download, ExternalLink, FileText, X } from 'lucide-react'
import { useEffect, useRef } from 'react'

interface ResumeModalProps {
  isOpen: boolean
  onClose: () => void
  resumeUrl: string
}

export function ResumeModal({ isOpen, onClose, resumeUrl }: ResumeModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isOpen) return
    triggerRef.current = document.activeElement as HTMLElement
    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab' || !dialogRef.current) return
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button, a[href], [tabindex]:not([tabindex="-1"])'))
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.classList.add('dialog-is-open')
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.classList.remove('dialog-is-open')
      triggerRef.current?.focus()
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="dialog-backdrop resume-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        className="project-dialog resume-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-modal-title"
        ref={dialogRef}
      >
        <div className="dialog-topline resume-modal-topline">
          <div className="resume-modal-title-group">
            <FileText size={16} />
            <span id="resume-modal-title">Resume / Vinnakota Phani Kumar</span>
          </div>
          <div className="resume-modal-actions">
            <a
              href={resumeUrl}
              download="Vinnakota_Phani_Kumar_Resume.pdf"
              className="button button--quiet resume-action-btn"
              aria-label="Download resume PDF"
            >
              <Download size={14} /> <span>Download</span>
            </a>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="button button--quiet resume-action-btn"
              aria-label="Open resume in new tab"
            >
              <ExternalLink size={14} /> <span>Fullscreen</span>
            </a>
            <button
              ref={closeButtonRef}
              type="button"
              className="icon-button"
              aria-label="Close resume preview"
              onClick={onClose}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="resume-modal-content">
          <iframe
            src={`${resumeUrl}#toolbar=0`}
            title="Resume of Vinnakota Phani Kumar"
            className="resume-iframe"
          />
        </div>
      </div>
    </div>
  )
}
