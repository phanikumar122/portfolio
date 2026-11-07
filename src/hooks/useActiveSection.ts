import { useEffect, useState } from 'react'

/**
 * Tracks which page section is currently in view so the nav can highlight it.
 * Sections are matched by the `href="#id"` values passed in.
 */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    if (!ids.length || typeof IntersectionObserver === 'undefined') return

    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        })
      },
      // Activate when a section crosses the upper-middle band of the viewport.
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [ids])

  return active
}
