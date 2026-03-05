export function draw(ctx, pw, ph, pixel) {
  // 空
  ctx.fillStyle = '#87CEEB'
  ctx.fillRect(0, 0, pw * pixel, ph * pixel)

  let seed = 789
  function random() {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }

  // 地面
  ctx.fillStyle = '#8B4513'
  ctx.fillRect(0, ph * 0.8 * pixel, pw * pixel, ph * 0.2 * pixel)

  // 奥の草むら
  ctx.fillStyle = '#2E8B57'
  for (let i = 0; i < pw; i += 2) {
    const gh = random() * 40 + 20
    ctx.fillRect(i * pixel, (ph * 0.8 - gh) * pixel, 3 * pixel, gh * pixel)
  }

  // 手前の草むら
  ctx.fillStyle = '#228B22'
  for (let i = 0; i < pw; i += 3) {
    const gh = random() * 30 + 15
    ctx.fillRect(i * pixel, (ph * 0.85 - gh) * pixel, 2 * pixel, gh * pixel)
  }
}
