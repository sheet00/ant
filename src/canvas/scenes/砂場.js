import { px, pxRect, drawSky, drawGrass } from '../pixelUtils'

// 砂地の地下（通常の土より明るい砂色）
function drawSandUnderground(ctx, pw, ph, groundY, s) {
  const sandColors = ['#C4A868', '#B89B58', '#A88D48', '#987D3A', '#886D30']
  for (let y = groundY; y < ph; y++) {
    const depth = (y - groundY) / (ph - groundY)
    const ci = Math.min(sandColors.length - 1, Math.floor(depth * sandColors.length))
    pxRect(ctx, 0, y, pw, 1, s, sandColors[ci])
  }

  // 砂粒
  for (let i = 0; i < 30; i++) {
    const sx = (i * 137 + 33) % pw
    const sy = groundY + 3 + ((i * 191) % (ph - groundY - 8))
    if (sx < pw && sy < ph) {
      px(ctx, sx, sy, s, '#B89850')
    }
  }
}

// 砂場の枠（木の縁）
function drawSandboxFrame(ctx, pw, groundY, s) {
  const wood = '#7A5A30'
  const woodL = '#8B6B3A'

  // 左の枠
  for (let y = -3; y <= 0; y++) {
    px(ctx, 2, groundY + y, s, wood)
    px(ctx, 3, groundY + y, s, woodL)
  }
  // 右の枠
  for (let y = -3; y <= 0; y++) {
    px(ctx, pw - 3, groundY + y, s, wood)
    px(ctx, pw - 4, groundY + y, s, woodL)
  }
  // 上の枠（横板）
  for (let x = 2; x <= pw - 3; x++) {
    px(ctx, x, groundY - 3, s, wood)
    px(ctx, x, groundY - 2, s, woodL)
  }
}

// 小さな木の根（前シーンの名残）
function drawTinyRoot(ctx, x, groundY, s) {
  const root = '#4A3018'
  for (let y = 0; y < 6; y++) {
    px(ctx, x + (y % 2), groundY + y, s, root)
  }
}

// 小さな草（前シーンの名残）
function drawTinyGrass(ctx, x, groundY, s) {
  const colors = ['#4A9530', '#3A8520', '#2D6B14']
  for (let i = 0; i < 3; i++) {
    const gx = x + i * 3
    const gh = 2 + (i % 2)
    for (let g = 0; g < gh; g++) {
      px(ctx, gx, groundY - 2 - g, s, colors[i % 3])
    }
  }
}

// アリの巣（5部屋）
function drawNest5(ctx, cx, groundY, s) {
  const hole = '#1A1008'

  // 入口
  px(ctx, cx, groundY, s, hole)
  px(ctx, cx + 1, groundY, s, hole)

  // メイン縦トンネル
  for (let y = 1; y <= 6; y++) px(ctx, cx, groundY + y, s, hole)

  // 左上の部屋
  for (let x = -4; x <= -1; x++) px(ctx, cx + x, groundY + 4, s, hole)
  for (let x = -6; x <= -3; x++) {
    px(ctx, cx + x, groundY + 5, s, hole)
    px(ctx, cx + x, groundY + 6, s, hole)
  }
  for (let x = -5; x <= -4; x++) px(ctx, cx + x, groundY + 7, s, hole)

  // 右上の部屋
  for (let x = 1; x <= 5; x++) px(ctx, cx + x, groundY + 6, s, hole)
  for (let x = 4; x <= 8; x++) {
    px(ctx, cx + x, groundY + 7, s, hole)
    px(ctx, cx + x, groundY + 8, s, hole)
  }
  for (let x = 5; x <= 7; x++) px(ctx, cx + x, groundY + 9, s, hole)

  // 下へ
  for (let y = 7; y <= 12; y++) px(ctx, cx, groundY + y, s, hole)

  // 左中の部屋
  for (let x = -5; x <= -1; x++) px(ctx, cx + x, groundY + 11, s, hole)
  for (let x = -8; x <= -4; x++) {
    px(ctx, cx + x, groundY + 12, s, hole)
    px(ctx, cx + x, groundY + 13, s, hole)
  }
  for (let x = -7; x <= -5; x++) px(ctx, cx + x, groundY + 14, s, hole)

  // さらに下へ
  for (let y = 13; y <= 17; y++) px(ctx, cx, groundY + y, s, hole)

  // 右下の部屋
  for (let x = 1; x <= 4; x++) px(ctx, cx + x, groundY + 16, s, hole)
  for (let x = 3; x <= 7; x++) {
    px(ctx, cx + x, groundY + 17, s, hole)
    px(ctx, cx + x, groundY + 18, s, hole)
  }
  for (let x = 4; x <= 6; x++) px(ctx, cx + x, groundY + 19, s, hole)

  // 最下層の大部屋
  for (let y = 18; y <= 21; y++) px(ctx, cx, groundY + y, s, hole)
  for (let x = -4; x <= 4; x++) {
    px(ctx, cx + x, groundY + 22, s, hole)
    px(ctx, cx + x, groundY + 23, s, hole)
    px(ctx, cx + x, groundY + 24, s, hole)
  }
  for (let x = -3; x <= 3; x++) px(ctx, cx + x, groundY + 25, s, hole)
}

export function draw(ctx, pw, ph, s) {
  const groundY = Math.floor(ph * 0.45)

  drawSky(ctx, pw, groundY, s)
  drawSandUnderground(ctx, pw, ph, groundY, s)

  const nestCx = Math.floor(pw / 2)

  // アリの巣（5部屋）
  drawNest5(ctx, nestCx, groundY, s)

  // 砂場の枠
  drawSandboxFrame(ctx, pw, groundY, s)

  // 前シーンの名残
  drawTinyRoot(ctx, Math.floor(pw * 0.15), groundY, s)
  drawTinyRoot(ctx, Math.floor(pw * 0.8), groundY, s)
  drawTinyGrass(ctx, Math.floor(pw * 0.9), groundY, s)

  return { antX: nestCx, antY: groundY + 23 }
}
