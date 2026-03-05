export function draw(ctx, pw, ph, pixel) {
  // 空
  ctx.fillStyle = '#87CEEB'
  ctx.fillRect(0, 0, pw * pixel, ph * pixel)

  let seed = 123
  function random() {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }

  // 遠景の山や木
  ctx.fillStyle = '#3CB371'
  ctx.beginPath()
  ctx.arc(pw * 0.2 * pixel, ph * 0.6 * pixel, pw * 0.4 * pixel, 0, Math.PI * 2)
  ctx.arc(pw * 0.8 * pixel, ph * 0.6 * pixel, pw * 0.5 * pixel, 0, Math.PI * 2)
  ctx.fill()

  // 地面 (土と草)
  ctx.fillStyle = '#8B4513'
  ctx.fillRect(0, ph * 0.7 * pixel, pw * pixel, ph * 0.3 * pixel)
  ctx.fillStyle = '#228B22'
  ctx.fillRect(0, ph * 0.7 * pixel, pw * pixel, 4 * pixel)

  // 落ち葉の山
  const colors = ['#A0522D', '#D2691E', '#CD853F', '#8B4513']
  for (let i = 0; i < 150; i++) {
    const lx = random() * pw
    const ly = ph * 0.7 + random() * (ph * 0.25)
    ctx.fillStyle = colors[Math.floor(random() * colors.length)]
    ctx.fillRect(lx * pixel, ly * pixel, 4 * pixel, 2 * pixel)
  }
}
