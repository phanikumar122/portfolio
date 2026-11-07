import { useCallback, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'
const STORAGE_KEY = 'portfolio-theme'

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    root.style.colorScheme = theme
    window.localStorage.setItem(STORAGE_KEY, theme)
    const metas = document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')
    metas.forEach((meta) => { meta.media = 'none' })
    const meta = metas[0] ?? document.createElement('meta')
    if (!meta.parentNode) {
      meta.name = 'theme-color'
      document.head.appendChild(meta)
    }
    meta.content = theme === 'dark' ? '#101614' : '#f4f2ec'
    meta.media = 'all'
  }, [theme])

  const toggle = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, toggle }
}
