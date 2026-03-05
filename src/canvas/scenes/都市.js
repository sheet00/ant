import { px, pxRect, drawSky, drawUnderground, drawGrass } from '../pixelUtils'

// 高層ビルを描く
function drawSkyscraper(ctx, x, groundY, w, h, color, colorD, s) {
  const window_ = '#DDEE88'
  const windowOff = '#556655'
  const frame = '#333333'

  const by = groundY - h

  // ビル本体
  for (let wy = by; wy < groundY; wy++) {
    for (let wx = x; wx < x + w; wx++) {
      px(ctx, wx, wy, s, (wx + wy) % 4 === 0 ? colorD : color)
    }
  }

  // 屋上ライン
  for (let wx = x; wx < x + w; wx++) {
    px(ctx, wx, by, s, frame)
  }

  // 屋上アンテナ（高いビルにはアンテナをつける）
  if (h > 35) {
    const ax = x + Math.floor(w / 2)
    for (let ay = by - 5; ay < by; ay++) {
      px(ctx, ax, ay, s, '#888888')
    }
    px(ctx, ax - 1, by - 3, s, '#888888')
    px(ctx, ax + 1, by - 3, s, '#888888')
    // 赤いランプ
    px(ctx, ax, by - 5, s, '#FF3333')
  }

  // 窓（グリッド状に配置）
  const winW = 1
  const winH = 1
  const gapX = 2
  const gapY = 3
  const cols = Math.floor((w - 2) / gapX)
  const rows = Math.floor((h - 3) / gapY)
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const wx = x + 1 + col * gapX
      const wy = by + 3 + row * gapY
      // ランダム風に明かりのON/OFF
      const lit = ((row * 11 + col * 7 + x * 3) % 5) !== 0
      px(ctx, wx, wy, s, lit ? window_ : windowOff)
      px(ctx, wx, wy + 1, s, lit ? window_ : windowOff)
    }
  }
}

// スカイラインの装飾（遠景の小さなビル影）
function drawDistantBuildings(ctx, pw, groundY, s) {
  const silhouette = '#8899AA'
  const silhouetteD = '#778899'

  const buildings = [
    { x: 0.0, w: 5, h: 8 },
    { x: 0.06, w: 4, h: 12 },
    { x: 0.12, w: 6, h: 6 },
    { x: 0.88, w: 5, h: 10 },
    { x: 0.94, w: 6, h: 7 },
  ]

  for (const b of buildings) {
    const bx = Math.floor(pw * b.x)
    const by = groundY - b.h
    for (let wy = by; wy < groundY; wy++) {
      for (let wx = bx; wx < bx + b.w; wx++) {
        px(ctx, wx, wy, s, wy % 2 === 0 ? silhouette : silhouetteD)
      }
    }
  }
}

// 道路と歩道
function drawCityRoad(ctx, pw, groundY, s) {
  // 歩道
  for (let x = 0; x < pw; x++) {
    px(ctx, x, groundY - 1, s, '#AAAAAA')
    px(ctx, x, groundY - 2, s, '#BBBBBB')
  }

  // 街灯（密に配置）
  for (let i = 0; i < 6; i++) {
    const lx = Math.floor(pw * (0.08 + i * 0.17))
    for (let y = groundY - 14; y < groundY - 1; y++) {
      px(ctx, lx, y, s, '#666666')
    }
    px(ctx, lx - 1, groundY - 14, s, '#FFEE55')
    px(ctx, lx, groundY - 14, s, '#FFFF77')
    px(ctx, lx + 1, groundY - 14, s, '#FFEE55')
  }
}

// アリの巣（15部屋）
function drawNest15(ctx, cx, groundY, s) {
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

  for (let y = 30; y <= 34; y++) px(ctx, cx, groundY + y, s, hole)

  // 左7（追加部屋）
  for (let x = -4; x <= -1; x++) px(ctx, cx + x, groundY + 33, s, hole)
  for (let x = -8; x <= -3; x++) {
    px(ctx, cx + x, groundY + 34, s, hole)
    px(ctx, cx + x, groundY + 35, s, hole)
  }
  for (let x = -7; x <= -4; x++) px(ctx, cx + x, groundY + 36, s, hole)

  for (let y = 35; y <= 38; y++) px(ctx, cx, groundY + y, s, hole)

  // 最下層の大部屋（女王の間）
  for (let x = -8; x <= 9; x++) {
    px(ctx, cx + x, groundY + 39, s, hole)
    px(ctx, cx + x, groundY + 40, s, hole)
    px(ctx, cx + x, groundY + 41, s, hole)
    px(ctx, cx + x, groundY + 42, s, hole)
  }
  for (let x = -7; x <= 8; x++) px(ctx, cx + x, groundY + 43, s, hole)
}

export function draw(ctx, pw, ph, s) {
  const groundY = Math.floor(ph * 0.45)

  drawSky(ctx, pw, groundY, s)
  drawUnderground(ctx, pw, ph, groundY, s)

  const nestCx = Math.floor(pw / 2)

  drawNest15(ctx, nestCx, groundY, s)

  drawGrass(ctx, pw, groundY, s, 3)

  // 遠景ビル
  drawDistantBuildings(ctx, pw, groundY, s)

  // 高層ビル群（スカイライン）
  drawSkyscraper(ctx, Math.floor(pw * 0.02), groundY, 10, 38, '#606878', '#505868', s)
  drawSkyscraper(ctx, Math.floor(pw * 0.14), groundY, 14, 45, '#687068', '#586058', s)
  drawSkyscraper(ctx, Math.floor(pw * 0.30), groundY, 8, 30, '#706868', '#605858', s)
  drawSkyscraper(ctx, Math.floor(pw * 0.42), groundY, 12, 50, '#607080', '#506070', s)
  drawSkyscraper(ctx, Math.floor(pw * 0.58), groundY, 11, 35, '#687070', '#586060', s)
  drawSkyscraper(ctx, Math.floor(pw * 0.72), groundY, 15, 42, '#706878', '#605868', s)
  drawSkyscraper(ctx, Math.floor(pw * 0.90), groundY, 9, 28, '#687068', '#586058', s)

  // 道路と街灯
  drawCityRoad(ctx, pw, groundY, s)

  return { antX: nestCx, antY: groundY + 41 }
}
