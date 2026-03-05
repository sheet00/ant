import { px, pxRect, drawSky, drawUnderground, drawGrass } from '../pixelUtils'

function pseudoRandom(x, y) {
  const dot = x * 12.9898 + y * 78.233
  const sn = dot % 3.14
  return (Math.sin(sn) * 43758.5453) % 1
}

// 三角屋根の家
function drawHouse(ctx, x, groundY, w, h, roofColor, wallColor, s) {
  const roofD = '#5A4A3A', wallD = '#C8C0B0', window_ = '#88BBDD', windowD = '#6699BB', frame = '#555555', door = '#7A5A30'
  const by = groundY - h
  const peakY = by - Math.floor(w / 2)
  const cx = x + Math.floor(w / 2)
  for (let ry = peakY; ry <= by; ry++) {
    const spread = Math.floor((ry - peakY) * w / (by - peakY) / 2)
    for (let rx = cx - spread; rx <= cx + spread; rx++) {
      px(ctx, rx, ry, s, ry === peakY || rx === cx - spread || rx === cx + spread ? roofD : roofColor)
    }
  }
  for (let wy = by; wy < groundY; wy++) {
    for (let wx = x; wx < x + w; wx++) px(ctx, wx, wy, s, (wx + wy) % 7 === 0 ? wallD : wallColor)
  }
  const winW = 2, winH = 2, wy = by + 3
  for (let row = 0; row < 2; row++) {
    const wx = x + 2 + row * (w - 6)
    for (let dy = -1; dy <= winH; dy++) {
      for (let dx = -1; dx <= winW; dx++) {
        if (dy === -1 || dy === winH || dx === -1 || dx === winW) px(ctx, wx + dx, wy + dy, s, frame)
        else px(ctx, wx + dx, wy + dy, s, (dx + dy) % 2 === 0 ? window_ : windowD)
      }
    }
  }
  const dx = x + Math.floor(w / 2) - 1
  for (let dy = groundY - 5; dy < groundY; dy++) { px(ctx, dx, dy, s, door); px(ctx, dx + 1, dy, s, door) }
}

function drawFence(ctx, pw, groundY, s) {
  const fence = '#C8B898', fenceD = '#B0A080'
  for (let x = 2; x < pw - 2; x += 5) {
    for (let y = groundY - 6; y < groundY; y++) px(ctx, x, y, s, fence)
  }
  for (let x = 2; x < pw - 2; x++) { px(ctx, x, groundY - 5, s, fenceD); px(ctx, x, groundY - 2, s, fenceD) }
}

function drawPole(ctx, x, groundY, s) {
  const pole = '#666666', wire = '#444444'
  for (let y = groundY - 30; y < groundY; y++) px(ctx, x, y, s, pole)
  for (let dx = -3; dx <= 3; dx++) px(ctx, x + dx, groundY - 28, s, pole)
  for (let dx = -15; dx <= 15; dx++) px(ctx, x + dx, groundY - 28 + Math.floor(Math.abs(dx) * 0.1), s, wire)
}

// 楕円形の有機的な部屋
function drawOrganicChamber(ctx, cx, cy, s, hole, isWater = false) {
  const rw = 4 + Math.floor(Math.abs(pseudoRandom(cx, cy) * 3))
  const rh = 2 + Math.floor(Math.abs(pseudoRandom(cy, cx) * 2))
  for (let dy = -rh; dy <= rh; dy++) {
    for (let dx = -rw; dx <= rw; dx++) {
      const dist = Math.sqrt((dx * dx) / (rw * rw) + (dy * dy) / (rh * rh))
      const noise = pseudoRandom(cx + dx, cy + dy) * 0.2
      if (dist + noise < 1.0) {
        let color = hole
        // 排水溜まりの場合は下部を水色に
        if (isWater && dy > 0 && dist > 0.3) color = '#4488AA'
        px(ctx, cx + dx, cy + dy, s, color)
      }
    }
  }
}

// 自然の摂理に沿ったツリー型コロニー
function drawTreeNest(ctx, pw, groundY, s) {
  const hole = '#1A1008'
  let curX = Math.floor(pw / 2)
  let curY = groundY

  // 入口
  px(ctx, curX, curY, s, hole)
  px(ctx, curX + 1, curY, s, hole)

  // 枝分かれのポイント（深さと左右の方向、長さを大幅に拡張）
  const branches = [
    { depth: 8, dir: -1, length: 22 },
    { depth: 15, dir: 1, length: 28 },
    { depth: 22, dir: -1, length: 35 },
    { depth: 28, dir: 1, length: 32 },
    { depth: 36, dir: -1, length: 40 },
    { depth: 42, dir: 1, length: 25 }
  ]

  // メインシャフト（垂直に蛇行しながら落ちる）
  const maxDepth = 48
  const shaftPoints = []
  for (let y = 0; y <= maxDepth; y++) {
    if (y > 0 && y % 4 === 0) {
      curX += (pseudoRandom(curX, y) > 0 ? 1 : -1)
    }
    px(ctx, curX, curY + y, s, hole)
    px(ctx, curX + 1, curY + y, s, hole)
    shaftPoints.push({ x: curX, y: curY + y })
  }

  // 排水溜まり（最下層）
  const bottomPt = shaftPoints[shaftPoints.length - 1]
  drawOrganicChamber(ctx, bottomPt.x, bottomPt.y + 2, s, hole, true)

  // 枝（上向きに伸びる横穴）と部屋（チャンバー）
  for (const b of branches) {
    if (b.depth >= shaftPoints.length) continue
    const startPt = shaftPoints[b.depth]
    let bx = startPt.x
    let by = startPt.y

    for (let i = 0; i < b.length; i++) {
      bx += b.dir
      // 浸水防止のため「上」に向かって掘り進める
      if (i > 2 && i % 3 === 0) by -= 1 
      
      // 通路に少しノイズ
      by += (pseudoRandom(bx, by) > 0.7 ? 1 : (pseudoRandom(bx, by) < -0.7 ? -1 : 0))

      px(ctx, bx, by, s, hole)
      px(ctx, bx, by - 1, s, hole) // 少し太く
    }

    // 枝の先端に部屋（チャンバー）を作る
    drawOrganicChamber(ctx, bx + (b.dir * 3), by - 1, s, hole)
  }
}

export function draw(ctx, pw, ph, s) {
  const groundY = Math.floor(ph * 0.45)

  drawSky(ctx, pw, groundY, s)
  drawUnderground(ctx, pw, ph, groundY, s)

  drawGrass(ctx, pw, groundY, s, 6)

  // 家を3軒並べる
  drawHouse(ctx, Math.floor(pw * 0.05), groundY, 16, 14, '#B05050', '#E8E0D0', s)
  drawHouse(ctx, Math.floor(pw * 0.35), groundY, 18, 16, '#508050', '#E0D8C8', s)
  drawHouse(ctx, Math.floor(pw * 0.68), groundY, 15, 13, '#5050A0', '#D8D0C0', s)

  drawFence(ctx, pw, groundY, s)
  drawPole(ctx, Math.floor(pw * 0.92), groundY, s)

  // 自然の摂理に基づくツリー型アリの巣
  drawTreeNest(ctx, pw, groundY, s)

  return { antX: Math.floor(pw / 2), antY: groundY + 45 }
}
