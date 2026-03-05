export function draw(ctx, pw, ph, pixel) {
  // 空
  ctx.fillStyle = '#87CEEB'
  ctx.fillRect(0, 0, pw * pixel, ph * pixel)

  let seed = 501
  function random() {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }

  // 地面
  ctx.fillStyle = '#DAA520'
  ctx.fillRect(0, ph * 0.8 * pixel, pw * pixel, ph * 0.2 * pixel)

  // 滑り台の階段 (左側)
  ctx.fillStyle = '#888'
  ctx.fillRect(pw * 0.1 * pixel, ph * 0.3 * pixel, 10 * pixel, ph * 0.5 * pixel)
  
  // 手すり
  ctx.fillStyle = '#444'
  ctx.fillRect(pw * 0.1 * pixel, ph * 0.25 * pixel, 12 * pixel, 4 * pixel)

  // 滑る部分 (斜め)
  ctx.fillStyle = '#FFD700'
  ctx.beginPath()
  ctx.moveTo(pw * 0.15 * pixel, ph * 0.3 * pixel)
  ctx.lineTo(pw * 0.8 * pixel, ph * 0.8 * pixel)
  ctx.lineTo(pw * 0.9 * pixel, ph * 0.8 * pixel)
  ctx.lineTo(pw * 0.25 * pixel, ph * 0.3 * pixel)
  ctx.fill()

  // 滑り台の支柱
  ctx.fillStyle = '#888'
  ctx.fillRect(pw * 0.7 * pixel, ph * 0.6 * pixel, 6 * pixel, ph * 0.2 * pixel)
}
