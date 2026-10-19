import '@testing-library/jest-dom/vitest'

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    addListener: () => undefined,
    removeListener: () => undefined,
    dispatchEvent: () => false,
  }),
})

class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() { return [] }
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: MockIntersectionObserver,
})

// Mock HTMLCanvasElement.prototype.getContext for JSDOM
HTMLCanvasElement.prototype.getContext = (() => ({
  fillRect: () => {},
  clearRect: () => {},
  getImageData: () => ({ data: new Array(4) }),
  putImageData: () => {},
  createImageData: () => [],
  setTransform: () => {},
  drawImage: () => {},
  save: () => {},
  fillText: () => {},
  restore: () => {},
  beginPath: () => {},
  moveTo: () => {},
  lineTo: () => {},
  closePath: () => {},
  stroke: () => {},
  translate: () => {},
  scale: () => {},
  rotate: () => {},
  arc: () => {},
  fill: () => {},
  clip: () => {},
  createRadialGradient: () => ({
    addColorStop: () => {},
  }),
})) as any

