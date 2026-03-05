export function draw(ctx, pw, ph, pixel) {
  // 宇宙背景
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, pw * pixel, ph * pixel)

  let seed = 1701
  function random() {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }

  // 星
  ctx.fillStyle = '#FFF'
  for(let i=0; i<40; i++) {
    ctx.fillRect(random() * pw * pixel, random() * ph * pixel, 1 * pixel, 1 * pixel)
  }

  // 月 (円)
  const cx = pw * 0.5
  const cy = ph * 0.5
  const cr = 45

  ctx.fillStyle = '#C0C0C0'
  ctx.beginPath()
  ctx.arc(cx * pixel, cy * pixel, cr * pixel, 0, Math.PI * 2)
  ctx.fill()

  // クレーター (濃い灰色)
  ctx.fillStyle = '#A9A9A9'
  for(let i=0; i<12; i++) {
    const rx = cx + (random() - 0.5) * 70
    const ry = cy + (random() - 0.5) * 70
    const rs = random() * 10 + 3
    const dist = Math.sqrt((rx - cx)**2 + (ry - cy)**2)
    if(dist < cr - 5) {
      ctx.beginPath()
      ctx.arc(rx * pixel, ry * pixel, rs * pixel, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  // 小さな地球 (遠くに見える)
  ctx.fillStyle = '#1E90FF'
  ctx.beginPath()
  ctx.arc(pw * 0.8 * pixel, ph * 0.2 * pixel, 5 * pixel, 0, Math.PI * 2)
  ctx.fill()
}
