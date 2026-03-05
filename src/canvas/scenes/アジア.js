export function draw(ctx, pw, ph, pixel) {
  // 海
  ctx.fillStyle = '#00008B'
  ctx.fillRect(0, 0, pw * pixel, ph * pixel)

  let seed = 1501
  function random() {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }

  // アジア大陸の簡略化
  ctx.fillStyle = '#2E8B57'
  ctx.beginPath()
  ctx.moveTo(pw * 0.1 * pixel, ph * 0.1 * pixel)
  ctx.lineTo(pw * 0.9 * pixel, ph * 0.1 * pixel)
  ctx.lineTo(pw * 0.95 * pixel, ph * 0.4 * pixel)
  ctx.lineTo(pw * 0.8 * pixel, ph * 0.7 * pixel)
  ctx.lineTo(pw * 0.6 * pixel, ph * 0.9 * pixel)
  ctx.lineTo(pw * 0.4 * pixel, ph * 0.6 * pixel)
  ctx.lineTo(pw * 0.2 * pixel, ph * 0.5 * pixel)
  ctx.closePath()
  ctx.fill()

  // インド半島
  ctx.beginPath()
  ctx.moveTo(pw * 0.3 * pixel, ph * 0.6 * pixel)
  ctx.lineTo(pw * 0.4 * pixel, ph * 0.9 * pixel)
  ctx.lineTo(pw * 0.5 * pixel, ph * 0.6 * pixel)
  ctx.fill()

  // 島々 (東南アジア)
  for(let i=0; i<15; i++) {
    const sx = pw * 0.6 + random() * (pw * 0.3)
    const sy = ph * 0.6 + random() * (ph * 0.3)
    ctx.fillRect(sx * pixel, sy * pixel, 4 * pixel, 4 * pixel)
  }

  // 日本 (点として)
  ctx.fillStyle = '#32CD32'
  ctx.fillRect(pw * 0.85 * pixel, ph * 0.35 * pixel, 3 * pixel, 8 * pixel)
}
