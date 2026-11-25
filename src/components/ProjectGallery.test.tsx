import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { portfolio } from '../data/portfolio'
import { ProjectDialog } from './ProjectDialog'

const project = {
  ...portfolio.projects[0],
  images: [
    { src: '/first-screen.webp', alt: 'Academic sign-in page', caption: 'Public sign-in screen.' },
    { src: '/second-screen.webp', alt: 'Academic information page', caption: 'Public project information.' },
  ],
}

describe('project screenshot gallery', () => {
  it('navigates actual screenshots with named controls and stops at both ends', async () => {
    const user = userEvent.setup()
    render(<ProjectDialog project={project} onClose={vi.fn()} />)

    expect(screen.getByRole('img', { name: 'Academic sign-in page' })).toHaveAttribute('src', '/first-screen.webp')
    expect(screen.getByRole('button', { name: 'Previous screenshot' })).toBeDisabled()
    await user.click(screen.getByRole('button', { name: 'Next screenshot' }))
    expect(screen.getByRole('img', { name: 'Academic information page' })).toHaveAttribute('src', '/second-screen.webp')
    expect(screen.getByText('Public project information.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Next screenshot' })).toBeDisabled()
    await user.click(screen.getByRole('button', { name: 'Previous screenshot' }))
    expect(screen.getByRole('img', { name: 'Academic sign-in page' })).toBeInTheDocument()
  })

  it('supports arrow-key navigation while keeping gallery focus in place', () => {
    render(<ProjectDialog project={project} onClose={vi.fn()} />)
    const gallery = screen.getByRole('region', { name: 'Mentora screenshots' })
    gallery.focus()
    fireEvent.keyDown(gallery, { key: 'ArrowRight' })
    expect(within(gallery).getByRole('img', { name: 'Academic information page' })).toBeInTheDocument()
    expect(gallery).toHaveFocus()
    fireEvent.keyDown(gallery, { key: 'ArrowLeft' })
    expect(within(gallery).getByRole('img', { name: 'Academic sign-in page' })).toBeInTheDocument()
  })

  it('omits paging controls for a single screenshot', () => {
    render(<ProjectDialog project={{ ...project, images: [project.images[0]] }} onClose={vi.fn()} />)
    expect(screen.getByRole('img', { name: 'Academic sign-in page' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Next screenshot' })).not.toBeInTheDocument()
  })

  it('lets visitors recover when a screenshot fails to load', async () => {
    const user = userEvent.setup()
    render(<ProjectDialog project={project} onClose={vi.fn()} />)
    fireEvent.error(screen.getByRole('img', { name: 'Academic sign-in page' }))
    expect(screen.getByText(/screenshot could not be loaded/i)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Retry screenshot' }))
    expect(screen.getByRole('img', { name: 'Academic sign-in page' })).toBeInTheDocument()
  })

  it('does not advertise a code action when a public repository is unavailable', () => {
    const { github: _github, ...unavailableProject } = project
    render(<ProjectDialog project={unavailableProject} onClose={vi.fn()} />)
    expect(screen.queryByText('View code')).not.toBeInTheDocument()
  })
})
