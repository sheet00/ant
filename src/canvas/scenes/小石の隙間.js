import { px, drawSky, drawUnderground, drawGrass } from '../pixelUtils'

// 地面に転がる小石（不規則な形のドット絵）
function drawStone(ctx, cx, topY, s, variant) {
  const D = '#707070'  // 暗い面
  const M = '#9E9E9E'  // 中間
  const L = '#B8B8B8'  // 明るい面
  const H = '#D0D0D0'  // ハイライト

  const colorMap = {
    ' ': null,
    'D': D, 'M': M, 'L': L, 'H': H,
  }

  const stones = [
    // variant 0: 大きめの丸い石
    [
      '   DMMMD   ',
      '  DMLHLMD  ',
      ' DMLLLHLMD ',
      ' DMLLHLMMD ',
      ' DMMLLMMDD ',
      '  DMMMMDD  ',
      '   DDDD    ',
    ],
    // variant 1: 横長の平たい石
    [
      '  DMMMMMD  ',
      ' DMLHHLMMD ',
      ' DMLLLLMMDD',
      '  DMMMMDD  ',
      '   DDDD    ',
    ],
    // variant 2: 角ばった小石
    [
      '  DMMD  ',
      ' DMLHMD ',
      ' DMLLMD ',
      ' DMMMD  ',
      '  DDD   ',
    ],
  ]

  const data = stones[variant % stones.length]
  const maxW = Math.max(...data.map(r => r.length))
  const offsetX = cx - Math.floor(maxW / 2)

  for (let row = 0; row < data.length; row++) {
    const line = data[row]
    for (let col = 0; col < line.length; col++) {
      const c = colorMap[line[col]]
      if (c) px(ctx, offsetX + col, topY + row, s, c)
    }
  }
}

// 小さな落ち葉（落ち葉の下から成長して小さくなった表現）
function drawSmallLeaf(ctx, cx, topY, s) {
  const O = '#5C3D08'
  const B = '#8B6914'
  const L = '#A07820'
  const S = '#6B5510'

  const colorMap = { ' ': null, 'O': O, 'B': B, 'L': L, 'S': S }

  const data = [
    '  OOO       ',
    ' OBLBOO     ',
    'OBBLSLBOO   ',
    'OBBBBBBBOOSS',
    'OBLSBBLBOO  ',
    ' OBBBBOO    ',
    '  OOO       ',
  ]

  const maxW = Math.max(...data.map(r => r.length))
  const offsetX = cx - Math.floor(maxW / 2)

  for (let row = 0; row < data.length; row++) {
    const line = data[row]
    for (let col = 0; col < line.length; col++) {
      const c = colorMap[line[col]]
      if (c) px(ctx, offsetX + col, topY + row, s, c)
    }
  }
}

// 小さなアリの巣（黒いトンネル）
function drawSmallNest(ctx, cx, groundY, s) {
  const hole = '#1A1008'

  // 入口
  px(ctx, cx, groundY, s, hole)
  px(ctx, cx + 1, groundY, s, hole)

  // 縦トンネル
  for (let y = 1; y <= 8; y++) {
    px(ctx, cx, groundY + y, s, hole)
  }

  // 左の部屋（横トンネルで繋がる）
  for (let x = -5; x <= -1; x++) {
    px(ctx, cx + x, groundY + 8, s, hole)
  }
  for (let x = -7; x <= -4; x++) {
    px(ctx, cx + x, groundY + 9, s, hole)
    px(ctx, cx + x, groundY + 10, s, hole)
  }
  for (let x = -6; x <= -5; x++) {
    px(ctx, cx + x, groundY + 11, s, hole)
  }

  // 右の部屋（さらに下へ）
  for (let y = 9; y <= 12; y++) {
    px(ctx, cx, groundY + y, s, hole)
  }
  for (let x = 1; x <= 5; x++) {
    px(ctx, cx + x, groundY + 12, s, hole)
  }
  for (let x = 0; x <= 5; x++) {
    px(ctx, cx + x, groundY + 13, s, hole)
    px(ctx, cx + x, groundY + 14, s, hole)
  }
  for (let x = 1; x <= 4; x++) {
    px(ctx, cx + x, groundY + 15, s, hole)
  }
}

export function draw(ctx, pw, ph, s) {
  const groundY = Math.floor(ph * 0.45)

  drawSky(ctx, pw, groundY, s)
  drawUnderground(ctx, pw, ph, groundY, s)

  const nestCx = Math.floor(pw / 2)

  // アリの巣
  drawSmallNest(ctx, nestCx, groundY, s)

  drawGrass(ctx, pw, groundY, s)

  // 小石を地面に配置
  drawStone(ctx, Math.floor(pw * 0.25), groundY - 6, s, 0)
  drawStone(ctx, Math.floor(pw * 0.5), groundY - 4, s, 1)
  drawStone(ctx, Math.floor(pw * 0.72), groundY - 5, s, 2)

  // 小さな落ち葉（前のシーンの名残）
  drawSmallLeaf(ctx, Math.floor(pw * 0.15), groundY - 8, s)

  return { antX: nestCx, antY: groundY + 10 }
}
