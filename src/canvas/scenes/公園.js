export function draw(ctx, pw, ph, pixel) {
  // --- 空と雲 ---
  ctx.fillStyle = '#87CEEB' // スカイブルー
  ctx.fillRect(0, 0, pw * pixel, ph * pixel)

  let seed = 8888
  function random() {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }

  // ドット絵の雲
  ctx.fillStyle = '#FFFFFF'
  const clouds = [{x: 10, y: 10, w: 20}, {x: 50, y: 15, w: 25}, {x: 80, y: 8, w: 18}]
  clouds.forEach(c => {
    const cx = pw * (c.x / 100)
    const cy = ph * (c.y / 100)
    ctx.fillRect(cx * pixel, cy * pixel, c.w * pixel, 5 * pixel)
    ctx.fillRect((cx + 4) * pixel, (cy - 3) * pixel, (c.w - 8) * pixel, 3 * pixel)
  })

  // --- 遠景: 森のシルエット ---
  ctx.fillStyle = '#228B22'
  ctx.beginPath()
  for (let i = 0; i <= pw; i += 10) {
    const h = 15 + random() * 10
    ctx.lineTo(i * pixel, (ph * 0.7 - h) * pixel)
    ctx.lineTo((i + 10) * pixel, (ph * 0.7 - h) * pixel)
  }
  ctx.lineTo(pw * pixel, ph * 0.7 * pixel)
  ctx.lineTo(0, ph * 0.7 * pixel)
  ctx.fill()

  // --- 地面: 芝生と遊歩道 ---
  ctx.fillStyle = '#32CD32' // 芝生
  ctx.fillRect(0, ph * 0.7 * pixel, pw * pixel, ph * 0.3 * pixel)
  
  ctx.fillStyle = '#D2B48C' // 遊歩道 (砂利道)
  ctx.fillRect(0, ph * 0.85 * pixel, pw * pixel, ph * 0.15 * pixel)

  // --- 象徴的なオブジェクト ---

  // 1. 公園の時計塔
  const clockX = pw * 0.2
  const clockY = ph * 0.7
  ctx.fillStyle = '#555555' // 柱
  ctx.fillRect(clockX * pixel, (clockY - 40) * pixel, 3 * pixel, 40 * pixel)
  ctx.fillStyle = '#333333' // 時計の枠
  ctx.fillRect((clockX - 4) * pixel, (clockY - 50) * pixel, 11 * pixel, 11 * pixel)
  ctx.fillStyle = '#FFFFFF' // 文字盤
  ctx.fillRect((clockX - 2) * pixel, (clockY - 48) * pixel, 7 * pixel, 7 * pixel)
  ctx.fillStyle = '#000000' // 針
  ctx.fillRect((clockX + 1) * pixel, (clockY - 46) * pixel, 1 * pixel, 3 * pixel)

  // 2. 公園のベンチ
  const benchX = pw * 0.6
  const benchY = ph * 0.78
  ctx.fillStyle = '#444444' // 脚
  ctx.fillRect(benchX * pixel, benchY * pixel, 2 * pixel, 5 * pixel)
  ctx.fillRect((benchX + 20) * pixel, benchY * pixel, 2 * pixel, 5 * pixel)
  ctx.fillStyle = '#A0522D' // 座面
  ctx.fillRect((benchX - 2) * pixel, (benchY - 2) * pixel, 26 * pixel, 3 * pixel)
  ctx.fillRect((benchX - 2) * pixel, (benchY - 8) * pixel, 26 * pixel, 3 * pixel) // 背もたれ

  // 3. 樹木 (より丁寧なドット絵)
  function drawDetailedTree(x, y, h) {
    ctx.fillStyle = '#8B4513' // 幹
    ctx.fillRect(x * pixel, (y - h) * pixel, 6 * pixel, h * pixel)
    ctx.fillStyle = '#006400' // 葉 (階層化)
    ctx.fillRect((x - 12) * pixel, (y - h - 10) * pixel, 30 * pixel, 8 * pixel)
    ctx.fillRect((x - 8) * pixel, (y - h - 18) * pixel, 22 * pixel, 8 * pixel)
    ctx.fillRect((x - 4) * pixel, (y - h - 24) * pixel, 14 * pixel, 6 * pixel)
  }
  drawDetailedTree(pw * 0.8, ph * 0.7, 15)
  drawDetailedTree(pw * 0.4, ph * 0.7, 12)

  // --- 仕上げ: 小さな花と草 ---
  const flowers = ['#FF0000', '#FFFF00', '#FFFFFF']
  for(let i=0; i<30; i++) {
    const fx = random() * pw
    const fy = ph * 0.7 + random() * (ph * 0.15)
    ctx.fillStyle = flowers[Math.floor(random() * flowers.length)]
    ctx.fillRect(fx * pixel, fy * pixel, pixel, pixel)
  }
}
