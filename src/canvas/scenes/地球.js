export function draw(ctx, pw, ph, pixel) {
  // --- 深い宇宙の背景 ---
  ctx.fillStyle = '#000011' // 真っ黒より少し青みの深い宇宙
  ctx.fillRect(0, 0, pw * pixel, ph * pixel)

  let seed = 1919
  function random() {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }

  // 遠くの星々
  for (let i = 0; i < 50; i++) {
    const rx = random() * pw
    const ry = random() * ph
    const size = random() > 0.9 ? 2 : 1
    ctx.fillStyle = random() > 0.8 ? '#FFFFAA' : '#FFFFFF'
    ctx.fillRect(Math.floor(rx) * pixel, Math.floor(ry) * pixel, size * pixel, size * pixel)
  }

  // --- 地球の描画 ---
  const cx = pw / 2
  const cy = ph / 2
  const r = Math.min(pw, ph) * 0.35

  // 1. 大気のハロー (外側の淡い青)
  ctx.fillStyle = 'rgba(30, 144, 255, 0.3)'
  ctx.beginPath()
  ctx.arc(cx * pixel, cy * pixel, (r + 4) * pixel, 0, Math.PI * 2)
  ctx.fill()

  // 2. 海のベース (深い青)
  ctx.fillStyle = '#000080'
  ctx.beginPath()
  ctx.arc(cx * pixel, cy * pixel, r * pixel, 0, Math.PI * 2)
  ctx.fill()

  // 3. 海の明るい部分 (光の当たる右側)
  ctx.fillStyle = '#0000CD'
  ctx.beginPath()
  ctx.arc((cx + r * 0.1) * pixel, (cy - r * 0.1) * pixel, r * 0.9 * pixel, 0, Math.PI * 2)
  ctx.fill()

  // 4. 大陸の描画 (ユーラシア、アフリカ、南北アメリカを象徴するシルエット)
  ctx.save()
  ctx.beginPath()
  ctx.arc(cx * pixel, cy * pixel, r * pixel, 0, Math.PI * 2)
  ctx.clip()

  function drawContinent(ox, oy, w, h, color) {
    ctx.fillStyle = color
    for (let i = 0; i < 20; i++) {
      const rx = (random() - 0.5) * w
      const ry = (random() - 0.5) * h
      const rw = random() * (w / 3) + 2
      const rh = random() * (h / 3) + 2
      ctx.fillRect((cx + ox + rx) * pixel, (cy + oy + ry) * pixel, rw * pixel, rh * pixel)
    }
  }

  // アフリカ・ヨーロッパ
  drawContinent(-r * 0.2, -r * 0.1, r * 0.6, r * 1.0, '#228B22')
  // アジア
  drawContinent(r * 0.3, -r * 0.3, r * 0.8, r * 0.7, '#006400')
  // オーストラリア
  drawContinent(r * 0.6, r * 0.4, r * 0.3, r * 0.2, '#228B22')
  // 南北アメリカ (端に少し)
  drawContinent(-r * 0.8, -r * 0.2, r * 0.4, r * 1.2, '#006400')

  // 5. 雲の描画 (白と薄いグレーで渦を巻くように)
  function drawCloud(ox, oy, w, h) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
    for (let i = 0; i < 15; i++) {
      const rx = (random() - 0.5) * w
      const ry = (random() - 0.5) * h
      const rw = random() * (w / 2) + 4
      ctx.fillRect((cx + ox + rx) * pixel, (cy + oy + ry) * pixel, rw * pixel, 2 * pixel)
    }
  }

  drawCloud(-r * 0.5, -r * 0.4, r * 1.0, r * 0.4)
  drawCloud(r * 0.2, r * 0.3, r * 0.8, r * 0.5)
  drawCloud(0, 0, r * 1.2, r * 0.2) // 赤道付近

  // 6. 地球の影 (左下側を暗くする)
  const grad = ctx.createRadialGradient(
    (cx + r * 0.4) * pixel, (cy - r * 0.4) * pixel, r * 0.2 * pixel,
    cx * pixel, cy * pixel, r * 1.2 * pixel
  )
  grad.addColorStop(0, 'rgba(0,0,0,0)')
  grad.addColorStop(0.7, 'rgba(0,0,0,0.5)')
  grad.addColorStop(1, 'rgba(0,0,0,0.8)')
  ctx.fillStyle = grad
  ctx.beginPath()
  ctx.arc(cx * pixel, cy * pixel, r * pixel, 0, Math.PI * 2)
  ctx.fill()

  ctx.restore()

  // --- 仕上げ: 地球の端の光 (大気の反射) ---
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'
  ctx.lineWidth = 1 * pixel
  ctx.beginPath()
  ctx.arc(cx * pixel, cy * pixel, r * pixel, -Math.PI * 0.5, 0)
  ctx.stroke()
}
