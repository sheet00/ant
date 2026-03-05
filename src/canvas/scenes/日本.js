import { px, pxRect, drawSky, drawUnderground, drawGrass } from '../pixelUtils'

// 日本列島のシルエット（ドット絵で簡略化）
function drawJapanMap(ctx, pw, groundY, s) {
  const land = '#4CAF50'
  const landD = '#388E3C'
  const sea = '#1565C0'
  const seaL = '#1E88E5'

  // 海を地上部分に描く
  for (let y = 2; y < groundY - 2; y++) {
    for (let x = 0; x < pw; x++) {
      px(ctx, x, y, s, (x + y) % 7 === 0 ? seaL : sea)
    }
  }

  // 日本列島の座標（中心に配置、上が北）
  const cx = Math.floor(pw / 2)
  const topY = 5

  // 北海道
  const hokkaido = [
    [0, 0], [1, 0], [2, 0],
    [-1, 1], [0, 1], [1, 1], [2, 1], [3, 1],
    [-1, 2], [0, 2], [1, 2], [2, 2],
    [0, 3], [1, 3],
  ]
  for (const [dx, dy] of hokkaido) {
    px(ctx, cx + dx + 2, topY + dy, s, land)
  }

  // 本州（縦長に）
  const honshu = [
    [1, 5], [2, 5],
    [0, 6], [1, 6], [2, 6],
    [0, 7], [1, 7],
    [-1, 8], [0, 8], [1, 8],
    [-1, 9], [0, 9],
    [-2, 10], [-1, 10], [0, 10],
    [-2, 11], [-1, 11], [0, 11],
    [-3, 12], [-2, 12], [-1, 12], [0, 12],
    [-3, 13], [-2, 13], [-1, 13],
    [-4, 14], [-3, 14], [-2, 14], [-1, 14],
    [-4, 15], [-3, 15], [-2, 15],
    [-5, 16], [-4, 16], [-3, 16],
    [-5, 17], [-4, 17], [-3, 17],
    [-4, 18], [-3, 18],
    [-3, 19], [-2, 19],
    [-2, 20], [-1, 20],
    [-2, 21], [-1, 21], [0, 21],
  ]
  for (const [dx, dy] of honshu) {
    px(ctx, cx + dx, topY + dy, s, (dx + dy) % 3 === 0 ? landD : land)
  }

  // 四国
  const shikoku = [
    [-5, 19], [-4, 19],
    [-6, 20], [-5, 20], [-4, 20],
    [-5, 21], [-4, 21],
  ]
  for (const [dx, dy] of shikoku) {
    px(ctx, cx + dx, topY + dy, s, land)
  }

  // 九州
  const kyushu = [
    [-4, 22], [-3, 22],
    [-5, 23], [-4, 23], [-3, 23],
    [-5, 24], [-4, 24], [-3, 24],
    [-4, 25], [-3, 25],
    [-4, 26],
  ]
  for (const [dx, dy] of kyushu) {
    px(ctx, cx + dx, topY + dy, s, (dx + dy) % 3 === 0 ? landD : land)
  }

  // 赤い点でアリの巣の位置を示す（本州中部あたり）
  px(ctx, cx - 2, topY + 13, s, '#FF1744')
  px(ctx, cx - 1, topY + 13, s, '#FF1744')
}

// アリの巣（17部屋）
function drawNest17(ctx, cx, groundY, s) {
  const hole = '#1A1008'

  // 入口
  px(ctx, cx, groundY, s, hole)
  px(ctx, cx + 1, groundY, s, hole)

  // 縦トンネル1
  for (let y = 1; y <= 4; y++) px(ctx, cx, groundY + y, s, hole)

  // 左1
  for (let x = -3; x <= -1; x++) px(ctx, cx + x, groundY + 3, s, hole)
  for (let x = -5; x <= -2; x++) {
    px(ctx, cx + x, groundY + 4, s, hole)
    px(ctx, cx + x, groundY + 5, s, hole)
  }

  // 右1
  for (let x = 1; x <= 4; x++) px(ctx, cx + x, groundY + 3, s, hole)
  for (let x = 3; x <= 7; x++) {
    px(ctx, cx + x, groundY + 4, s, hole)
    px(ctx, cx + x, groundY + 5, s, hole)
  }

  // 縦トンネル2
  for (let y = 5; y <= 8; y++) px(ctx, cx, groundY + y, s, hole)

  // 左2
  for (let x = -4; x <= -1; x++) px(ctx, cx + x, groundY + 7, s, hole)
  for (let x = -7; x <= -3; x++) {
    px(ctx, cx + x, groundY + 8, s, hole)
    px(ctx, cx + x, groundY + 9, s, hole)
  }

  // 右2
  for (let x = 1; x <= 5; x++) px(ctx, cx + x, groundY + 7, s, hole)
  for (let x = 4; x <= 9; x++) {
    px(ctx, cx + x, groundY + 8, s, hole)
    px(ctx, cx + x, groundY + 9, s, hole)
  }

  // 縦トンネル3
  for (let y = 9; y <= 12; y++) px(ctx, cx, groundY + y, s, hole)

  // 左3
  for (let x = -3; x <= -1; x++) px(ctx, cx + x, groundY + 11, s, hole)
  for (let x = -6; x <= -2; x++) {
    px(ctx, cx + x, groundY + 12, s, hole)
    px(ctx, cx + x, groundY + 13, s, hole)
  }

  // 右3
  for (let x = 1; x <= 4; x++) px(ctx, cx + x, groundY + 11, s, hole)
  for (let x = 3; x <= 8; x++) {
    px(ctx, cx + x, groundY + 12, s, hole)
    px(ctx, cx + x, groundY + 13, s, hole)
  }

  // 縦トンネル4
  for (let y = 13; y <= 16; y++) px(ctx, cx, groundY + y, s, hole)

  // 左4
  for (let x = -4; x <= -1; x++) px(ctx, cx + x, groundY + 15, s, hole)
  for (let x = -8; x <= -3; x++) {
    px(ctx, cx + x, groundY + 16, s, hole)
    px(ctx, cx + x, groundY + 17, s, hole)
  }

  // 右4
  for (let x = 1; x <= 5; x++) px(ctx, cx + x, groundY + 15, s, hole)
  for (let x = 4; x <= 10; x++) {
    px(ctx, cx + x, groundY + 16, s, hole)
    px(ctx, cx + x, groundY + 17, s, hole)
  }

  // 縦トンネル5
  for (let y = 17; y <= 20; y++) px(ctx, cx, groundY + y, s, hole)

  // 左5
  for (let x = -3; x <= -1; x++) px(ctx, cx + x, groundY + 19, s, hole)
  for (let x = -6; x <= -2; x++) {
    px(ctx, cx + x, groundY + 20, s, hole)
    px(ctx, cx + x, groundY + 21, s, hole)
  }

  // 右5
  for (let x = 1; x <= 4; x++) px(ctx, cx + x, groundY + 19, s, hole)
  for (let x = 3; x <= 8; x++) {
    px(ctx, cx + x, groundY + 20, s, hole)
    px(ctx, cx + x, groundY + 21, s, hole)
  }

  // 縦トンネル6
  for (let y = 21; y <= 24; y++) px(ctx, cx, groundY + y, s, hole)

  // 左6
  for (let x = -4; x <= -1; x++) px(ctx, cx + x, groundY + 23, s, hole)
  for (let x = -7; x <= -3; x++) {
    px(ctx, cx + x, groundY + 24, s, hole)
    px(ctx, cx + x, groundY + 25, s, hole)
  }

  // 右6
  for (let x = 1; x <= 5; x++) px(ctx, cx + x, groundY + 23, s, hole)
  for (let x = 4; x <= 9; x++) {
    px(ctx, cx + x, groundY + 24, s, hole)
    px(ctx, cx + x, groundY + 25, s, hole)
  }

  // 縦トンネル7
  for (let y = 25; y <= 28; y++) px(ctx, cx, groundY + y, s, hole)

  // 左7
  for (let x = -3; x <= -1; x++) px(ctx, cx + x, groundY + 27, s, hole)
  for (let x = -6; x <= -2; x++) {
    px(ctx, cx + x, groundY + 28, s, hole)
    px(ctx, cx + x, groundY + 29, s, hole)
  }

  // 右7
  for (let x = 1; x <= 4; x++) px(ctx, cx + x, groundY + 27, s, hole)
  for (let x = 3; x <= 7; x++) {
    px(ctx, cx + x, groundY + 28, s, hole)
    px(ctx, cx + x, groundY + 29, s, hole)
  }

  // 縦トンネル8
  for (let y = 29; y <= 32; y++) px(ctx, cx, groundY + y, s, hole)

  // 左8（17部屋目の追加分）
  for (let x = -4; x <= -1; x++) px(ctx, cx + x, groundY + 31, s, hole)
  for (let x = -7; x <= -3; x++) {
    px(ctx, cx + x, groundY + 32, s, hole)
    px(ctx, cx + x, groundY + 33, s, hole)
  }

  // 縦トンネル9
  for (let y = 33; y <= 35; y++) px(ctx, cx, groundY + y, s, hole)

  // 最下層（女王の間）
  for (let x = -6; x <= 7; x++) {
    px(ctx, cx + x, groundY + 36, s, hole)
    px(ctx, cx + x, groundY + 37, s, hole)
    px(ctx, cx + x, groundY + 38, s, hole)
  }
  for (let x = -5; x <= 6; x++) px(ctx, cx + x, groundY + 39, s, hole)
}

export function draw(ctx, pw, ph, s) {
  const groundY = Math.floor(ph * 0.45)

  drawSky(ctx, pw, groundY, s)
  drawUnderground(ctx, pw, ph, groundY, s)

  const nestCx = Math.floor(pw / 2)

  drawNest17(ctx, nestCx, groundY, s)

  drawGrass(ctx, pw, groundY, s, 6)

  drawJapanMap(ctx, pw, groundY, s)

  return { antX: nestCx, antY: groundY + 37 }
}
