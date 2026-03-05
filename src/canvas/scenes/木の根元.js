import { px, pxRect, drawSky, drawUnderground, drawGrass } from '../pixelUtils'

// 木の幹と根
function drawTree(ctx, cx, groundY, s) {
  const bark = '#5A3A1A'
  const barkL = '#6B4A28'
  const barkD = '#3E2810'
  const root = '#4A3018'

  // 幹（地上に太く伸びる）
  for (let y = -40; y <= 0; y++) {
    const w = 4 + Math.floor(Math.abs(y) < 10 ? (10 - Math.abs(y)) * 0.3 : 0)
    for (let x = -w; x <= w; x++) {
      const c = x <= -w + 1 ? barkD : x >= w - 1 ? barkD : (x + y) % 5 === 0 ? barkL : bark
      px(ctx, cx + x, groundY + y, s, c)
    }
  }

  // 根（地下に広がる）
  const roots = [
    { dx: -1, len: 18, dir: -1 },
    { dx: 1, len: 15, dir: 1 },
    { dx: 0, len: 12, dir: -0.3 },
    { dx: -2, len: 10, dir: -1.5 },
    { dx: 2, len: 8, dir: 1.3 },
  ]
  for (const r of roots) {
    let rx = cx + r.dx * 3
    let ry = groundY + 1
    for (let i = 0; i < r.len; i++) {
      px(ctx, rx, ry, s, root)
      px(ctx, rx + 1, ry, s, root)
      ry += 1
      rx += Math.round(r.dir * (0.5 + (i % 3 === 0 ? 0.5 : 0)))
    }
  }
}

// 小さな草（前シーンの名残）
function drawTinyGrass(ctx, x, groundY, s) {
  const colors = ['#4A9530', '#3A8520', '#2D6B14']
  for (let i = 0; i < 5; i++) {
    const gx = x + i * 3
    const gh = 2 + (i % 3)
    for (let g = 0; g < gh; g++) {
      px(ctx, gx, groundY - 2 - g, s, colors[i % 3])
    }
  }
}

// 小さな落ち葉
function drawTinyLeaf(ctx, cx, topY, s) {
  const O = '#5C3D08'
  const B = '#8B6914'
  const L = '#A07820'
  const colorMap = { ' ': null, 'O': O, 'B': B, 'L': L }
  const data = [
    ' OO    ',
    'OBLOOS ',
    'OBBBOOSS',
    ' OOO   ',
  ]
  for (let row = 0; row < data.length; row++) {
    const line = data[row]
    for (let col = 0; col < line.length; col++) {
      const c = colorMap[line[col]]
      if (c) px(ctx, cx + col, topY + row, s, c)
    }
  }
}

// 小さな小石（前シーンの名残）
function drawTinyStone(ctx, cx, topY, s) {
  const D = '#707070'
  const M = '#9E9E9E'
  const colorMap = { ' ': null, 'D': D, 'M': M }
  const data = [' DM ', 'DMMD', ' DD ']
  for (let row = 0; row < data.length; row++) {
    const line = data[row]
    for (let col = 0; col < line.length; col++) {
      const c = colorMap[line[col]]
      if (c) px(ctx, cx + col, topY + row, s, c)
    }
  }
}

// アリの巣（4部屋 - 拡張）
function drawNest4(ctx, cx, groundY, s) {
  const hole = '#1A1008'

  // 入口
  px(ctx, cx, groundY, s, hole)
  px(ctx, cx + 1, groundY, s, hole)

  // 縦トンネル（メイン）
  for (let y = 1; y <= 7; y++) {
    px(ctx, cx, groundY + y, s, hole)
  }

  // 左上の部屋
  for (let x = -5; x <= -1; x++) px(ctx, cx + x, groundY + 5, s, hole)
  for (let x = -7; x <= -4; x++) {
    px(ctx, cx + x, groundY + 6, s, hole)
    px(ctx, cx + x, groundY + 7, s, hole)
  }
  for (let x = -6; x <= -5; x++) px(ctx, cx + x, groundY + 8, s, hole)

  // 右上の部屋
  for (let x = 1; x <= 4; x++) px(ctx, cx + x, groundY + 7, s, hole)
  for (let x = 3; x <= 7; x++) {
    px(ctx, cx + x, groundY + 8, s, hole)
    px(ctx, cx + x, groundY + 9, s, hole)
  }
  for (let x = 4; x <= 6; x++) px(ctx, cx + x, groundY + 10, s, hole)

  // さらに下へ
  for (let y = 8; y <= 14; y++) px(ctx, cx, groundY + y, s, hole)

  // 左下の部屋
  for (let x = -4; x <= -1; x++) px(ctx, cx + x, groundY + 14, s, hole)
  for (let x = -6; x <= -3; x++) {
    px(ctx, cx + x, groundY + 15, s, hole)
    px(ctx, cx + x, groundY + 16, s, hole)
  }
  for (let x = -5; x <= -4; x++) px(ctx, cx + x, groundY + 17, s, hole)

  // 右下の大部屋
  for (let y = 15; y <= 18; y++) px(ctx, cx, groundY + y, s, hole)
  for (let x = 1; x <= 6; x++) px(ctx, cx + x, groundY + 18, s, hole)
  for (let x = 0; x <= 7; x++) {
    px(ctx, cx + x, groundY + 19, s, hole)
    px(ctx, cx + x, groundY + 20, s, hole)
    px(ctx, cx + x, groundY + 21, s, hole)
  }
  for (let x = 1; x <= 6; x++) px(ctx, cx + x, groundY + 22, s, hole)
}

export function draw(ctx, pw, ph, s) {
  const groundY = Math.floor(ph * 0.45)

  drawSky(ctx, pw, groundY, s)
  drawUnderground(ctx, pw, ph, groundY, s)

  const nestCx = Math.floor(pw / 2) - 10

  // アリの巣（4部屋）
  drawNest4(ctx, nestCx, groundY, s)

  drawGrass(ctx, pw, groundY, s, 15)

  // 木の幹と根
  drawTree(ctx, Math.floor(pw * 0.6), groundY, s)

  // 木の根元に落ちてるもの
  drawTinyLeaf(ctx, Math.floor(pw * 0.55), groundY - 4, s)
  drawTinyLeaf(ctx, Math.floor(pw * 0.68), groundY - 3, s)
  drawTinyStone(ctx, Math.floor(pw * 0.63), groundY - 3, s)
  drawTinyStone(ctx, Math.floor(pw * 0.48), groundY - 2, s)

  // 前シーンの名残
  drawTinyGrass(ctx, Math.floor(pw * 0.1), groundY, s)

  return { antX: nestCx, antY: groundY + 20 }
}
