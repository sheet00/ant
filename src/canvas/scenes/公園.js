import { px, pxRect, drawSky, drawUnderground, drawGrass } from '../pixelUtils'

// 公園全体の俯瞰的な表現（木、ベンチ、遊具が小さく見える）
function drawPark(ctx, pw, groundY, s) {
  const trunk = '#5A3A1A'
  const trunkD = '#4A2A10'
  const leaf = '#2D6B14'
  const leafL = '#3A8520'
  const leafD = '#1E5510'
  const metal = '#777777'
  const metalD = '#555555'
  const metalL = '#999999'
  const bench = '#6B4226'
  const benchL = '#8B5A3A'
  const path = '#C8B898'
  const pathD = '#B0A080'

  // 小道（公園の通路）
  const pathY = groundY - 1
  for (let x = 0; x < pw; x++) {
    px(ctx, x, pathY, s, pathD)
    px(ctx, x, groundY - 2, s, path)
  }

  // 左の大きな木
  const tree1X = Math.floor(pw * 0.12)
  // 幹
  for (let y = groundY - 18; y <= groundY - 2; y++) {
    px(ctx, tree1X, y, s, trunk)
    px(ctx, tree1X + 1, y, s, trunkD)
  }
  // 樹冠（ドット集合）
  for (let dy = -7; dy <= 0; dy++) {
    const w = 5 - Math.abs(dy + 3)
    if (w <= 0) continue
    for (let dx = -w; dx <= w; dx++) {
      const c = (dx + dy) % 3 === 0 ? leafL : (dx + dy) % 3 === 1 ? leaf : leafD
      px(ctx, tree1X + dx, groundY - 18 + dy, s, c)
    }
  }

  // 右の木（少し小さい）
  const tree2X = Math.floor(pw * 0.85)
  for (let y = groundY - 14; y <= groundY - 2; y++) {
    px(ctx, tree2X, y, s, trunk)
  }
  for (let dy = -5; dy <= 0; dy++) {
    const w = 4 - Math.abs(dy + 2)
    if (w <= 0) continue
    for (let dx = -w; dx <= w; dx++) {
      const c = dx % 2 === 0 ? leaf : leafL
      px(ctx, tree2X + dx, groundY - 14 + dy, s, c)
    }
  }

  // 中央奥の木
  const tree3X = Math.floor(pw * 0.5)
  for (let y = groundY - 12; y <= groundY - 2; y++) {
    px(ctx, tree3X, y, s, trunkD)
  }
  for (let dy = -4; dy <= 0; dy++) {
    const w = 3 - Math.abs(dy + 2)
    if (w <= 0) continue
    for (let dx = -w; dx <= w; dx++) {
      px(ctx, tree3X + dx, groundY - 12 + dy, s, leafD)
    }
  }

  // ベンチ（左寄り、小さく）
  const benchX = Math.floor(pw * 0.28)
  const benchY = groundY - 4
  // 座面
  for (let x = 0; x < 8; x++) {
    px(ctx, benchX + x, benchY, s, bench)
    px(ctx, benchX + x, benchY + 1, s, benchL)
  }
  // 脚
  px(ctx, benchX + 1, benchY + 2, s, metalD)
  px(ctx, benchX + 1, benchY + 3, s, metalD)
  px(ctx, benchX + 6, benchY + 2, s, metalD)
  px(ctx, benchX + 6, benchY + 3, s, metalD)
  // 背もたれ
  for (let x = 0; x < 8; x++) {
    px(ctx, benchX + x, benchY - 1, s, bench)
  }

  // 右のベンチ
  const bench2X = Math.floor(pw * 0.68)
  const bench2Y = groundY - 4
  for (let x = 0; x < 7; x++) {
    px(ctx, bench2X + x, bench2Y, s, bench)
    px(ctx, bench2X + x, bench2Y + 1, s, benchL)
  }
  px(ctx, bench2X + 1, bench2Y + 2, s, metalD)
  px(ctx, bench2X + 5, bench2Y + 2, s, metalD)
  for (let x = 0; x < 7; x++) {
    px(ctx, bench2X + x, bench2Y - 1, s, bench)
  }

  // 遠くのブランコ（小さく表現）
  const swX = Math.floor(pw * 0.38)
  const swTop = groundY - 16
  // 横棒
  for (let x = 0; x < 10; x++) {
    px(ctx, swX + x, swTop, s, metal)
  }
  // 支柱
  for (let y = swTop + 1; y <= groundY - 2; y++) {
    px(ctx, swX, y, s, metalD)
    px(ctx, swX + 9, y, s, metalD)
  }
  // 鎖と座面
  for (let y = swTop + 1; y < groundY - 6; y++) {
    px(ctx, swX + 4, y, s, y % 2 === 0 ? metalL : metal)
  }
  for (let x = 3; x <= 6; x++) px(ctx, swX + x, groundY - 6, s, bench)

  // 遠くの滑り台（小さく表現）
  const slX = Math.floor(pw * 0.58)
  const slTop = groundY - 14
  // スロープ
  for (let i = 0; i < 10; i++) {
    const sy = slTop + Math.floor(i * 0.8)
    px(ctx, slX + i, sy, s, metalL)
    px(ctx, slX + i, sy + 1, s, metal)
  }
  // はしご
  for (let y = slTop; y <= groundY - 2; y++) {
    px(ctx, slX - 1, y, s, metalD)
  }

  // 遠くの噴水（小さく）
  const fnX = Math.floor(pw * 0.75)
  const fnY = groundY - 8
  // 池
  for (let x = -4; x <= 4; x++) {
    px(ctx, fnX + x, fnY, s, '#6BAED6')
    px(ctx, fnX + x, fnY + 1, s, '#4A90B8')
  }
  // 縁
  px(ctx, fnX - 5, fnY, s, metalL)
  px(ctx, fnX + 5, fnY, s, metalL)
  // 水柱
  for (let y = fnY - 5; y < fnY; y++) {
    px(ctx, fnX, y, s, '#B0DFF0')
  }
}

// アリの巣（11部屋）
function drawNest11(ctx, cx, groundY, s) {
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

  // 左4
  for (let x = -5; x <= -1; x++) px(ctx, cx + x, groundY + 20, s, hole)
  for (let x = -9; x <= -4; x++) {
    px(ctx, cx + x, groundY + 21, s, hole)
    px(ctx, cx + x, groundY + 22, s, hole)
  }
  for (let x = -8; x <= -5; x++) px(ctx, cx + x, groundY + 23, s, hole)

  // 右4
  for (let x = 1; x <= 6; x++) px(ctx, cx + x, groundY + 21, s, hole)
  for (let x = 5; x <= 11; x++) {
    px(ctx, cx + x, groundY + 22, s, hole)
    px(ctx, cx + x, groundY + 23, s, hole)
  }
  for (let x = 6; x <= 10; x++) px(ctx, cx + x, groundY + 24, s, hole)

  // 縦トンネル5
  for (let y = 22; y <= 27; y++) px(ctx, cx, groundY + y, s, hole)

  // 左5（新規11部屋目）
  for (let x = -6; x <= -1; x++) px(ctx, cx + x, groundY + 26, s, hole)
  for (let x = -10; x <= -5; x++) {
    px(ctx, cx + x, groundY + 27, s, hole)
    px(ctx, cx + x, groundY + 28, s, hole)
  }
  for (let x = -9; x <= -6; x++) px(ctx, cx + x, groundY + 29, s, hole)

  // 縦トンネル6
  for (let y = 28; y <= 31; y++) px(ctx, cx, groundY + y, s, hole)

  // 最下層（大きめ、コロニー拡大を表現）
  for (let x = -7; x <= 8; x++) {
    px(ctx, cx + x, groundY + 32, s, hole)
    px(ctx, cx + x, groundY + 33, s, hole)
    px(ctx, cx + x, groundY + 34, s, hole)
    px(ctx, cx + x, groundY + 35, s, hole)
  }
  for (let x = -6; x <= 7; x++) px(ctx, cx + x, groundY + 36, s, hole)
}

export function draw(ctx, pw, ph, s) {
  const groundY = Math.floor(ph * 0.45)

  drawSky(ctx, pw, groundY, s)
  drawUnderground(ctx, pw, ph, groundY, s)

  const nestCx = Math.floor(pw / 2)

  drawNest11(ctx, nestCx, groundY, s)

  drawGrass(ctx, pw, groundY, s, 15)

  drawPark(ctx, pw, groundY, s)

  return { antX: nestCx, antY: groundY + 34 }
}
