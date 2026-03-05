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

// 渦巻き銀河
function drawGalaxy(ctx, cx, cy, pw, ph, s) {
  // 銀河の中心（明るいコア）
  for (let dy = -3; dy <= 3; dy++) {
    const w = Math.floor(3 * Math.sqrt(1 - (dy * dy) / 9))
    for (let dx = -w; dx <= w; dx++) {
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist <= 1) {
        px(ctx, cx + dx, cy + dy, s, '#FFFFEE')
      } else if (dist <= 2) {
        px(ctx, cx + dx, cy + dy, s, '#FFEEAA')
      } else {
        px(ctx, cx + dx, cy + dy, s, '#DDCC88')
      }
    }
  }

  // 渦巻きの腕（2本の腕）
  for (let arm = 0; arm < 2; arm++) {
    const baseAngle = arm * Math.PI
    for (let t = 0; t < 200; t++) {
      const angle = baseAngle + t * 0.08
      const r = 4 + t * 0.15
      const dx = Math.round(r * Math.cos(angle))
      const dy = Math.round(r * 0.45 * Math.sin(angle))
      const px2 = cx + dx
      const py2 = cy + dy

      if (px2 < 0 || px2 >= pw || py2 < 0 || py2 >= ph) continue

      // 距離に応じて色を変える
      if (t < 30) {
        px(ctx, px2, py2, s, '#DDBB77')
      } else if (t < 80) {
        px(ctx, px2, py2, s, '#8899BB')
      } else if (t < 130) {
        px(ctx, px2, py2, s, '#6677AA')
      } else {
        px(ctx, px2, py2, s, '#445588')
      }

      // 腕の厚みを追加（内側）
      if (t % 3 === 0 && t < 150) {
        const angle2 = angle + 0.04
        const dx2 = Math.round(r * Math.cos(angle2))
        const dy2 = Math.round(r * 0.45 * Math.sin(angle2))
        const ppx = cx + dx2
        const ppy = cy + dy2
        if (ppx >= 0 && ppx < pw && ppy >= 0 && ppy < ph) {
          px(ctx, ppx, ppy, s, t < 50 ? '#CCAA66' : '#556699')
        }
      }

      // 腕に散りばめた明るい星
      if (t % 7 === 0) {
        px(ctx, px2, py2, s, '#CCDDFF')
      }
    }
  }

  // 銀河ハロー（散在する星）
  for (let i = 0; i < 30; i++) {
    const angle = (i * 2.39996) // 黄金角
    const r = 5 + (i * 1.2)
    const hx = cx + Math.round(r * Math.cos(angle))
    const hy = cy + Math.round(r * 0.4 * Math.sin(angle))
    if (hx >= 0 && hx < pw && hy >= 0 && hy < ph) {
      px(ctx, hx, hy, s, i % 4 === 0 ? '#8899AA' : '#556677')
    }
  }
}

// 遠くの銀河（小さなぼかし）
function drawDistantGalaxies(ctx, pw, ph, s) {
  // 小さな楕円銀河1
  const g1x = Math.floor(pw * 0.15), g1y = Math.floor(ph * 0.2)
  px(ctx, g1x, g1y, s, '#887766')
  px(ctx, g1x + 1, g1y, s, '#776655')
  px(ctx, g1x, g1y + 1, s, '#665544')

  // 小さな渦巻き銀河2
  const g2x = Math.floor(pw * 0.85), g2y = Math.floor(ph * 0.7)
  px(ctx, g2x, g2y, s, '#7788AA')
  px(ctx, g2x + 1, g2y, s, '#6677AA')
  px(ctx, g2x - 1, g2y, s, '#5566AA')
  px(ctx, g2x, g2y - 1, s, '#6677AA')

  // 小さな銀河3
  const g3x = Math.floor(pw * 0.1), g3y = Math.floor(ph * 0.75)
  px(ctx, g3x, g3y, s, '#AA8877')
  px(ctx, g3x + 1, g3y, s, '#997766')
}

// アリの巣（22部屋）- 銀河の中心付近に
function drawNest22(ctx, cx, cy, s) {
  const hole = '#1A1008'

  // 入口
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

  // 縦トンネル6
  for (let y = 25; y <= 30; y++) px(ctx, cx, cy + y, s, hole)

  // 左6
  for (let x = -6; x <= -1; x++) px(ctx, cx + x, cy + 29, s, hole)
  for (let x = -10; x <= -5; x++) {
    px(ctx, cx + x, cy + 30, s, hole)
    px(ctx, cx + x, cy + 31, s, hole)
  }
  for (let x = -9; x <= -6; x++) px(ctx, cx + x, cy + 32, s, hole)

  // 右6
  for (let x = 1; x <= 7; x++) px(ctx, cx + x, cy + 29, s, hole)
  for (let x = 6; x <= 12; x++) {
    px(ctx, cx + x, cy + 30, s, hole)
    px(ctx, cx + x, cy + 31, s, hole)
  }
  for (let x = 7; x <= 11; x++) px(ctx, cx + x, cy + 32, s, hole)

  // 最底部（大部屋）
  for (let y = 31; y <= 35; y++) px(ctx, cx, cy + y, s, hole)
  for (let x = -8; x <= 9; x++) {
    px(ctx, cx + x, cy + 35, s, hole)
    px(ctx, cx + x, cy + 36, s, hole)
    px(ctx, cx + x, cy + 37, s, hole)
  }
  for (let x = -7; x <= 8; x++) px(ctx, cx + x, cy + 38, s, hole)
}

export function draw(ctx, pw, ph, s) {
  const cx = Math.floor(pw / 2)
  const cy = Math.floor(ph * 0.35)

  drawSpace(ctx, pw, ph, s)
  drawGalaxy(ctx, cx, cy, pw, ph, s)
  drawDistantGalaxies(ctx, pw, ph, s)

  // 巣は銀河の中心から下に展開
  drawNest22(ctx, cx, cy, s)

  return { antX: cx, antY: cy + 36 }
}
