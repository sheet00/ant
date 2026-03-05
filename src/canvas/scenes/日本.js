export function draw(ctx, pw, ph, pixel) {
  // 海
  ctx.fillStyle = '#000080'
  ctx.fillRect(0, 0, pw * pixel, ph * pixel)

  let seed = 1401
  function random() {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }

  // 日本列島 (8ビット風のブロック)
  ctx.fillStyle = '#32CD32'
  
  // 北海道
  ctx.fillRect(pw * 0.7 * pixel, ph * 0.1 * pixel, 15 * pixel, 12 * pixel)
  // 本州
  ctx.beginPath()
  ctx.moveTo(pw * 0.7 * pixel, ph * 0.25 * pixel)
  ctx.lineTo(pw * 0.4 * pixel, ph * 0.6 * pixel)
  ctx.lineTo(pw * 0.35 * pixel, ph * 0.7 * pixel)
  ctx.lineTo(pw * 0.5 * pixel, ph * 0.5 * pixel)
  ctx.closePath()
  ctx.fill()
  
  // 四国
  ctx.fillRect(pw * 0.35 * pixel, ph * 0.65 * pixel, 8 * pixel, 4 * pixel)
  // 九州
  ctx.fillRect(pw * 0.25 * pixel, ph * 0.7 * pixel, 10 * pixel, 12 * pixel)

  // 主要都市
  ctx.fillStyle = '#FF4500'
  ctx.fillRect(pw * 0.6 * pixel, ph * 0.4 * pixel, 2 * pixel, 2 * pixel) // 東京
  ctx.fillRect(pw * 0.5 * pixel, ph * 0.5 * pixel, 2 * pixel, 2 * pixel) // 大阪
  ctx.fillRect(pw * 0.75 * pixel, ph * 0.15 * pixel, 2 * pixel, 2 * pixel) // 札幌
  ctx.fillRect(pw * 0.28 * pixel, ph * 0.75 * pixel, 2 * pixel, 2 * pixel) // 福岡
}
