import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import App from './App'
import { portfolio } from './data/portfolio'

describe('portfolio experience', () => {
  it('reveals a hidden project when the same skill proof link is used again', async () => {
    const user = userEvent.setup()
    const initialHash = window.location.hash
    Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', { configurable: true, value: vi.fn() })
    render(<App />)
    const work = screen.getByRole('region', { name: /^Projects$/i })
    const proof = screen.getByRole('link', { name: /^docviewer/i })
    try {
      await user.click(proof)
      await waitFor(() => expect(within(work).getByRole('heading', { name: /docviewer/i })).toBeInTheDocument())
      await user.click(screen.getByRole('button', { name: 'Show selected projects' }))
      await waitFor(() => expect(within(work).queryByRole('heading', { name: /docviewer/i })).not.toBeInTheDocument())
      await user.click(proof)
      await waitFor(() => expect(within(work).getByRole('heading', { name: /docviewer/i })).toBeInTheDocument())
    } finally {
      window.history.replaceState(null, '', initialHash || '/')
    }
  })
  it('leads with selected work and lets visitors reveal all projects', async () => {
    const user = userEvent.setup()
    render(<App />)
    const work = screen.getByRole('region', { name: /^Projects$/i })
    expect(within(work).getAllByRole('button', { name: /view .* case study/i })).toHaveLength(3)
    expect(screen.getByText('Vinnakota Phani Kumar')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1, name: 'Phani Kumar' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /show all 7 projects/i }))
    expect(within(work).getAllByRole('button', { name: /view .* case study/i })).toHaveLength(portfolio.projects.length)
    portfolio.projects.filter((project) => !project.featured).forEach((project) => {
      expect(screen.getByRole('button', { name: `View ${project.title} details` })).toBeInTheDocument()
    })
  })

  it('puts projects before skills and presents the requested section order', () => {
    const { container } = render(<App />)

    const sections = Array.from(container.querySelectorAll('main > section')).map(section => section.id)
    expect(sections).toEqual(['top', 'work', 'expertise', 'education', 'credentials', 'achievements', 'contact'])
  })

  it('opens and closes an accessible project detail dialog', async () => {
    const user = userEvent.setup()
    render(<App />)

    const trigger = screen.getByRole('button', { name: 'View Mentora case study' })
    await user.click(trigger)

    await act(async () => { await vi.dynamicImportSettled() })
    const dialog = await screen.findByRole('dialog')
    expect(dialog).toBeInTheDocument()
    expect(dialog.querySelector('#project-dialog-title')).toHaveTextContent('Mentora')

    await user.keyboard('{Escape}')
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    expect(trigger).toHaveFocus()
  })

  it('switches skill groups by pointer and keyboard with matching panel semantics', async () => {
    const user = userEvent.setup()
    render(<App />)

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
    const mobileIntroLink = within(mobileNavigation).getByRole('link', { name: /^Intro$/i })
    expect(mobileIntroLink).toBeVisible()

    await user.click(mobileIntroLink)
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
    const expectedIds = ['top', 'work', 'expertise', 'education', 'credentials', 'achievements', 'contact']
    expectedIds.forEach((id) => {
      expect(container.querySelector(`#${id}`)).not.toBeNull()
    })
  })

  it('uses the selected monochrome palette', () => {
    const { container } = render(<App />)
    expect(container.querySelector('.site-shell')).toHaveClass('theme-monochrome')
    expect(screen.queryByRole('button', { name: /switch to (light|dark) theme/i })).not.toBeInTheDocument()
  })

  it('opens and closes the in-page resume preview modal', async () => {
    const user = userEvent.setup()
    render(<App />)

    const resumeBtn = screen.getByRole('button', { name: /^view resume$/i })
    await user.click(resumeBtn)

    await act(async () => { await vi.dynamicImportSettled() })
    const modal = await screen.findByRole('dialog', { name: /resume.*vinnakota phani kumar/i })
    expect(modal).toBeInTheDocument()

    const closeBtn = screen.getByRole('button', { name: /^close resume preview$/i })
    await user.click(closeBtn)
    expect(screen.queryByRole('dialog', { name: /resume.*vinnakota phani kumar/i })).not.toBeInTheDocument()
  })

  it('identifies the developer and provides social profile links', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1, name: 'Phani Kumar' })).toBeInTheDocument()
    expect(screen.getByText(/^Full-stack developer\.?$/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /connect on linkedin/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /follow on github/i })).toBeInTheDocument()
  })

  it('provides programmatic labels for every contact field', () => {
    render(<App />)
    expect(screen.getByRole('textbox', { name: /your name/i })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /your email/i })).toHaveAttribute('type', 'email')
    expect(screen.getByRole('textbox', { name: /^message$/i })).toBeInTheDocument()
  })

  it('keeps the intro free of project selectors and an invented portrait', () => {
    const { container } = render(<App />)
    expect(screen.queryByRole('group', { name: 'Project previews' })).not.toBeInTheDocument()
    expect(screen.queryAllByRole('button', { name: /^Preview (GoodFind|Mentora|Public Transport)/i })).toHaveLength(0)
    expect(container.querySelector('.hero-portrait img')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: /show all 7 projects/i })).toHaveAttribute('aria-expanded', 'false')
  })

  it('uses theme-matching interface concepts for project covers', () => {
    render(<App />)
    const projects = screen.getByRole('region', { name: 'Projects' })
    const covers = within(projects).getAllByRole('button', { name: /view .* case study/i })
    covers.forEach(cover => {
      expect(cover.querySelector('img')).toBeNull()
      expect(cover.querySelector('svg.project-artwork')).not.toBeNull()
      expect(cover).toHaveTextContent('Interface concept')
    })
  })

  it('filters the project index and reports the visible total', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Data & AI' }))

    expect(screen.getByText('Showing 2 projects')).toHaveAttribute('role', 'status')
    const work = screen.getByRole('region', { name: /^Projects$/i })
    expect(within(work).getByRole('heading', { name: 'Public Transport Demand Prediction' })).toBeInTheDocument()
    expect(within(work).getByRole('heading', { name: 'Syllabus AI' })).toBeInTheDocument()
    await waitFor(() => expect(within(work).queryByRole('heading', { name: 'Mentora' })).not.toBeInTheDocument())
  })
})
