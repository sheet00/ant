export function draw(ctx, pw, ph, pixel) {
  // 空
  ctx.fillStyle = '#87CEEB'
  ctx.fillRect(0, 0, pw * pixel, ph * pixel)

  let seed = 801
  function random() {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }

  // 遠くの山
  ctx.fillStyle = '#4682B4'
  ctx.beginPath()
  ctx.moveTo(0, ph * 0.7 * pixel)
  ctx.lineTo(pw * 0.3 * pixel, ph * 0.4 * pixel)
  ctx.lineTo(pw * 0.6 * pixel, ph * 0.7 * pixel)
  ctx.lineTo(pw * 0.8 * pixel, ph * 0.5 * pixel)
  ctx.lineTo(pw * 1.0 * pixel, ph * 0.7 * pixel)
  ctx.fill()

  // 地面 (芝生)
  ctx.fillStyle = '#32CD32'
  ctx.fillRect(0, ph * 0.7 * pixel, pw * pixel, ph * 0.3 * pixel)

  // 木々
  for(let i=0; i<5; i++) {
    const tx = random() * pw
    const th = random() * 20 + 10
    // 幹
    ctx.fillStyle = '#8B4513'
    ctx.fillRect((tx - 2) * pixel, (ph * 0.7 - th) * pixel, 4 * pixel, th * pixel)
    // 葉
    ctx.fillStyle = '#006400'
    ctx.fillRect((tx - 8) * pixel, (ph * 0.7 - th - 10) * pixel, 16 * pixel, 10 * pixel)
  }

  // 小さな花
  const colors = ['#FF0000', '#FFFF00', '#FFFFFF', '#FF69B4']
  for(let i=0; i<20; i++) {
    const fx = random() * pw
    const fy = ph * 0.75 + random() * (ph * 0.2)
    ctx.fillStyle = colors[Math.floor(random() * colors.length)]
    ctx.fillRect(fx * pixel, fy * pixel, 1 * pixel, 1 * pixel)
  }
}
