export function draw(ctx, pw, ph, pixel) {
  // 空
  ctx.fillStyle = '#87CEEB'
  ctx.fillRect(0, 0, pw * pixel, ph * pixel)

  let seed = 401
  function random() {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }

  // 地面
  ctx.fillStyle = '#228B22'
  ctx.fillRect(0, ph * 0.7 * pixel, pw * pixel, ph * 0.3 * pixel)

  // ブランコのフレーム
  ctx.strokeStyle = '#444'
  ctx.lineWidth = 4 * pixel
  ctx.beginPath()
  ctx.moveTo(pw * 0.1 * pixel, ph * 0.8 * pixel)
  ctx.lineTo(pw * 0.3 * pixel, ph * 0.2 * pixel)
  ctx.lineTo(pw * 0.7 * pixel, ph * 0.2 * pixel)
  ctx.lineTo(pw * 0.9 * pixel, ph * 0.8 * pixel)
  ctx.stroke()

  // 補助柱
  ctx.beginPath()
  ctx.moveTo(pw * 0.5 * pixel, ph * 0.2 * pixel)
  ctx.lineTo(pw * 0.5 * pixel, ph * 0.1 * pixel)
  ctx.stroke()

  // 鎖 (左)
  ctx.lineWidth = 1 * pixel
  ctx.beginPath()
  ctx.moveTo(pw * 0.4 * pixel, ph * 0.2 * pixel)
  ctx.lineTo(pw * 0.4 * pixel, ph * 0.6 * pixel)
  ctx.moveTo(pw * 0.6 * pixel, ph * 0.2 * pixel)
  ctx.lineTo(pw * 0.6 * pixel, ph * 0.6 * pixel)
  ctx.stroke()

  // 座面
  ctx.fillStyle = '#A52A2A'
  ctx.fillRect(pw * 0.35 * pixel, ph * 0.6 * pixel, pw * 0.3 * pixel, 4 * pixel)
}
