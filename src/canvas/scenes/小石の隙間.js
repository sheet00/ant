export function draw(ctx, pw, ph, pixel) {
  // 空
  ctx.fillStyle = '#87CEEB'
  ctx.fillRect(0, 0, pw * pixel, ph * pixel)

  let seed = 456
  function random() {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }

  // 地面
  ctx.fillStyle = '#8B4513'
  ctx.fillRect(0, ph * 0.6 * pixel, pw * pixel, ph * 0.4 * pixel)

  // 小石を地面に散らばらせる
  for (let i = 0; i < 40; i++) {
    const rx = random() * pw
    const ry = ph * 0.6 + random() * (ph * 0.35)
    const rw = random() * 8 + 4
    const rh = random() * 4 + 3

    ctx.fillStyle = '#696969'
    ctx.beginPath()
    ctx.ellipse(rx * pixel, ry * pixel, rw * pixel, rh * pixel, 0, 0, Math.PI * 2)
    ctx.fill()
    
    // ハイライト
    ctx.fillStyle = '#A9A9A9'
    ctx.beginPath()
    ctx.ellipse((rx - rw * 0.1) * pixel, (ry - rh * 0.2) * pixel, rw * 0.5 * pixel, rh * 0.3 * pixel, 0, 0, Math.PI * 2)
    ctx.fill()
  }
}
