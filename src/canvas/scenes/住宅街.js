import { px, pxRect, drawSky, drawUnderground, drawGrass } from '../pixelUtils'

// 三角屋根の家
function drawHouse(ctx, x, groundY, w, h, roofColor, wallColor, s) {
  const roofD = '#5A4A3A'
  const wallD = '#C8C0B0'
  const window_ = '#88BBDD'
  const windowD = '#6699BB'
  const frame = '#555555'
  const door = '#7A5A30'

  const by = groundY - h

  // 三角屋根
  const peakY = by - Math.floor(w / 2)
  const cx = x + Math.floor(w / 2)
  for (let ry = peakY; ry <= by; ry++) {
    const spread = Math.floor((ry - peakY) * w / (by - peakY) / 2)
    for (let rx = cx - spread; rx <= cx + spread; rx++) {
      px(ctx, rx, ry, s, ry === peakY || rx === cx - spread || rx === cx + spread ? roofD : roofColor)
    }
  }

  // 壁
  for (let wy = by; wy < groundY; wy++) {
    for (let wx = x; wx < x + w; wx++) {
      px(ctx, wx, wy, s, (wx + wy) % 7 === 0 ? wallD : wallColor)
    }
  }

  // 窓（2つ）
  const winW = 2
  const winH = 2
  const wy = by + 3
  for (let row = 0; row < 2; row++) {
    const wx = x + 2 + row * (w - 6)
    for (let dy = -1; dy <= winH; dy++) {
      for (let dx = -1; dx <= winW; dx++) {
        if (dy === -1 || dy === winH || dx === -1 || dx === winW) {
          px(ctx, wx + dx, wy + dy, s, frame)
        } else {
          px(ctx, wx + dx, wy + dy, s, (dx + dy) % 2 === 0 ? window_ : windowD)
        }
      }
    }
  }

  // ドア
  const dx = x + Math.floor(w / 2) - 1
  for (let dy = groundY - 5; dy < groundY; dy++) {
    px(ctx, dx, dy, s, door)
    px(ctx, dx + 1, dy, s, door)
  }
}

// 塀
function drawFence(ctx, pw, groundY, s) {
  const fence = '#C8B898'
  const fenceD = '#B0A080'

  for (let x = 2; x < pw - 2; x += 5) {
    // 縦の柱
    for (let y = groundY - 6; y < groundY; y++) {
      px(ctx, x, y, s, fence)
    }
  }
  // 横棒
  for (let x = 2; x < pw - 2; x++) {
    px(ctx, x, groundY - 5, s, fenceD)
    px(ctx, x, groundY - 2, s, fenceD)
  }
}

// 電柱
function drawPole(ctx, x, groundY, s) {
  const pole = '#666666'
  const wire = '#444444'
  for (let y = groundY - 30; y < groundY; y++) {
    px(ctx, x, y, s, pole)
  }
  // 横木
  for (let dx = -3; dx <= 3; dx++) {
    px(ctx, x + dx, groundY - 28, s, pole)
  }
  // 電線（左右に伸ばす）
  for (let dx = -15; dx <= 15; dx++) {
    const sag = Math.floor(Math.abs(dx) * 0.1)
    px(ctx, x + dx, groundY - 28 + sag, s, wire)
  }
}

// アリの巣（13部屋）
function drawNest13(ctx, cx, groundY, s) {
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

  // 左6（追加部屋）
  for (let x = -5; x <= -1; x++) px(ctx, cx + x, groundY + 28, s, hole)
  for (let x = -9; x <= -4; x++) {
    px(ctx, cx + x, groundY + 29, s, hole)
    px(ctx, cx + x, groundY + 30, s, hole)
  }
  for (let x = -8; x <= -5; x++) px(ctx, cx + x, groundY + 31, s, hole)

  for (let y = 30; y <= 33; y++) px(ctx, cx, groundY + y, s, hole)

  // 最下層の大部屋（女王の間）
  for (let x = -6; x <= 7; x++) {
    px(ctx, cx + x, groundY + 34, s, hole)
    px(ctx, cx + x, groundY + 35, s, hole)
    px(ctx, cx + x, groundY + 36, s, hole)
  }
  for (let x = -5; x <= 6; x++) px(ctx, cx + x, groundY + 37, s, hole)
}

export function draw(ctx, pw, ph, s) {
  const groundY = Math.floor(ph * 0.45)

  drawSky(ctx, pw, groundY, s)
  drawUnderground(ctx, pw, ph, groundY, s)

  const nestCx = Math.floor(pw / 2)

  drawNest13(ctx, nestCx, groundY, s)

  drawGrass(ctx, pw, groundY, s, 6)

  // 家を3軒並べる
  drawHouse(ctx, Math.floor(pw * 0.05), groundY, 16, 14, '#B05050', '#E8E0D0', s)
  drawHouse(ctx, Math.floor(pw * 0.35), groundY, 18, 16, '#508050', '#E0D8C8', s)
  drawHouse(ctx, Math.floor(pw * 0.68), groundY, 15, 13, '#5050A0', '#D8D0C0', s)

  // 塀
  drawFence(ctx, pw, groundY, s)

  // 電柱
  drawPole(ctx, Math.floor(pw * 0.92), groundY, s)

  return { antX: nestCx, antY: groundY + 35 }
}
