import {
  BufferGeometry,
  Clock,
  Color,
  Float32BufferAttribute,
  Group,
  Line,
  LineBasicMaterial,
  LineSegments,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  Vector3,
  WebGLRenderer,
} from 'three'

function lineFromPoints(points: Vector3[], material: LineBasicMaterial) {
  return new Line(new BufferGeometry().setFromPoints(points), material)
}

function createMobius(material: LineBasicMaterial, detailMaterial: LineBasicMaterial) {
  const group = new Group()
  const segments = 150
  const bands = 11
  const rows: Vector3[][] = []

  for (let band = 0; band < bands; band += 1) {
    const v = -0.62 + (band / (bands - 1)) * 1.24
    const points: Vector3[] = []
    for (let step = 0; step <= segments; step += 1) {
      const u = (step / segments) * Math.PI * 2
      const radius = 2.15 + v * Math.cos(u / 2)
      points.push(new Vector3(radius * Math.cos(u), radius * Math.sin(u), v * Math.sin(u / 2)))
    }
    rows.push(points)
    group.add(lineFromPoints(points, band === Math.floor(bands / 2) ? material : detailMaterial))
  }
  for (let step = 0; step < segments; step += 12) {
    group.add(lineFromPoints(rows.map((row) => row[step]), detailMaterial))
  }
  return group
}

function createHelix(material: LineBasicMaterial, detailMaterial: LineBasicMaterial) {
  const group = new Group()
  const strandA: Vector3[] = []
  const strandB: Vector3[] = []
  const segments = 190
  for (let index = 0; index <= segments; index += 1) {
    const t = (index / segments) * Math.PI * 8
    const y = (index / segments - 0.5) * 5.4
    strandA.push(new Vector3(Math.cos(t) * 0.92, y, Math.sin(t) * 0.92))
    strandB.push(new Vector3(Math.cos(t + Math.PI) * 0.92, y, Math.sin(t + Math.PI) * 0.92))
  }
  group.add(lineFromPoints(strandA, material), lineFromPoints(strandB, material))
  for (let index = 0; index <= segments; index += 8) {
    group.add(lineFromPoints([strandA[index], strandB[index]], detailMaterial))
  }
  return group
}

function createWaveField(material: LineBasicMaterial, detailMaterial: LineBasicMaterial) {
  const group = new Group()
  const size = 4.8
  const divisions = 16
  for (let row = 0; row <= divisions; row += 1) {
    const points: Vector3[] = []
    for (let column = 0; column <= 48; column += 1) {
      const x = -size / 2 + (column / 48) * size
      const z = -size / 2 + (row / divisions) * size
      const y = Math.sin(x * 1.7 + z * 1.15) * 0.34 + Math.cos(z * 1.9) * 0.18
      points.push(new Vector3(x, y, z))
    }
    group.add(lineFromPoints(points, row % 4 === 0 ? material : detailMaterial))
  }
  for (let column = 0; column <= divisions; column += 1) {
    const points: Vector3[] = []
    for (let row = 0; row <= 48; row += 1) {
      const z = -size / 2 + (row / 48) * size
      const x = -size / 2 + (column / divisions) * size
      const y = Math.sin(x * 1.7 + z * 1.15) * 0.34 + Math.cos(z * 1.9) * 0.18
      points.push(new Vector3(x, y, z))
    }
    group.add(lineFromPoints(points, detailMaterial))
  }
  return group
}

export function startGlobalScene(host: HTMLDivElement, canvas: HTMLCanvasElement, context: WebGLRenderingContext | WebGL2RenderingContext) {
  let disposed = false
  let frame = 0
  let pageVisible = !document.hidden
  let scrollTarget = 0
  let scrollCurrent = 0
  const pointer = { x: 0, y: 0 }

  const renderer = new WebGLRenderer({ canvas, context, alpha: true, antialias: true, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
  renderer.setClearColor(0x000000, 0)
  const scene = new Scene()
  const camera = new PerspectiveCamera(42, 1, 0.1, 100)
  camera.position.z = 8

  const world = new Group()
  scene.add(world)
  const styles = getComputedStyle(document.documentElement)
  const primary = new LineBasicMaterial({ color: new Color(styles.getPropertyValue('--accent').trim() || '#f0edee'), transparent: true, opacity: 0.72 })
  const detail = new LineBasicMaterial({ color: new Color(styles.getPropertyValue('--text-secondary').trim() || '#f0edee'), transparent: true, opacity: 0.3 })
  const pointsMaterial = new PointsMaterial({ color: primary.color, size: 0.038, transparent: true, opacity: 0.62, sizeAttenuation: true })

  const mobius = createMobius(primary, detail)
  mobius.position.set(3.1, 1.1, -1.2)
  mobius.rotation.set(0.72, 0.1, -0.25)
  const helix = createHelix(primary, detail)
  helix.position.set(-3.4, -0.7, -1.4)
  helix.rotation.z = 0.7
  const wave = createWaveField(primary, detail)
  wave.position.set(0.2, -2.4, -2.8)
  wave.rotation.x = -0.56
  world.add(mobius, helix, wave)

  const particlePositions: number[] = []
  for (let index = 0; index < 220; index += 1) {
    const angle = index * 2.399963
    const radius = 2.5 + (index % 23) * 0.19
    particlePositions.push(Math.cos(angle) * radius, Math.sin(angle) * radius * 0.7, ((index * 11) % 29) * 0.16 - 2.3)
  }
  const particleGeometry = new BufferGeometry()
  particleGeometry.setAttribute('position', new Float32BufferAttribute(particlePositions, 3))
  const particles = new Points(particleGeometry, pointsMaterial)
  world.add(particles)

  const updatePalette = () => {
    const current = getComputedStyle(document.documentElement)
    primary.color.set(current.getPropertyValue('--accent').trim() || '#f0edee')
    detail.color.set(current.getPropertyValue('--text-secondary').trim() || '#f0edee')
    pointsMaterial.color.copy(primary.color)
  }
  const themeObserver = new MutationObserver(updatePalette)
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  const resize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight, false)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
  }
  const updateScroll = () => { scrollTarget = Math.min(window.scrollY / Math.max(document.documentElement.scrollHeight - window.innerHeight, 1), 1) }
  const updatePointer = (event: PointerEvent) => {
    pointer.x = (event.clientX / window.innerWidth - 0.5) * 0.35
    pointer.y = (event.clientY / window.innerHeight - 0.5) * 0.25
  }
  const updateVisibility = () => { pageVisible = !document.hidden }
  window.addEventListener('resize', resize)
  window.addEventListener('scroll', updateScroll, { passive: true })
  window.addEventListener('pointermove', updatePointer, { passive: true })
  document.addEventListener('visibilitychange', updateVisibility)
  resize()
  updateScroll()

  const clock = new Clock()
  const render = () => {
    if (disposed) return
    frame = requestAnimationFrame(render)
    if (!pageVisible) return
    scrollCurrent += (scrollTarget - scrollCurrent) * 0.055
    const time = clock.getElapsedTime()
    const chapter = scrollCurrent * Math.PI * 6

    world.rotation.y = chapter * 0.28 + pointer.x
    world.rotation.x = Math.sin(chapter * 0.42) * 0.16 - pointer.y
    world.position.x = Math.sin(chapter * 0.56) * 1.4
    world.position.y = Math.cos(chapter * 0.38) * 0.75
    mobius.rotation.z = -0.25 + time * 0.055 + chapter * 0.11
    mobius.rotation.y = chapter * 0.16
    helix.rotation.y = time * 0.08 - chapter * 0.2
    helix.position.y = -0.7 + Math.sin(chapter) * 1.1
    wave.rotation.z = Math.sin(chapter * 0.55) * 0.22
    wave.position.y = -2.4 + Math.cos(chapter * 0.7) * 1.45
    particles.rotation.z = time * 0.018 + chapter * 0.04
    camera.position.z = 7.7 + Math.sin(chapter * 0.5) * 0.55
    renderer.render(scene, camera)
  }
  render()

  return () => {
    disposed = true
    cancelAnimationFrame(frame)
    themeObserver.disconnect()
    window.removeEventListener('resize', resize)
    window.removeEventListener('scroll', updateScroll)
    window.removeEventListener('pointermove', updatePointer)
    document.removeEventListener('visibilitychange', updateVisibility)
    scene.traverse((object) => { if (object instanceof Line || object instanceof LineSegments || object instanceof Points) object.geometry.dispose() })
    primary.dispose(); detail.dispose(); pointsMaterial.dispose(); renderer.dispose()
  }
}