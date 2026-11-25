import { BufferAttribute, Group, Mesh, MeshStandardMaterial, Vector3 } from 'three'
import { describe, expect, it } from 'vitest'
import { createSignature } from './signatureGeometry'

function ribbonMeshes(object: Group) {
  const meshes: Mesh[] = []
  object.traverse(child => { if (child instanceof Mesh) meshes.push(child) })
  return meshes
}

function vertices(attribute: BufferAttribute) {
  return Array.from({ length: attribute.count }, (_, index) => new Vector3().fromBufferAttribute(attribute, index))
}

describe('woven PK signature geometry', () => {
  it('builds five custom ribbon strokes with matching finite GPU morph data', () => {
    const signature = createSignature()
    try {
      expect(signature.object).toBeInstanceOf(Group)
      const meshes = ribbonMeshes(signature.object)
      expect(meshes).toHaveLength(5)
      for (const mesh of meshes) {
        const geometry = mesh.geometry
        const position = geometry.getAttribute('position')
        const normal = geometry.getAttribute('normal')
        const target = geometry.morphAttributes.position?.[0]
        const targetNormal = geometry.morphAttributes.normal?.[0]
        expect(geometry.type).toBe('BufferGeometry')
        expect(position.count).toBeGreaterThan(100)
        expect(normal.count).toBe(position.count)
        expect(target?.count).toBe(position.count)
        expect(targetNormal?.count).toBe(position.count)
        expect(geometry.morphTargetsRelative).toBe(false)
        expect(mesh.morphTargetInfluences).toEqual([0])
        for (const attribute of [position, normal, target, targetNormal]) {
          expect(attribute).toBeInstanceOf(BufferAttribute)
          expect(Array.from((attribute as BufferAttribute).array).every(Number.isFinite)).toBe(true)
        }
        for (const attribute of [normal, targetNormal]) {
          for (const vector of vertices(attribute as BufferAttribute)) expect(vector.length()).toBeCloseTo(1, 4)
        }
        expect(mesh.material).toBeInstanceOf(MeshStandardMaterial)
        expect((mesh.material as MeshStandardMaterial).color.getHexString()).toBe('fffcf9')
      }
    } finally { signature.dispose() }
  })

  it('uses consistent nondegenerate triangulation for assembled and unfolded forms', () => {
    const signature = createSignature()
    try {
      const meshes = ribbonMeshes(signature.object)
      expect(meshes).toHaveLength(5)
      for (const mesh of meshes) {
        const index = mesh.geometry.index
        expect(index).not.toBeNull()
        expect(index!.count % 3).toBe(0)
        const forms = [mesh.geometry.getAttribute('position'), mesh.geometry.morphAttributes.position?.[0]]
        for (const form of forms) {
          const positions = vertices(form as BufferAttribute)
          for (let i = 0; i < index!.count; i += 3) {
            const ids = [index!.getX(i), index!.getX(i + 1), index!.getX(i + 2)]
            expect(ids.every(id => Number.isInteger(id) && id >= 0 && id < positions.length)).toBe(true)
            const [a, b, c] = ids.map(id => positions[id])
            const cross = b.clone().sub(a).cross(c.clone().sub(a))
            expect(cross.lengthSq()).toBeGreaterThan(1e-12)
          }
        }
      }
    } finally { signature.dispose() }
  })

  it('centers both forms inside the scene framing limits', () => {
    const signature = createSignature()
    try {
      const meshes = ribbonMeshes(signature.object)
      expect(meshes).toHaveLength(5)
      for (const target of [false, true]) {
        const points = meshes.flatMap(mesh => vertices((target ? mesh.geometry.morphAttributes.position?.[0] : mesh.geometry.getAttribute('position')) as BufferAttribute))
        for (const [axis, limit] of [['x', 2.2], ['y', 2.2], ['z', 1.4]] as const) {
          const values = points.map(point => point[axis])
          const min = Math.min(...values)
          const max = Math.max(...values)
          expect(min).toBeGreaterThanOrEqual(-limit)
          expect(max).toBeLessThanOrEqual(limit)
          expect(Math.abs((min + max) / 2)).toBeLessThan(0.02)
        }
      }
    } finally { signature.dispose() }
  })

  it('clamps morph controls and never rebuilds or uploads vertex arrays per update', () => {
    const signature = createSignature()
    try {
      const meshes = ribbonMeshes(signature.object)
      expect(meshes).toHaveLength(5)
      const snapshots = meshes.map(mesh => {
        const attributes = [mesh.geometry.getAttribute('position'), mesh.geometry.getAttribute('normal'), mesh.geometry.morphAttributes.position?.[0], mesh.geometry.morphAttributes.normal?.[0]] as BufferAttribute[]
        return attributes.map(attribute => ({ attribute, array: attribute.array, values: Array.from(attribute.array), version: attribute.version }))
      })
      for (const [amount, expected] of [[-2, 0], [0.35, 0.35], [2, 1], [Infinity, 1], [-Infinity, 0], [NaN, 0]]) {
        signature.setUnfold(amount)
        meshes.forEach(mesh => expect(mesh.morphTargetInfluences).toEqual([expected]))
      }
      snapshots.flat().forEach(({ attribute, array, values, version }) => {
        expect(attribute.array).toBe(array)
        expect(Array.from(attribute.array)).toEqual(values)
        expect(attribute.version).toBe(version)
      })
    } finally { signature.dispose() }
  })

  it('disposes every geometry and shared material exactly once', () => {
    const signature = createSignature()
    const meshes = ribbonMeshes(signature.object)
    expect(meshes).toHaveLength(5)
    const resources = new Set(meshes.flatMap(mesh => [mesh.geometry, ...(Array.isArray(mesh.material) ? mesh.material : [mesh.material])]))
    const counts = new Map<object, number>()
    resources.forEach(resource => {
      counts.set(resource, 0)
      resource.addEventListener('dispose', () => counts.set(resource, counts.get(resource)! + 1))
    })
    signature.dispose()
    signature.dispose()
    expect(Array.from(counts.values()).every(count => count === 1)).toBe(true)
    expect(signature.object.children).toHaveLength(0)
    expect(() => signature.setUnfold(0.5)).not.toThrow()
  })
})
