import { px, pxRect, drawSky, drawUnderground, drawGrass } from '../pixelUtils'

function pseudoRandom(x, y) {
  const dot = x * 12.9898 + y * 78.233
  const sn = dot % 3.14
  return (Math.sin(sn) * 43758.5453) % 1
}

function drawSchoolBuilding(ctx, pw, groundY, s) {
  const wall = '#D7CCC8', wallD = '#BCAAA4', window_ = '#81D4FA', frame = '#78909C'
  pxRect(ctx, 0, groundY - 40, pw, 40, s, wall)
  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 8; c++) {
      const wx = 8 + c * 20, wy = groundY - 35 + r * 15
      if (wx + 10 < pw) {
        pxRect(ctx, wx, wy, 10, 6, s, frame)
        pxRect(ctx, wx + 1, wy + 1, 8, 4, s, window_)
      }
    }
  }
  pxRect(ctx, 0, groundY - 5, pw, 5, s, '#999999')
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

function drawSchoolNest(ctx, pw, groundY, s) {
  const hole = '#1A1008'
  const startX = Math.floor(pw / 2)
  const depth = 50
  const branchCount = 8

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
        const dir = (i % 2 === 0) ? -1 : 1
        let bx = curX + dir
        let by = py
        const branchLen = 12 + Math.floor(pseudoRandom(bx, by) * 20)
        
        for (let j = 0; j < branchLen; j++) {
          by = Math.max(by, groundY + 2) // 地上への突き抜け防止
          px(ctx, bx, by, s, hole)
          px(ctx, bx, by + 1, s, hole)
          bx += dir
          if (pseudoRandom(bx, by) > 0.6) by-- // 上向き
        }
        
        // 3. 部屋（チャンバー）
        const rw = 6 + Math.floor(pseudoRandom(bx, by) * 4)
        const rh = 4 + Math.floor(pseudoRandom(by, bx) * 2.5)
        const cy = Math.max(by - rh, groundY + rh + 1)
        drawOrganicChamber(ctx, bx, cy, rw, rh, s, hole)
      }
    }
  }

  // 4. 女王の間（最下層）
  drawOrganicChamber(ctx, curX, groundY + depth + 6, 10, 6, s, hole)
}

export function draw(ctx, pw, ph, s) {
  const groundY = Math.floor(ph * 0.45)
  drawSky(ctx, pw, groundY, s)
  drawUnderground(ctx, pw, ph, groundY, s)

  drawSchoolBuilding(ctx, pw, groundY, s)
  drawGrass(ctx, pw, groundY, s, 5)

  drawSchoolNest(ctx, pw, groundY, s)

  return { antX: Math.floor(pw / 2), antY: groundY + 55 }
}
