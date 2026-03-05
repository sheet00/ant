export function draw(ctx, pw, ph, pixel) {
  // 空
  ctx.fillStyle = '#87CEEB'
  ctx.fillRect(0, 0, pw * pixel, ph * pixel)

  let seed = 1001
  function random() {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }

  // 地面 (道路)
  ctx.fillStyle = '#696969'
  ctx.fillRect(0, ph * 0.7 * pixel, pw * pixel, ph * 0.3 * pixel)
  ctx.fillStyle = '#FFF'
  for(let i=0; i<3; i++) {
    ctx.fillRect((pw * 0.1 + i * (pw * 0.4)) * pixel, ph * 0.85 * pixel, pw * 0.2 * pixel, 2 * pixel)
  }

  // 住宅 (左)
  ctx.fillStyle = '#FDF5E6'
  ctx.fillRect(pw * 0.05 * pixel, ph * 0.4 * pixel, pw * 0.2 * pixel, ph * 0.3 * pixel)
  ctx.fillStyle = '#CD5C5C'
  ctx.beginPath()
  ctx.moveTo(pw * 0.02 * pixel, ph * 0.4 * pixel)
  ctx.lineTo(pw * 0.15 * pixel, ph * 0.25 * pixel)
  ctx.lineTo(pw * 0.28 * pixel, ph * 0.4 * pixel)
  ctx.fill()

  // 住宅 (中)
  ctx.fillStyle = '#E6E6FA'
  ctx.fillRect(pw * 0.35 * pixel, ph * 0.35 * pixel, pw * 0.25 * pixel, ph * 0.35 * pixel)
  ctx.fillStyle = '#4682B4'
  ctx.beginPath()
  ctx.moveTo(pw * 0.32 * pixel, ph * 0.35 * pixel)
  ctx.lineTo(pw * 0.475 * pixel, ph * 0.2 * pixel)
  ctx.lineTo(pw * 0.63 * pixel, ph * 0.35 * pixel)
  ctx.fill()

  // 住宅 (右)
  ctx.fillStyle = '#FFF0F5'
  ctx.fillRect(pw * 0.7 * pixel, ph * 0.45 * pixel, pw * 0.2 * pixel, ph * 0.25 * pixel)
  ctx.fillStyle = '#8B4513'
  ctx.fillRect(pw * 0.68 * pixel, ph * 0.43 * pixel, pw * 0.24 * pixel, 8 * pixel)

  // 電柱
  ctx.fillStyle = '#333'
  ctx.fillRect(pw * 0.3 * pixel, ph * 0.1 * pixel, 4 * pixel, ph * 0.6 * pixel)
  ctx.fillRect(pw * 0.28 * pixel, ph * 0.15 * pixel, 12 * pixel, 2 * pixel)
}
