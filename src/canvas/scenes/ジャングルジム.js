export function draw(ctx, pw, ph, pixel) {
  // 空
  ctx.fillStyle = '#87CEEB'
  ctx.fillRect(0, 0, pw * pixel, ph * pixel)

  let seed = 9101
  function random() {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }

  // 地面
  ctx.fillStyle = '#228B22'
  ctx.fillRect(0, ph * 0.8 * pixel, pw * pixel, ph * 0.2 * pixel)

  // ジャングルジムの骨組み (格子状)
  const startX = pw * 0.2
  const startY = ph * 0.2
  const size = pw * 0.6
  const steps = 4
  const stepSize = size / steps

  // パイプの色 (カラフル)
  const colors = ['#FF0000', '#0000FF', '#FFFF00', '#FFFFFF']

  // 横棒
  for (let i = 0; i <= steps; i++) {
    ctx.fillStyle = colors[i % colors.length]
    ctx.fillRect(startX * pixel, (startY + i * stepSize) * pixel, size * pixel, 2 * pixel)
  }

  // 縦棒
  for (let i = 0; i <= steps; i++) {
    ctx.fillStyle = colors[(i + 1) % colors.length]
    ctx.fillRect((startX + i * stepSize) * pixel, startY * pixel, 2 * pixel, size * pixel)
  }

  // 奥行きの棒 (斜めに描画してそれっぽく見せる)
  ctx.strokeStyle = '#CCCCCC'
  ctx.lineWidth = 1 * pixel
  for (let i = 0; i <= steps; i++) {
    for (let j = 0; j <= steps; j++) {
      ctx.beginPath()
      ctx.moveTo((startX + i * stepSize) * pixel, (startY + j * stepSize) * pixel)
      ctx.lineTo((startX + i * stepSize + 10) * pixel, (startY + j * stepSize - 10) * pixel)
      ctx.stroke()
    }
  }
}
