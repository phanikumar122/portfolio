import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { SiteNav } from './SiteNav'
import { ResumeModal } from './ResumeModal'

describe('viewport overlays', () => {
  it('keeps the mobile drawer outside the sticky header and contains keyboard focus', async () => {
    const user = userEvent.setup()
    render(<SiteNav />)
    const toggle = screen.getByRole('button', { name: 'Open navigation menu' })
    await user.click(toggle)

    const navigation = screen.getByRole('navigation', { name: 'Mobile navigation' })
    expect(navigation.closest('header')).toBeNull()
    const intro = within(navigation).getByRole('link', { name: /^intro/i })
    expect(intro).toHaveFocus()
    await user.tab({ shift: true })
    expect(toggle).toHaveFocus()
    await user.tab()
    expect(intro).toHaveFocus()
    await user.keyboard('{Escape}')
    expect(toggle).toHaveFocus()
    expect(document.body).not.toHaveClass('menu-is-open')
  })

  it('renders the resume outside its caller', () => {
    const { container } = render(<ResumeModal isOpen onClose={() => undefined} resumeUrl="/resume.pdf" />)
    const dialog = screen.getByRole('dialog', { name: /resume/i })
    expect(container.contains(dialog)).toBe(false)
  })

  it('restores the resume trigger and background interaction after closing', async () => {
    const user = userEvent.setup()
    render(<><SiteNav /><main>Portfolio content</main></>)
    const trigger = screen.getByRole('button', { name: 'View Resume' })
    await user.click(trigger)
    const dialog = await screen.findByRole('dialog', { name: /resume/i })
    expect(dialog.closest('header')).toBeNull()
    expect(document.querySelector('main')?.closest('[inert]')).not.toBeNull()
    await user.keyboard('{Escape}')
    expect(trigger).toHaveFocus()
    expect(document.querySelector('main')?.closest('[inert]')).toBeNull()
    expect(document.body).not.toHaveClass('dialog-is-open')
  })

  it('preserves chosen resume focus during parent updates', () => {
    const { rerender } = render(<ResumeModal isOpen onClose={() => undefined} resumeUrl="/resume.pdf" />)
    const download = screen.getByRole('link', { name: 'Download resume PDF' })
    download.focus()
    rerender(<ResumeModal isOpen onClose={() => undefined} resumeUrl="/resume.pdf" />)
    expect(download).toHaveFocus()
  })

  it('offers a close control after the PDF viewer and keeps tab order inside the dialog', async () => {
    const user = userEvent.setup()
    render(<ResumeModal isOpen onClose={() => undefined} resumeUrl="/resume.pdf" />)
    const frame = screen.getByTitle('Resume of Vinnakota Phani Kumar')
    frame.focus()
    await user.tab()
    expect(screen.getByRole('button', { name: 'Close preview' })).toHaveFocus()
    await user.tab()
    expect(screen.getByRole('link', { name: 'Download resume PDF' })).toHaveFocus()
  })
})
