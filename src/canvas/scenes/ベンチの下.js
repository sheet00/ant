import { px, pxRect, drawSky, drawUnderground, drawGrass } from '../pixelUtils'

// ベンチ（上から見下ろした断面）
function drawBench(ctx, pw, groundY, s) {
  const wood = '#6B4226'
  const woodL = '#7D5233'
  const woodD = '#4A2E18'
  const metal = '#555555'
  const metalL = '#707070'

  // 座面（横板）
  const seatY = groundY - 20
  for (let x = 10; x < pw - 10; x++) {
    px(ctx, x, seatY, s, woodD)
    px(ctx, x, seatY + 1, s, wood)
    px(ctx, x, seatY + 2, s, woodL)
    px(ctx, x, seatY + 3, s, wood)
  }

  // 左脚
  const lx = 18
  for (let y = seatY + 4; y <= groundY; y++) {
    px(ctx, lx, y, s, metal)
    px(ctx, lx + 1, y, s, metalL)
  }

  // 右脚
  const rx = pw - 20
  for (let y = seatY + 4; y <= groundY; y++) {
    px(ctx, rx, y, s, metal)
    px(ctx, rx + 1, y, s, metalL)
  }
}

// パンくず（ベンチの下に落ちてる）
function drawCrumbs(ctx, pw, groundY, s) {
  const crumb = '#D4B060'
  const crumbD = '#B89840'
  const spots = [0.3, 0.42, 0.55, 0.65, 0.48]
  for (let i = 0; i < spots.length; i++) {
    const cx = Math.floor(pw * spots[i])
    const cy = groundY - (1 + i % 3)
    px(ctx, cx, cy, s, i % 2 === 0 ? crumb : crumbD)
  }
}

// 小さな砂粒（前シーンの名残）
function drawTinySand(ctx, x, groundY, s) {
  const sand = '#C4A868'
  for (let i = 0; i < 4; i++) {
    px(ctx, x + i * 2, groundY - 1, s, sand)
  }
}

// アリの巣（6部屋）
function drawNest6(ctx, cx, groundY, s) {
  const hole = '#1A1008'

  // 入口
  px(ctx, cx, groundY, s, hole)
  px(ctx, cx + 1, groundY, s, hole)

  // メイン縦トンネル
  for (let y = 1; y <= 5; y++) px(ctx, cx, groundY + y, s, hole)

  // 左上の部屋
  for (let x = -4; x <= -1; x++) px(ctx, cx + x, groundY + 3, s, hole)
  for (let x = -6; x <= -3; x++) {
    px(ctx, cx + x, groundY + 4, s, hole)
    px(ctx, cx + x, groundY + 5, s, hole)
  }
  for (let x = -5; x <= -4; x++) px(ctx, cx + x, groundY + 6, s, hole)

  // 右上の部屋
  for (let x = 1; x <= 5; x++) px(ctx, cx + x, groundY + 5, s, hole)
  for (let x = 4; x <= 8; x++) {
    px(ctx, cx + x, groundY + 6, s, hole)
    px(ctx, cx + x, groundY + 7, s, hole)
  }
  for (let x = 5; x <= 7; x++) px(ctx, cx + x, groundY + 8, s, hole)

  // 下へ
  for (let y = 6; y <= 10; y++) px(ctx, cx, groundY + y, s, hole)

  // 左中の部屋
  for (let x = -5; x <= -1; x++) px(ctx, cx + x, groundY + 9, s, hole)
  for (let x = -8; x <= -4; x++) {
    px(ctx, cx + x, groundY + 10, s, hole)
    px(ctx, cx + x, groundY + 11, s, hole)
  }
  for (let x = -7; x <= -5; x++) px(ctx, cx + x, groundY + 12, s, hole)

  // 右中の部屋
  for (let x = 1; x <= 6; x++) px(ctx, cx + x, groundY + 10, s, hole)
  for (let x = 5; x <= 10; x++) {
    px(ctx, cx + x, groundY + 11, s, hole)
    px(ctx, cx + x, groundY + 12, s, hole)
  }
  for (let x = 6; x <= 9; x++) px(ctx, cx + x, groundY + 13, s, hole)

  // さらに下へ
  for (let y = 11; y <= 16; y++) px(ctx, cx, groundY + y, s, hole)

  // 左下の部屋
  for (let x = -4; x <= -1; x++) px(ctx, cx + x, groundY + 15, s, hole)
  for (let x = -7; x <= -3; x++) {
    px(ctx, cx + x, groundY + 16, s, hole)
    px(ctx, cx + x, groundY + 17, s, hole)
  }
  for (let x = -6; x <= -4; x++) px(ctx, cx + x, groundY + 18, s, hole)

  // 最下層の大部屋
  for (let y = 17; y <= 20; y++) px(ctx, cx, groundY + y, s, hole)
  for (let x = -4; x <= 5; x++) {
    px(ctx, cx + x, groundY + 21, s, hole)
    px(ctx, cx + x, groundY + 22, s, hole)
    px(ctx, cx + x, groundY + 23, s, hole)
  }
  for (let x = -3; x <= 4; x++) px(ctx, cx + x, groundY + 24, s, hole)
}

export function draw(ctx, pw, ph, s) {
  const groundY = Math.floor(ph * 0.45)

  drawSky(ctx, pw, groundY, s)
  drawUnderground(ctx, pw, ph, groundY, s)

  const nestCx = Math.floor(pw / 2)

  // アリの巣（6部屋）
  drawNest6(ctx, nestCx, groundY, s)

  drawGrass(ctx, pw, groundY, s, 10)

  // ベンチ
  drawBench(ctx, pw, groundY, s)

  // パンくず
  drawCrumbs(ctx, pw, groundY, s)

  // 前シーンの名残
  drawTinySand(ctx, Math.floor(pw * 0.1), groundY, s)

  return { antX: nestCx, antY: groundY + 22 }
}
