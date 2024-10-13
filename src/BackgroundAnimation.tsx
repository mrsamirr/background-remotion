
import React, { useEffect, useRef } from 'react'

export default function Component() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createGradient = (t: number) => {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      
      // Use a softer color palette
      const hue1 = (t * 10) % 360
      const hue2 = (hue1 + 60) % 360
      
      gradient.addColorStop(0, `hsl(${hue1}, 70%, 80%)`)
      gradient.addColorStop(1, `hsl(${hue2}, 70%, 80%)`)
      
      return gradient
    }

    const animate = (t: number) => {
      const gradient = createGradient(t * 0.001)
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      animationFrameId = requestAnimationFrame(animate)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    animationFrameId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-10">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}