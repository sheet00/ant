export function draw(ctx, pw, ph, pixel) {
  // 背景: 深い宇宙
  ctx.fillStyle = '#000033'
  ctx.fillRect(0, 0, pw * pixel, ph * pixel)

  let seed = 9876
  function random() {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }

  // 星々
  for (let i = 0; i < 150; i++) {
    const rx = random() * pw
    const ry = random() * ph
    ctx.fillStyle = random() > 0.8 ? '#FFFF00' : '#FFFFFF'
    ctx.fillRect(Math.floor(rx) * pixel, Math.floor(ry) * pixel, pixel, pixel)
  }

  // 銀河の渦
  const cx = pw / 2
  const cy = ph / 2
  for (let i = 0; i < 400; i++) {
    const angle = i * 0.1
    const dist = i * 0.3
    const rx = cx + Math.cos(angle) * dist
    const ry = cy + Math.sin(angle) * dist
    ctx.fillStyle = `rgba(200, 200, 255, ${1 - i / 400})`
    ctx.fillRect(Math.floor(rx) * pixel, Math.floor(ry) * pixel, pixel * 2, pixel * 2)
  }
}
