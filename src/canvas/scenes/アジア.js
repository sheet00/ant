import { px, pxRect, drawSky, drawUnderground, drawGrass } from '../pixelUtils'

// アジア大陸のシルエット（簡略化ドット絵）
function drawAsiaMap(ctx, pw, groundY, s) {
  const land = '#4CAF50'
  const landD = '#2E7D32'
  const landL = '#66BB6A'
  const sea = '#1565C0'
  const seaL = '#1E88E5'
  const desert = '#C8B560'
  const mountain = '#795548'

  // 海を地上部分に描く
  for (let y = 2; y < groundY - 2; y++) {
    for (let x = 0; x < pw; x++) {
      px(ctx, x, y, s, (x + y) % 9 === 0 ? seaL : sea)
    }
  }

  const cx = Math.floor(pw / 2)
  const topY = 3

  // ロシア/シベリア（上部の広い陸地）
  for (let x = -20; x <= 15; x++) {
    px(ctx, cx + x, topY, s, landD)
    px(ctx, cx + x, topY + 1, s, land)
  }
  for (let x = -22; x <= 18; x++) {
    px(ctx, cx + x, topY + 2, s, land)
    px(ctx, cx + x, topY + 3, s, landD)
  }
  for (let x = -20; x <= 20; x++) {
    px(ctx, cx + x, topY + 4, s, land)
  }
  for (let x = -18; x <= 20; x++) {
    px(ctx, cx + x, topY + 5, s, landL)
  }

  // 中央アジア〜中国
  for (let x = -18; x <= 16; x++) {
    px(ctx, cx + x, topY + 6, s, land)
  }
  for (let x = -16; x <= 14; x++) {
    px(ctx, cx + x, topY + 7, s, land)
  }
  for (let x = -14; x <= 12; x++) {
    px(ctx, cx + x, topY + 8, s, (x > -5 && x < 5) ? mountain : land)
  }
  for (let x = -12; x <= 10; x++) {
    px(ctx, cx + x, topY + 9, s, land)
  }
  for (let x = -10; x <= 8; x++) {
    px(ctx, cx + x, topY + 10, s, landD)
  }

  // 中東〜インド
  for (let x = -16; x <= -8; x++) {
    px(ctx, cx + x, topY + 9, s, desert)
    px(ctx, cx + x, topY + 10, s, desert)
  }
  // アラビア半島
  for (let x = -18; x <= -12; x++) {
    px(ctx, cx + x, topY + 11, s, desert)
    px(ctx, cx + x, topY + 12, s, desert)
  }
  for (let x = -17; x <= -13; x++) {
    px(ctx, cx + x, topY + 13, s, desert)
  }

  // インド亜大陸
  for (let x = -8; x <= -2; x++) {
    px(ctx, cx + x, topY + 11, s, land)
    px(ctx, cx + x, topY + 12, s, landD)
  }
  for (let x = -7; x <= -3; x++) {
    px(ctx, cx + x, topY + 13, s, land)
  }
  for (let x = -6; x <= -4; x++) {
    px(ctx, cx + x, topY + 14, s, land)
  }
  px(ctx, cx - 5, topY + 15, s, landD)

  // 東南アジア
  for (let x = -2; x <= 6; x++) {
    px(ctx, cx + x, topY + 11, s, land)
  }
  for (let x = 0; x <= 4; x++) {
    px(ctx, cx + x, topY + 12, s, landD)
  }
  for (let x = 1; x <= 3; x++) {
    px(ctx, cx + x, topY + 13, s, land)
  }
  px(ctx, cx + 2, topY + 14, s, land)

  // インドネシア（島々）
  for (let i = 0; i < 6; i++) {
    px(ctx, cx - 2 + i * 3, topY + 16, s, land)
    px(ctx, cx - 1 + i * 3, topY + 16, s, landD)
  }

  // 日本列島（小さく）
  px(ctx, cx + 14, topY + 6, s, '#81C784')
  px(ctx, cx + 13, topY + 7, s, '#81C784')
  px(ctx, cx + 12, topY + 8, s, '#81C784')
  px(ctx, cx + 12, topY + 9, s, '#81C784')

  // アリの巣の位置マーカー（日本付近）
  px(ctx, cx + 13, topY + 8, s, '#FF1744')
}

// アリの巣（18部屋）
function drawNest18(ctx, cx, groundY, s) {
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

  // 左8
  for (let x = -4; x <= -1; x++) px(ctx, cx + x, groundY + 31, s, hole)
  for (let x = -7; x <= -3; x++) {
    px(ctx, cx + x, groundY + 32, s, hole)
    px(ctx, cx + x, groundY + 33, s, hole)
  }

  // 右8（18部屋目の追加分）
  for (let x = 1; x <= 5; x++) px(ctx, cx + x, groundY + 31, s, hole)
  for (let x = 4; x <= 9; x++) {
    px(ctx, cx + x, groundY + 32, s, hole)
    px(ctx, cx + x, groundY + 33, s, hole)
  }

  // 縦トンネル9
  for (let y = 33; y <= 36; y++) px(ctx, cx, groundY + y, s, hole)

  // 最下層（女王の間）
  for (let x = -7; x <= 8; x++) {
    px(ctx, cx + x, groundY + 37, s, hole)
    px(ctx, cx + x, groundY + 38, s, hole)
    px(ctx, cx + x, groundY + 39, s, hole)
  }
  for (let x = -6; x <= 7; x++) px(ctx, cx + x, groundY + 40, s, hole)
}

export function draw(ctx, pw, ph, s) {
  const groundY = Math.floor(ph * 0.45)

  drawSky(ctx, pw, groundY, s)
  drawUnderground(ctx, pw, ph, groundY, s)

  const nestCx = Math.floor(pw / 2)

  drawNest18(ctx, nestCx, groundY, s)

  drawGrass(ctx, pw, groundY, s, 5)

  drawAsiaMap(ctx, pw, groundY, s)

  return { antX: nestCx, antY: groundY + 38 }
}
