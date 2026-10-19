import { useEffect, useState } from 'react'

function getInitialPreference() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(getInitialPreference)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(mediaQuery.matches)

    update()
    if (mediaQuery.addEventListener) mediaQuery.addEventListener('change', update)
    else mediaQuery.addListener(update)
    return () => {
      if (mediaQuery.removeEventListener) mediaQuery.removeEventListener('change', update)
      else mediaQuery.removeListener(update)
    }
  }, [])

  return reducedMotion
}
