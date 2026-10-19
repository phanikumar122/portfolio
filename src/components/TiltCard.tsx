import { motion, useMotionValue, useSpring } from 'motion/react'
import { useRef } from 'react'
import type { PointerEvent, PropsWithChildren } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface TiltCardProps extends PropsWithChildren {
  className?: string
}

/** Pointer-only 3D tilt that stays out of the document flow and resets smoothly. */
export function TiltCard({ children, className }: TiltCardProps) {
  const reducedMotion = useReducedMotion()
  const cardRef = useRef<HTMLDivElement>(null)
  const rotateX = useSpring(useMotionValue(0), { stiffness: 260, damping: 22, mass: 0.65 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 260, damping: 22, mass: 0.65 })

  const reset = () => {
    rotateX.set(0)
    rotateY.set(0)
    cardRef.current?.style.setProperty('--pointer-x', '50%')
    cardRef.current?.style.setProperty('--pointer-y', '50%')
  }

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || event.pointerType === 'touch') return

    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width
    const y = (event.clientY - bounds.top) / bounds.height

    cardRef.current?.style.setProperty('--pointer-x', `${x * 100}%`)
    cardRef.current?.style.setProperty('--pointer-y', `${y * 100}%`)
    rotateX.set((0.5 - y) * 7)
    rotateY.set((x - 0.5) * 7)
  }

  return (
    <motion.div
      ref={cardRef}
      className={className}
      style={reducedMotion ? undefined : { rotateX, rotateY, transformPerspective: 900 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
    >
      {children}
    </motion.div>
  )
}
