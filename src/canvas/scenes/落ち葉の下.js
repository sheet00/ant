export function draw(ctx, pw, ph, pixel) {
  // 林床の空気
  ctx.fillStyle = '#5a6a4a'
  ctx.fillRect(0, 0, pw * pixel, ph * pixel)

  let seed = 123
  function random() {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }

  const groundTop = Math.floor(ph * 0.68)

  // 地面のグラデーション
  for (let y = groundTop; y < ph; y++) {
    const t = (y - groundTop) / Math.max(1, ph - groundTop)
    const r = Math.floor(118 - t * 26)
    const g = Math.floor(86 - t * 24)
    const b = Math.floor(48 - t * 18)
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
    ctx.fillRect(0, y * pixel, pw * pixel, pixel)
  }

  // 地表の凹凸と土粒
  for (let i = 0; i < 280; i++) {
    const x = Math.floor(random() * pw)
    const y = groundTop + Math.floor(random() * Math.max(1, ph - groundTop))
    const roll = random()
    if (roll < 0.72) {
      ctx.fillStyle = '#765133'
      ctx.fillRect(x * pixel, y * pixel, pixel, pixel)
    } else if (roll < 0.9) {
      ctx.fillStyle = '#8d6848'
      ctx.fillRect(x * pixel, y * pixel, 2 * pixel, pixel)
    } else if (roll < 0.97) {
      ctx.fillStyle = '#9c8a73'
      ctx.fillRect(x * pixel, y * pixel, pixel, pixel)
    } else {
      ctx.fillStyle = '#5a3a25'
      ctx.fillRect(x * pixel, y * pixel, pixel, 2 * pixel)
    }
  }

  // 1枚の落ち葉
  const leafCenterX = Math.floor(pw * 0.52)
  const leafCenterY = Math.floor(ph * 0.61)
  const leafLength = Math.floor(pw * 0.34)
  const leafHalfHeight = Math.max(4, Math.floor(ph * 0.05))
  const lean = 0.22

  // 葉の影
  ctx.fillStyle = 'rgba(30, 20, 12, 0.35)'
  for (let dx = -Math.floor(leafLength / 2); dx <= Math.floor(leafLength / 2); dx++) {
    const t = Math.abs(dx) / Math.max(1, leafLength / 2)
    const thickness = Math.max(1, Math.floor((1 - t) * leafHalfHeight * 0.8))
    const baseY = leafCenterY + Math.floor(dx * lean) + 5
    const shadowX = leafCenterX + dx + 2
    ctx.fillRect(shadowX * pixel, baseY * pixel, pixel, thickness * pixel)
  }

  // 葉本体（やや乾いた広葉樹の葉を想定）
  for (let dx = -Math.floor(leafLength / 2); dx <= Math.floor(leafLength / 2); dx++) {
    const t = Math.abs(dx) / Math.max(1, leafLength / 2)
    const thickness = Math.max(1, Math.floor((1 - t * t) * leafHalfHeight))
    const centerY = leafCenterY + Math.floor(dx * lean)
    const x = leafCenterX + dx

    const r = Math.floor(171 - t * 48)
    const g = Math.floor(103 - t * 34)
    const b = Math.floor(47 - t * 20)
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
    ctx.fillRect(x * pixel, (centerY - thickness) * pixel, pixel, (thickness * 2 + 1) * pixel)

    // 葉の縁の乾燥した濃色
    if (thickness > 2) {
      ctx.fillStyle = '#7a4620'
      ctx.fillRect(x * pixel, (centerY - thickness) * pixel, pixel, pixel)
      ctx.fillRect(x * pixel, (centerY + thickness) * pixel, pixel, pixel)
    }
  }

  // 主脈
  ctx.fillStyle = '#e3bf85'
  for (let dx = -Math.floor(leafLength / 2) + 2; dx <= Math.floor(leafLength / 2) - 2; dx++) {
    const x = leafCenterX + dx
    const y = leafCenterY + Math.floor(dx * lean)
    ctx.fillRect(x * pixel, y * pixel, pixel, pixel)
  }

  // 側脈（斜めに短く伸びる）
  ctx.fillStyle = '#cfa56a'
  for (let dx = -Math.floor(leafLength / 2) + 4; dx < Math.floor(leafLength / 2) - 4; dx += 3) {
    const x = leafCenterX + dx
    const y = leafCenterY + Math.floor(dx * lean)
    const dir = dx % 2 === 0 ? 1 : -1
    for (let k = 1; k <= 3; k++) {
      const vx = x + k
      const vy = y + dir * k
      ctx.fillRect(vx * pixel, vy * pixel, pixel, pixel)
    }
  }

  // 葉柄（茎）
  ctx.fillStyle = '#6f421f'
  for (let i = 0; i < 9; i++) {
    const x = leafCenterX - Math.floor(leafLength / 2) - i
    const y = leafCenterY - Math.floor(leafLength * lean * 0.5) + Math.floor(i * 0.35)
    ctx.fillRect(x * pixel, y * pixel, pixel, pixel)
  }

  // 葉の上の小さな欠け・虫食い痕
  ctx.fillStyle = '#8a572f'
  for (let i = 0; i < 12; i++) {
    const x = leafCenterX - Math.floor(leafLength * 0.2) + Math.floor(random() * leafLength * 0.45)
    const y = leafCenterY - 2 + Math.floor(random() * 5)
    ctx.fillRect(x * pixel, y * pixel, pixel, pixel)
  }
}
