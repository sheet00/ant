export function draw(ctx, pw, ph, pixel) {
  // 林内の空気（さらに引いた画角）
  ctx.fillStyle = '#8aa276'
  ctx.fillRect(0, 0, pw * pixel, ph * pixel)

  let seed = 101
  function random() {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }

  const horizonY = Math.floor(ph * 0.42)
  const groundTop = Math.floor(ph * 0.66)

  // 背景の林帯
  ctx.fillStyle = '#6f8a54'
  ctx.fillRect(0, horizonY * pixel, pw * pixel, (groundTop - horizonY) * pixel)

  // 地面
  for (let y = groundTop; y < ph; y++) {
    const t = (y - groundTop) / Math.max(1, ph - groundTop)
    const r = Math.floor(108 - t * 20)
    const g = Math.floor(84 - t * 19)
    const b = Math.floor(48 - t * 14)
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
    ctx.fillRect(0, y * pixel, pw * pixel, pixel)
  }

  // 幹（画面上から太く入る）
  const trunkCx = Math.floor(pw * 0.5)
  const trunkW = Math.max(18, Math.floor(pw * 0.18))
  const trunkTop = -Math.floor(ph * 0.08)
  const trunkBottom = Math.floor(ph * 0.73)

  for (let x = -Math.floor(trunkW / 2); x <= Math.floor(trunkW / 2); x++) {
    const t = Math.abs(x) / Math.max(1, trunkW / 2)
    const r = Math.floor(121 - t * 32)
    const g = Math.floor(78 - t * 24)
    const b = Math.floor(44 - t * 16)
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
    ctx.fillRect((trunkCx + x) * pixel, trunkTop * pixel, pixel, (trunkBottom - trunkTop) * pixel)
  }

  // 樹皮の縦筋
  for (let i = 0; i < 22; i++) {
    const x = trunkCx - Math.floor(trunkW / 2) + Math.floor(random() * trunkW)
    const y = trunkTop + Math.floor(random() * (trunkBottom - trunkTop - 12))
    const h = 8 + Math.floor(random() * 18)
    ctx.fillStyle = random() < 0.5 ? '#7a4d2c' : '#5c381f'
    ctx.fillRect(x * pixel, y * pixel, pixel, h * pixel)
  }

  // 根張り（左）
  const rootBaseY = Math.floor(ph * 0.7)
  for (let i = 0; i < 3; i++) {
    const len = Math.floor(pw * (0.16 + i * 0.04))
    const startX = trunkCx - Math.floor(trunkW * (0.28 - i * 0.06))
    const startY = rootBaseY - i * 2
    const rise = 0.18 + i * 0.03
    for (let dx = 0; dx < len; dx++) {
      const x = startX - dx
      const y = startY + Math.floor(dx * rise)
      const thick = Math.max(1, 4 - i - Math.floor(dx / Math.max(1, len / 4)))
      ctx.fillStyle = i === 0 ? '#7b4e2c' : '#6b4326'
      ctx.fillRect(x * pixel, y * pixel, pixel, thick * pixel)
    }
  }

  // 根張り（右）
  for (let i = 0; i < 3; i++) {
    const len = Math.floor(pw * (0.17 + i * 0.045))
    const startX = trunkCx + Math.floor(trunkW * (0.28 - i * 0.05))
    const startY = rootBaseY - i * 2
    const rise = 0.17 + i * 0.03
    for (let dx = 0; dx < len; dx++) {
      const x = startX + dx
      const y = startY + Math.floor(dx * rise)
      const thick = Math.max(1, 4 - i - Math.floor(dx / Math.max(1, len / 4)))
      ctx.fillStyle = i === 0 ? '#7b4e2c' : '#6b4326'
      ctx.fillRect(x * pixel, y * pixel, pixel, thick * pixel)
    }
  }

  // 奥の草
  for (let i = 0; i < pw; i += 2) {
    const h = 6 + Math.floor(random() * 8)
    const y = groundTop - h - Math.floor(random() * 5)
    ctx.fillStyle = '#4d7538'
    ctx.fillRect(i * pixel, y * pixel, pixel, h * pixel)
  }

  // 中景の草（根元周辺）
  for (let i = 0; i < pw; i += 2) {
    const h = 9 + Math.floor(random() * 11)
    const y = ph - h - 6 - Math.floor(random() * 3)
    const tone = random()
    if (tone < 0.4) ctx.fillStyle = '#3d682f'
    else if (tone < 0.75) ctx.fillStyle = '#487637'
    else ctx.fillStyle = '#558543'
    ctx.fillRect(i * pixel, y * pixel, pixel, h * pixel)
    if (random() < 0.2) {
      ctx.fillRect((i + 1) * pixel, (y + 3) * pixel, pixel, Math.floor(h * 0.45) * pixel)
    }
  }

  // 手前の草（画角を引いたときの前景）
  for (let i = 0; i < pw; i += 2) {
    const h = 12 + Math.floor(random() * 13)
    const y = ph - h - Math.floor(random() * 2)
    const tone = random()
    if (tone < 0.45) ctx.fillStyle = '#2f5d2a'
    else if (tone < 0.8) ctx.fillStyle = '#3a6d31'
    else ctx.fillStyle = '#467a39'
    ctx.fillRect(i * pixel, y * pixel, pixel, h * pixel)
  }
}
