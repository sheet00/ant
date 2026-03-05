import { px, pxRect, drawSky, drawUnderground, drawGrass } from '../pixelUtils'

// ジャングルジム（金属パイプの格子状構造物）
function drawJungleGym(ctx, pw, groundY, s) {
  const pipe = '#777777'
  const pipeL = '#999999'
  const pipeD = '#555555'

  const left = Math.floor(pw * 0.25)
  const right = Math.floor(pw * 0.75)
  const top = groundY - 30
  const width = right - left
  const height = groundY - top

  const cols = 5
  const rows = 4
  const cellW = Math.floor(width / (cols - 1))
  const cellH = Math.floor(height / (rows - 1))

  // 横パイプ
  for (let r = 0; r < rows; r++) {
    const y = top + r * cellH
    for (let x = left; x <= right; x++) {
      px(ctx, x, y, s, pipe)
      px(ctx, x, y + 1, s, pipeD)
    }
  }

  // 縦パイプ
  for (let c = 0; c < cols; c++) {
    const x = left + c * cellW
    for (let y = top; y <= groundY; y++) {
      px(ctx, x, y, s, pipeL)
      px(ctx, x + 1, y, s, pipeD)
    }
  }

  // 奥行き表現（斜めパイプ）
  for (let c = 0; c < cols - 1; c++) {
    const x1 = left + c * cellW + Math.floor(cellW / 2)
    for (let r = 0; r < rows - 1; r++) {
      const y1 = top + r * cellH
      const y2 = top + (r + 1) * cellH
      // 斜め線を数ドット
      for (let i = 0; i < 4; i++) {
        const dx = Math.floor(i * 0.8)
        const dy = Math.floor(i * ((y2 - y1) / 4))
        px(ctx, x1 + dx, y1 + dy, s, pipeD)
      }
    }
  }

  // 接合部（交差点にハイライト）
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = left + c * cellW
      const y = top + r * cellH
      px(ctx, x, y, s, pipeL)
      px(ctx, x + 1, y, s, pipeL)
      px(ctx, x, y + 1, s, pipe)
      px(ctx, x + 1, y + 1, s, pipe)
    }
  }
}

// アリの巣（9部屋）
function drawNest9(ctx, cx, groundY, s) {
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

  // 右3
  for (let x = 1; x <= 5; x++) px(ctx, cx + x, groundY + 15, s, hole)
  for (let x = 4; x <= 9; x++) {
    px(ctx, cx + x, groundY + 16, s, hole)
    px(ctx, cx + x, groundY + 17, s, hole)
  }
  for (let x = 5; x <= 8; x++) px(ctx, cx + x, groundY + 18, s, hole)

  // 縦トンネル4
  for (let y = 16; y <= 21; y++) px(ctx, cx, groundY + y, s, hole)

  // 左4（新規9部屋目）
  for (let x = -5; x <= -1; x++) px(ctx, cx + x, groundY + 20, s, hole)
  for (let x = -9; x <= -4; x++) {
    px(ctx, cx + x, groundY + 21, s, hole)
    px(ctx, cx + x, groundY + 22, s, hole)
  }
  for (let x = -8; x <= -5; x++) px(ctx, cx + x, groundY + 23, s, hole)

  // 縦トンネル5
  for (let y = 22; y <= 25; y++) px(ctx, cx, groundY + y, s, hole)

  // 最下層
  for (let x = -5; x <= 6; x++) {
    px(ctx, cx + x, groundY + 26, s, hole)
    px(ctx, cx + x, groundY + 27, s, hole)
    px(ctx, cx + x, groundY + 28, s, hole)
  }
  for (let x = -4; x <= 5; x++) px(ctx, cx + x, groundY + 29, s, hole)
}

export function draw(ctx, pw, ph, s) {
  const groundY = Math.floor(ph * 0.45)

  drawSky(ctx, pw, groundY, s)
  drawUnderground(ctx, pw, ph, groundY, s)

  const nestCx = Math.floor(pw / 2)

  drawNest9(ctx, nestCx, groundY, s)

  drawGrass(ctx, pw, groundY, s, 12)

  drawJungleGym(ctx, pw, groundY, s)

  return { antX: nestCx, antY: groundY + 27 }
}
