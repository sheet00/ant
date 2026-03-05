// ピクセル1個を描く
export function px(ctx, x, y, s, color) {
  ctx.fillStyle = color
  ctx.fillRect(x * s, y * s, s, s)
}

// ピクセルの矩形を塗る
export function pxRect(ctx, x, y, w, h, s, color) {
  ctx.fillStyle = color
  ctx.fillRect(x * s, y * s, w * s, h * s)
}

// ピクセル楕円を描く
export function pxEllipse(ctx, cx, cy, rw, rh, s, fillColor, wallColor) {
  for (let y = -rh; y <= rh; y++) {
    const rowW = Math.floor(rw * Math.sqrt(1 - (y * y) / (rh * rh)))
    for (let x = -rowW; x <= rowW; x++) {
      px(ctx, cx + x, cy + y, s, fillColor)
    }
    if (wallColor && rowW > 0) {
      px(ctx, cx - rowW, cy + y, s, wallColor)
      px(ctx, cx + rowW, cy + y, s, wallColor)
    }
  }
  if (wallColor) {
    for (let x = -rw + 2; x <= rw - 2; x++) {
      px(ctx, cx + x, cy - rh, s, wallColor)
      px(ctx, cx + x, cy + rh, s, wallColor)
    }
  }
}

// 空を描く
export function drawSky(ctx, pw, groundY, s) {
  const skyColors = ['#5B9BD5', '#6BAED6', '#87CEEB', '#A0D8EF', '#B0DFF0']
  for (let y = 0; y < groundY; y++) {
    const ci = Math.min(skyColors.length - 1, Math.floor((y / groundY) * skyColors.length))
    pxRect(ctx, 0, y, pw, 1, s, skyColors[ci])
  }
}

// 地下を描く
export function drawUnderground(ctx, pw, ph, groundY, s) {
  const dirtColors = ['#8B7355', '#7A6340', '#6B5535', '#5C4A30', '#4A3A25']
  for (let y = groundY; y < ph; y++) {
    const depth = (y - groundY) / (ph - groundY)
    const ci = Math.min(dirtColors.length - 1, Math.floor(depth * dirtColors.length))
    pxRect(ctx, 0, y, pw, 1, s, dirtColors[ci])
  }

  // 小石
  for (let i = 0; i < 20; i++) {
    const sx = (i * 137 + 33) % pw
    const sy = groundY + 5 + ((i * 191) % (ph - groundY - 10))
    if (sx < pw && sy < ph) {
      px(ctx, sx, sy, s, '#5C4A30')
      px(ctx, sx + 1, sy, s, '#5C4A30')
    }
  }

  // 根っこ
  for (let i = 0; i < 6; i++) {
    const rx = (i * 31 + 10) % pw
    for (let j = 0; j < 12 + (i % 5) * 3; j++) {
      const rootX = rx + ((j % 2) ? 1 : 0)
      if (groundY + j < ph) px(ctx, rootX, groundY + j, s, '#5A4020')
    }
  }
}

// 芝生ラインと草を描く
export function drawGrass(ctx, pw, groundY, s, density = 30) {
  pxRect(ctx, 0, groundY - 1, pw, 1, s, '#4A7A28')
  pxRect(ctx, 0, groundY, pw, 1, s, '#3A6A18')

  for (let i = 0; i < density; i++) {
    const gx = (i * 11 + 3) % pw
    const gh = 3 + (i % 4)
    const gc = i % 3 === 0 ? '#4A9530' : i % 3 === 1 ? '#3A8520' : '#2D6B14'
    for (let g = 0; g < gh; g++) {
      px(ctx, gx, groundY - 2 - g, s, gc)
    }
  }
}

// 巣の空洞を描く（部屋 + トンネル）
export function drawNest(ctx, nestCx, nestCy, cw, ch, tunnelX, groundY, s) {
  const chamberColor = '#C4A870'
  const wallColor = '#A08050'

  // トンネル
  const tw = Math.max(2, Math.floor(cw / 5))
  for (let y = groundY; y <= nestCy - ch; y++) {
    for (let x = -tw; x <= tw; x++) px(ctx, tunnelX + x, y, s, chamberColor)
    px(ctx, tunnelX - tw - 1, y, s, wallColor)
    px(ctx, tunnelX + tw + 1, y, s, wallColor)
  }
  // 入口穴
  for (let x = -(tw + 1); x <= tw + 1; x++) px(ctx, tunnelX + x, groundY, s, '#3A2A15')

  // 部屋
  pxEllipse(ctx, nestCx, nestCy, cw, ch, s, chamberColor, wallColor)

  // 床の土粒
  for (let i = 0; i < 6; i++) {
    const fx = nestCx - cw + 3 + ((i * 6) % (cw * 2 - 4))
    px(ctx, fx, nestCy + ch - 1, s, '#A89060')
  }
}
