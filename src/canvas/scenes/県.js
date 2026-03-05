import { px, pxRect, drawSky, drawUnderground, drawGrass } from '../pixelUtils'

// 県の地図的表現（田んぼ、道路、建物群をドットで抽象的に）
function drawPrefectureMap(ctx, pw, groundY, s) {
  // 道路（灰色の線）
  const roadColor = '#888888'
  const roadLine = '#AAAAAA'

  // 横道路
  const roadY1 = groundY - 20
  const roadY2 = groundY - 10
  for (let x = 0; x < pw; x++) {
    px(ctx, x, roadY1, s, roadColor)
    px(ctx, x, roadY1 + 1, s, roadLine)
    px(ctx, x, roadY2, s, roadColor)
    px(ctx, x, roadY2 + 1, s, roadLine)
  }

  // 縦道路
  const roadX1 = Math.floor(pw * 0.3)
  const roadX2 = Math.floor(pw * 0.7)
  for (let y = groundY - 35; y < groundY; y++) {
    px(ctx, roadX1, y, s, roadColor)
    px(ctx, roadX1 + 1, y, s, roadLine)
    px(ctx, roadX2, y, s, roadColor)
    px(ctx, roadX2 + 1, y, s, roadLine)
  }

  // 田んぼ（黄緑の区画）左上
  const riceG = '#7CB342'
  const riceL = '#9CCC65'
  for (let y = roadY1 - 12; y < roadY1 - 2; y++) {
    for (let x = 3; x < roadX1 - 2; x++) {
      px(ctx, x, y, s, (x + y) % 3 === 0 ? riceL : riceG)
    }
  }

  // 田んぼ（右上）
  for (let y = roadY1 - 12; y < roadY1 - 2; y++) {
    for (let x = roadX1 + 3; x < roadX2 - 2; x++) {
      px(ctx, x, y, s, (x + y) % 3 === 0 ? riceL : riceG)
    }
  }

  // 田んぼ（左中）
  for (let y = roadY1 + 3; y < roadY2 - 2; y++) {
    for (let x = 3; x < roadX1 - 2; x++) {
      px(ctx, x, y, s, (x + y) % 3 === 0 ? riceL : riceG)
    }
  }

  // 建物群（右下の区画に小さいビルを点在）
  const bldg = '#5D4037'
  const bldgL = '#795548'
  const roof = '#3E2723'
  // ビル1
  const bx1 = roadX2 + 4
  for (let y = roadY1 - 8; y < roadY1 - 2; y++) {
    px(ctx, bx1, y, s, bldg)
    px(ctx, bx1 + 1, y, s, bldgL)
    px(ctx, bx1 + 2, y, s, bldg)
  }
  px(ctx, bx1, roadY1 - 9, s, roof)
  px(ctx, bx1 + 1, roadY1 - 9, s, roof)
  px(ctx, bx1 + 2, roadY1 - 9, s, roof)

  // ビル2
  const bx2 = roadX2 + 10
  for (let y = roadY1 - 6; y < roadY1 - 2; y++) {
    px(ctx, bx2, y, s, bldgL)
    px(ctx, bx2 + 1, y, s, bldg)
  }
  px(ctx, bx2, roadY1 - 7, s, roof)
  px(ctx, bx2 + 1, roadY1 - 7, s, roof)

  // ビル3
  const bx3 = roadX2 + 6
  for (let y = roadY2 - 6; y < roadY2 - 1; y++) {
    px(ctx, bx3, y, s, bldg)
    px(ctx, bx3 + 1, y, s, bldgL)
    px(ctx, bx3 + 2, y, s, bldgL)
    px(ctx, bx3 + 3, y, s, bldg)
  }
  px(ctx, bx3, roadY2 - 7, s, roof)
  px(ctx, bx3 + 1, roadY2 - 7, s, roof)
  px(ctx, bx3 + 2, roadY2 - 7, s, roof)
  px(ctx, bx3 + 3, roadY2 - 7, s, roof)

  // 川（青いライン、右上から左下へ）
  const river = '#4FC3F7'
  const riverD = '#0288D1'
  for (let i = 0; i < 30; i++) {
    const rx = pw - 5 - i
    const ry = groundY - 35 + Math.floor(i * 0.8)
    if (ry < groundY && rx > 0) {
      px(ctx, rx, ry, s, river)
      px(ctx, rx - 1, ry, s, riverD)
    }
  }

  // 小さい家（田んぼ区画内に点在）
  const house = '#8D6E63'
  const houseR = '#D32F2F'
  // 家1
  px(ctx, 8, roadY1 + 5, s, house)
  px(ctx, 9, roadY1 + 5, s, house)
  px(ctx, 8, roadY1 + 4, s, houseR)
  px(ctx, 9, roadY1 + 4, s, houseR)

  // 家2
  px(ctx, roadX1 + 8, roadY2 - 5, s, house)
  px(ctx, roadX1 + 9, roadY2 - 5, s, house)
  px(ctx, roadX1 + 8, roadY2 - 6, s, houseR)
  px(ctx, roadX1 + 9, roadY2 - 6, s, houseR)
}

// アリの巣（16部屋）
function drawNest16(ctx, cx, groundY, s) {
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

  // 最下層（女王の間 - 大きめ）
  for (let x = -6; x <= 7; x++) {
    px(ctx, cx + x, groundY + 33, s, hole)
    px(ctx, cx + x, groundY + 34, s, hole)
    px(ctx, cx + x, groundY + 35, s, hole)
  }
  for (let x = -5; x <= 6; x++) px(ctx, cx + x, groundY + 36, s, hole)
}

export function draw(ctx, pw, ph, s) {
  const groundY = Math.floor(ph * 0.45)

  drawSky(ctx, pw, groundY, s)
  drawUnderground(ctx, pw, ph, groundY, s)

  const nestCx = Math.floor(pw / 2)

  drawNest16(ctx, nestCx, groundY, s)

  drawGrass(ctx, pw, groundY, s, 8)

  drawPrefectureMap(ctx, pw, groundY, s)

  return { antX: nestCx, antY: groundY + 34 }
}
