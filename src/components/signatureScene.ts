import {
  ACESFilmicToneMapping, AmbientLight, Color, DirectionalLight,
  PerspectiveCamera, Scene, SRGBColorSpace, WebGLRenderer,
} from 'three'
import { createSignature } from './signatureGeometry'

export interface SignatureController {
  setView: (yaw: number, pitch: number) => void
  setUnfold: (amount: number) => void
  setMotion: (running: boolean) => void
  dispose: () => void
}

interface SignatureOptions {
  running: boolean
  reducedMotion: boolean
}

/** Loaded separately from the page. Owns all GPU resources and render scheduling. */
export function createSignatureScene(
  canvas: HTMLCanvasElement, host: HTMLElement, onUnavailable: () => void, options: SignatureOptions,
): SignatureController {
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'low-power' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
  renderer.outputColorSpace = SRGBColorSpace
  renderer.toneMapping = ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.15
  const scene = new Scene()
  scene.background = new Color('#050505')
  const camera = new PerspectiveCamera(36, 1, 0.1, 50)
  const signature = createSignature()
  scene.add(signature.object)
  scene.add(new AmbientLight('#fffcf9', 0.85))
  const key = new DirectionalLight('#fffcf9', 3.4)
  key.position.set(-3, 4, 6)
  const rim = new DirectionalLight('#fffcf9', 2.4)
  rim.position.set(4, 1, -3)
  const fill = new DirectionalLight('#fffcf9', 0.7)
  fill.position.set(-4, -3, 3)
  scene.add(key, rim, fill)

  let disposed = false
  let intersecting = true
  let running = options.running && !options.reducedMotion
  let phase = 0
  let lastFrame: number | null = null
  let yaw = -0.24
  let pitch = -0.12
  let unfold = 0
  let targetYaw = yaw
  let targetPitch = pitch
  let targetUnfold = unfold

  const visible = () => intersecting && document.visibilityState !== 'hidden'
  const render = () => {
    if (disposed || !visible()) return
    signature.object.rotation.set(pitch, yaw, 0)
    signature.setUnfold(unfold)
    renderer.render(scene, camera)
  }
  const animate = (time: number) => {
    if (lastFrame === null) lastFrame = time - 1000 / 30
    const elapsed = time - lastFrame
    if (elapsed < 1000 / 30) return
    const delta = Math.min(elapsed / 1000, 0.05)
    lastFrame = time
    phase += delta
    const damping = 1 - Math.exp(-delta * 7)
    yaw += (targetYaw - yaw) * damping
    pitch += (targetPitch - pitch) * damping
    unfold += (targetUnfold - unfold) * damping
    signature.object.rotation.set(pitch + Math.sin(phase * 0.55) * 0.018, yaw + Math.sin(phase * 0.35) * 0.035, 0)
    signature.setUnfold(unfold)
    renderer.render(scene, camera)
  }
  const syncLoop = () => {
    if (disposed) return
    renderer.setAnimationLoop(null)
    lastFrame = null
    if (running && visible()) renderer.setAnimationLoop(animate)
    else render()
  }
  const resize = () => {
    if (disposed) return
    const width = Math.max(host.clientWidth, 1)
    const height = Math.max(host.clientHeight, 1)
    camera.aspect = width / height
    // Fit both ribbon poses to the actual panel, including narrow mobile canvases.
    camera.position.set(0, 0, Math.max(6.4, 5.2 / (2 * Math.tan(Math.PI / 10) * camera.aspect)))
    camera.updateProjectionMatrix()
    renderer.setSize(width, height, false)
    render()
  }
  const resizeObserver = new ResizeObserver(resize)
  const visibilityObserver = new IntersectionObserver(([entry]) => {
    intersecting = entry.isIntersecting
    syncLoop()
  }, { threshold: 0.05 })
  const handleVisibility = () => syncLoop()
  const handleContextLoss = (event: Event) => {
    event.preventDefault()
    renderer.setAnimationLoop(null)
    onUnavailable()
  }
  canvas.addEventListener('webglcontextlost', handleContextLoss)
  document.addEventListener('visibilitychange', handleVisibility)
  resizeObserver.observe(host)
  visibilityObserver.observe(host)
  const dispose = () => {
    if (disposed) return
    disposed = true
    renderer.setAnimationLoop(null)
    resizeObserver.disconnect()
    visibilityObserver.disconnect()
    document.removeEventListener('visibilitychange', handleVisibility)
    canvas.removeEventListener('webglcontextlost', handleContextLoss)
    signature.dispose()
    scene.clear()
    renderer.dispose()
  }
  try {
    resize()
    syncLoop()
  } catch (error) {
    dispose()
    throw error
  }

  return {
    setView(nextYaw, nextPitch) {
      if (disposed) return
      targetYaw = nextYaw
      targetPitch = nextPitch
      if (!running) { yaw = targetYaw; pitch = targetPitch; render() }
    },
    setUnfold(amount) {
      if (disposed) return
      targetUnfold = Math.max(0, Math.min(1, amount))
      if (!running) { unfold = targetUnfold; render() }
    },
    setMotion(enabled) {
      if (disposed) return
      running = enabled && !options.reducedMotion
      if (!running) { yaw = targetYaw; pitch = targetPitch; unfold = targetUnfold }
      syncLoop()
    },
    dispose,
  }
}
