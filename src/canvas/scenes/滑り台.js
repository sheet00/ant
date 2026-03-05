import { px, pxRect, drawSky, drawUnderground, drawGrass } from '../pixelUtils'

// 滑り台（金属スロープ + 支柱 + はしご）
function drawSlide(ctx, pw, groundY, s) {
  const metal = '#888888'
  const metalD = '#666666'
  const metalL = '#AAAAAA'
  const ladder = '#555555'

  // 滑り台の位置
  const topX = Math.floor(pw * 0.35)
  const bottomX = Math.floor(pw * 0.65)
  const topY = groundY - 28
  const bottomY = groundY - 2

  // スロープ（斜めの板）
  const slopeLen = bottomX - topX
  const slopeH = bottomY - topY
  for (let i = 0; i <= slopeLen; i++) {
    const x = topX + i
    const y = topY + Math.floor((i / slopeLen) * slopeH)
    px(ctx, x, y, s, metalL)
    px(ctx, x, y + 1, s, metal)
    px(ctx, x, y + 2, s, metalD)
  }

  // スロープの側面レール（左右）
  for (let i = 0; i <= slopeLen; i++) {
    const x = topX + i
    const y = topY + Math.floor((i / slopeLen) * slopeH)
    px(ctx, x, y - 1, s, metalD)
  }

  // はしご（左側、垂直）
  const ladderX = topX - 2
  for (let y = topY; y <= groundY; y++) {
    px(ctx, ladderX, y, s, ladder)
    px(ctx, ladderX + 3, y, s, ladder)
  }
  // はしごの横棒
  for (let y = topY + 2; y <= groundY - 2; y += 3) {
    px(ctx, ladderX + 1, y, s, metal)
    px(ctx, ladderX + 2, y, s, metal)
  }

  // 上部の踊り場
  for (let x = ladderX; x <= topX + 2; x++) {
    px(ctx, x, topY, s, metal)
    px(ctx, x, topY - 1, s, metalD)
  }

  // 右側支柱（スロープ下端）
  for (let y = bottomY + 2; y <= groundY; y++) {
    px(ctx, bottomX, y, s, ladder)
    px(ctx, bottomX - 1, y, s, ladder)
  }

  // 左支柱（はしご横の補強）
  for (let y = topY; y <= groundY; y++) {
    px(ctx, ladderX - 1, y, s, metalD)
  }
}

// アリの巣（8部屋）
function drawNest8(ctx, cx, groundY, s) {
  const hole = '#1A1008'

  // 入口
  px(ctx, cx, groundY, s, hole)
  px(ctx, cx + 1, groundY, s, hole)

  // 縦トンネル1
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

  // 縦トンネル2
  for (let y = 6; y <= 9; y++) px(ctx, cx, groundY + y, s, hole)

  // 左2
  for (let x = -5; x <= -1; x++) px(ctx, cx + x, groundY + 9, s, hole)
  for (let x = -8; x <= -4; x++) {
    px(ctx, cx + x, groundY + 10, s, hole)
    px(ctx, cx + x, groundY + 11, s, hole)
  }
  for (let x = -7; x <= -5; x++) px(ctx, cx + x, groundY + 12, s, hole)

  // 右2
  for (let x = 1; x <= 6; x++) px(ctx, cx + x, groundY + 9, s, hole)
  for (let x = 5; x <= 10; x++) {
    px(ctx, cx + x, groundY + 10, s, hole)
    px(ctx, cx + x, groundY + 11, s, hole)
  }
  for (let x = 6; x <= 9; x++) px(ctx, cx + x, groundY + 12, s, hole)

  // 縦トンネル3
  for (let y = 10; y <= 15; y++) px(ctx, cx, groundY + y, s, hole)

  // 左3
  for (let x = -4; x <= -1; x++) px(ctx, cx + x, groundY + 14, s, hole)
  for (let x = -7; x <= -3; x++) {
    px(ctx, cx + x, groundY + 15, s, hole)
    px(ctx, cx + x, groundY + 16, s, hole)
  }
  for (let x = -6; x <= -4; x++) px(ctx, cx + x, groundY + 17, s, hole)

  // 右3（新規8部屋目）
  for (let x = 1; x <= 5; x++) px(ctx, cx + x, groundY + 15, s, hole)
  for (let x = 4; x <= 9; x++) {
    px(ctx, cx + x, groundY + 16, s, hole)
    px(ctx, cx + x, groundY + 17, s, hole)
  }
  for (let x = 5; x <= 8; x++) px(ctx, cx + x, groundY + 18, s, hole)

  // 縦トンネル4
  for (let y = 16; y <= 21; y++) px(ctx, cx, groundY + y, s, hole)

  // 最下層
  for (let x = -5; x <= 6; x++) {
    px(ctx, cx + x, groundY + 22, s, hole)
    px(ctx, cx + x, groundY + 23, s, hole)
    px(ctx, cx + x, groundY + 24, s, hole)
  }
  for (let x = -4; x <= 5; x++) px(ctx, cx + x, groundY + 25, s, hole)
}

export function draw(ctx, pw, ph, s) {
  const groundY = Math.floor(ph * 0.45)

  drawSky(ctx, pw, groundY, s)
  drawUnderground(ctx, pw, ph, groundY, s)

  const nestCx = Math.floor(pw / 2)

  drawNest8(ctx, nestCx, groundY, s)

  drawGrass(ctx, pw, groundY, s, 12)

  drawSlide(ctx, pw, groundY, s)

  return { antX: nestCx, antY: groundY + 23 }
}
