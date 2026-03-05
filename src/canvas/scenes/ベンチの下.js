export function draw(ctx, pw, ph, pixel) {
  // 空
  ctx.fillStyle = '#87CEEB'
  ctx.fillRect(0, 0, pw * pixel, ph * pixel)

  let seed = 5678
  function random() {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }

  // 地面 (公園の広場)
  ctx.fillStyle = '#DEB887'
  ctx.fillRect(0, ph * 0.6 * pixel, pw * pixel, ph * 0.4 * pixel)

  // ベンチの影 (地面の上)
  ctx.fillStyle = 'rgba(0,0,0,0.3)'
  ctx.fillRect(pw * 0.2 * pixel, ph * 0.75 * pixel, pw * 0.6 * pixel, ph * 0.1 * pixel)

  // ベンチの脚 (4本)
  ctx.fillStyle = '#444444'
  ctx.fillRect(pw * 0.25 * pixel, ph * 0.4 * pixel, 4 * pixel, ph * 0.4 * pixel)
  ctx.fillRect(pw * 0.35 * pixel, ph * 0.4 * pixel, 4 * pixel, ph * 0.4 * pixel)
  ctx.fillRect(pw * 0.65 * pixel, ph * 0.4 * pixel, 4 * pixel, ph * 0.4 * pixel)
  ctx.fillRect(pw * 0.75 * pixel, ph * 0.4 * pixel, 4 * pixel, ph * 0.4 * pixel)

  // ベンチの座面 (木製)
  ctx.fillStyle = '#8B4513'
  ctx.fillRect(pw * 0.2 * pixel, ph * 0.4 * pixel, pw * 0.6 * pixel, 6 * pixel)
  
  // 背もたれ
  ctx.fillRect(pw * 0.2 * pixel, ph * 0.25 * pixel, pw * 0.6 * pixel, 6 * pixel)
  ctx.fillRect(pw * 0.25 * pixel, ph * 0.25 * pixel, 4 * pixel, ph * 0.15 * pixel)
  ctx.fillRect(pw * 0.75 * pixel, ph * 0.25 * pixel, 4 * pixel, ph * 0.15 * pixel)
}
