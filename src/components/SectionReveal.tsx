import { motion, useScroll, useTransform } from 'motion/react'
import type { PropsWithChildren } from 'react'
import { useRef } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface SectionRevealProps extends PropsWithChildren {
  className?: string
  id?: string
  'aria-label'?: string
  'aria-labelledby'?: string
}

/** Shared section entrance — slightly more pronounced than Reveal for full section sweeps. */
export function SectionReveal({ children, className, ...props }: SectionRevealProps) {
  const reducedMotion = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.82, 1], [0.34, 1, 1, 0.48])
  const y = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [72, 0, 0, -42])
  const z = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [-90, 0, 0, -70])
  const scale = useTransform(scrollYProgress, [0, 0.16, 0.84, 1], [0.965, 1, 1, 0.98])

  if (reducedMotion) {
    return <section className={className} {...props}>{children}</section>
  }

  return (
    <motion.section
      ref={ref}
      className={className}
      style={{ opacity, y, z, scale, transformPerspective: 1200, transformOrigin: '50% 35%' }}
      {...props}
    >
      {children}
    </motion.section>
  )
}
