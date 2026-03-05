import { px, pxRect, drawSky, drawUnderground, drawGrass } from '../pixelUtils'

function pseudoRandom(x, y) {
  const dot = x * 12.9898 + y * 78.233
  const sn = dot % 3.14
  return (Math.sin(sn) * 43758.5453) % 1
}

function drawTree(ctx, x, groundY, s) {
  const wood = '#5D4037', leaf = '#2E7D32', leafL = '#4CAF50'
  for (let y = groundY - 20; y < groundY; y++) { px(ctx, x, y, s, wood); px(ctx, x + 1, y, s, wood); }
  for (let dy = -8; dy <= 4; dy++) {
    const w = 6 - Math.abs(dy - (-2))
    for (let dx = -w; dx <= w; dx++) px(ctx, x + dx, groundY - 25 + dy, s, (dx + dy) % 3 === 0 ? leafL : leaf)
  }
}

function drawBench(ctx, x, groundY, s) {
  const wood = '#A1887F', frame = '#424242'
  pxRect(ctx, x, groundY - 6, 12, 2, s, wood)
  pxRect(ctx, x + 1, groundY - 4, 1, 4, s, frame)
  pxRect(ctx, x + 10, groundY - 4, 1, 4, s, frame)
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

function drawParkNest(ctx, pw, groundY, s) {
  const hole = '#1A1008'
  const treeX = Math.floor(pw * 0.25)
  const startX = treeX // 木の下を入廊口とする
  const depth = 40
  const branchCount = 6

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
        const branchLen = 10 + Math.floor(pseudoRandom(bx, by) * 15)
        
        for (let j = 0; j < branchLen; j++) {
          by = Math.max(by, groundY + 2) // 地上への突き抜け防止
          px(ctx, bx, by, s, hole)
          px(ctx, bx, by + 1, s, hole)
          bx += dir
          if (pseudoRandom(bx, by) > 0.6) by-- // 上向き
        }
        
        // 3. 部屋（チャンバー）
        const rw = 5 + Math.floor(pseudoRandom(bx, by) * 3)
        const rh = 3 + Math.floor(pseudoRandom(by, bx) * 2)
        const cy = Math.max(by - rh, groundY + rh + 1)
        drawOrganicChamber(ctx, bx, cy, rw, rh, s, hole)
      }
    }
  }

  // 4. 女王の間（最下層）
  drawOrganicChamber(ctx, curX, groundY + depth + 5, 8, 5, s, hole)
}

export function draw(ctx, pw, ph, s) {
  const groundY = Math.floor(ph * 0.45)
  drawSky(ctx, pw, groundY, s)
  drawUnderground(ctx, pw, ph, groundY, s)

  drawTree(ctx, Math.floor(pw * 0.25), groundY, s)
  drawBench(ctx, Math.floor(pw * 0.75), groundY, s)
  drawGrass(ctx, pw, groundY, s, 10)

  drawParkNest(ctx, pw, groundY, s)

  return { antX: Math.floor(pw / 2), antY: groundY + 45 }
}
