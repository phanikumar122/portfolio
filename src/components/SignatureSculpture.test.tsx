import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { SignatureSculpture } from './SignatureSculpture'

const scene = vi.hoisted(() => ({
  setView: vi.fn(), setUnfold: vi.fn(), setMotion: vi.fn(), dispose: vi.fn(),
  create: vi.fn(),
}))
vi.mock('./signatureScene', () => ({ createSignatureScene: scene.create }))

beforeEach(() => {
  vi.clearAllMocks()
  scene.create.mockReturnValue(scene)
  vi.stubGlobal('WebGL2RenderingContext', class {})
})
afterEach(() => { vi.restoreAllMocks(); vi.unstubAllGlobals() })

function renderSculpture() {
  return render(<SignatureSculpture><span>PK fallback</span></SignatureSculpture>)
}

describe('interactive signature', () => {
  it('offers keyboard rotation, unfolding, pause, and reset controls', async () => {
    const user = userEvent.setup()
    renderSculpture()
    await act(async () => { await vi.dynamicImportSettled() })
    const unfold = await screen.findByRole('button', { name: 'Unfold signature' })
    await waitFor(() => expect(unfold).toBeEnabled())
    await user.click(screen.getByRole('button', { name: 'Rotate signature left' }))
    expect(scene.setView.mock.lastCall?.[0]).toBeLessThan(-0.24)
    await user.click(screen.getByRole('button', { name: 'Rotate signature right' }))
    await user.click(unfold)
    expect(scene.setUnfold).toHaveBeenLastCalledWith(1)
    expect(screen.getByRole('button', { name: 'Reform signature' })).toHaveAttribute('aria-pressed', 'true')
    await user.click(screen.getByRole('button', { name: 'Pause animation' }))
    expect(scene.setMotion).toHaveBeenLastCalledWith(false)

    const stage = screen.getByRole('group', { name: 'Interactive PK signature' })
    stage.focus()
    fireEvent.keyDown(stage, { key: 'ArrowRight' })
    expect(scene.setView).toHaveBeenLastCalledWith(expect.any(Number), expect.any(Number))
    const rotatedYaw = scene.setView.mock.lastCall?.[0]
    expect(rotatedYaw).toBeGreaterThan(-0.24)
    await user.click(screen.getByRole('button', { name: 'Reset sculpture' }))
    expect(scene.setView).toHaveBeenLastCalledWith(-0.24, -0.12)
    expect(scene.setUnfold).toHaveBeenLastCalledWith(0)
  })

  it('starts without ambient motion when reduced motion is requested', async () => {
    const original = window.matchMedia
    vi.spyOn(window, 'matchMedia').mockImplementation(query => ({ ...original(query), matches: query.includes('prefers-reduced-motion') }))
    renderSculpture()
    await act(async () => { await vi.dynamicImportSettled() })
    await waitFor(() => expect(scene.create).toHaveBeenCalled())
    expect(scene.create.mock.lastCall?.[3]).toEqual({ running: false, reducedMotion: true })
    expect(screen.getByRole('button', { name: 'Play animation' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'Play animation' })).toBeDisabled()
  })

  it('keeps the signature visible when WebGL initialization fails', async () => {
    scene.create.mockImplementation(() => { throw new Error('WebGL unavailable') })
    renderSculpture()
    await act(async () => { await vi.dynamicImportSettled() })
    await waitFor(() => expect(screen.getByText('Static signature')).toBeInTheDocument())
    expect(screen.getByText('PK fallback')).toBeVisible()
    expect(screen.queryByRole('button', { name: 'Unfold signature' })).not.toBeInTheDocument()
  })

  it('disposes an initialized scene when the sculpture unmounts', async () => {
    const { unmount } = renderSculpture()
    await act(async () => { await vi.dynamicImportSettled() })
    await waitFor(() => expect(scene.create).toHaveBeenCalled())
    unmount()
    expect(scene.dispose).toHaveBeenCalledTimes(1)
  })

  it('restores fallback after context loss without disposing twice', async () => {
    const { unmount } = renderSculpture()
    await act(async () => { await vi.dynamicImportSettled() })
    await waitFor(() => expect(scene.create).toHaveBeenCalled())
    const loseContext = scene.create.mock.lastCall?.[2] as () => void
    act(() => loseContext())
    expect(scene.dispose).toHaveBeenCalledTimes(1)
    expect(screen.getByText('PK fallback')).toBeVisible()
    expect(screen.getByText('Static signature')).toBeVisible()
    unmount()
    expect(scene.dispose).toHaveBeenCalledTimes(1)
  })
})
