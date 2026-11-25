import { ArrowLeft, ArrowRight, Pause, Play, RotateCcw } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import type { KeyboardEvent, PointerEvent, PropsWithChildren } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import type { SignatureController } from './signatureScene'

const INITIAL_VIEW = { yaw: -0.24, pitch: -0.12 }
const clamp = (value: number, limit: number) => Math.max(-limit, Math.min(limit, value))

interface Drag {
  id: number
  x: number
  y: number
  yaw: number
  pitch: number
  touch: boolean
}

export function SignatureSculpture({ children }: PropsWithChildren) {
  const reduced = useReducedMotion()
  const [status, setStatus] = useState<'loading' | 'ready' | 'unavailable'>('loading')
  const [unfolded, setUnfolded] = useState(false)
  const [paused, setPaused] = useState(reduced)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const controllerRef = useRef<SignatureController | null>(null)
  const viewRef = useRef({ ...INITIAL_VIEW })
  const dragRef = useRef<Drag | null>(null)
  const pausedRef = useRef(paused)
  const unfoldedRef = useRef(unfolded)
  const descriptionId = useId()
  pausedRef.current = paused
  unfoldedRef.current = unfolded

  useEffect(() => {
    let cancelled = false
    setStatus('loading')
    if (reduced) setPaused(true)
    if (!('WebGL2RenderingContext' in window)) {
      setStatus('unavailable')
      return
    }
    const unavailable = () => {
      if (cancelled) return
      controllerRef.current?.dispose()
      controllerRef.current = null
      setStatus('unavailable')
    }
    void import('./signatureScene').then(({ createSignatureScene }) => {
      if (cancelled || !canvasRef.current || !stageRef.current) return
      try {
        const controller = createSignatureScene(canvasRef.current, stageRef.current, unavailable, {
          running: !pausedRef.current && !reduced,
          reducedMotion: reduced,
        })
        controllerRef.current = controller
        controller.setView(viewRef.current.yaw, viewRef.current.pitch)
        controller.setUnfold(unfoldedRef.current ? 1 : 0)
        setStatus('ready')
      } catch {
        unavailable()
      }
    }).catch(unavailable)
    return () => {
      cancelled = true
      controllerRef.current?.dispose()
      controllerRef.current = null
      dragRef.current = null
    }
  }, [reduced])

  useEffect(() => { controllerRef.current?.setMotion(!paused && !reduced) }, [paused, reduced])

  const changeView = (yaw: number, pitch: number) => {
    viewRef.current = { yaw: clamp(yaw, 1.45), pitch: clamp(pitch, 0.65) }
    controllerRef.current?.setView(viewRef.current.yaw, viewRef.current.pitch)
  }

  const rotate = (direction: number) => {
    changeView(viewRef.current.yaw + direction * 0.2, viewRef.current.pitch)
  }

  const handleKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || status !== 'ready') return
    const directions: Record<string, [number, number]> = {
      ArrowLeft: [-0.12, 0], ArrowRight: [0.12, 0], ArrowUp: [0, -0.12], ArrowDown: [0, 0.12],
    }
    const direction = directions[event.key]
    if (!direction) return
    event.preventDefault()
    changeView(viewRef.current.yaw + direction[0], viewRef.current.pitch + direction[1])
  }

  const handleDown = (event: PointerEvent<HTMLDivElement>) => {
    if (status !== 'ready' || event.button !== 0 || !event.isPrimary) return
    dragRef.current = { id: event.pointerId, x: event.clientX, y: event.clientY, ...viewRef.current, touch: event.pointerType === 'touch' }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    if (status !== 'ready') return
    const drag = dragRef.current
    if (drag && drag.id === event.pointerId) {
      const dx = event.clientX - drag.x
      const dy = event.clientY - drag.y
      if (drag.touch && (Math.abs(dx) < 8 || Math.abs(dy) > Math.abs(dx))) return
      changeView(drag.yaw + dx * 0.008, drag.pitch + dy * 0.005)
    } else if (event.pointerType === 'mouse' && !reduced && !paused) {
      const bounds = event.currentTarget.getBoundingClientRect()
      const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2
      const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2
      controllerRef.current?.setView(viewRef.current.yaw + x * 0.16, viewRef.current.pitch + y * 0.09)
    }
  }

  const finishDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (dragRef.current?.id !== event.pointerId) return
    dragRef.current = null
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
  }

  const reset = () => {
    dragRef.current = null
    changeView(INITIAL_VIEW.yaw, INITIAL_VIEW.pitch)
    setUnfolded(false)
    controllerRef.current?.setUnfold(0)
  }

  const ready = status === 'ready'
  return (
    <div className={'signature-sculpture signature-sculpture--' + status}>
      <div ref={stageRef} className="signature-stage" role="group" aria-label="Interactive PK signature"
        aria-describedby={descriptionId} tabIndex={ready ? 0 : -1}
        onKeyDown={handleKey} onPointerDown={handleDown} onPointerMove={handleMove}
        onPointerUp={finishDrag} onPointerCancel={finishDrag}
        onPointerLeave={() => { if (!dragRef.current) controllerRef.current?.setView(viewRef.current.yaw, viewRef.current.pitch) }}>
        <canvas ref={canvasRef} aria-hidden="true" className="signature-canvas" />
        {!ready && <div className="signature-fallback">{children}</div>}
      </div>
      <p id={descriptionId} className="sr-only">A woven three-dimensional PK signature. Drag horizontally or use arrow keys to rotate. Rotate buttons provide the same interaction. Unfold changes its form. Reset restores the signature. {reduced ? 'Reduced motion is on; changes are immediate and ambient motion is disabled.' : ''}</p>
      {ready && <>
        <span className="signature-label" aria-hidden="true">Signature</span>
        <div className="signature-rotate" role="group" aria-label="Rotate signature">
          <button type="button" aria-label="Rotate signature left" onClick={() => rotate(-1)}><ArrowLeft size={16} aria-hidden="true" /></button>
          <button type="button" aria-label="Rotate signature right" onClick={() => rotate(1)}><ArrowRight size={16} aria-hidden="true" /></button>
        </div>
      </>}
      {status !== 'unavailable' ? <div className="signature-controls">
        <button type="button" disabled={!ready} aria-pressed={unfolded} aria-label={unfolded ? 'Reform signature' : 'Unfold signature'}
          onClick={() => { setUnfolded(!unfolded); controllerRef.current?.setUnfold(unfolded ? 0 : 1) }}>{unfolded ? 'Reform' : 'Unfold'}</button>
        <button type="button" disabled={!ready || reduced} aria-pressed={paused} aria-label={paused ? 'Play animation' : 'Pause animation'}
          onClick={() => setPaused(value => !value)}>{paused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />} {paused ? 'Play' : 'Pause'}</button>
        <button type="button" disabled={!ready} aria-label="Reset sculpture" onClick={reset}><RotateCcw size={13} aria-hidden="true" /> Reset</button>
      </div> : <span className="signature-static-label">Static signature</span>}
      <span className="sr-only" role="status" aria-live="polite">{ready ? 'Interactive signature ready.' : status === 'unavailable' ? 'Static signature. Interactive graphics are unavailable on this device.' : 'Loading interactive signature.'}</span>
    </div>
  )
}
