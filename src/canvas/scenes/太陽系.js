import { px, pxRect } from '../pixelUtils'

// 宇宙背景（黒+星）
function drawSpace(ctx, pw, ph, s) {
  pxRect(ctx, 0, 0, pw, ph, s, '#0A0A1A')
  for (let i = 0; i < 40; i++) {
    const sx = (i * 137 + 33) % pw
    const sy = (i * 191 + 17) % ph
    px(ctx, sx, sy, s, i % 3 === 0 ? '#FFFFFF' : '#AAAACC')
  }
}

// 太陽（中央のドット円）
function drawSun(ctx, cx, cy, s) {
  const colors = {
    core: '#FFFF88',
    inner: '#FFDD44',
    mid: '#FFAA22',
    outer: '#FF8800',
    corona: '#FF660044'
  }

  // コロナ（最外縁、薄い光）
  for (let dy = -10; dy <= 10; dy++) {
    const w = Math.floor(10 * Math.sqrt(1 - (dy * dy) / 100))
    for (let dx = -w; dx <= w; dx++) {
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist > 7) {
        px(ctx, cx + dx, cy + dy, s, '#442200')
      }
    }
  }

  // 外層（オレンジ）
  for (let dy = -7; dy <= 7; dy++) {
    const w = Math.floor(7 * Math.sqrt(1 - (dy * dy) / 49))
    for (let dx = -w; dx <= w; dx++) {
      px(ctx, cx + dx, cy + dy, s, colors.outer)
    }
  }

  // 中層
  for (let dy = -5; dy <= 5; dy++) {
    const w = Math.floor(5 * Math.sqrt(1 - (dy * dy) / 25))
    for (let dx = -w; dx <= w; dx++) {
      px(ctx, cx + dx, cy + dy, s, colors.mid)
    }
  }

  // 内層（黄色）
  for (let dy = -3; dy <= 3; dy++) {
    const w = Math.floor(3 * Math.sqrt(1 - (dy * dy) / 9))
    for (let dx = -w; dx <= w; dx++) {
      px(ctx, cx + dx, cy + dy, s, colors.inner)
    }
  }

  // 核（白に近い黄色）
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      px(ctx, cx + dx, cy + dy, s, colors.core)
    }
  }
}

// 惑星を描画
function drawPlanets(ctx, cx, cy, pw, ph, s) {
  // 水星（小さい灰色）
  const meX = cx - 14, meY = cy - 2
  px(ctx, meX, meY, s, '#AAAAAA')
  px(ctx, meX + 1, meY, s, '#888888')

  // 金星（黄白色）
  const veX = cx - 19, veY = cy + 5
  px(ctx, veX, veY, s, '#EEDD99')
  px(ctx, veX + 1, veY, s, '#DDCC88')
  px(ctx, veX, veY + 1, s, '#CCBB77')
  px(ctx, veX + 1, veY + 1, s, '#EEDD99')

  // 地球（青+緑）
  const eaX = cx + 20, eaY = cy - 6
  px(ctx, eaX, eaY, s, '#4488CC')
  px(ctx, eaX + 1, eaY, s, '#44AA44')
  px(ctx, eaX, eaY + 1, s, '#4488CC')
  px(ctx, eaX + 1, eaY + 1, s, '#4488CC')
  // 月
  px(ctx, eaX + 3, eaY - 1, s, '#CCCCCC')

  // 火星（赤）
  const maX = cx - 26, maY = cy - 8
  px(ctx, maX, maY, s, '#CC4422')
  px(ctx, maX + 1, maY, s, '#AA3318')
  px(ctx, maX, maY + 1, s, '#CC4422')

  // 木星（大きめ、縞模様）
  const juX = cx + 30, juY = cy + 8
  for (let dy = -2; dy <= 2; dy++) {
    const w = dy === -2 || dy === 2 ? 2 : 3
    for (let dx = -w; dx <= w; dx++) {
      const c = dy === 0 ? '#CC8844' : dy === 1 ? '#DDAA66' : '#BB7733'
      px(ctx, juX + dx, juY + dy, s, c)
    }
  }
  // 大赤斑
  px(ctx, juX + 1, juY, s, '#CC4422')

  // 土星（輪っか付き）
  const saX = cx - 35, saY = cy + 12
  for (let dy = -1; dy <= 1; dy++) {
    const w = dy === 0 ? 2 : 1
    for (let dx = -w; dx <= w; dx++) {
      px(ctx, saX + dx, saY + dy, s, '#DDBB77')
    }
  }
  // 輪
  for (let dx = -4; dx <= 4; dx++) {
    if (dx >= -1 && dx <= 1) continue
    px(ctx, saX + dx, saY, s, '#AA9966')
  }

  // 天王星（水色）
  const urX = cx + 38, urY = cy - 12
  px(ctx, urX, urY, s, '#88CCDD')
  px(ctx, urX + 1, urY, s, '#77BBCC')

  // 海王星（青）
  const neX = cx - 42, neY = cy - 4
  px(ctx, neX, neY, s, '#3366CC')
  px(ctx, neX + 1, neY, s, '#2255BB')
}

// 軌道線（点線で表現）
function drawOrbits(ctx, cx, cy, s) {
  const radii = [12, 17, 21, 25, 31, 36, 39, 43]
  for (const r of radii) {
    const steps = Math.floor(r * 4)
    for (let i = 0; i < steps; i++) {
      if (i % 3 !== 0) continue
      const angle = (i / steps) * Math.PI * 2
      const ox = cx + Math.round(r * Math.cos(angle))
      const oy = cy + Math.round(r * 0.4 * Math.sin(angle))
      px(ctx, ox, oy, s, '#222244')
    }
  }
}

// アリの巣（21部屋）- 太陽の下半分に
function drawNest21(ctx, cx, cy, s) {
  const hole = '#1A1008'

  // 入口（太陽の中心付近）
  px(ctx, cx, cy, s, hole)
  px(ctx, cx + 1, cy, s, hole)

  // 縦トンネル1
  for (let y = 1; y <= 4; y++) px(ctx, cx, cy + y, s, hole)

  // 左1
  for (let x = -3; x <= -1; x++) px(ctx, cx + x, cy + 3, s, hole)
  for (let x = -5; x <= -2; x++) {
    px(ctx, cx + x, cy + 4, s, hole)
    px(ctx, cx + x, cy + 5, s, hole)
  }
  for (let x = -4; x <= -3; x++) px(ctx, cx + x, cy + 6, s, hole)

  // 右1
  for (let x = 1; x <= 4; x++) px(ctx, cx + x, cy + 4, s, hole)
  for (let x = 3; x <= 7; x++) {
    px(ctx, cx + x, cy + 5, s, hole)
    px(ctx, cx + x, cy + 6, s, hole)
  }
  for (let x = 4; x <= 6; x++) px(ctx, cx + x, cy + 7, s, hole)

  // 縦トンネル2
  for (let y = 5; y <= 8; y++) px(ctx, cx, cy + y, s, hole)

  // 左2
  for (let x = -4; x <= -1; x++) px(ctx, cx + x, cy + 8, s, hole)
  for (let x = -7; x <= -3; x++) {
    px(ctx, cx + x, cy + 9, s, hole)
    px(ctx, cx + x, cy + 10, s, hole)
  }
  for (let x = -6; x <= -4; x++) px(ctx, cx + x, cy + 11, s, hole)

  // 右2
  for (let x = 1; x <= 5; x++) px(ctx, cx + x, cy + 8, s, hole)
  for (let x = 4; x <= 9; x++) {
    px(ctx, cx + x, cy + 9, s, hole)
    px(ctx, cx + x, cy + 10, s, hole)
  }
  for (let x = 5; x <= 8; x++) px(ctx, cx + x, cy + 11, s, hole)

  // 縦トンネル3
  for (let y = 9; y <= 13; y++) px(ctx, cx, cy + y, s, hole)

  // 左3
  for (let x = -5; x <= -1; x++) px(ctx, cx + x, cy + 12, s, hole)
  for (let x = -8; x <= -4; x++) {
    px(ctx, cx + x, cy + 13, s, hole)
    px(ctx, cx + x, cy + 14, s, hole)
  }
  for (let x = -7; x <= -5; x++) px(ctx, cx + x, cy + 15, s, hole)

  // 右3
  for (let x = 1; x <= 6; x++) px(ctx, cx + x, cy + 12, s, hole)
  for (let x = 5; x <= 10; x++) {
    px(ctx, cx + x, cy + 13, s, hole)
    px(ctx, cx + x, cy + 14, s, hole)
  }
  for (let x = 6; x <= 9; x++) px(ctx, cx + x, cy + 15, s, hole)

  // 縦トンネル4
  for (let y = 14; y <= 18; y++) px(ctx, cx, cy + y, s, hole)

  // 左4
  for (let x = -4; x <= -1; x++) px(ctx, cx + x, cy + 17, s, hole)
  for (let x = -7; x <= -3; x++) {
    px(ctx, cx + x, cy + 18, s, hole)
    px(ctx, cx + x, cy + 19, s, hole)
  }
  for (let x = -6; x <= -4; x++) px(ctx, cx + x, cy + 20, s, hole)

  // 右4
  for (let x = 1; x <= 5; x++) px(ctx, cx + x, cy + 17, s, hole)
  for (let x = 4; x <= 9; x++) {
    px(ctx, cx + x, cy + 18, s, hole)
    px(ctx, cx + x, cy + 19, s, hole)
  }
  for (let x = 5; x <= 8; x++) px(ctx, cx + x, cy + 20, s, hole)

  // 縦トンネル5
  for (let y = 19; y <= 24; y++) px(ctx, cx, cy + y, s, hole)

  // 左5
  for (let x = -5; x <= -1; x++) px(ctx, cx + x, cy + 23, s, hole)
  for (let x = -9; x <= -4; x++) {
    px(ctx, cx + x, cy + 24, s, hole)
    px(ctx, cx + x, cy + 25, s, hole)
  }
  for (let x = -8; x <= -5; x++) px(ctx, cx + x, cy + 26, s, hole)

  // 右5
  for (let x = 1; x <= 6; x++) px(ctx, cx + x, cy + 23, s, hole)
  for (let x = 5; x <= 11; x++) {
    px(ctx, cx + x, cy + 24, s, hole)
    px(ctx, cx + x, cy + 25, s, hole)
  }
  for (let x = 6; x <= 10; x++) px(ctx, cx + x, cy + 26, s, hole)

  // 最下層（大部屋、21部屋目の追加）
  for (let y = 25; y <= 30; y++) px(ctx, cx, cy + y, s, hole)

  // 左6
  for (let x = -6; x <= -1; x++) px(ctx, cx + x, cy + 29, s, hole)
  for (let x = -10; x <= -5; x++) {
    px(ctx, cx + x, cy + 30, s, hole)
    px(ctx, cx + x, cy + 31, s, hole)
  }
  for (let x = -9; x <= -6; x++) px(ctx, cx + x, cy + 32, s, hole)

  // 最底部
  for (let x = -7; x <= 8; x++) {
    px(ctx, cx + x, cy + 33, s, hole)
    px(ctx, cx + x, cy + 34, s, hole)
    px(ctx, cx + x, cy + 35, s, hole)
  }
  for (let x = -6; x <= 7; x++) px(ctx, cx + x, cy + 36, s, hole)
}

export function draw(ctx, pw, ph, s) {
  const cx = Math.floor(pw / 2)
  const cy = Math.floor(ph * 0.4)

  drawSpace(ctx, pw, ph, s)
  drawOrbits(ctx, cx, cy, s)
  drawSun(ctx, cx, cy, s)
  drawPlanets(ctx, cx, cy, pw, ph, s)

  // 巣は太陽の中心から下に展開
  drawNest21(ctx, cx, cy, s)

  return { antX: cx, antY: cy + 34 }
}
