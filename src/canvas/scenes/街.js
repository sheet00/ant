import { px, pxRect, drawSky, drawUnderground, drawGrass } from '../pixelUtils'

// ビルを描く
function drawBuilding(ctx, x, groundY, w, h, color, colorD, s) {
  const window_ = '#AACC55'
  const windowOff = '#556655'
  const frame = '#444444'

  const by = groundY - h

  // ビル本体
  for (let wy = by; wy < groundY; wy++) {
    for (let wx = x; wx < x + w; wx++) {
      px(ctx, wx, wy, s, (wx + wy) % 3 === 0 ? colorD : color)
    }
  }

  // 屋上のライン
  for (let wx = x; wx < x + w; wx++) {
    px(ctx, wx, by, s, frame)
    px(ctx, wx, by + 1, s, colorD)
  }

  // 窓（グリッド状に配置）
  const winW = 2
  const winH = 2
  const gapX = winW + 2
  const gapY = winH + 2
  const cols = Math.floor((w - 2) / gapX)
  const rows = Math.floor((h - 4) / gapY)
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const wx = x + 2 + col * gapX
      const wy = by + 4 + row * gapY
      // ランダム風に明かりのON/OFF
      const lit = ((row * 7 + col * 13 + x) % 3) !== 0
      for (let dy = 0; dy < winH; dy++) {
        for (let dx = 0; dx < winW; dx++) {
          px(ctx, wx + dx, wy + dy, s, lit ? window_ : windowOff)
        }
      }
    }
  }
}

// 道路
function drawRoad(ctx, pw, groundY, s) {
  const asphalt = '#555555'
  const asphaltD = '#444444'
  const line = '#DDDD55'

  // 歩道
  for (let x = 0; x < pw; x++) {
    px(ctx, x, groundY - 1, s, '#999999')
    px(ctx, x, groundY - 2, s, '#AAAAAA')
  }

  // 街灯
  const lampPositions = [Math.floor(pw * 0.15), Math.floor(pw * 0.5), Math.floor(pw * 0.85)]
  for (const lx of lampPositions) {
    for (let y = groundY - 16; y < groundY - 1; y++) {
      px(ctx, lx, y, s, '#777777')
    }
    // ランプ
    px(ctx, lx - 1, groundY - 16, s, '#FFDD44')
    px(ctx, lx, groundY - 16, s, '#FFEE66')
    px(ctx, lx + 1, groundY - 16, s, '#FFDD44')
  }
}

// アリの巣（14部屋）
function drawNest14(ctx, cx, groundY, s) {
  const hole = '#1A1008'

  // 入口
  px(ctx, cx, groundY, s, hole)
  px(ctx, cx + 1, groundY, s, hole)

  // メイン縦トンネル
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
  for (let x = -5; x <= -1; x++) px(ctx, cx + x, groundY + 8, s, hole)
  for (let x = -8; x <= -4; x++) {
    px(ctx, cx + x, groundY + 9, s, hole)
    px(ctx, cx + x, groundY + 10, s, hole)
  }
  for (let x = -7; x <= -5; x++) px(ctx, cx + x, groundY + 11, s, hole)

  // 右2
  for (let x = 1; x <= 6; x++) px(ctx, cx + x, groundY + 10, s, hole)
  for (let x = 5; x <= 10; x++) {
    px(ctx, cx + x, groundY + 11, s, hole)
    px(ctx, cx + x, groundY + 12, s, hole)
  }
  for (let x = 6; x <= 9; x++) px(ctx, cx + x, groundY + 13, s, hole)

  for (let y = 10; y <= 14; y++) px(ctx, cx, groundY + y, s, hole)

  // 左3
  for (let x = -4; x <= -1; x++) px(ctx, cx + x, groundY + 13, s, hole)
  for (let x = -7; x <= -3; x++) {
    px(ctx, cx + x, groundY + 14, s, hole)
    px(ctx, cx + x, groundY + 15, s, hole)
  }
  for (let x = -6; x <= -4; x++) px(ctx, cx + x, groundY + 16, s, hole)

  // 右3
  for (let x = 1; x <= 5; x++) px(ctx, cx + x, groundY + 15, s, hole)
  for (let x = 4; x <= 9; x++) {
    px(ctx, cx + x, groundY + 16, s, hole)
    px(ctx, cx + x, groundY + 17, s, hole)
  }
  for (let x = 5; x <= 8; x++) px(ctx, cx + x, groundY + 18, s, hole)

  for (let y = 15; y <= 19; y++) px(ctx, cx, groundY + y, s, hole)

  // 左4
  for (let x = -5; x <= -1; x++) px(ctx, cx + x, groundY + 18, s, hole)
  for (let x = -9; x <= -4; x++) {
    px(ctx, cx + x, groundY + 19, s, hole)
    px(ctx, cx + x, groundY + 20, s, hole)
  }
  for (let x = -8; x <= -5; x++) px(ctx, cx + x, groundY + 21, s, hole)

  // 右4
  for (let x = 1; x <= 6; x++) px(ctx, cx + x, groundY + 20, s, hole)
  for (let x = 5; x <= 11; x++) {
    px(ctx, cx + x, groundY + 21, s, hole)
    px(ctx, cx + x, groundY + 22, s, hole)
  }
  for (let x = 6; x <= 10; x++) px(ctx, cx + x, groundY + 23, s, hole)

  for (let y = 20; y <= 24; y++) px(ctx, cx, groundY + y, s, hole)

  // 左5
  for (let x = -4; x <= -1; x++) px(ctx, cx + x, groundY + 23, s, hole)
  for (let x = -8; x <= -3; x++) {
    px(ctx, cx + x, groundY + 24, s, hole)
    px(ctx, cx + x, groundY + 25, s, hole)
  }
  for (let x = -7; x <= -4; x++) px(ctx, cx + x, groundY + 26, s, hole)

  // 右5
  for (let x = 1; x <= 5; x++) px(ctx, cx + x, groundY + 25, s, hole)
  for (let x = 4; x <= 9; x++) {
    px(ctx, cx + x, groundY + 26, s, hole)
    px(ctx, cx + x, groundY + 27, s, hole)
  }
  for (let x = 5; x <= 8; x++) px(ctx, cx + x, groundY + 28, s, hole)

  for (let y = 25; y <= 29; y++) px(ctx, cx, groundY + y, s, hole)

  // 左6
  for (let x = -5; x <= -1; x++) px(ctx, cx + x, groundY + 28, s, hole)
  for (let x = -9; x <= -4; x++) {
    px(ctx, cx + x, groundY + 29, s, hole)
    px(ctx, cx + x, groundY + 30, s, hole)
  }
  for (let x = -8; x <= -5; x++) px(ctx, cx + x, groundY + 31, s, hole)

  // 右6
  for (let x = 1; x <= 6; x++) px(ctx, cx + x, groundY + 30, s, hole)
  for (let x = 5; x <= 10; x++) {
    px(ctx, cx + x, groundY + 31, s, hole)
    px(ctx, cx + x, groundY + 32, s, hole)
  }
  for (let x = 6; x <= 9; x++) px(ctx, cx + x, groundY + 33, s, hole)

  for (let y = 30; y <= 35; y++) px(ctx, cx, groundY + y, s, hole)

  // 最下層の大部屋（女王の間）
  for (let x = -7; x <= 8; x++) {
    px(ctx, cx + x, groundY + 36, s, hole)
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

  drawNest14(ctx, nestCx, groundY, s)

  drawGrass(ctx, pw, groundY, s, 4)

  // ビル群（高さ違い）
  drawBuilding(ctx, Math.floor(pw * 0.02), groundY, 12, 30, '#707080', '#606070', s)
  drawBuilding(ctx, Math.floor(pw * 0.18), groundY, 15, 22, '#808070', '#707060', s)
  drawBuilding(ctx, Math.floor(pw * 0.40), groundY, 10, 35, '#607070', '#506060', s)
  drawBuilding(ctx, Math.floor(pw * 0.58), groundY, 14, 26, '#807070', '#706060', s)
  drawBuilding(ctx, Math.floor(pw * 0.78), groundY, 16, 32, '#707080', '#606070', s)

  // 道路と街灯
  drawRoad(ctx, pw, groundY, s)

  return { antX: nestCx, antY: groundY + 38 }
}
