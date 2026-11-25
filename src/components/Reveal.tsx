import { motion } from 'motion/react'
import type { PropsWithChildren } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface RevealProps extends PropsWithChildren {
  className?: string
  delay?: number
  y?: number
}

export function Reveal({ children, className, delay = 0, y = 12 }: RevealProps) {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1, margin: '0px 0px 20px 0px' }}
      transition={{ duration: 0.45, delay: Math.min(delay, 0.12), ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
