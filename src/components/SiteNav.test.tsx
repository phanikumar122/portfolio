import { act, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, expect, it } from 'vitest'
import { SiteNav } from './SiteNav'

const originalObserver = window.IntersectionObserver
afterEach(() => { window.IntersectionObserver = originalObserver })

it('marks Contact as current instead of leaving Certifications active', async () => {
  const notify = new Map<Element, () => void>()
  class Observer implements IntersectionObserver {
    root = null
    rootMargin = '0px'
    thresholds = [0]
    constructor(private callback: IntersectionObserverCallback) {}
    observe(target: Element) {
      notify.set(target, () => this.callback([{ target, isIntersecting: true, intersectionRatio: 1,
        time: 0, rootBounds: null, boundingClientRect: target.getBoundingClientRect(),
        intersectionRect: target.getBoundingClientRect() }], this))
    }
    unobserve(target: Element) { notify.delete(target) }
    disconnect() { notify.clear() }
    takeRecords() { return [] }
  }
  window.IntersectionObserver = Observer
  const user = userEvent.setup()
  render(<><SiteNav /><main>{['top', 'work', 'expertise', 'education', 'credentials', 'achievements', 'contact'].map(id => <section key={id} id={id} />)}</main></>)
  await user.click(screen.getByRole('button', { name: 'Open navigation menu' }))
  const navigation = screen.getByRole('navigation', { name: 'Mobile navigation' })
  act(() => notify.get(document.getElementById('credentials')!)?.())
  expect(within(navigation).getByRole('link', { name: 'Certifications' })).toHaveAttribute('aria-current', 'location')
  act(() => notify.get(document.getElementById('contact')!)?.())
  expect(within(navigation).getByRole('link', { name: 'Contact' })).toHaveAttribute('aria-current', 'location')
  expect(within(navigation).getByRole('link', { name: 'Certifications' })).not.toHaveAttribute('aria-current')
})

it('offers every section through the mobile menu using simple labels and working anchors', async () => {
  const user = userEvent.setup()
  render(<SiteNav />)
  await user.click(screen.getByRole('button', { name: 'Open navigation menu' }))
  const navigation = screen.getByRole('navigation', { name: 'Mobile navigation' })
  const destinations = [
    ['Intro', '#top'],
    ['Projects', '#work'],
    ['Skills', '#expertise'],
    ['Education', '#education'],
    ['Certifications', '#credentials'],
    ['Awards', '#achievements'],
    ['Contact', '#contact'],
  ] as const
  destinations.forEach(([label, href]) => {
    expect(within(navigation).getByRole('link', { name: label })).toHaveAttribute('href', href)
  })
})
