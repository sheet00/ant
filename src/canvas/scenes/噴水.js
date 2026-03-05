import { px, pxRect, drawSky, drawUnderground, drawGrass } from '../pixelUtils'

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

// 噴水（円形の池 + 中央の噴水口 + 水しぶき）
function drawFountain(ctx, pw, groundY, s) {
  const stone = '#999999', stoneD = '#777777', stoneL = '#BBBBBB'
  const water = '#6BAED6', waterL = '#87CEEB', waterD = '#4A90B8', splash = '#B0DFF0'
  const cx = Math.floor(pw / 2), poolY = groundY - 4
  const poolLeft = cx - 18, poolRight = cx + 18

  // 池の縁
  for (let x = poolLeft + 2; x <= poolRight - 2; x++) px(ctx, x, poolY + 2, s, stoneD)
  for (let x = poolLeft + 1; x <= poolRight - 1; x++) px(ctx, x, poolY + 1, s, stone)
  for (let x = poolLeft; x <= poolRight; x++) px(ctx, x, poolY, s, stoneL)
  for (let y = poolY; y <= poolY + 2; y++) {
    px(ctx, poolLeft, y, s, stoneD); px(ctx, poolLeft + 1, y, s, stone)
    px(ctx, poolRight, y, s, stoneD); px(ctx, poolRight - 1, y, s, stone)
  }

  // 水面
  for (let x = poolLeft + 2; x <= poolRight - 2; x++) px(ctx, x, poolY + 1, s, waterD)
  for (let x = poolLeft + 3; x <= poolRight - 3; x++) px(ctx, x, poolY, s, water)

  // 中央の噴水柱
  const pX = cx
  pxRect(ctx, pX - 1, poolY - 3, 3, 3, s, stoneL)
  for (let y = poolY - 4; y >= poolY - 14; y--) {
    px(ctx, pX, y, s, waterL)
    if (y > poolY - 10) { px(ctx, pX - 1, y, s, water); px(ctx, pX + 1, y, s, water); }
  }

  // 水しぶき（放物線）
  const topW = poolY - 14
  for (let i = 0; i < 8; i++) {
    const sy = topW + Math.floor(i * i * 0.3)
    if (sy < poolY) {
      px(ctx, pX - 1 - i, sy, s, splash); px(ctx, pX + 1 + i, sy, s, splash)
    }
  }
  return { cx, poolLeft, poolRight }
}

// 噴水の構造に合わせた巣
function drawFountainNest(ctx, ft, groundY, s) {
  const hole = '#1A1008'
  const startX = ft.poolRight + 4 // 池の右側を入廊口とする
  const depth = 30
  const branchCount = 4

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
        const dir = (i % 2 === 0) ? -1 : 1 // 互い違いに
        let bx = curX + dir
        let by = py
        const branchLen = 8 + Math.floor(pseudoRandom(bx, by) * 12)
        
        for (let j = 0; j < branchLen; j++) {
          by = Math.max(by, groundY + 2) // 地上への突き抜け防止
          px(ctx, bx, by, s, hole)
          px(ctx, bx, by + 1, s, hole)
          bx += dir
          if (pseudoRandom(bx, by) > 0.6) by-- // 上向き
        }
        
        // 3. 部屋（チャンバー）
        const rw = 4 + Math.floor(pseudoRandom(bx, by) * 3)
        const rh = 3 + Math.floor(pseudoRandom(by, bx) * 2)
        const cy = Math.max(by - rh, groundY + rh + 1)
        drawOrganicChamber(ctx, bx, cy, rw, rh, s, hole)
      }
    }
  }

  // 4. 女王の間（最下層）
  drawOrganicChamber(ctx, curX, groundY + depth + 4, 7, 5, s, hole)
}

export function draw(ctx, pw, ph, s) {
  const groundY = Math.floor(ph * 0.45)
  drawSky(ctx, pw, groundY, s)
  drawUnderground(ctx, pw, ph, groundY, s)

  const ft = drawFountain(ctx, pw, groundY, s)
  drawFountainNest(ctx, ft, groundY, s)

  drawGrass(ctx, pw, groundY, s, 12)
  return { antX: ft.cx, antY: groundY + 33 }
}
