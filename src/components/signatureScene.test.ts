import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createSignatureScene } from './signatureScene'

const gpu = vi.hoisted(() => ({
  render: vi.fn(), dispose: vi.fn(), loseContext: vi.fn(), loop: vi.fn(), size: vi.fn(),
}))
vi.mock('three', async importOriginal => {
  const actual = await importOriginal<typeof import('three')>()
  return { ...actual, WebGLRenderer: class {
    outputColorSpace = ''
    toneMapping = 0
    toneMappingExposure = 1
    setPixelRatio() {}
    setAnimationLoop = gpu.loop
    setSize = gpu.size
    render = gpu.render
    dispose = gpu.dispose
    forceContextLoss = gpu.loseContext
  } }
})

let observeVisibility: IntersectionObserverCallback
const originalObserver = window.IntersectionObserver
beforeEach(() => {
  vi.clearAllMocks()
  vi.stubGlobal('ResizeObserver', class {
    observe() {}
    disconnect() {}
  })
  window.IntersectionObserver = class {
    constructor(callback: IntersectionObserverCallback) { observeVisibility = callback }
    observe() {}
    disconnect() {}
    unobserve() {}
    takeRecords() { return [] }
    root = null
    rootMargin = ''
    thresholds = []
  }
})
afterEach(() => {
  window.IntersectionObserver = originalObserver
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

function stage() {
  const host = document.createElement('div')
  Object.defineProperties(host, { clientWidth: { value: 480 }, clientHeight: { value: 400 } })
  return { host, canvas: document.createElement('canvas') }
}

describe('signature scene lifecycle', () => {
  it('releases resources without losing a canvas context that React can reuse', () => {
    const { host, canvas } = stage()
    const controller = createSignatureScene(canvas, host, vi.fn(), { running: true, reducedMotion: false })
    controller.dispose()
    controller.dispose()
    expect(gpu.dispose).toHaveBeenCalledTimes(1)
    expect(gpu.loop).toHaveBeenLastCalledWith(null)
    expect(gpu.loseContext).not.toHaveBeenCalled()
  })

  it('cleans up GPU resources if the first render fails', () => {
    const { host, canvas } = stage()
    gpu.render.mockImplementationOnce(() => { throw new Error('Failed render') })
    expect(() => createSignatureScene(canvas, host, vi.fn(), { running: true, reducedMotion: false })).toThrow('Failed render')
    expect(gpu.dispose).toHaveBeenCalledTimes(1)
    expect(gpu.loop).toHaveBeenLastCalledWith(null)
  })

  it('stops frames when offscreen and renders deliberate changes while paused', () => {
    const { host, canvas } = stage()
    const controller = createSignatureScene(canvas, host, vi.fn(), { running: true, reducedMotion: false })
    try {
      observeVisibility([{ isIntersecting: false } as IntersectionObserverEntry], {} as IntersectionObserver)
      expect(gpu.loop).toHaveBeenLastCalledWith(null)
      const count = gpu.render.mock.calls.length
      controller.setView(0.3, 0.1)
      expect(gpu.render).toHaveBeenCalledTimes(count)
      observeVisibility([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver)
      controller.setMotion(false)
      expect(gpu.loop).toHaveBeenLastCalledWith(null)
      controller.setUnfold(1)
      expect(gpu.render.mock.lastCall?.[0].getObjectByName('p-stem')?.morphTargetInfluences).toEqual([1])
    } finally { controller.dispose() }
  })
})
