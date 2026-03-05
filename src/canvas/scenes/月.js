import { px, pxRect } from '../pixelUtils'

// 宇宙背景（黒+星）
function drawSpace(ctx, pw, ph, s) {
  pxRect(ctx, 0, 0, pw, ph, s, '#0A0A1A')
  for (let i = 0; i < 40; i++) {
    const sx = (i * 137 + 33) % pw
    const sy = (i * 191 + 17) % ph
    px(ctx, sx, sy, s, i % 3 === 0 ? '#FFFFFF' : '#AAAACC')
  }
}

// 月面の地面（灰色グラデーション + クレーター）
function drawMoonSurface(ctx, pw, ph, groundY, s) {
  const colors = ['#999999', '#919191', '#888888', '#808080', '#777777', '#6E6E6E', '#666666']
  for (let y = groundY; y < ph; y++) {
    const depth = (y - groundY) / (ph - groundY)
    const ci = Math.min(colors.length - 1, Math.floor(depth * colors.length))
    pxRect(ctx, 0, y, pw, 1, s, colors[ci])
  }

  // 地表ライン
  pxRect(ctx, 0, groundY, pw, 1, s, '#AAAAAA')
  pxRect(ctx, 0, groundY + 1, pw, 1, s, '#999999')

  // クレーター1（左側）
  const c1x = Math.floor(pw * 0.2)
  const c1y = groundY
  for (let x = -4; x <= 4; x++) {
    px(ctx, c1x + x, c1y, s, '#777777')
    px(ctx, c1x + x, c1y + 1, s, '#6E6E6E')
  }
  for (let x = -3; x <= 3; x++) {
    px(ctx, c1x + x, c1y + 2, s, '#666666')
  }
  for (let x = -2; x <= 2; x++) {
    px(ctx, c1x + x, c1y + 3, s, '#707070')
  }
  // 縁
  px(ctx, c1x - 5, c1y, s, '#BBBBBB')
  px(ctx, c1x + 5, c1y, s, '#BBBBBB')

  // クレーター2（右側）
  const c2x = Math.floor(pw * 0.75)
  const c2y = groundY
  for (let x = -6; x <= 6; x++) {
    px(ctx, c2x + x, c2y, s, '#777777')
    px(ctx, c2x + x, c2y + 1, s, '#6E6E6E')
  }
  for (let x = -5; x <= 5; x++) {
    px(ctx, c2x + x, c2y + 2, s, '#666666')
    px(ctx, c2x + x, c2y + 3, s, '#606060')
  }
  for (let x = -4; x <= 4; x++) {
    px(ctx, c2x + x, c2y + 4, s, '#6A6A6A')
  }
  for (let x = -3; x <= 3; x++) {
    px(ctx, c2x + x, c2y + 5, s, '#707070')
  }
  px(ctx, c2x - 7, c2y, s, '#BBBBBB')
  px(ctx, c2x + 7, c2y, s, '#BBBBBB')

  // クレーター3（小さい、中央左寄り）
  const c3x = Math.floor(pw * 0.45)
  const c3y = groundY + 1
  for (let x = -2; x <= 2; x++) {
    px(ctx, c3x + x, c3y, s, '#6E6E6E')
  }
  for (let x = -1; x <= 1; x++) {
    px(ctx, c3x + x, c3y + 1, s, '#666666')
  }

  // 地下の小石（月の岩）
  for (let i = 0; i < 15; i++) {
    const sx = (i * 137 + 33) % pw
    const sy = groundY + 5 + ((i * 191) % (ph - groundY - 10))
    if (sx < pw && sy < ph) {
      px(ctx, sx, sy, s, '#5A5A5A')
      px(ctx, sx + 1, sy, s, '#5A5A5A')
    }
  }
}

// 地球（宇宙背景に浮かぶ小さな地球）
function drawEarth(ctx, pw, groundY, s) {
  const ex = Math.floor(pw * 0.8)
  const ey = Math.floor(groundY * 0.3)
  // 地球本体（青い円）
  for (let dy = -3; dy <= 3; dy++) {
    const w = dy === -3 || dy === 3 ? 1 : dy === -2 || dy === 2 ? 2 : 3
    for (let dx = -w; dx <= w; dx++) {
      px(ctx, ex + dx, ey + dy, s, '#4488CC')
    }
  }
  // 大陸（緑のドット）
  px(ctx, ex - 1, ey - 1, s, '#44AA44')
  px(ctx, ex, ey, s, '#44AA44')
  px(ctx, ex + 1, ey + 1, s, '#44AA44')
  px(ctx, ex - 2, ey + 1, s, '#44AA44')
}

// アリの巣（20部屋）
function drawNest20(ctx, cx, groundY, s) {
  const hole = '#1A1008'

  // 入口
  px(ctx, cx, groundY, s, hole)
  px(ctx, cx + 1, groundY, s, hole)

  // 縦トンネル1
  for (let y = 1; y <= 5; y++) px(ctx, cx, groundY + y, s, hole)

  // 左1
  for (let x = -4; x <= -1; x++) px(ctx, cx + x, groundY + 3, s, hole)
  for (let x = -6; x <= -3; x++) {
    px(ctx, cx + x, groundY + 4, s, hole)
    px(ctx, cx + x, groundY + 5, s, hole)
  }
  for (let x = -5; x <= -4; x++) px(ctx, cx + x, groundY + 6, s, hole)

  // 右1
  for (let x = 1; x <= 5; x++) px(ctx, cx + x, groundY + 5, s, hole)
  for (let x = 4; x <= 8; x++) {
    px(ctx, cx + x, groundY + 6, s, hole)
    px(ctx, cx + x, groundY + 7, s, hole)
  }
  for (let x = 5; x <= 7; x++) px(ctx, cx + x, groundY + 8, s, hole)

  // 縦トンネル2
  for (let y = 6; y <= 9; y++) px(ctx, cx, groundY + y, s, hole)

  // 左2
  for (let x = -5; x <= -1; x++) px(ctx, cx + x, groundY + 9, s, hole)
  for (let x = -8; x <= -4; x++) {
    px(ctx, cx + x, groundY + 10, s, hole)
    px(ctx, cx + x, groundY + 11, s, hole)
  }
  for (let x = -7; x <= -5; x++) px(ctx, cx + x, groundY + 12, s, hole)

  // 右2
  for (let x = 1; x <= 6; x++) px(ctx, cx + x, groundY + 9, s, hole)
  for (let x = 5; x <= 10; x++) {
    px(ctx, cx + x, groundY + 10, s, hole)
    px(ctx, cx + x, groundY + 11, s, hole)
  }
  for (let x = 6; x <= 9; x++) px(ctx, cx + x, groundY + 12, s, hole)

  // 縦トンネル3
  for (let y = 10; y <= 15; y++) px(ctx, cx, groundY + y, s, hole)

  // 左3
  for (let x = -4; x <= -1; x++) px(ctx, cx + x, groundY + 14, s, hole)
  for (let x = -7; x <= -3; x++) {
    px(ctx, cx + x, groundY + 15, s, hole)
    px(ctx, cx + x, groundY + 16, s, hole)
  }
  for (let x = -6; x <= -4; x++) px(ctx, cx + x, groundY + 17, s, hole)

  // 右3
  for (let x = 1; x <= 5; x++) px(ctx, cx + x, groundY + 15, s, hole)
  for (let x = 4; x <= 9; x++) {
    px(ctx, cx + x, groundY + 16, s, hole)
    px(ctx, cx + x, groundY + 17, s, hole)
  }
  for (let x = 5; x <= 8; x++) px(ctx, cx + x, groundY + 18, s, hole)

  // 縦トンネル4
  for (let y = 16; y <= 21; y++) px(ctx, cx, groundY + y, s, hole)

  // 左4
  for (let x = -5; x <= -1; x++) px(ctx, cx + x, groundY + 20, s, hole)
  for (let x = -9; x <= -4; x++) {
    px(ctx, cx + x, groundY + 21, s, hole)
    px(ctx, cx + x, groundY + 22, s, hole)
  }
  for (let x = -8; x <= -5; x++) px(ctx, cx + x, groundY + 23, s, hole)

  // 右4
  for (let x = 1; x <= 6; x++) px(ctx, cx + x, groundY + 20, s, hole)
  for (let x = 5; x <= 11; x++) {
    px(ctx, cx + x, groundY + 21, s, hole)
    px(ctx, cx + x, groundY + 22, s, hole)
  }
  for (let x = 6; x <= 10; x++) px(ctx, cx + x, groundY + 23, s, hole)

  // 縦トンネル5
  for (let y = 22; y <= 27; y++) px(ctx, cx, groundY + y, s, hole)

  // 左5
  for (let x = -6; x <= -1; x++) px(ctx, cx + x, groundY + 26, s, hole)
  for (let x = -10; x <= -5; x++) {
    px(ctx, cx + x, groundY + 27, s, hole)
    px(ctx, cx + x, groundY + 28, s, hole)
  }
  for (let x = -9; x <= -6; x++) px(ctx, cx + x, groundY + 29, s, hole)

  // 右5
  for (let x = 1; x <= 7; x++) px(ctx, cx + x, groundY + 26, s, hole)
  for (let x = 6; x <= 12; x++) {
    px(ctx, cx + x, groundY + 27, s, hole)
    px(ctx, cx + x, groundY + 28, s, hole)
  }
  for (let x = 7; x <= 11; x++) px(ctx, cx + x, groundY + 29, s, hole)

  // 最下層（大部屋）
  for (let y = 28; y <= 33; y++) px(ctx, cx, groundY + y, s, hole)
  for (let x = -7; x <= 8; x++) {
    px(ctx, cx + x, groundY + 32, s, hole)
    px(ctx, cx + x, groundY + 33, s, hole)
    px(ctx, cx + x, groundY + 34, s, hole)
  }
  for (let x = -6; x <= 7; x++) px(ctx, cx + x, groundY + 35, s, hole)
}

export function draw(ctx, pw, ph, s) {
  const groundY = Math.floor(ph * 0.45)

  drawSpace(ctx, pw, ph, s)
  drawMoonSurface(ctx, pw, ph, groundY, s)
  drawEarth(ctx, pw, groundY, s)

  const nestCx = Math.floor(pw / 2)
  drawNest20(ctx, nestCx, groundY, s)

  return { antX: nestCx, antY: groundY + 33 }
}
