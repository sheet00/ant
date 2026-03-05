export function draw(ctx, pw, ph, pixel) {
  // 宇宙背景
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, pw * pixel, ph * pixel)

  let seed = 1601
  function random() {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }

  // 星
  ctx.fillStyle = '#FFF'
  for(let i=0; i<30; i++) {
    ctx.fillRect(random() * pw * pixel, random() * ph * pixel, 1 * pixel, 1 * pixel)
  }

  // 地球 (円)
  const cx = pw * 0.5
  const cy = ph * 0.5
  const cr = 40

  ctx.fillStyle = '#1E90FF'
  ctx.beginPath()
  ctx.arc(cx * pixel, cy * pixel, cr * pixel, 0, Math.PI * 2)
  ctx.fill()

  // 大陸 (緑の模様)
  ctx.fillStyle = '#32CD32'
  for(let i=0; i<10; i++) {
    const rx = cx + (random() - 0.5) * 60
    const ry = cy + (random() - 0.5) * 60
    const rs = random() * 15 + 5
    // 地球の円の中に制限
    const dist = Math.sqrt((rx - cx)**2 + (ry - cy)**2)
    if(dist < cr - 5) {
      ctx.fillRect(rx * pixel, ry * pixel, rs * pixel, rs * pixel)
    }
  }

  // 雲 (白)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
  for(let i=0; i<8; i++) {
    const rx = cx + (random() - 0.5) * 60
    const ry = cy + (random() - 0.5) * 60
    const rw = random() * 20 + 10
    const dist = Math.sqrt((rx - cx)**2 + (ry - cy)**2)
    if(dist < cr - 5) {
      ctx.fillRect(rx * pixel, ry * pixel, rw * pixel, 4 * pixel)
    }
  }
}
