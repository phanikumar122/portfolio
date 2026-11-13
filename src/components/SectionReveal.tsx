import { motion } from 'motion/react'
import type { PropsWithChildren } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface SectionRevealProps extends PropsWithChildren {
  className?: string
  id?: string
  'aria-label'?: string
  'aria-labelledby'?: string
}

/** A quiet entrance that never changes a section's scroll position or depth. */
export function SectionReveal({ children, className, ...props }: SectionRevealProps) {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return <section className={className} {...props}>{children}</section>
  }

  return (
    <motion.section
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.section>
  )
}
