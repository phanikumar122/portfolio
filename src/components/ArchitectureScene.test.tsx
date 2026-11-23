import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ArchitectureScene } from './ArchitectureScene'

describe('interactive architecture scene', () => {
  it('lets keyboard and touch users separate layers and pause movement', () => {
    render(<ArchitectureScene />)
    fireEvent.click(screen.getByRole('button', { name: 'Explore layers' }))
    expect(screen.getByRole('button', { name: 'Bring together' })).toHaveAttribute('aria-pressed', 'true')
    fireEvent.click(screen.getByRole('button', { name: 'Pause scene animation' }))
    expect(screen.getByRole('button', { name: 'Play scene animation' })).toHaveAttribute('aria-pressed', 'true')
    fireEvent.click(screen.getByRole('button', { name: 'Bring together' }))
    expect(screen.getByRole('button', { name: 'Explore layers' })).toHaveAttribute('aria-pressed', 'false')
  })

  it('keeps exploration available with reduced motion', () => {
    const original = window.matchMedia
    window.matchMedia = vi.fn().mockReturnValue({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() })
    try {
      render(<ArchitectureScene />)
      expect(screen.getByRole('button', { name: 'Pause scene animation' })).toBeDisabled()
      fireEvent.click(screen.getByRole('button', { name: 'Explore layers' }))
      expect(screen.getByRole('button', { name: 'Bring together' })).toBeEnabled()
    } finally {
      window.matchMedia = original
    }
  })
})
