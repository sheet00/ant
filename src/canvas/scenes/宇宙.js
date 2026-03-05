import { px, pxRect } from '../pixelUtils'

// 宇宙背景（黒+星、通常より多め）
function drawSpace(ctx, pw, ph, s) {
  pxRect(ctx, 0, 0, pw, ph, s, '#0A0A1A')
  for (let i = 0; i < 40; i++) {
    const sx = (i * 137 + 33) % pw
    const sy = (i * 191 + 17) % ph
    px(ctx, sx, sy, s, i % 3 === 0 ? '#FFFFFF' : '#AAAACC')
  }
}

// 星雲（紫/青/ピンクのガス雲）
function drawNebulae(ctx, pw, ph, s) {
  // 大きな紫の星雲（左上）
  const n1x = Math.floor(pw * 0.2), n1y = Math.floor(ph * 0.2)
  const purples = ['#442266', '#553377', '#3A1155', '#664488', '#553366']
  for (let i = 0; i < 60; i++) {
    const angle = i * 2.39996
    const r = 2 + (i % 8) * 1.5
    const nx = n1x + Math.round(r * Math.cos(angle))
    const ny = n1y + Math.round(r * 0.7 * Math.sin(angle))
    if (nx >= 0 && nx < pw && ny >= 0 && ny < ph) {
      px(ctx, nx, ny, s, purples[i % purples.length])
    }
  }

  // ピンクの星雲（右上）
  const n2x = Math.floor(pw * 0.8), n2y = Math.floor(ph * 0.15)
  const pinks = ['#662244', '#883366', '#773355', '#AA4477', '#993366']
  for (let i = 0; i < 50; i++) {
    const angle = i * 1.8 + 0.5
    const r = 2 + (i % 6) * 1.3
    const nx = n2x + Math.round(r * Math.cos(angle))
    const ny = n2y + Math.round(r * 0.6 * Math.sin(angle))
    if (nx >= 0 && nx < pw && ny >= 0 && ny < ph) {
      px(ctx, nx, ny, s, pinks[i % pinks.length])
    }
  }

  // 青い星雲（中央下）
  const n3x = Math.floor(pw * 0.5), n3y = Math.floor(ph * 0.75)
  const blues = ['#223366', '#334477', '#1A2255', '#445588', '#334466']
  for (let i = 0; i < 55; i++) {
    const angle = i * 2.1 + 1.0
    const r = 3 + (i % 7) * 1.4
    const nx = n3x + Math.round(r * Math.cos(angle))
    const ny = n3y + Math.round(r * 0.65 * Math.sin(angle))
    if (nx >= 0 && nx < pw && ny >= 0 && ny < ph) {
      px(ctx, nx, ny, s, blues[i % blues.length])
    }
  }

  // 緑がかった星雲（左下）
  const n4x = Math.floor(pw * 0.12), n4y = Math.floor(ph * 0.65)
  const teals = ['#224444', '#335555', '#1A3333', '#446666']
  for (let i = 0; i < 35; i++) {
    const angle = i * 2.7
    const r = 2 + (i % 5) * 1.2
    const nx = n4x + Math.round(r * Math.cos(angle))
    const ny = n4y + Math.round(r * 0.7 * Math.sin(angle))
    if (nx >= 0 && nx < pw && ny >= 0 && ny < ph) {
      px(ctx, nx, ny, s, teals[i % teals.length])
    }
  }
}

// 複数の銀河
function drawGalaxies(ctx, pw, ph, s) {
  // 渦巻き銀河1（左）
  const g1x = Math.floor(pw * 0.2), g1y = Math.floor(ph * 0.45)
  for (let arm = 0; arm < 2; arm++) {
    const base = arm * Math.PI
    for (let t = 0; t < 60; t++) {
      const angle = base + t * 0.12
      const r = 2 + t * 0.1
      const gx = g1x + Math.round(r * Math.cos(angle))
      const gy = g1y + Math.round(r * 0.4 * Math.sin(angle))
      if (gx >= 0 && gx < pw && gy >= 0 && gy < ph) {
        px(ctx, gx, gy, s, t < 15 ? '#DDCC88' : t < 35 ? '#8899BB' : '#556688')
      }
    }
  }
  // 中心
  px(ctx, g1x, g1y, s, '#FFFFDD')
  px(ctx, g1x + 1, g1y, s, '#FFEEAA')
  px(ctx, g1x, g1y + 1, s, '#FFEEAA')

  // 楕円銀河2（右上）
  const g2x = Math.floor(pw * 0.78), g2y = Math.floor(ph * 0.38)
  for (let dy = -3; dy <= 3; dy++) {
    const w = Math.floor(4 * Math.sqrt(1 - (dy * dy) / 9))
    for (let dx = -w; dx <= w; dx++) {
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist <= 1) {
        px(ctx, g2x + dx, g2y + dy, s, '#FFEECC')
      } else if (dist <= 2.5) {
        px(ctx, g2x + dx, g2y + dy, s, '#CCAA77')
      } else {
        px(ctx, g2x + dx, g2y + dy, s, '#887755')
      }
    }
  }

  // 不規則銀河3（右下）
  const g3x = Math.floor(pw * 0.85), g3y = Math.floor(ph * 0.7)
  const g3dots = [
    [0, 0, '#AABBCC'], [1, 0, '#8899AA'], [-1, 0, '#99AABB'],
    [0, -1, '#8899AA'], [1, -1, '#7788AA'], [2, 0, '#667799'],
    [-1, 1, '#7788AA'], [0, 1, '#8899BB'], [1, 1, '#667799'],
    [-2, 0, '#556688'], [2, 1, '#556688']
  ]
  for (const [dx, dy, c] of g3dots) {
    px(ctx, g3x + dx, g3y + dy, s, c)
  }

  // 小さな銀河4（上部中央）
  const g4x = Math.floor(pw * 0.5), g4y = Math.floor(ph * 0.1)
  px(ctx, g4x, g4y, s, '#DDBB88')
  px(ctx, g4x + 1, g4y, s, '#AA8866')
  px(ctx, g4x - 1, g4y, s, '#AA8866')
  px(ctx, g4x, g4y - 1, s, '#887755')
  px(ctx, g4x, g4y + 1, s, '#887755')
}

// カラフルな追加の星（宇宙全体に散りばめる）
function drawExtraStars(ctx, pw, ph, s) {
  // 青白い星
  for (let i = 0; i < 20; i++) {
    const sx = (i * 211 + 7) % pw
    const sy = (i * 163 + 41) % ph
    px(ctx, sx, sy, s, i % 2 === 0 ? '#BBCCFF' : '#DDEEFF')
  }
  // 赤い星
  for (let i = 0; i < 8; i++) {
    const sx = (i * 179 + 53) % pw
    const sy = (i * 223 + 89) % ph
    px(ctx, sx, sy, s, '#FFAA88')
  }
  // 黄色い星
  for (let i = 0; i < 6; i++) {
    const sx = (i * 251 + 19) % pw
    const sy = (i * 197 + 67) % ph
    px(ctx, sx, sy, s, '#FFEE88')
  }
}

// アリの巣（23部屋）- 最大の巣、中央に配置
function drawNest23(ctx, cx, cy, s) {
  const hole = '#1A1008'

  // 入口
  px(ctx, cx, cy, s, hole)
  px(ctx, cx + 1, cy, s, hole)
  px(ctx, cx - 1, cy, s, hole)

  // 縦トンネル1
  for (let y = 1; y <= 4; y++) px(ctx, cx, cy + y, s, hole)

  // 左1
  for (let x = -4; x <= -1; x++) px(ctx, cx + x, cy + 3, s, hole)
  for (let x = -6; x <= -3; x++) {
    px(ctx, cx + x, cy + 4, s, hole)
    px(ctx, cx + x, cy + 5, s, hole)
  }
  for (let x = -5; x <= -4; x++) px(ctx, cx + x, cy + 6, s, hole)

  // 右1
  for (let x = 1; x <= 5; x++) px(ctx, cx + x, cy + 3, s, hole)
  for (let x = 4; x <= 8; x++) {
    px(ctx, cx + x, cy + 4, s, hole)
    px(ctx, cx + x, cy + 5, s, hole)
  }
  for (let x = 5; x <= 7; x++) px(ctx, cx + x, cy + 6, s, hole)

  // 縦トンネル2
  for (let y = 5; y <= 8; y++) px(ctx, cx, cy + y, s, hole)

  // 左2
  for (let x = -5; x <= -1; x++) px(ctx, cx + x, cy + 7, s, hole)
  for (let x = -8; x <= -4; x++) {
    px(ctx, cx + x, cy + 8, s, hole)
    px(ctx, cx + x, cy + 9, s, hole)
  }
  for (let x = -7; x <= -5; x++) px(ctx, cx + x, cy + 10, s, hole)

  // 右2
  for (let x = 1; x <= 6; x++) px(ctx, cx + x, cy + 7, s, hole)
  for (let x = 5; x <= 10; x++) {
    px(ctx, cx + x, cy + 8, s, hole)
    px(ctx, cx + x, cy + 9, s, hole)
  }
  for (let x = 6; x <= 9; x++) px(ctx, cx + x, cy + 10, s, hole)

  // 縦トンネル3
  for (let y = 9; y <= 12; y++) px(ctx, cx, cy + y, s, hole)

  // 左3
  for (let x = -4; x <= -1; x++) px(ctx, cx + x, cy + 11, s, hole)
  for (let x = -7; x <= -3; x++) {
    px(ctx, cx + x, cy + 12, s, hole)
    px(ctx, cx + x, cy + 13, s, hole)
  }
  for (let x = -6; x <= -4; x++) px(ctx, cx + x, cy + 14, s, hole)

  // 右3
  for (let x = 1; x <= 5; x++) px(ctx, cx + x, cy + 11, s, hole)
  for (let x = 4; x <= 9; x++) {
    px(ctx, cx + x, cy + 12, s, hole)
    px(ctx, cx + x, cy + 13, s, hole)
  }
  for (let x = 5; x <= 8; x++) px(ctx, cx + x, cy + 14, s, hole)

  // 縦トンネル4
  for (let y = 13; y <= 17; y++) px(ctx, cx, cy + y, s, hole)

  // 左4
  for (let x = -5; x <= -1; x++) px(ctx, cx + x, cy + 16, s, hole)
  for (let x = -9; x <= -4; x++) {
    px(ctx, cx + x, cy + 17, s, hole)
    px(ctx, cx + x, cy + 18, s, hole)
  }
  for (let x = -8; x <= -5; x++) px(ctx, cx + x, cy + 19, s, hole)

  // 右4
  for (let x = 1; x <= 6; x++) px(ctx, cx + x, cy + 16, s, hole)
  for (let x = 5; x <= 11; x++) {
    px(ctx, cx + x, cy + 17, s, hole)
    px(ctx, cx + x, cy + 18, s, hole)
  }
  for (let x = 6; x <= 10; x++) px(ctx, cx + x, cy + 19, s, hole)

  // 縦トンネル5
  for (let y = 18; y <= 22; y++) px(ctx, cx, cy + y, s, hole)

  // 左5
  for (let x = -6; x <= -1; x++) px(ctx, cx + x, cy + 21, s, hole)
  for (let x = -10; x <= -5; x++) {
    px(ctx, cx + x, cy + 22, s, hole)
    px(ctx, cx + x, cy + 23, s, hole)
  }
  for (let x = -9; x <= -6; x++) px(ctx, cx + x, cy + 24, s, hole)

  // 右5
  for (let x = 1; x <= 7; x++) px(ctx, cx + x, cy + 21, s, hole)
  for (let x = 6; x <= 12; x++) {
    px(ctx, cx + x, cy + 22, s, hole)
    px(ctx, cx + x, cy + 23, s, hole)
  }
  for (let x = 7; x <= 11; x++) px(ctx, cx + x, cy + 24, s, hole)

  // 縦トンネル6
  for (let y = 23; y <= 28; y++) px(ctx, cx, cy + y, s, hole)

  // 左6
  for (let x = -5; x <= -1; x++) px(ctx, cx + x, cy + 27, s, hole)
  for (let x = -9; x <= -4; x++) {
    px(ctx, cx + x, cy + 28, s, hole)
    px(ctx, cx + x, cy + 29, s, hole)
  }
  for (let x = -8; x <= -5; x++) px(ctx, cx + x, cy + 30, s, hole)

  // 右6
  for (let x = 1; x <= 6; x++) px(ctx, cx + x, cy + 27, s, hole)
  for (let x = 5; x <= 11; x++) {
    px(ctx, cx + x, cy + 28, s, hole)
    px(ctx, cx + x, cy + 29, s, hole)
  }
  for (let x = 6; x <= 10; x++) px(ctx, cx + x, cy + 30, s, hole)

  // 縦トンネル7
  for (let y = 29; y <= 34; y++) px(ctx, cx, cy + y, s, hole)

  // 左7（最下段左）
  for (let x = -7; x <= -1; x++) px(ctx, cx + x, cy + 33, s, hole)
  for (let x = -11; x <= -6; x++) {
    px(ctx, cx + x, cy + 34, s, hole)
    px(ctx, cx + x, cy + 35, s, hole)
  }
  for (let x = -10; x <= -7; x++) px(ctx, cx + x, cy + 36, s, hole)

  // 右7（最下段右）
  for (let x = 1; x <= 8; x++) px(ctx, cx + x, cy + 33, s, hole)
  for (let x = 7; x <= 13; x++) {
    px(ctx, cx + x, cy + 34, s, hole)
    px(ctx, cx + x, cy + 35, s, hole)
  }
  for (let x = 8; x <= 12; x++) px(ctx, cx + x, cy + 36, s, hole)

  // 最底部（壮大な大部屋）
  for (let y = 35; y <= 39; y++) px(ctx, cx, cy + y, s, hole)
  for (let x = -10; x <= 11; x++) {
    px(ctx, cx + x, cy + 38, s, hole)
    px(ctx, cx + x, cy + 39, s, hole)
    px(ctx, cx + x, cy + 40, s, hole)
    px(ctx, cx + x, cy + 41, s, hole)
  }
  for (let x = -9; x <= 10; x++) px(ctx, cx + x, cy + 42, s, hole)
}

export function draw(ctx, pw, ph, s) {
  const cx = Math.floor(pw / 2)
  const cy = Math.floor(ph * 0.25)

  drawSpace(ctx, pw, ph, s)
  drawNebulae(ctx, pw, ph, s)
  drawGalaxies(ctx, pw, ph, s)
  drawExtraStars(ctx, pw, ph, s)

  // 巣は中央に壮大に展開
  drawNest23(ctx, cx, cy, s)

  return { antX: cx, antY: cy + 40 }
}
