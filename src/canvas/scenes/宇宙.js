export function draw(ctx, pw, ph, pixel) {
  // 背景: 真っ暗な宇宙
  ctx.fillStyle = '#000000'
  ctx.fillRect(0, 0, pw * pixel, ph * pixel)

  let seed = 5555
  function random() {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }

  // 遠くの銀河や星々
  for (let i = 0; i < 200; i++) {
    const rx = random() * pw
    const ry = random() * ph
    const size = random() > 0.95 ? 2 : 1
    ctx.fillStyle = random() > 0.7 ? '#FFFFFF' : '#AAAAFF'
    ctx.fillRect(Math.floor(rx) * pixel, Math.floor(ry) * pixel, size * pixel, size * pixel)
  }

  // 星雲のようなもや
  for (let i = 0; i < 10; i++) {
    const nx = random() * pw
    const ny = random() * ph
    const nr = random() * 40 + 20
    const grad = ctx.createRadialGradient(nx * pixel, ny * pixel, 0, nx * pixel, ny * pixel, nr * pixel)
    grad.addColorStop(0, 'rgba(100, 0, 150, 0.2)')
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)')
    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.arc(nx * pixel, ny * pixel, nr * pixel, 0, Math.PI * 2)
    ctx.fill()
  }
}
