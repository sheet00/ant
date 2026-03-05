export function draw(ctx, pw, ph, pixel) {
  // 宇宙背景
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, pw * pixel, ph * pixel)

  let seed = 1801
  function random() {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }

  // 星
  ctx.fillStyle = '#FFF'
  for(let i=0; i<50; i++) {
    ctx.fillRect(random() * pw * pixel, random() * ph * pixel, 1 * pixel, 1 * pixel)
  }

  // 太陽 (一部見える)
  ctx.fillStyle = '#FF4500'
  ctx.beginPath()
  ctx.arc(0, ph * 0.5 * pixel, 60 * pixel, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = '#FFA500'
  ctx.beginPath()
  ctx.arc(0, ph * 0.5 * pixel, 40 * pixel, 0, Math.PI * 2)
  ctx.fill()

  // 惑星たち
  const planets = [
    { r: 4, c: '#A0522D', d: 80 },  // 水星
    { r: 7, c: '#DEB887', d: 110 }, // 金星
    { r: 8, c: '#1E90FF', d: 150 }, // 地球
    { r: 6, c: '#FF0000', d: 190 }, // 火星
    { r: 15, c: '#D2B48C', d: 250 }, // 木星
    { r: 12, c: '#F4A460', d: 320 }  // 土星
  ]

  planets.forEach((p, i) => {
    const angle = (i * 0.5) + 0.2
    const px = Math.cos(angle) * p.d
    const py = ph * 0.5 + Math.sin(angle) * 40
    
    // 軌道 (薄く)
    ctx.strokeStyle = '#222'
    ctx.beginPath()
    ctx.arc(0, ph * 0.5 * pixel, p.d * pixel, 0, Math.PI * 2)
    ctx.stroke()

    ctx.fillStyle = p.c
    ctx.beginPath()
    ctx.arc(px * pixel, py * pixel, p.r * pixel, 0, Math.PI * 2)
    ctx.fill()

    // 土星の輪
    if(p.c === '#F4A460') {
      ctx.strokeStyle = '#DAA520'
      ctx.lineWidth = 2 * pixel
      ctx.beginPath()
      ctx.ellipse(px * pixel, py * pixel, (p.r + 8) * pixel, (p.r / 2) * pixel, Math.PI / 6, 0, Math.PI * 2)
      ctx.stroke()
    }
  })
}
