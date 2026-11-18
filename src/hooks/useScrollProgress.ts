import { useEffect } from 'react'
import { useMotionValue } from 'motion/react'

export function useScrollProgress() {
  const progress = useMotionValue(0)

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      progress.set(scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [progress])

  return progress
}
