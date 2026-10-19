import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import App from './App'
import { portfolio } from './data/portfolio'

describe('portfolio experience', () => {
  it('renders every verified project with a case-study trigger', () => {
    render(<App />)

    expect(screen.getAllByRole('button', { name: /view .* case study/i })).toHaveLength(portfolio.projects.length)
    expect(screen.getByText('Vinnakota Phani Kumar')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /ideas into intelligent experiences/i })).toBeInTheDocument()
  })

  it('opens and closes an accessible project detail dialog', async () => {
    const user = userEvent.setup()
    render(<App />)

    const trigger = screen.getByRole('button', { name: 'View Mentora case study' })
    await user.click(trigger)

    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()
    expect(dialog.querySelector('#project-dialog-title')).toHaveTextContent('Mentora')

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
  })

  it('opens the mobile menu and closes it after selecting a section', async () => {
    const user = userEvent.setup()
    render(<App />)
    const menuButton = screen.getByRole('button', { name: 'Open navigation menu' })

    await user.click(menuButton)
    expect(menuButton).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('link', { name: /01 about/i })).toBeVisible()

    await user.click(screen.getByRole('link', { name: /01 about/i }))
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
  })

  it('copies the contact email and reports visible feedback', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(window.navigator, 'clipboard', { configurable: true, value: { writeText } })
    render(<App />)

    const copyButton = screen.getByRole('button', { name: /copy email/i })
    fireEvent.click(copyButton)

    expect(writeText).toHaveBeenCalledWith(portfolio.person.email)
    await waitFor(() => expect(screen.getByRole('button', { name: /copied to clipboard/i })).toBeInTheDocument())
  })
})
