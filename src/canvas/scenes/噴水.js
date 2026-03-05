export function draw(ctx, pw, ph, pixel) {
  // 空
  ctx.fillStyle = '#87CEEB'
  ctx.fillRect(0, 0, pw * pixel, ph * pixel)

  let seed = 701
  function random() {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }

  // 地面
  ctx.fillStyle = '#A9A9A9'
  ctx.fillRect(0, ph * 0.8 * pixel, pw * pixel, ph * 0.2 * pixel)

  // 噴水の土台
  ctx.fillStyle = '#808080'
  ctx.fillRect(pw * 0.2 * pixel, ph * 0.75 * pixel, pw * 0.6 * pixel, 10 * pixel)
  ctx.fillRect(pw * 0.3 * pixel, ph * 0.7 * pixel, pw * 0.4 * pixel, 10 * pixel)

  // 噴水の中央
  ctx.fillStyle = '#707070'
  ctx.fillRect(pw * 0.45 * pixel, ph * 0.5 * pixel, pw * 0.1 * pixel, ph * 0.2 * pixel)

  // 水しぶき (8ビット風ドット)
  ctx.fillStyle = '#00FFFF'
  for(let i=0; i<40; i++) {
    const rx = (pw * 0.5) + (random() - 0.5) * 40
    const ry = (ph * 0.4) + (random() - 0.5) * 30
    ctx.fillRect(rx * pixel, ry * pixel, 2 * pixel, 2 * pixel)
  }

  // 水の線
  ctx.strokeStyle = '#00BFFF'
  ctx.lineWidth = 1 * pixel
  for(let i=0; i<8; i++) {
    const angle = (i / 8) * Math.PI * 2
    ctx.beginPath()
    ctx.moveTo(pw * 0.5 * pixel, ph * 0.5 * pixel)
    ctx.lineTo((pw * 0.5 + Math.cos(angle) * 20) * pixel, (ph * 0.5 - Math.sin(angle) * 15) * pixel)
    ctx.stroke()
  }
}
