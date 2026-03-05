export function draw(ctx, pw, ph, pixel) {
  // --- 海の背景 (深い宇宙から見た太平洋・インド洋) ---
  ctx.fillStyle = '#000033'
  ctx.fillRect(0, 0, pw * pixel, ph * pixel)

  let seed = 1818
  function random() {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }

  // 海の階層 (浅瀬の表現)
  ctx.fillStyle = '#000080'
  ctx.fillRect(0, 0, pw * pixel, ph * pixel)

  // 1. 大陸の基本シルエット (アジア大陸)
  // 中国・シベリア・東南アジア
  ctx.fillStyle = '#006400' // 深緑
  ctx.beginPath()
  ctx.moveTo(pw * 0.1 * pixel, 0)
  ctx.lineTo(pw * 0.9 * pixel, 0)
  ctx.lineTo(pw * 1.0 * pixel, ph * 0.4 * pixel) // 東の端
  ctx.lineTo(pw * 0.8 * pixel, ph * 0.7 * pixel) // 東南アジアへ
  ctx.lineTo(pw * 0.7 * pixel, ph * 0.8 * pixel)
  ctx.lineTo(pw * 0.4 * pixel, ph * 0.5 * pixel) // 中央
  ctx.lineTo(pw * 0.1 * pixel, ph * 0.4 * pixel)
  ctx.closePath()
  ctx.fill()

  // 2. インド半島
  ctx.fillStyle = '#228B22'
  ctx.beginPath()
  ctx.moveTo(pw * 0.3 * pixel, ph * 0.4 * pixel)
  ctx.lineTo(pw * 0.4 * pixel, ph * 0.8 * pixel)
  ctx.lineTo(pw * 0.5 * pixel, ph * 0.45 * pixel)
  ctx.fill()

  // 3. ヒマラヤ山脈 (茶色・白の冠雪)
  ctx.fillStyle = '#8B4513'
  ctx.fillRect(pw * 0.3 * pixel, ph * 0.3 * pixel, pw * 0.4 * pixel, 4 * pixel)
  ctx.fillStyle = '#FFFFFF'
  for(let i=0; i<10; i++) {
    const sx = pw * 0.35 + random() * (pw * 0.3)
    const sy = ph * 0.3 + (random() - 0.5) * 2
    ctx.fillRect(sx * pixel, sy * pixel, 3 * pixel, pixel)
  }

  // 4. 東南アジアの島々 (インドネシア、フィリピンなど)
  ctx.fillStyle = '#228B22'
  for(let i=0; i<30; i++) {
    const rx = pw * 0.6 + random() * (pw * 0.4)
    const ry = ph * 0.6 + random() * (ph * 0.4)
    const rw = random() * 10 + 4
    const rh = random() * 5 + 2
    ctx.fillRect(Math.floor(rx) * pixel, Math.floor(ry) * pixel, rw * pixel, rh * pixel)
  }

  // 5. 日本 (象徴的な弓なりの形)
  ctx.fillStyle = '#32CD32'
  const jx = pw * 0.88, jy = ph * 0.3
  ctx.fillRect(jx * pixel, jy * pixel, 2 * pixel, 8 * pixel) // 本州
  ctx.fillRect((jx + 2) * pixel, (jy - 4) * pixel, 2 * pixel, 3 * pixel) // 北海道
  ctx.fillRect((jx - 3) * pixel, (jy + 9) * pixel, 2 * pixel, 2 * pixel) // 九州

  // 6. 雲 (地球の丸みに沿って流れる)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'
  for(let i=0; i<12; i++) {
    const cx = random() * pw
    const cy = random() * ph
    const cw = random() * 30 + 10
    ctx.fillRect(cx * pixel, cy * pixel, cw * pixel, 2 * pixel)
  }

  // 7. 地球の縁の陰影 (丸みを出す)
  const grad = ctx.createRadialGradient(
    pw * 0.3 * pixel, ph * 0.3 * pixel, pw * 0.2 * pixel,
    pw * 0.5 * pixel, ph * 0.5 * pixel, pw * 1.0 * pixel
  )
  grad.addColorStop(0, 'rgba(0,0,0,0)')
  grad.addColorStop(1, 'rgba(0,0,0,0.6)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, pw * pixel, ph * pixel)

  // 浅瀬のハイライト (サンゴ礁)
  ctx.fillStyle = 'rgba(0, 255, 255, 0.1)'
  ctx.fillRect(pw * 0.7 * pixel, ph * 0.7 * pixel, pw * 0.3 * pixel, ph * 0.3 * pixel)
}
