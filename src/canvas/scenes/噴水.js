import { px, pxRect, drawSky, drawUnderground, drawGrass } from '../pixelUtils'

// 噴水（円形の池 + 中央の噴水口 + 水しぶき）
function drawFountain(ctx, pw, groundY, s) {
  const stone = '#999999'
  const stoneD = '#777777'
  const stoneL = '#BBBBBB'
  const water = '#6BAED6'
  const waterL = '#87CEEB'
  const waterD = '#4A90B8'
  const splash = '#B0DFF0'

  const cx = Math.floor(pw / 2)
  const poolY = groundY - 4

  // 池の縁（石造り）- 台形風に1ドットずつ
  const poolLeft = cx - 18
  const poolRight = cx + 18
  // 底部の縁
  for (let x = poolLeft + 2; x <= poolRight - 2; x++) {
    px(ctx, x, poolY + 2, s, stoneD)
  }
  // 中段の縁
  for (let x = poolLeft + 1; x <= poolRight - 1; x++) {
    px(ctx, x, poolY + 1, s, stone)
  }
  // 上段の縁
  for (let x = poolLeft; x <= poolRight; x++) {
    px(ctx, x, poolY, s, stoneL)
  }
  // 左壁
  for (let y = poolY; y <= poolY + 2; y++) {
    px(ctx, poolLeft, y, s, stoneD)
    px(ctx, poolLeft + 1, y, s, stone)
  }
  // 右壁
  for (let y = poolY; y <= poolY + 2; y++) {
    px(ctx, poolRight, y, s, stoneD)
    px(ctx, poolRight - 1, y, s, stone)
  }

  // 水面
  for (let x = poolLeft + 2; x <= poolRight - 2; x++) {
    px(ctx, x, poolY + 1, s, waterD)
  }
  for (let x = poolLeft + 3; x <= poolRight - 3; x++) {
    px(ctx, x, poolY, s, water)
  }
  // 水面の波紋
  for (let i = 0; i < 6; i++) {
    const wx = poolLeft + 5 + i * 5
    if (wx < poolRight - 3) {
      px(ctx, wx, poolY, s, waterL)
    }
  }

  // 中央の噴水柱（石の台座）
  const pillarX = cx
  px(ctx, pillarX - 1, poolY - 1, s, stone)
  px(ctx, pillarX, poolY - 1, s, stoneL)
  px(ctx, pillarX + 1, poolY - 1, s, stone)
  px(ctx, pillarX - 1, poolY - 2, s, stone)
  px(ctx, pillarX, poolY - 2, s, stoneL)
  px(ctx, pillarX + 1, poolY - 2, s, stone)
  px(ctx, pillarX, poolY - 3, s, stoneL)

  // 噴水の水柱
  for (let y = poolY - 4; y >= poolY - 14; y--) {
    px(ctx, pillarX, y, s, waterL)
  }
  // 水柱の太い部分
  for (let y = poolY - 4; y >= poolY - 10; y--) {
    px(ctx, pillarX - 1, y, s, water)
    px(ctx, pillarX + 1, y, s, water)
  }

  // 水しぶき（放物線で左右に飛び散る）
  // 左側の水しぶき
  const topWater = poolY - 14
  for (let i = 0; i < 8; i++) {
    const sx = pillarX - 1 - i
    const sy = topWater + Math.floor(i * i * 0.3)
    if (sy < poolY) {
      px(ctx, sx, sy, s, splash)
      if (i > 2) px(ctx, sx, sy + 1, s, waterL)
    }
  }
  // 右側の水しぶき
  for (let i = 0; i < 8; i++) {
    const sx = pillarX + 1 + i
    const sy = topWater + Math.floor(i * i * 0.3)
    if (sy < poolY) {
      px(ctx, sx, sy, s, splash)
      if (i > 2) px(ctx, sx, sy + 1, s, waterL)
    }
  }

  // 落水のしずく
  for (let i = 0; i < 5; i++) {
    const dx = pillarX - 6 + i * 3
    const dy = poolY - 2 + (i % 2)
    px(ctx, dx, dy, s, splash)
  }
}

// アリの巣（10部屋）
function drawNest10(ctx, cx, groundY, s) {
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

  // 右4（新規10部屋目）
  for (let x = 1; x <= 6; x++) px(ctx, cx + x, groundY + 21, s, hole)
  for (let x = 5; x <= 11; x++) {
    px(ctx, cx + x, groundY + 22, s, hole)
    px(ctx, cx + x, groundY + 23, s, hole)
  }
  for (let x = 6; x <= 10; x++) px(ctx, cx + x, groundY + 24, s, hole)

  // 縦トンネル5
  for (let y = 22; y <= 27; y++) px(ctx, cx, groundY + y, s, hole)

  // 最下層
  for (let x = -6; x <= 7; x++) {
    px(ctx, cx + x, groundY + 28, s, hole)
    px(ctx, cx + x, groundY + 29, s, hole)
    px(ctx, cx + x, groundY + 30, s, hole)
  }
  for (let x = -5; x <= 6; x++) px(ctx, cx + x, groundY + 31, s, hole)
}

export function draw(ctx, pw, ph, s) {
  const groundY = Math.floor(ph * 0.45)

  drawSky(ctx, pw, groundY, s)
  drawUnderground(ctx, pw, ph, groundY, s)

  const nestCx = Math.floor(pw / 2)

  drawNest10(ctx, nestCx, groundY, s)

  drawGrass(ctx, pw, groundY, s, 12)

  drawFountain(ctx, pw, groundY, s)

  return { antX: nestCx, antY: groundY + 29 }
}
