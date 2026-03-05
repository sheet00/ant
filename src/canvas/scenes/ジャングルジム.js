import { px, pxRect, drawSky, drawUnderground, drawGrass } from '../pixelUtils'

// ジャングルジム（金属パイプの格子状構造物）
function drawJungleGym(ctx, pw, groundY, s) {
  const pipe = '#777777', pipeL = '#999999', pipeD = '#555555'
  const left = Math.floor(pw * 0.3), right = Math.floor(pw * 0.7) // 少し幅を狭める
  const top = groundY - 25, width = right - left, height = groundY - top
  const cols = 5, rows = 3 // 段数も減らす
  const cellW = Math.floor(width / (cols - 1)), cellH = Math.floor(height / (rows - 1))

  for (let r = 0; r < rows; r++) {
    const y = top + r * cellH
    for (let x = left; x <= right; x++) { px(ctx, x, y, s, pipe); px(ctx, x, y + 1, s, pipeD); }
  }
  for (let c = 0; c < cols; c++) {
    const x = left + c * cellW
    for (let y = top; y <= groundY; y++) { px(ctx, x, y, s, pipeL); px(ctx, x + 1, y, s, pipeD); }
  }
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = left + c * cellW, y = top + r * cellH
      px(ctx, x, y, s, pipeL); px(ctx, x + 1, y, s, pipeL)
    }
  }
  return { left, right, cellW, cols }
}

function pseudoRandom(x, y) {
  const dot = x * 12.9898 + y * 78.233
  const sn = dot % 3.14
  return (Math.sin(sn) * 43758.5453) % 1
}

function drawOrganicChamber(ctx, cx, cy, rw, rh, s, holeColor) {
  for (let dy = -rh; dy <= rh; dy++) {
    for (let dx = -rw; dx <= rw; dx++) {
      const dist = (dx * dx) / (rw * rw) + (dy * dy) / (rh * rh)
      const noise = pseudoRandom(cx + dx, cy + dy) * 0.15
      if (dist < 1.0 + noise) {
        px(ctx, cx + dx, cy + dy, s, holeColor)
      }
    }
  }
}

function drawJungleNest(ctx, jg, groundY, s) {
  const hole = '#1A1008'
  const startX = jg.left + 2 * jg.cellW // 中央の支柱の下を入廊口とする
  const depth = 20
  const branchCount = 2

  // 1. メインシャフト（垂直主軸）
  let curX = startX
  for (let y = 0; y <= depth; y++) {
    const py = groundY + y
    if (pseudoRandom(curX, py) > 0.8) curX++
    else if (pseudoRandom(curX, py) < 0.2) curX--
    
    px(ctx, curX, py, s, hole)
    px(ctx, curX + 1, py, s, hole)

    // 2. 枝穴（ブランチ）の生成
    for (let i = 0; i < branchCount; i++) {
      const branchY = Math.floor((depth / (branchCount + 1)) * (i + 1))
      if (y === branchY) {
        const dir = (i % 2 === 0) ? 1 : -1
        let bx = curX + dir
        let by = py
        const branchLen = 6 + Math.floor(pseudoRandom(bx, by) * 8)
        
        for (let j = 0; j < branchLen; j++) {
          by = Math.max(by, groundY + 2) // 地上への突き抜け防止
          px(ctx, bx, by, s, hole)
          px(ctx, bx, by + 1, s, hole) // 通路の太さ
          bx += dir
          // 浸水防止のため、たまに上向きに掘る
          if (pseudoRandom(bx, by) > 0.6) by--
        }
        
        // 3. 部屋（チャンバー）：通路より高い位置に配置
        const rw = 3 + Math.floor(pseudoRandom(bx, by) * 2)
        const rh = 2 + Math.floor(pseudoRandom(by, bx) * 1.5)
        const cy = Math.max(by - rh, groundY + rh + 1)
        drawOrganicChamber(ctx, bx, cy, rw, rh, s, hole)
      }
    }
  }

  // 4. 女王の間（最下層）
  drawOrganicChamber(ctx, curX, groundY + depth + 3, 5, 4, s, hole)
}

export function draw(ctx, pw, ph, s) {
  const groundY = Math.floor(ph * 0.45)
  drawSky(ctx, pw, groundY, s)
  drawUnderground(ctx, pw, ph, groundY, s)

  const jg = drawJungleGym(ctx, pw, groundY, s)
  drawJungleNest(ctx, jg, groundY, s)

  drawGrass(ctx, pw, groundY, s, 10)
  return { antX: Math.floor(pw / 2), antY: groundY + 22 }
}
