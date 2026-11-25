import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { portfolio } from '../data/portfolio'
import { Hero } from './Hero'

const person: typeof portfolio.person & { portraitUrl?: string } = portfolio.person
afterEach(() => { person.portraitUrl = '' })

describe('portrait presentation', () => {
  it('uses only a supplied portrait with a meaningful alternative', () => {
    person.portraitUrl = '/portrait.webp'
    render(<Hero />)
    expect(screen.getByRole('img', { name: 'Phani Kumar' })).toHaveAttribute('src', '/portrait.webp')
  })

  it('keeps the intro usable if the supplied portrait cannot load', () => {
    person.portraitUrl = '/missing-portrait.webp'
    render(<Hero />)
    fireEvent.error(screen.getByRole('img', { name: 'Phani Kumar' }))
    expect(screen.queryByRole('img', { name: 'Phani Kumar' })).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1, name: 'Phani Kumar' })).toBeVisible()
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '#work')
  })
})
