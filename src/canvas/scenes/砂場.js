export function draw(ctx, pw, ph, pixel) {
  // 公園の空（さらに引いた画角）
  ctx.fillStyle = '#9ec2de'
  ctx.fillRect(0, 0, pw * pixel, ph * pixel)

  let seed = 1234
  function random() {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }

  const horizonY = Math.floor(ph * 0.44)
  const groundTop = Math.floor(ph * 0.64)

  // 遠景の木立
  ctx.fillStyle = '#6e955c'
  ctx.fillRect(0, horizonY * pixel, pw * pixel, (groundTop - horizonY) * pixel)
  for (let i = 0; i < pw; i += 3) {
    const h = 8 + Math.floor(random() * 14)
    const y = groundTop - h - 8 - Math.floor(random() * 4)
    ctx.fillStyle = random() < 0.5 ? '#5f884d' : '#568146'
    ctx.fillRect(i * pixel, y * pixel, 2 * pixel, h * pixel)
  }

  // 芝生
  for (let y = groundTop; y < ph; y++) {
    const t = (y - groundTop) / Math.max(1, ph - groundTop)
    const r = Math.floor(88 - t * 24)
    const g = Math.floor(124 - t * 34)
    const b = Math.floor(60 - t * 18)
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
    ctx.fillRect(0, y * pixel, pw * pixel, pixel)
  }

  // 木（左寄り、幹+樹冠）
  const trunkX = Math.floor(pw * 0.2)
  const trunkW = Math.max(7, Math.floor(pw * 0.055))
  const trunkTop = Math.floor(ph * 0.36)
  const trunkBottom = Math.floor(ph * 0.74)
  for (let x = 0; x < trunkW; x++) {
    const t = x / Math.max(1, trunkW - 1)
    const r = Math.floor(114 - t * 24)
    const g = Math.floor(78 - t * 16)
    const b = Math.floor(45 - t * 11)
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
    ctx.fillRect((trunkX + x) * pixel, trunkTop * pixel, pixel, (trunkBottom - trunkTop) * pixel)
  }
  ctx.fillStyle = '#4f7f3f'
  for (let i = 0; i < 26; i++) {
    const cx = trunkX - Math.floor(pw * 0.07) + Math.floor(random() * (pw * 0.22))
    const cy = Math.floor(ph * 0.26) + Math.floor(random() * (ph * 0.2))
    const w = 6 + Math.floor(random() * 13)
    const h = 4 + Math.floor(random() * 9)
    ctx.fillRect(cx * pixel, cy * pixel, w * pixel, h * pixel)
  }

  // 砂場（公園内で小さく見えるサイズ）
  const boxX = Math.floor(pw * 0.5)
  const boxY = Math.floor(ph * 0.7)
  const boxW = Math.max(28, Math.floor(pw * 0.32))
  const boxH = Math.max(12, Math.floor(ph * 0.16))

  // 砂場の影
  ctx.fillStyle = 'rgba(30, 35, 20, 0.26)'
  ctx.fillRect((boxX + 2) * pixel, (boxY + boxH + 1) * pixel, boxW * pixel, 3 * pixel)

  // 枠（木製）
  ctx.fillStyle = '#a37a4d'
  ctx.fillRect(boxX * pixel, boxY * pixel, boxW * pixel, boxH * pixel)
  ctx.fillStyle = '#7c5936'
  ctx.fillRect(boxX * pixel, boxY * pixel, boxW * pixel, 2 * pixel)
  ctx.fillStyle = '#6e4f31'
  ctx.fillRect(boxX * pixel, (boxY + boxH - 2) * pixel, boxW * pixel, 2 * pixel)

  // 砂
  ctx.fillStyle = '#d9c182'
  ctx.fillRect((boxX + 2) * pixel, (boxY + 2) * pixel, (boxW - 4) * pixel, (boxH - 4) * pixel)
  for (let i = 0; i < 160; i++) {
    const sx = boxX + 2 + Math.floor(random() * Math.max(1, boxW - 4))
    const sy = boxY + 2 + Math.floor(random() * Math.max(1, boxH - 4))
    ctx.fillStyle = random() < 0.5 ? '#c9ae72' : '#e4cf95'
    ctx.fillRect(sx * pixel, sy * pixel, pixel, pixel)
  }

  // 芝の粒感
  for (let i = 0; i < 220; i++) {
    const gx = Math.floor(random() * pw)
    const gy = groundTop + Math.floor(random() * Math.max(1, ph - groundTop))
    const tone = random()
    if (tone < 0.5) ctx.fillStyle = '#4d7f3b'
    else if (tone < 0.85) ctx.fillStyle = '#5b8c45'
    else ctx.fillStyle = '#3f6f31'
    ctx.fillRect(gx * pixel, gy * pixel, pixel, pixel)
  }
}
