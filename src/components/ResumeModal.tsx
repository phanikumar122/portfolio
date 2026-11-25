import { Download, ExternalLink, FileText, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

interface ResumeModalProps {
  isOpen: boolean
  onClose: () => void
  resumeUrl: string
}

export function ResumeModal({ isOpen, onClose, resumeUrl }: ResumeModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)
  const onCloseRef = useRef(onClose)

  useEffect(() => { onCloseRef.current = onClose }, [onClose])

  useEffect(() => {
    if (!isOpen) return
    triggerRef.current = document.activeElement as HTMLElement
    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCloseRef.current()
        return
      }
      if (event.key !== 'Tab' || !dialogRef.current) return
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], iframe, [tabindex]:not([tabindex="-1"])'))
      if (!focusable.length) return
      const index = focusable.findIndex(element => element === document.activeElement)
      const nextIndex = (index + (event.shiftKey ? -1 : 1) + focusable.length) % focusable.length
      event.preventDefault()
      focusable[nextIndex]?.focus()
    }

    const keepFocusInside = (event: FocusEvent) => {
      if (event.target instanceof Node && !dialogRef.current?.contains(event.target)) closeButtonRef.current?.focus()
    }
    const backdrop = dialogRef.current?.parentElement
    const background = Array.from(document.body.children)
      .filter((element): element is HTMLElement => element instanceof HTMLElement && element !== backdrop)
      .map(element => ({ element, wasInert: element.hasAttribute('inert') }))
    background.forEach(({ element }) => element.setAttribute('inert', ''))
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('focusin', keepFocusInside)
    document.body.classList.add('dialog-is-open')
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('focusin', keepFocusInside)
      document.body.classList.remove('dialog-is-open')
      background.forEach(({ element, wasInert }) => { if (!wasInert) element.removeAttribute('inert') })
      if (triggerRef.current?.isConnected) triggerRef.current.focus()
    }
  }, [isOpen])

  if (!isOpen) return null

  return createPortal(
    <div
      className="dialog-backdrop resume-backdrop studio-resume"
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
        aria-describedby="resume-preview-help"
        ref={dialogRef}
      >
        <div className="dialog-topline resume-modal-topline">
          <div className="resume-modal-title-group">
            <FileText size={16} />
            <span id="resume-modal-title">Resume — Vinnakota Phani Kumar</span>
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
              <ExternalLink size={14} /> <span>Open PDF</span>
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
            tabIndex={0}
          />
        </div>
        <div className="resume-modal-footer">
          <p id="resume-preview-help">If the preview is unavailable, open or download the PDF above.</p>
          <button type="button" className="studio-button studio-button--outline" onClick={onClose}>Close preview</button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
