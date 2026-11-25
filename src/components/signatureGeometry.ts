import { Box3, BufferGeometry, CatmullRomCurve3, Float32BufferAttribute, Group, Mesh, MeshStandardMaterial, Quaternion, Vector3 } from 'three'

const SEGMENTS = 96
const HALF_WIDTH = 0.16
const HALF_DEPTH = 0.075
const BEVEL = 0.03

// An eight-sided chamfered rectangle, not a round tube or a stock primitive.
const PROFILE: ReadonlyArray<readonly [number, number]> = [
  [-HALF_WIDTH + BEVEL, -HALF_DEPTH],
  [HALF_WIDTH - BEVEL, -HALF_DEPTH],
  [HALF_WIDTH, -HALF_DEPTH + BEVEL],
  [HALF_WIDTH, HALF_DEPTH - BEVEL],
  [HALF_WIDTH - BEVEL, HALF_DEPTH],
  [-HALF_WIDTH + BEVEL, HALF_DEPTH],
  [-HALF_WIDTH, HALF_DEPTH - BEVEL],
  [-HALF_WIDTH, -HALF_DEPTH + BEVEL],
]

interface Stroke {
  name: string
  points: Array<[number, number, number]>
}

const STROKES: Stroke[] = [
  { name: 'p-stem', points: [[-1.4, -1.35, 0.05], [-1.43, -0.5, 0.02], [-1.4, 0.4, 0], [-1.4, 1.35, 0.05]] },
  { name: 'p-bowl', points: [[-1.4, 1.35, 0.05], [-0.83, 1.35, 0.05], [-0.32, 1.2, 0.08], [-0.12, 0.83, 0.08], [-0.27, 0.45, 0.06], [-0.8, 0.31, 0.03], [-1.4, 0.31, 0.05]] },
  { name: 'k-stem', points: [[0.32, -1.35, 0.01], [0.29, -0.45, 0.04], [0.32, 0.45, 0.01], [0.32, 1.35, 0.03]] },
  { name: 'k-upper', points: [[0.32, -0.05, 0.04], [0.86, 0.59, -0.02], [1.65, 1.35, 0.03]] },
  { name: 'k-lower', points: [[0.34, -0.05, 0.05], [0.9, -0.59, 0.02], [1.67, -1.35, 0]] },
]

function spline(points: Array<[number, number, number]>) {
  return new CatmullRomCurve3(points.map(point => new Vector3(...point)), false, 'centripetal')
}

function wovenSpline(index: number) {
  const phase = index * Math.PI * 2 / STROKES.length
  const points: Array<[number, number, number]> = []
  for (let sample = 0; sample <= 12; sample++) {
    const t = sample / 12
    const turn = t * Math.PI * 2 + phase
    points.push([
      (t - 0.5) * 3.55,
      Math.sin(turn) * 0.92 + (index - 2) * 0.1 * Math.sin(t * Math.PI),
      Math.cos(turn) * 0.94,
    ])
  }
  return spline(points)
}

/** Parallel-transport frames keep the flat ribbon from flipping at low curvature. */
function ribbonVertices(curve: CatmullRomCurve3, twist: (t: number) => number) {
  const values: number[] = []
  const previousTangent = curve.getTangentAt(0).normalize()
  const transportedWidth = new Vector3(0, 0, 1).cross(previousTangent).normalize()
  const rotation = new Quaternion()

  for (let segment = 0; segment <= SEGMENTS; segment++) {
    const t = segment / SEGMENTS
    const center = curve.getPointAt(t)
    const tangent = curve.getTangentAt(t).normalize()
    if (segment > 0) {
      rotation.setFromUnitVectors(previousTangent, tangent)
      transportedWidth.applyQuaternion(rotation)
      transportedWidth.addScaledVector(tangent, -transportedWidth.dot(tangent)).normalize()
    }
    const width = transportedWidth.clone().applyAxisAngle(tangent, twist(t))
    const depth = new Vector3().crossVectors(tangent, width).normalize()
    for (const [u, v] of PROFILE) {
      const vertex = center.clone().addScaledVector(width, u).addScaledVector(depth, v)
      values.push(vertex.x, vertex.y, vertex.z)
    }
    previousTangent.copy(tangent)
  }

  // Separate cap rings retain flat end normals while sharing physical edge positions.
  const ringSize = PROFILE.length * 3
  for (const end of [0, SEGMENTS]) {
    values.push(...values.slice(end * ringSize, (end + 1) * ringSize))
    const center = curve.getPointAt(end / SEGMENTS)
    values.push(center.x, center.y, center.z)
  }
  return new Float32Array(values)
}

function ribbonIndices() {
  const indices: number[] = []
  const sides = PROFILE.length
  for (let segment = 0; segment < SEGMENTS; segment++) {
    for (let side = 0; side < sides; side++) {
      const next = (side + 1) % sides
      const a = segment * sides + side
      const b = (segment + 1) * sides + side
      const c = (segment + 1) * sides + next
      const d = segment * sides + next
      indices.push(a, d, b, d, c, b)
    }
  }
  const capStart = (SEGMENTS + 1) * sides
  for (const end of [0, 1]) {
    const ring = capStart + end * (sides + 1)
    const center = ring + sides
    for (let side = 0; side < sides; side++) {
      const next = (side + 1) % sides
      if (end === 0) indices.push(center, ring + next, ring + side)
      else indices.push(center, ring + side, ring + next)
    }
  }
  return indices
}

function centerForm(arrays: Float32Array[]) {
  const bounds = new Box3()
  const point = new Vector3()
  for (const array of arrays) {
    for (let i = 0; i < array.length; i += 3) bounds.expandByPoint(point.fromArray(array, i))
  }
  const center = bounds.getCenter(new Vector3())
  for (const array of arrays) {
    for (let i = 0; i < array.length; i += 3) {
      array[i] -= center.x
      array[i + 1] -= center.y
      array[i + 2] -= center.z
    }
  }
}

function morphRibbon(source: Float32Array, target: Float32Array, indices: number[]) {
  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new Float32BufferAttribute(source, 3))
  geometry.setIndex(indices)
  geometry.computeVertexNormals()

  const targetGeometry = new BufferGeometry()
  targetGeometry.setAttribute('position', new Float32BufferAttribute(target, 3))
  targetGeometry.setIndex(indices)
  targetGeometry.computeVertexNormals()
  geometry.morphAttributes.position = [targetGeometry.getAttribute('position')]
  geometry.morphAttributes.normal = [targetGeometry.getAttribute('normal').clone()]
  geometry.morphTargetsRelative = false
  targetGeometry.dispose()
  // Three includes morph extents here, keeping the sculpture inside the frustum in both states.
  geometry.computeBoundingBox()
  geometry.computeBoundingSphere()
  return geometry
}

export interface Signature {
  object: Group
  setUnfold(amount: number): void
  dispose(): void
}

/** Five bespoke PK strokes unfold into a phase-shifted, woven dimensional signature. */
export function createSignature(): Signature {
  const object = new Group()
  object.name = 'woven-pk-signature'
  const sourceForms = STROKES.map(stroke => ribbonVertices(spline(stroke.points), () => 0))
  const targetForms = STROKES.map((_, index) => ribbonVertices(wovenSpline(index), t => Math.sin(t * Math.PI * 2 + index * 0.65) * 0.5))
  centerForm(sourceForms)
  centerForm(targetForms)

  const material = new MeshStandardMaterial({ color: '#fffcf9', metalness: 0.06, roughness: 0.38 })
  const indices = ribbonIndices()
  const meshes = STROKES.map((stroke, index) => {
    const geometry = morphRibbon(sourceForms[index], targetForms[index], indices)
    geometry.name = `${stroke.name}-beveled-ribbon`
    const mesh = new Mesh(geometry, material)
    mesh.name = stroke.name
    mesh.castShadow = true
    mesh.receiveShadow = true
    object.add(mesh)
    return mesh
  })
  let disposed = false

  return {
    object,
    setUnfold(amount) {
      if (disposed) return
      const progress = Math.max(0, Math.min(1, Number.isNaN(amount) ? 0 : amount))
      for (const mesh of meshes) mesh.morphTargetInfluences![0] = progress
    },
    dispose() {
      if (disposed) return
      disposed = true
      meshes.forEach(mesh => mesh.geometry.dispose())
      material.dispose()
      object.clear()
    },
  }
}
