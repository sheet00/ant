export function draw(ctx, pw, ph, pixel) {
  // 地図の背景 (海/境界)
  ctx.fillStyle = '#4682B4'
  ctx.fillRect(0, 0, pw * pixel, ph * pixel)

  let seed = 1301
  function random() {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }

  // 県の形 (多角形の簡略化)
  ctx.fillStyle = '#228B22'
  ctx.beginPath()
  ctx.moveTo(pw * 0.3 * pixel, ph * 0.2 * pixel)
  ctx.lineTo(pw * 0.7 * pixel, ph * 0.25 * pixel)
  ctx.lineTo(pw * 0.8 * pixel, ph * 0.5 * pixel)
  ctx.lineTo(pw * 0.6 * pixel, ph * 0.8 * pixel)
  ctx.lineTo(pw * 0.3 * pixel, ph * 0.7 * pixel)
  ctx.lineTo(pw * 0.2 * pixel, ph * 0.4 * pixel)
  ctx.closePath()
  ctx.fill()

  // 市町村の境界
  ctx.strokeStyle = '#FFFFFF'
  ctx.lineWidth = 1 * pixel
  ctx.beginPath()
  ctx.moveTo(pw * 0.5 * pixel, ph * 0.25 * pixel)
  ctx.lineTo(pw * 0.5 * pixel, ph * 0.75 * pixel)
  ctx.moveTo(pw * 0.25 * pixel, ph * 0.5 * pixel)
  ctx.lineTo(pw * 0.75 * pixel, ph * 0.5 * pixel)
  ctx.stroke()

  // 都市のドット
  ctx.fillStyle = '#FF0000'
  ctx.fillRect(pw * 0.5 * pixel, ph * 0.45 * pixel, 4 * pixel, 4 * pixel)
  
  ctx.fillStyle = '#FFFFFF'
  for(let i=0; i<8; i++) {
    const rx = pw * 0.3 + random() * (pw * 0.4)
    const ry = ph * 0.3 + random() * (ph * 0.4)
    ctx.fillRect(rx * pixel, ry * pixel, 2 * pixel, 2 * pixel)
  }
}
