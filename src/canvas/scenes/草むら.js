import { px, drawSky, drawUnderground, drawGrass } from '../pixelUtils'

// 小さな落ち葉（前シーンの名残）
function drawTinyLeaf(ctx, cx, topY, s) {
  const O = '#5C3D08'
  const B = '#8B6914'
  const L = '#A07820'

  const colorMap = { ' ': null, 'O': O, 'B': B, 'L': L }

  const data = [
    ' OO    ',
    'OBLOOS ',
    'OBBBOOSS',
    ' OOO   ',
  ]

  const offsetX = cx
  for (let row = 0; row < data.length; row++) {
    const line = data[row]
    for (let col = 0; col < line.length; col++) {
      const c = colorMap[line[col]]
      if (c) px(ctx, offsetX + col, topY + row, s, c)
    }
  }
}

// 小石（前シーンの名残）
function drawTinyStone(ctx, cx, topY, s) {
  const D = '#707070'
  const M = '#9E9E9E'
  const L = '#B8B8B8'

  const colorMap = { ' ': null, 'D': D, 'M': M, 'L': L }

  const data = [
    ' DMD ',
    'DMLMD',
    ' DDD ',
  ]

  const offsetX = cx
  for (let row = 0; row < data.length; row++) {
    const line = data[row]
    for (let col = 0; col < line.length; col++) {
      const c = colorMap[line[col]]
      if (c) px(ctx, offsetX + col, topY + row, s, c)
    }
  }
}

// アリの巣（3部屋）
function drawNest3(ctx, cx, groundY, s) {
  const hole = '#1A1008'

  // 入口
  px(ctx, cx, groundY, s, hole)
  px(ctx, cx + 1, groundY, s, hole)

  // 縦トンネル（メイン）
  for (let y = 1; y <= 7; y++) {
    px(ctx, cx, groundY + y, s, hole)
  }

  // 左上の部屋
  for (let x = -5; x <= -1; x++) {
    px(ctx, cx + x, groundY + 7, s, hole)
  }
  for (let x = -7; x <= -4; x++) {
    px(ctx, cx + x, groundY + 8, s, hole)
    px(ctx, cx + x, groundY + 9, s, hole)
  }
  for (let x = -6; x <= -5; x++) {
    px(ctx, cx + x, groundY + 10, s, hole)
  }

  // 右の部屋
  for (let x = 1; x <= 4; x++) {
    px(ctx, cx + x, groundY + 7, s, hole)
  }
  for (let x = 3; x <= 7; x++) {
    px(ctx, cx + x, groundY + 8, s, hole)
    px(ctx, cx + x, groundY + 9, s, hole)
  }
  for (let x = 4; x <= 6; x++) {
    px(ctx, cx + x, groundY + 10, s, hole)
  }

  // さらに下へトンネル
  for (let y = 8; y <= 14; y++) {
    px(ctx, cx, groundY + y, s, hole)
  }

  // 下の大部屋
  for (let x = -3; x <= 4; x++) {
    px(ctx, cx + x, groundY + 15, s, hole)
    px(ctx, cx + x, groundY + 16, s, hole)
    px(ctx, cx + x, groundY + 17, s, hole)
  }
  for (let x = -2; x <= 3; x++) {
    px(ctx, cx + x, groundY + 18, s, hole)
  }
}

export function draw(ctx, pw, ph, s) {
  const groundY = Math.floor(ph * 0.45)

  drawSky(ctx, pw, groundY, s)
  drawUnderground(ctx, pw, ph, groundY, s)

  const nestCx = Math.floor(pw / 2)

  // アリの巣（3部屋）
  drawNest3(ctx, nestCx, groundY, s)

  drawGrass(ctx, pw, groundY, s, 30)

  // 大量の草
  for (let i = 0; i < 50; i++) {
    const gx = (i * 6 + 1) % pw
    const gh = 5 + (i % 6) * 2
    const gc = i % 3 === 0 ? '#4A9530' : i % 3 === 1 ? '#3A8520' : '#2D6B14'
    for (let g = 0; g < gh; g++) {
      px(ctx, gx, groundY - 2 - g, s, gc)
    }
  }

  // 小さな落ち葉と小石（前シーンの名残）
  drawTinyLeaf(ctx, Math.floor(pw * 0.12), groundY - 5, s)
  drawTinyStone(ctx, Math.floor(pw * 0.82), groundY - 4, s)
  drawTinyStone(ctx, Math.floor(pw * 0.35), groundY - 3, s)

  return { antX: nestCx, antY: groundY + 16 }
}
