import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import App from './App'
import { portfolio } from './data/portfolio'

describe('portfolio experience', () => {
  it('renders every verified project with a case-study trigger', () => {
    render(<App />)

    expect(screen.getAllByRole('button', { name: /view .* case study/i })).toHaveLength(portfolio.projects.length)
    expect(screen.getByText('Vinnakota Phani Kumar')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /systems with purpose.*software with impact/i })).toBeInTheDocument()
    portfolio.projects.filter((project) => !project.featured).forEach((project) => {
      expect(screen.getByRole('button', { name: `View ${project.title} details` })).toBeInTheDocument()
    })
  })

  it('gives every section a shared reveal surface and every project a 3D visual stage', () => {
    const { container } = render(<App />)

    expect(container.querySelectorAll('main > section')).toHaveLength(9)
    expect(container.querySelectorAll('.project-tilt')).toHaveLength(portfolio.projects.length)
    expect(container.querySelectorAll('.project-visual[aria-hidden="true"]')).toHaveLength(portfolio.projects.length)
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

  it('shows the portrait and switches the selected skills group', async () => {
    const user = userEvent.setup()
    render(<App />)

    const portrait = screen.getByRole('img', { name: 'Portrait of Vinnakota Phani Kumar' })
    expect(portrait).toBeInTheDocument()
    expect(portrait.getAttribute('src')).toMatch(/phani.*\.jpg|data:image|phani/i)
    const tabs = screen.getAllByRole('tab')
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true')
    expect(tabs[0]).toHaveAttribute('aria-controls', 'skill-panel-01')
    expect(tabs[0]).toHaveAttribute('tabindex', '0')
    expect(screen.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', 'skill-tab-01')

    await user.click(tabs[1])
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true')
    expect(tabs[0]).toHaveAttribute('tabindex', '-1')
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Data')
    expect(screen.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', 'skill-tab-02')

    await user.keyboard('{ArrowDown}')
    expect(tabs[2]).toHaveAttribute('aria-selected', 'true')
    expect(tabs[2]).toHaveFocus()
  })

  it('opens the mobile menu and closes it after selecting a section', async () => {
    const user = userEvent.setup()
    render(<App />)
    const menuButton = screen.getByRole('button', { name: 'Open navigation menu' })

    await user.click(menuButton)
    expect(menuButton).toHaveAttribute('aria-expanded', 'true')
    const mobileNavigation = screen.getByRole('navigation', { name: /mobile navigation/i })
    const mobileAboutLink = within(mobileNavigation).getByRole('link', { name: /^about$/i })
    expect(mobileAboutLink).toBeVisible()

    await user.click(mobileAboutLink)
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
  })

  it('copies the contact email and reports visible feedback', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(window.navigator, 'clipboard', { configurable: true, value: { writeText } })
    render(<App />)

    const copyButton = screen.getByRole('button', { name: /copy email/i })
    fireEvent.click(copyButton)

    expect(writeText).toHaveBeenCalledWith(portfolio.person.email)
    await waitFor(() => expect(screen.getByRole('button', { name: /^copied$/i })).toBeInTheDocument())
  })

  it('reports when copying is not available', async () => {
    const writeText = vi.fn().mockRejectedValue(new Error('Clipboard unavailable'))
    Object.defineProperty(window.navigator, 'clipboard', { configurable: true, value: { writeText } })
    render(<App />)

    const copyButton = screen.getByRole('button', { name: /copy email/i })
    fireEvent.click(copyButton)
    expect(writeText).toHaveBeenCalledWith(portfolio.person.email)

    await waitFor(() => expect(screen.getByRole('button', { name: /copy failed/i })).toBeInTheDocument())
  })

  it('provides identifiable section landmarks for navigation anchors', () => {
    const { container } = render(<App />)
    const expectedIds = ['top', 'about', 'expertise', 'work', 'philosophy', 'education', 'credentials', 'achievements', 'contact']
    expectedIds.forEach((id) => {
      expect(container.querySelector(`#${id}`)).not.toBeNull()
    })
  })

  it('enforces dark theme across the website', () => {
    render(<App />)
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('opens and closes the in-page resume preview modal', async () => {
    const user = userEvent.setup()
    render(<App />)

    const resumeBtn = screen.getByRole('button', { name: /^view resume$/i })
    await user.click(resumeBtn)

    const modal = screen.getByRole('dialog', { name: /resume \/ vinnakota phani kumar/i })
    expect(modal).toBeInTheDocument()

    const closeBtn = screen.getByRole('button', { name: /^close resume preview$/i })
    await user.click(closeBtn)
    expect(screen.queryByRole('dialog', { name: /resume \/ vinnakota phani kumar/i })).not.toBeInTheDocument()
  })

  it('renders the hero role presentation and social profile cards', () => {
    render(<App />)
    expect(screen.getByRole('link', { name: /connect on linkedin/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /follow on github/i })).toBeInTheDocument()
  })

  it('provides programmatic labels for every contact field', () => {
    render(<App />)
    expect(screen.getByRole('textbox', { name: /your name/i })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /your email/i })).toHaveAttribute('type', 'email')
    expect(screen.getByRole('textbox', { name: /^message$/i })).toBeInTheDocument()
  })

  it('uses the progressive global scene and gives every project equal card treatment', () => {
    const { container } = render(<App />)
    expect(container.querySelector('.global-scene canvas')).toBeInTheDocument()
    expect(container.querySelector('.hero-portrait img')).toHaveAccessibleName('Portrait of Vinnakota Phani Kumar')
    expect(container.querySelectorAll('.project-grid > .project-card')).toHaveLength(portfolio.projects.length)
    expect(container.querySelector('.archive-block')).not.toBeInTheDocument()
    expect(container.querySelectorAll('.status-pill, .status-dot, .tech-badge, .skill-tech-chip')).toHaveLength(0)
    expect(container.querySelector('.footer-marquee')).not.toBeInTheDocument()
  })
})
