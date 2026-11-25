import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, expect, it, vi } from 'vitest'
import { Contact } from './Contact'

afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals() })

it('protects the submitted message while direct delivery is pending', async () => {
  vi.stubEnv('VITE_FORMSPREE_ENDPOINT', 'https://example.invalid/portfolio-test')
  let finish: (response: { ok: boolean }) => void = () => {}
  const pending = new Promise<{ ok: boolean }>(resolve => { finish = resolve })
  vi.stubGlobal('fetch', vi.fn().mockReturnValue(pending))
  const user = userEvent.setup()
  render(<Contact />)
  await user.type(screen.getByRole('textbox', { name: 'Your name' }), 'A visitor')
  await user.type(screen.getByRole('textbox', { name: 'Your email' }), 'visitor@example.com')
  await user.type(screen.getByRole('textbox', { name: 'Message' }), 'A project question')
  await user.click(screen.getByRole('button', { name: /send message/i }))
  expect(screen.getByRole('textbox', { name: 'Message' })).toBeDisabled()
  expect(screen.getByRole('textbox', { name: 'Message' })).toHaveValue('A project question')
  expect(screen.getByRole('textbox', { name: 'Your name' })).toBeDisabled()
  expect(screen.getByRole('textbox', { name: 'Your email' })).toBeDisabled()
  await act(async () => { finish({ ok: true }); await pending })
  await waitFor(() => expect(screen.getByRole('textbox', { name: 'Message' })).not.toBeDisabled())
  expect(screen.getByRole('textbox', { name: 'Message' })).toHaveValue('')
  expect(screen.getByText(/Message sent/)).toHaveAttribute('role', 'status')
})
