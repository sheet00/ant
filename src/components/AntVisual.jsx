import { useRef, useEffect } from 'react'
import { getScene } from '../canvas/scenes'

export default function AntVisual({ game }) {
  const canvasRef = useRef(null)
  const { current } = game.getMilestoneInfo()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const draw = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      canvas.width = w * devicePixelRatio
      canvas.height = h * devicePixelRatio

      const PIXEL = 3
      const scaledPixel = PIXEL * devicePixelRatio
      const pw = Math.floor(w / PIXEL)
      const ph = Math.floor(h / PIXEL)

      ctx.imageSmoothingEnabled = false

      const sceneFn = getScene(current.name)
      sceneFn(ctx, pw, ph, scaledPixel)
    }

    draw()
    const ro = new ResizeObserver(draw)
    ro.observe(canvas)
    return () => ro.disconnect()
  }, [current.name])

  return (
    <div className="flex-1 flex items-center justify-center bg-stone-900">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ imageRendering: 'pixelated' }}
      />
    </div>
  )
}
