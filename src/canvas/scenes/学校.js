import { px, pxRect, drawSky, drawUnderground, drawGrass } from '../pixelUtils'

// 学校の校舎
function drawSchool(ctx, pw, groundY, s) {
  const wall = '#E8E0D0'
  const wallD = '#D0C8B8'
  const roof = '#6B5B4B'
  const roofD = '#5A4A3A'
  const window_ = '#88BBDD'
  const windowD = '#6699BB'
  const frame = '#555555'
  const door = '#7A5A30'
  const doorD = '#6B4B28'

  const bx = Math.floor(pw * 0.2)
  const bw = Math.floor(pw * 0.6)
  const bh = 28
  const by = groundY - bh

  // 屋根
  for (let x = bx - 1; x <= bx + bw; x++) {
    px(ctx, x, by - 2, s, roofD)
    px(ctx, x, by - 1, s, roof)
  }

  // 壁
  for (let y = by; y < groundY; y++) {
    for (let x = bx; x < bx + bw; x++) {
      px(ctx, x, y, s, (y + x) % 5 === 0 ? wallD : wall)
    }
  }

  // 窓（2列×5個）
  const winW = 3
  const winH = 3
  const winGap = Math.floor((bw - 4) / 5)
  for (let row = 0; row < 2; row++) {
    const wy = by + 4 + row * 8
    for (let col = 0; col < 5; col++) {
      const wx = bx + 4 + col * winGap
      // 窓枠
      for (let x = -1; x <= winW; x++) {
        px(ctx, wx + x, wy - 1, s, frame)
        px(ctx, wx + x, wy + winH, s, frame)
      }
      for (let y = 0; y < winH; y++) {
        px(ctx, wx - 1, wy + y, s, frame)
        px(ctx, wx + winW, wy + y, s, frame)
      }
      // 窓ガラス
      for (let y = 0; y < winH; y++) {
        for (let x = 0; x < winW; x++) {
          px(ctx, wx + x, wy + y, s, (x + y) % 2 === 0 ? window_ : windowD)
        }
      }
    }
  }

  // 正面玄関
  const dx = bx + Math.floor(bw / 2) - 2
  const dy = groundY - 6
  for (let y = dy; y < groundY; y++) {
    for (let x = 0; x < 4; x++) {
      px(ctx, dx + x, y, s, x < 2 ? door : doorD)
    }
  }
  // 玄関上の庇
  for (let x = dx - 1; x <= dx + 4; x++) {
    px(ctx, x, dy - 1, s, roof)
  }
}

// 校庭（グラウンド）
function drawSchoolyard(ctx, pw, groundY, s) {
  const ground = '#C8B888'
  const groundD = '#B8A878'
  const line = '#FFFFFF'

  // グラウンドのライン（校庭の白線）
  const lx = Math.floor(pw * 0.15)
  const rx = Math.floor(pw * 0.85)
  for (let x = lx; x <= rx; x++) {
    px(ctx, x, groundY - 2, s, x % 8 < 2 ? line : ground)
  }

  // 旗竿
  const fx = Math.floor(pw * 0.1)
  for (let y = groundY - 18; y < groundY; y++) {
    px(ctx, fx, y, s, '#888888')
  }
  // 旗
  for (let y = 0; y < 3; y++) {
    for (let x = 1; x <= 4; x++) {
      px(ctx, fx + x, groundY - 18 + y, s, '#DD3333')
    }
  }
}

// アリの巣（12部屋）
function drawNest12(ctx, cx, groundY, s) {
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

  for (let y = 25; y <= 28; y++) px(ctx, cx, groundY + y, s, hole)

  // 最下層の大部屋（女王の間）
  for (let x = -6; x <= 7; x++) {
    px(ctx, cx + x, groundY + 29, s, hole)
    px(ctx, cx + x, groundY + 30, s, hole)
    px(ctx, cx + x, groundY + 31, s, hole)
  }
  for (let x = -5; x <= 6; x++) px(ctx, cx + x, groundY + 32, s, hole)
}

export function draw(ctx, pw, ph, s) {
  const groundY = Math.floor(ph * 0.45)

  drawSky(ctx, pw, groundY, s)
  drawUnderground(ctx, pw, ph, groundY, s)

  const nestCx = Math.floor(pw / 2)

  drawNest12(ctx, nestCx, groundY, s)

  drawGrass(ctx, pw, groundY, s, 8)

  drawSchool(ctx, pw, groundY, s)
  drawSchoolyard(ctx, pw, groundY, s)

  return { antX: nestCx, antY: groundY + 30 }
}
