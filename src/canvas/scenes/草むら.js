export function draw(ctx, pw, ph, pixel) {
  // 草地の上空（少し引いた視点）
  ctx.fillStyle = '#7e9a68'
  ctx.fillRect(0, 0, pw * pixel, ph * pixel)

  let seed = 789
  function random() {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }

  const horizonY = Math.floor(ph * 0.48)
  const groundTop = Math.floor(ph * 0.7)

  // 遠景の草の帯
  ctx.fillStyle = '#5f7e45'
  ctx.fillRect(0, horizonY * pixel, pw * pixel, (groundTop - horizonY) * pixel)

  // 地表
  for (let y = groundTop; y < ph; y++) {
    const t = (y - groundTop) / Math.max(1, ph - groundTop)
    const r = Math.floor(109 - t * 22)
    const g = Math.floor(86 - t * 21)
    const b = Math.floor(47 - t * 16)
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
    ctx.fillRect(0, y * pixel, pw * pixel, pixel)
  }

  // 遠景の草（細く短い）
  ctx.fillStyle = '#4f7339'
  for (let i = 0; i < pw; i += 2) {
    const h = 5 + Math.floor(random() * 7)
    const y = groundTop - h - Math.floor(random() * 5)
    ctx.fillRect(i * pixel, y * pixel, pixel, h * pixel)
  }

  // 中景の草（主役）
  for (let i = 0; i < pw; i += 2) {
    const h = 9 + Math.floor(random() * 12)
    const sway = Math.floor((random() - 0.5) * 3)
    const x = i + sway
    const y = groundTop - h + 3 - Math.floor(random() * 3)
    const tone = random()
    if (tone < 0.45) ctx.fillStyle = '#3f6b2f'
    else if (tone < 0.8) ctx.fillStyle = '#4d7e38'
    else ctx.fillStyle = '#5a8b40'
    ctx.fillRect(x * pixel, y * pixel, pixel, h * pixel)
    if (h > 14 && random() < 0.25) {
      ctx.fillRect((x + 1) * pixel, (y + 4) * pixel, pixel, Math.floor(h * 0.45) * pixel)
    }
  }

  // 落ち葉（中景の中に小さく）
  const leafCx = Math.floor(pw * 0.44)
  const leafCy = Math.floor(ph * 0.69)
  const leafLen = Math.max(12, Math.floor(pw * 0.16))
  const leafHalf = Math.max(3, Math.floor(ph * 0.025))
  const lean = 0.22

  ctx.fillStyle = 'rgba(35, 22, 12, 0.35)'
  for (let dx = -Math.floor(leafLen / 2); dx <= Math.floor(leafLen / 2); dx++) {
    const t = Math.abs(dx) / Math.max(1, leafLen / 2)
    const thick = Math.max(1, Math.floor((1 - t) * leafHalf * 0.8))
    const x = leafCx + dx + 1
    const y = leafCy + Math.floor(dx * lean) + 2
    ctx.fillRect(x * pixel, y * pixel, pixel, thick * pixel)
  }

  for (let dx = -Math.floor(leafLen / 2); dx <= Math.floor(leafLen / 2); dx++) {
    const t = Math.abs(dx) / Math.max(1, leafLen / 2)
    const thick = Math.max(1, Math.floor((1 - t * t) * leafHalf))
    const x = leafCx + dx
    const y = leafCy + Math.floor(dx * lean)
    const r = Math.floor(163 - t * 44)
    const g = Math.floor(98 - t * 28)
    const b = Math.floor(48 - t * 15)
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
    ctx.fillRect(x * pixel, (y - thick) * pixel, pixel, (thick * 2 + 1) * pixel)
  }

  ctx.fillStyle = '#dfbf8b'
  for (let dx = -Math.floor(leafLen / 2) + 2; dx <= Math.floor(leafLen / 2) - 2; dx++) {
    const x = leafCx + dx
    const y = leafCy + Math.floor(dx * lean)
    ctx.fillRect(x * pixel, y * pixel, pixel, pixel)
  }

  // 石（落ち葉の右）
  const stoneCx = Math.floor(pw * 0.6)
  const stoneCy = Math.floor(ph * 0.695)
  const stoneW = Math.max(6, Math.floor(pw * 0.06))
  const stoneH = Math.max(4, Math.floor(ph * 0.03))

  ctx.fillStyle = 'rgba(20, 20, 20, 0.33)'
  for (let y = -stoneH; y <= stoneH; y++) {
    const t = Math.abs(y) / Math.max(1, stoneH)
    const half = Math.floor((1 - t * t) * stoneW)
    ctx.fillRect((stoneCx - half + 1) * pixel, (stoneCy + y + 2) * pixel, (half * 2 + 1) * pixel, pixel)
  }

  for (let y = -stoneH; y <= stoneH; y++) {
    const t = Math.abs(y) / Math.max(1, stoneH)
    const half = Math.floor((1 - t * t) * stoneW)
    for (let x = -half; x <= half; x++) {
      const xt = Math.abs(x) / Math.max(1, half || 1)
      const shade = 120 - Math.floor(t * 28) - Math.floor(xt * 15)
      ctx.fillStyle = `rgb(${Math.max(74, shade)}, ${Math.max(74, shade)}, ${Math.max(72, shade - 4)})`
      ctx.fillRect((stoneCx + x) * pixel, (stoneCy + y) * pixel, pixel, pixel)
    }
  }

  // 前景の草で一部を隠して引きの画角感を出す
  for (let i = 0; i < pw; i += 2) {
    const h = 12 + Math.floor(random() * 15)
    const y = ph - h - Math.floor(random() * 3)
    const tone = random()
    if (tone < 0.4) ctx.fillStyle = '#2f5e2a'
    else if (tone < 0.78) ctx.fillStyle = '#3c6f31'
    else ctx.fillStyle = '#4b7e3a'
    ctx.fillRect(i * pixel, y * pixel, pixel, h * pixel)
    if (random() < 0.22) {
      ctx.fillRect((i + 1) * pixel, (y + 3) * pixel, pixel, Math.floor(h * 0.5) * pixel)
    }
  }

  // 地面の小さな粒
  for (let i = 0; i < 140; i++) {
    const x = Math.floor(random() * pw)
    const y = groundTop + Math.floor(random() * Math.max(1, ph - groundTop))
    ctx.fillStyle = random() < 0.5 ? '#735033' : '#8a6648'
    ctx.fillRect(x * pixel, y * pixel, pixel, pixel)
  }
}
