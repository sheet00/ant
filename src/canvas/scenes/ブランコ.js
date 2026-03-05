import { px, drawSky, drawUnderground, drawGrass } from '../pixelUtils'

// ブランコの支柱と鎖と座面
function drawSwing(ctx, pw, groundY, s) {
  const metal = '#555555'
  const metalL = '#707070'
  const chain = '#888888'
  const seat = '#6B4226'
  const seatD = '#4A2E18'

  // 横棒（上部）
  const topY = groundY - 35
  for (let x = 15; x < pw - 15; x++) {
    px(ctx, x, topY, s, metal)
    px(ctx, x, topY + 1, s, metalL)
  }

  // 左の支柱（A字型）
  for (let y = topY + 2; y <= groundY; y++) {
    const spread = Math.floor((y - topY) * 0.15)
    px(ctx, 15 - spread, y, s, metal)
    px(ctx, 15 + spread, y, s, metalL)
  }

  // 右の支柱（A字型）
  for (let y = topY + 2; y <= groundY; y++) {
    const spread = Math.floor((y - topY) * 0.15)
    px(ctx, pw - 16 - spread, y, s, metal)
    px(ctx, pw - 16 + spread, y, s, metalL)
  }

  // 鎖と座面（中央）
  const seatX = Math.floor(pw / 2)
  const seatY = groundY - 10
  // 左鎖
  for (let y = topY + 2; y < seatY; y++) {
    px(ctx, seatX - 3, y, s, y % 2 === 0 ? chain : metal)
  }
  // 右鎖
  for (let y = topY + 2; y < seatY; y++) {
    px(ctx, seatX + 3, y, s, y % 2 === 0 ? chain : metal)
  }
  // 座面
  for (let x = -4; x <= 4; x++) {
    px(ctx, seatX + x, seatY, s, seatD)
    px(ctx, seatX + x, seatY + 1, s, seat)
  }
}

// アリの巣（7部屋）
function drawNest7(ctx, cx, groundY, s) {
  const hole = '#1A1008'

  px(ctx, cx, groundY, s, hole)
  px(ctx, cx + 1, groundY, s, hole)

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

  for (let y = 10; y <= 15; y++) px(ctx, cx, groundY + y, s, hole)

  // 左3
  for (let x = -4; x <= -1; x++) px(ctx, cx + x, groundY + 14, s, hole)
  for (let x = -7; x <= -3; x++) {
    px(ctx, cx + x, groundY + 15, s, hole)
    px(ctx, cx + x, groundY + 16, s, hole)
  }
  for (let x = -6; x <= -4; x++) px(ctx, cx + x, groundY + 17, s, hole)

  for (let y = 16; y <= 19; y++) px(ctx, cx, groundY + y, s, hole)

  // 最下層
  for (let x = -5; x <= 6; x++) {
    px(ctx, cx + x, groundY + 20, s, hole)
    px(ctx, cx + x, groundY + 21, s, hole)
    px(ctx, cx + x, groundY + 22, s, hole)
  }
  for (let x = -4; x <= 5; x++) px(ctx, cx + x, groundY + 23, s, hole)
}

export function draw(ctx, pw, ph, s) {
  const groundY = Math.floor(ph * 0.45)

  drawSky(ctx, pw, groundY, s)
  drawUnderground(ctx, pw, ph, groundY, s)

  const nestCx = Math.floor(pw / 2)

  drawNest7(ctx, nestCx, groundY, s)

  drawGrass(ctx, pw, groundY, s, 12)

  drawSwing(ctx, pw, groundY, s)

  return { antX: nestCx, antY: groundY + 21 }
}
