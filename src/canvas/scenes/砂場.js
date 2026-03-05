export function draw(ctx, pw, ph, pixel) {
  // 空
  ctx.fillStyle = '#87CEEB'
  ctx.fillRect(0, 0, pw * pixel, ph * pixel)

  let seed = 1234
  function random() {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }

  // 遠景
  ctx.fillStyle = '#3CB371'
  ctx.fillRect(0, ph * 0.5 * pixel, pw * pixel, ph * 0.2 * pixel)

  // 砂場の外側の地面
  ctx.fillStyle = '#228B22'
  ctx.fillRect(0, ph * 0.7 * pixel, pw * pixel, ph * 0.3 * pixel)

  // 砂場の枠 (コンクリート風)
  const borderX = pw * 0.1
  const borderY = ph * 0.65
  const borderW = pw * 0.8
  const borderH = ph * 0.3
  ctx.fillStyle = '#AAAAAA'
  ctx.fillRect(borderX * pixel, borderY * pixel, borderW * pixel, borderH * pixel)

  // 砂 (内側)
  ctx.fillStyle = '#EEDC82'
  ctx.fillRect((borderX + 2) * pixel, (borderY + 2) * pixel, (borderW - 4) * pixel, (borderH - 4) * pixel)

  // 砂の山
  ctx.fillStyle = '#D2B48C'
  ctx.beginPath()
  ctx.moveTo(pw * 0.4 * pixel, borderY * pixel + 10 * pixel)
  ctx.lineTo(pw * 0.6 * pixel, borderY * pixel + 10 * pixel)
  ctx.lineTo(pw * 0.5 * pixel, borderY * pixel - 10 * pixel)
  ctx.fill()

  // スコップとバケツ (遊具)
  ctx.fillStyle = '#FF0000' // 赤いバケツ
  ctx.fillRect(pw * 0.3 * pixel, borderY * pixel + 15 * pixel, 8 * pixel, 10 * pixel)
  ctx.fillStyle = '#0000FF' // 青いスコップ
  ctx.fillRect(pw * 0.65 * pixel, borderY * pixel + 20 * pixel, 10 * pixel, 3 * pixel)
}
