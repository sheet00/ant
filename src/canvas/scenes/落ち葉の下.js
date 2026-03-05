import { px, drawSky, drawUnderground, drawGrass } from '../pixelUtils'

// 地面に落ちた大きな葉（横向き、葉柄が右）
function drawFallenLeaf(ctx, cx, topY, s) {
  const O = '#5C3D08'
  const B = '#8B6914'
  const L = '#A07820'
  const V = '#5A4008'
  const S = '#6B5510'

  const data = [
    '        OOO                         ',
    '      OOBLBOO                       ',
    '    OOBBLSLBBOO                     ',
    '   OBLBBBLBBBLOO                    ',
    '  OBBLSBBLBBSLBBOO                  ',
    ' OBBBBBBLBBBBBBBBOO                 ',
    ' OBLBSBBLBBSBBBBLBOO                ',
    'OBBBBBBBLBBBBBBBBBBOOO              ',
    'OBLBSBVVVVVVVVVVVVVVVVVOO           ',
    'OBBBBBBBLBBBBBBBBBBBBBBBOOOSSS      ',
    'OBLBSBBLBBSBLBBSBBBBLBBOO           ',
    ' OBBBBBLBBBBBBBBBBBBBBOO            ',
    ' OBLBSBBBLBBSBBBBLBBOO              ',
    '  OBBLSBBBLBBSLBBBOO               ',
    '   OBLBBBLBBBBBOO                   ',
    '    OOBBLSLBBOO                     ',
    '      OOBLBOO                       ',
    '        OOO                         ',
  ]

  const colorMap = {
    ' ': null,
    'O': O, 'B': B, 'L': L, 'V': V, 'S': S,
  }

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

// 小さなアリの巣（黒いトンネルがちょっとあるだけ）
function drawSmallNest(ctx, cx, groundY, s) {
  const hole = '#1A1008'

  // 入口の穴（地表に小さな黒い穴）
  px(ctx, cx, groundY, s, hole)
  px(ctx, cx + 1, groundY, s, hole)

  // 縦トンネル（1px幅でまっすぐ下へ）
  for (let y = 1; y <= 8; y++) {
    px(ctx, cx, groundY + y, s, hole)
  }

  // 下で少し横に広がる小部屋
  for (let x = -2; x <= 2; x++) {
    px(ctx, cx + x, groundY + 9, s, hole)
    px(ctx, cx + x, groundY + 10, s, hole)
  }
  for (let x = -1; x <= 1; x++) {
    px(ctx, cx + x, groundY + 11, s, hole)
  }
}

export function draw(ctx, pw, ph, s) {
  const groundY = Math.floor(ph * 0.45)

  drawSky(ctx, pw, groundY, s)
  drawUnderground(ctx, pw, ph, groundY, s)

  const nestCx = Math.floor(pw / 2)

  // アリの巣（ドット絵）
  drawSmallNest(ctx, nestCx, groundY, s)

  drawGrass(ctx, pw, groundY, s)

  // 大きな落ち葉が地面に横向きに
  drawFallenLeaf(ctx, nestCx, groundY - 18, s)

  return { antX: nestCx, antY: groundY + 10 }
}
