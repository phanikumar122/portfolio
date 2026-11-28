import { useEffect, useRef } from 'react'

const segmentCount = 30

const ribbon = Array.from({ length: segmentCount + 1 }, (_, index) => {
  const progress = index / segmentCount
  const angle = progress * Math.PI * 2.4
  return [0.43, 1].map(radius => ({
    x: Math.cos(angle) * radius,
    y: (progress - 0.5) * 3.7,
    z: Math.sin(angle) * radius,
  }))
})

export function ScrollBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (typeof CanvasRenderingContext2D === 'undefined') return
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return

    const ink = getComputedStyle(canvas).getPropertyValue('--black').trim()
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let width = 0
    let height = 0

    const draw = () => {
      frame = 0
      const scrollRange = document.documentElement.scrollHeight - window.innerHeight
      const progress = reducedMotion.matches || scrollRange <= 0
        ? 0
        : Math.min(1, Math.max(0, window.scrollY / scrollRange))
      const yaw = 0.65 + progress * Math.PI * 2
      const cosYaw = Math.cos(yaw)
      const sinYaw = Math.sin(yaw)
      const narrow = width <= 680
      const scale = Math.min(width * (narrow ? 0.23 : 0.27), height * 0.24, 220)
      const centerX = width * (narrow ? 1.12 : 0.89)
      const centerY = height * (narrow ? 0.59 : 0.48)
      const opacity = narrow ? 0.72 : 1
      const projected = ribbon.map(edge => edge.map(point => {
        const x = point.x * cosYaw - point.z * sinYaw
        const depth = point.x * sinYaw + point.z * cosYaw
        const perspective = 5 / (5 - depth)
        return {
          x: centerX + (x + point.y * 0.43) * scale * perspective,
          y: centerY + (point.y - depth * 0.25) * scale * perspective,
          depth,
        }
      }))

      const faces = projected.slice(0, -1).flatMap(([inner, outer], index) => {
        const [nextInner, nextOuter] = projected[index + 1]
        return [[inner, outer, nextOuter], [inner, nextOuter, nextInner]].map((points, side) => ({
          points,
          side,
          depth: points.reduce((total, point) => total + point.depth, 0) / points.length,
        }))
      }).sort((first, second) => first.depth - second.depth)

      context.clearRect(0, 0, width, height)
      context.lineWidth = 0.75
      context.strokeStyle = ink
      context.fillStyle = ink
      for (const { points, side, depth } of faces) {
        context.beginPath()
        context.moveTo(points[0].x, points[0].y)
        context.lineTo(points[1].x, points[1].y)
        context.lineTo(points[2].x, points[2].y)
        context.closePath()
        context.globalAlpha = opacity * (0.045 + side * 0.025 + (depth + 1) * 0.025)
        context.fill()
        context.globalAlpha = opacity * 0.12
        context.stroke()
      }
    }

    const scheduleDraw = () => {
      if (!frame) frame = window.requestAnimationFrame(draw)
    }
    const handleScroll = () => {
      if (!reducedMotion.matches) scheduleDraw()
    }
    const resize = () => {
      width = canvas.clientWidth
      height = canvas.clientHeight
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * pixelRatio)
      canvas.height = Math.round(height * pixelRatio)
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      scheduleDraw()
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('scroll', handleScroll, { passive: true })
    reducedMotion.addEventListener('change', scheduleDraw)
    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', handleScroll)
      reducedMotion.removeEventListener('change', scheduleDraw)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  return <canvas ref={canvasRef} className="site-background" aria-hidden="true" />
}
