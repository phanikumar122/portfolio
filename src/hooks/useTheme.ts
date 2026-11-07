import { useEffect } from 'react'

export function useTheme() {
  useEffect(() => {
    const root = document.documentElement
    root.classList.add('dark')
    root.style.colorScheme = 'dark'
    try {
      window.localStorage.setItem('portfolio-theme', 'dark')
    } catch {}
    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
    if (meta) {
      meta.content = '#252627'
    }
  }, [])

  return { theme: 'dark' as const }
}
