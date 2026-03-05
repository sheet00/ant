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

// 月面の地面（灰色グラデーション + クレーター）
function drawMoonSurface(ctx, pw, ph, groundY, s) {
  const colors = ['#999999', '#919191', '#888888', '#808080', '#777777', '#6E6E6E', '#666666']
  for (let y = groundY; y < ph; y++) {
    const depth = (y - groundY) / (ph - groundY)
    const ci = Math.min(colors.length - 1, Math.floor(depth * colors.length))
    pxRect(ctx, 0, y, pw, 1, s, colors[ci])
  }

  // 地表ライン
  pxRect(ctx, 0, groundY, pw, 1, s, '#AAAAAA')
  pxRect(ctx, 0, groundY + 1, pw, 1, s, '#999999')

  // クレーター等の描画は維持（省略せずそのまま実装）
  const c1x = Math.floor(pw * 0.2), c1y = groundY
  for (let x = -4; x <= 4; x++) { px(ctx, c1x + x, c1y, s, '#777777'); px(ctx, c1x + x, c1y + 1, s, '#6E6E6E'); }
  for (let x = -3; x <= 3; x++) { px(ctx, c1x + x, c1y + 2, s, '#666666'); }
  px(ctx, c1x - 5, c1y, s, '#BBBBBB'); px(ctx, c1x + 5, c1y, s, '#BBBBBB');

  const c2x = Math.floor(pw * 0.75), c2y = groundY
  for (let x = -6; x <= 6; x++) { px(ctx, c2x + x, c2y, s, '#777777'); px(ctx, c2x + x, c2y + 1, s, '#6E6E6E'); }
  for (let x = -5; x <= 5; x++) { px(ctx, c2x + x, c2y + 2, s, '#666666'); px(ctx, c2x + x, c2y + 3, s, '#606060'); }
  px(ctx, c2x - 7, c2y, s, '#BBBBBB'); px(ctx, c2x + 7, c2y, s, '#BBBBBB');
}

// 地球
function drawEarth(ctx, pw, groundY, s) {
  const ex = Math.floor(pw * 0.8), ey = Math.floor(groundY * 0.3)
  for (let dy = -3; dy <= 3; dy++) {
    const w = dy === -3 || dy === 3 ? 1 : dy === -2 || dy === 2 ? 2 : 3
    for (let dx = -w; dx <= w; dx++) { px(ctx, ex + dx, ey + dy, s, '#4488CC'); }
  }
}

// 巨大なアリの巣（月面用：深さ100以上）
function drawGiantNest(ctx, cx, groundY, s) {
  const hole = '#1A1008'
  let curY = groundY

  // 入口
  px(ctx, cx, curY, s, hole); px(ctx, cx + 1, curY, s, hole); curY++;

  // 10階層にわたる複雑な巣を生成
  for (let floor = 0; floor < 12; floor++) {
    // 縦トンネル
    const tunnelLen = 5 + (floor % 3) * 2
    for (let i = 0; i < tunnelLen; i++) {
      px(ctx, cx, curY + i, s, hole)
    }
    
    // 左右の部屋（ランダム風だが固定ロジック）
    const roomY = curY + Math.floor(tunnelLen / 2)
    const isLeft = floor % 2 === 0 || floor % 3 === 0
    const isRight = floor % 2 !== 0 || floor % 5 === 0
    
    if (isLeft) {
      const roomW = 4 + (floor % 4)
      for (let x = -roomW; x < 0; x++) {
        px(ctx, cx + x, roomY, s, hole)
        px(ctx, cx + x, roomY + 1, s, hole)
        if (floor % 2 === 0) px(ctx, cx + x, roomY - 1, s, hole)
      }
    }
    if (isRight) {
      const roomW = 4 + (floor % 3) * 2
      for (let x = 1; x <= roomW; x++) {
        px(ctx, cx + x, roomY + 1, s, hole)
        px(ctx, cx + x, roomY + 2, s, hole)
        if (floor % 3 === 0) px(ctx, cx + x, roomY, s, hole)
      }
    }
    
    curY += tunnelLen
  }

  // 最深部（巨大な女王の間）
  for (let y = 0; y < 6; y++) {
    const w = 12 - Math.abs(y - 3)
    for (let x = -w; x <= w; x++) {
      px(ctx, cx + x, curY + y, s, hole)
    }
  }
  
  return curY + 3
}

export function draw(ctx, pw, ph, s) {
  const groundY = Math.floor(ph * 0.25) // 月面を少し上に上げて地下を広く確保

  drawSpace(ctx, pw, ph, s)
  drawMoonSurface(ctx, pw, ph, groundY, s)
  drawEarth(ctx, pw, groundY, s)

  const nestCx = Math.floor(pw / 2)
  const lastY = drawGiantNest(ctx, nestCx, groundY, s)

  return { antX: nestCx, antY: lastY }
}
