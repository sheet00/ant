export function draw(ctx, pw, ph, pixel) {
  // 空
  ctx.fillStyle = '#b9d8f0'
  ctx.fillRect(0, 0, pw * pixel, ph * pixel)

  // 地面
  ctx.fillStyle = '#c8a46a'
  ctx.fillRect(0, ph * 0.68 * pixel, pw * pixel, ph * 0.32 * pixel)

  // ベンチ下の影
  ctx.fillStyle = '#a27d48'
  ctx.fillRect(pw * 0.08 * pixel, ph * 0.68 * pixel, pw * 0.84 * pixel, ph * 0.14 * pixel)

  // 背もたれの下端
  ctx.fillStyle = '#6f4528'
  ctx.fillRect(pw * 0.18 * pixel, ph * 0.18 * pixel, pw * 0.64 * pixel, 5 * pixel)

  // 背もたれの支柱
  ctx.fillStyle = '#3f3f3f'
  ctx.fillRect(pw * 0.22 * pixel, ph * 0.23 * pixel, 4 * pixel, ph * 0.18 * pixel)
  ctx.fillRect(pw * 0.74 * pixel, ph * 0.23 * pixel, 4 * pixel, ph * 0.18 * pixel)

  // 座面の板
  ctx.fillStyle = '#7a4d2d'
  ctx.fillRect(pw * 0.12 * pixel, ph * 0.36 * pixel, pw * 0.76 * pixel, 5 * pixel)
  ctx.fillRect(pw * 0.12 * pixel, ph * 0.42 * pixel, pw * 0.76 * pixel, 5 * pixel)
  ctx.fillRect(pw * 0.12 * pixel, ph * 0.48 * pixel, pw * 0.76 * pixel, 5 * pixel)

  // 座面下の補強
  ctx.fillStyle = '#5c3820'
  ctx.fillRect(pw * 0.16 * pixel, ph * 0.54 * pixel, pw * 0.68 * pixel, 4 * pixel)

  // 前脚
  ctx.fillStyle = '#444444'
  ctx.fillRect(pw * 0.18 * pixel, ph * 0.52 * pixel, 6 * pixel, ph * 0.2 * pixel)
  ctx.fillRect(pw * 0.76 * pixel, ph * 0.52 * pixel, 6 * pixel, ph * 0.2 * pixel)

  // 奥脚
  ctx.fillStyle = '#5a5a5a'
  ctx.fillRect(pw * 0.28 * pixel, ph * 0.52 * pixel, 4 * pixel, ph * 0.16 * pixel)
  ctx.fillRect(pw * 0.68 * pixel, ph * 0.52 * pixel, 4 * pixel, ph * 0.16 * pixel)

  // 脚の根元の影
  ctx.fillStyle = '#7b5d34'
  ctx.fillRect(pw * 0.14 * pixel, ph * 0.72 * pixel, 16 * pixel, 4 * pixel)
  ctx.fillRect(pw * 0.74 * pixel, ph * 0.72 * pixel, 16 * pixel, 4 * pixel)

  // 日の当たる中央の地面
  ctx.fillStyle = '#d8b77b'
  ctx.fillRect(pw * 0.34 * pixel, ph * 0.82 * pixel, pw * 0.32 * pixel, 5 * pixel)
}
