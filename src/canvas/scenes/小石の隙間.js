export function draw(ctx, pw, ph, pixel) {
  // 林床の空気
  ctx.fillStyle = '#596948'
  ctx.fillRect(0, 0, pw * pixel, ph * pixel)

  let seed = 456
  function random() {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }

  const groundTop = Math.floor(ph * 0.66)

  // 地面
  for (let y = groundTop; y < ph; y++) {
    const t = (y - groundTop) / Math.max(1, ph - groundTop)
    const r = Math.floor(116 - t * 24)
    const g = Math.floor(84 - t * 22)
    const b = Math.floor(48 - t * 16)
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
    ctx.fillRect(0, y * pixel, pw * pixel, pixel)
  }

  // 土粒
  for (let i = 0; i < 220; i++) {
    const x = Math.floor(random() * pw)
    const y = groundTop + Math.floor(random() * Math.max(1, ph - groundTop))
    const tone = random()
    if (tone < 0.7) {
      ctx.fillStyle = '#775234'
      ctx.fillRect(x * pixel, y * pixel, pixel, pixel)
    } else if (tone < 0.92) {
      ctx.fillStyle = '#8a6646'
      ctx.fillRect(x * pixel, y * pixel, 2 * pixel, pixel)
    } else {
      ctx.fillStyle = '#5b3d27'
      ctx.fillRect(x * pixel, y * pixel, pixel, 2 * pixel)
    }
  }

  // 落ち葉1枚
  const leafCenterX = Math.floor(pw * 0.38)
  const leafCenterY = Math.floor(ph * 0.61)
  const leafLength = Math.floor(pw * 0.28)
  const leafHalfHeight = Math.max(4, Math.floor(ph * 0.045))
  const lean = 0.18

  // 葉の影
  ctx.fillStyle = 'rgba(30, 20, 12, 0.35)'
  for (let dx = -Math.floor(leafLength / 2); dx <= Math.floor(leafLength / 2); dx++) {
    const t = Math.abs(dx) / Math.max(1, leafLength / 2)
    const thickness = Math.max(1, Math.floor((1 - t) * leafHalfHeight * 0.8))
    const y = leafCenterY + Math.floor(dx * lean) + 4
    const x = leafCenterX + dx + 1
    ctx.fillRect(x * pixel, y * pixel, pixel, thickness * pixel)
  }

  // 葉本体
  for (let dx = -Math.floor(leafLength / 2); dx <= Math.floor(leafLength / 2); dx++) {
    const t = Math.abs(dx) / Math.max(1, leafLength / 2)
    const thickness = Math.max(1, Math.floor((1 - t * t) * leafHalfHeight))
    const y = leafCenterY + Math.floor(dx * lean)
    const x = leafCenterX + dx

    const r = Math.floor(168 - t * 44)
    const g = Math.floor(102 - t * 30)
    const b = Math.floor(50 - t * 18)
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
    ctx.fillRect(x * pixel, (y - thickness) * pixel, pixel, (thickness * 2 + 1) * pixel)
  }

  // 主脈
  ctx.fillStyle = '#e0be88'
  for (let dx = -Math.floor(leafLength / 2) + 2; dx <= Math.floor(leafLength / 2) - 2; dx++) {
    const x = leafCenterX + dx
    const y = leafCenterY + Math.floor(dx * lean)
    ctx.fillRect(x * pixel, y * pixel, pixel, pixel)
  }

  // 葉柄
  ctx.fillStyle = '#6f421f'
  for (let i = 0; i < 7; i++) {
    const x = leafCenterX - Math.floor(leafLength / 2) - i
    const y = leafCenterY - Math.floor(leafLength * lean * 0.45) + Math.floor(i * 0.3)
    ctx.fillRect(x * pixel, y * pixel, pixel, pixel)
  }

  // 石1個（葉の右側）
  const stoneCx = Math.floor(pw * 0.66)
  const stoneCy = Math.floor(ph * 0.63)
  const stoneW = Math.max(7, Math.floor(pw * 0.09))
  const stoneH = Math.max(5, Math.floor(ph * 0.05))

  // 石の影
  ctx.fillStyle = 'rgba(25, 25, 25, 0.35)'
  for (let y = -stoneH; y <= stoneH; y++) {
    const t = Math.abs(y) / Math.max(1, stoneH)
    const half = Math.floor((1 - t * t) * stoneW)
    const sx = stoneCx - half + 2
    const sy = stoneCy + y + 3
    ctx.fillRect(sx * pixel, sy * pixel, (half * 2 + 1) * pixel, pixel)
  }

  // 石本体
  for (let y = -stoneH; y <= stoneH; y++) {
    const t = Math.abs(y) / Math.max(1, stoneH)
    const half = Math.floor((1 - t * t) * stoneW)
    const sy = stoneCy + y
    for (let x = -half; x <= half; x++) {
      const xt = Math.abs(x) / Math.max(1, half || 1)
      const shade = 118 - Math.floor(t * 32) - Math.floor(xt * 18)
      const r = Math.max(70, shade)
      const g = Math.max(70, shade)
      const b = Math.max(68, shade - 4)
      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
      ctx.fillRect((stoneCx + x) * pixel, sy * pixel, pixel, pixel)
    }
  }

  // 石のハイライト
  ctx.fillStyle = '#c5c5c0'
  for (let i = 0; i < 18; i++) {
    const hx = stoneCx - Math.floor(stoneW * 0.45) + Math.floor(random() * stoneW * 0.8)
    const hy = stoneCy - Math.floor(stoneH * 0.45) + Math.floor(random() * stoneH * 0.5)
    ctx.fillRect(hx * pixel, hy * pixel, pixel, pixel)
  }
}
