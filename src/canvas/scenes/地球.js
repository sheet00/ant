import { px, pxRect, drawUnderground } from '../pixelUtils'

// 宇宙背景（黒 + 星）
function drawSpace(ctx, pw, ph, s) {
  // 黒背景
  pxRect(ctx, 0, 0, pw, ph, s, '#050510')

  // 星を散りばめる
  const starColors = ['#FFFFFF', '#EEEEEE', '#DDDDDD', '#FFFFCC', '#CCDDFF']
  for (let i = 0; i < 80; i++) {
    const sx = (i * 137 + 29) % pw
    const sy = (i * 191 + 13) % ph
    const ci = i % starColors.length
    px(ctx, sx, sy, s, starColors[ci])
  }
  // 小さめの星をさらに追加
  for (let i = 0; i < 40; i++) {
    const sx = (i * 97 + 51) % pw
    const sy = (i * 163 + 7) % ph
    px(ctx, sx, sy, s, '#AAAACC')
  }
}

// 地球をドット絵で描く
function drawEarth(ctx, cx, cy, r, s) {
  const ocean = '#1565C0'
  const oceanL = '#1E88E5'
  const land = '#4CAF50'
  const landD = '#2E7D32'
  const ice = '#E0F7FA'
  const cloud = '#FFFFFFBB'

  // 円を描く（px関数で1ドットずつ）
  for (let dy = -r; dy <= r; dy++) {
    const rowW = Math.floor(r * Math.sqrt(1 - (dy * dy) / (r * r)))
    for (let dx = -rowW; dx <= rowW; dx++) {
      // 基本は海
      let color = (dx + dy) % 7 === 0 ? oceanL : ocean

      // 北極
      if (dy <= -r + 2) color = ice

      // 南極
      if (dy >= r - 2) color = ice

      // ユーラシア大陸（上部中央〜右）
      if (dy >= -r + 3 && dy <= -r + 9 && dx >= -3 && dx <= 8) {
        color = (dx + dy) % 3 === 0 ? landD : land
      }

      // アフリカ（中央やや左）
      if (dy >= -2 && dy <= 6 && dx >= -5 && dx <= -1) {
        color = (dx + dy) % 3 === 0 ? landD : land
      }

      // 南北アメリカ（左寄り）
      if (dy >= -r + 4 && dy <= -r + 8 && dx >= -rowW + 1 && dx <= -rowW + 5) {
        color = land
      }
      if (dy >= -2 && dy <= 5 && dx >= -rowW + 1 && dx <= -rowW + 3) {
        color = (dx + dy) % 3 === 0 ? landD : land
      }

      // オーストラリア（右下）
      if (dy >= 3 && dy <= 6 && dx >= 4 && dx <= 8) {
        color = land
      }

      // 雲（散在させる）
      const ci = (dx * 7 + dy * 13) % 37
      if (ci === 0 || ci === 1) {
        color = '#BBDEFB'
      }

      px(ctx, cx + dx, cy + dy, s, color)
    }
  }

  // 地球の縁（大気の光）
  for (let dy = -r - 1; dy <= r + 1; dy++) {
    const outerW = Math.floor((r + 1) * Math.sqrt(Math.max(0, 1 - (dy * dy) / ((r + 1) * (r + 1)))))
    const innerW = Math.floor(r * Math.sqrt(Math.max(0, 1 - (dy * dy) / (r * r))))
    if (outerW > innerW) {
      px(ctx, cx - outerW, cy + dy, s, '#4FC3F7')
      px(ctx, cx + outerW, cy + dy, s, '#4FC3F7')
    }
  }
}

// アリの巣（19部屋）- 地球の下半分に表現
function drawNest19(ctx, cx, groundY, s) {
  const hole = '#1A1008'

  // 入口
  px(ctx, cx, groundY, s, hole)
  px(ctx, cx + 1, groundY, s, hole)

  // 縦トンネル1
  for (let y = 1; y <= 4; y++) px(ctx, cx, groundY + y, s, hole)

  // 左1
  for (let x = -3; x <= -1; x++) px(ctx, cx + x, groundY + 3, s, hole)
  for (let x = -5; x <= -2; x++) {
    px(ctx, cx + x, groundY + 4, s, hole)
    px(ctx, cx + x, groundY + 5, s, hole)
  }

  // 右1
  for (let x = 1; x <= 4; x++) px(ctx, cx + x, groundY + 3, s, hole)
  for (let x = 3; x <= 7; x++) {
    px(ctx, cx + x, groundY + 4, s, hole)
    px(ctx, cx + x, groundY + 5, s, hole)
  }

  // 縦トンネル2
  for (let y = 5; y <= 8; y++) px(ctx, cx, groundY + y, s, hole)

  // 左2
  for (let x = -4; x <= -1; x++) px(ctx, cx + x, groundY + 7, s, hole)
  for (let x = -7; x <= -3; x++) {
    px(ctx, cx + x, groundY + 8, s, hole)
    px(ctx, cx + x, groundY + 9, s, hole)
  }

  // 右2
  for (let x = 1; x <= 5; x++) px(ctx, cx + x, groundY + 7, s, hole)
  for (let x = 4; x <= 9; x++) {
    px(ctx, cx + x, groundY + 8, s, hole)
    px(ctx, cx + x, groundY + 9, s, hole)
  }

  // 縦トンネル3
  for (let y = 9; y <= 12; y++) px(ctx, cx, groundY + y, s, hole)

  // 左3
  for (let x = -3; x <= -1; x++) px(ctx, cx + x, groundY + 11, s, hole)
  for (let x = -6; x <= -2; x++) {
    px(ctx, cx + x, groundY + 12, s, hole)
    px(ctx, cx + x, groundY + 13, s, hole)
  }

  // 右3
  for (let x = 1; x <= 4; x++) px(ctx, cx + x, groundY + 11, s, hole)
  for (let x = 3; x <= 8; x++) {
    px(ctx, cx + x, groundY + 12, s, hole)
    px(ctx, cx + x, groundY + 13, s, hole)
  }

  // 縦トンネル4
  for (let y = 13; y <= 16; y++) px(ctx, cx, groundY + y, s, hole)

  // 左4
  for (let x = -4; x <= -1; x++) px(ctx, cx + x, groundY + 15, s, hole)
  for (let x = -8; x <= -3; x++) {
    px(ctx, cx + x, groundY + 16, s, hole)
    px(ctx, cx + x, groundY + 17, s, hole)
  }

  // 右4
  for (let x = 1; x <= 5; x++) px(ctx, cx + x, groundY + 15, s, hole)
  for (let x = 4; x <= 10; x++) {
    px(ctx, cx + x, groundY + 16, s, hole)
    px(ctx, cx + x, groundY + 17, s, hole)
  }

  // 縦トンネル5
  for (let y = 17; y <= 20; y++) px(ctx, cx, groundY + y, s, hole)

  // 左5
  for (let x = -3; x <= -1; x++) px(ctx, cx + x, groundY + 19, s, hole)
  for (let x = -6; x <= -2; x++) {
    px(ctx, cx + x, groundY + 20, s, hole)
    px(ctx, cx + x, groundY + 21, s, hole)
  }

  // 右5
  for (let x = 1; x <= 4; x++) px(ctx, cx + x, groundY + 19, s, hole)
  for (let x = 3; x <= 8; x++) {
    px(ctx, cx + x, groundY + 20, s, hole)
    px(ctx, cx + x, groundY + 21, s, hole)
  }

  // 縦トンネル6
  for (let y = 21; y <= 24; y++) px(ctx, cx, groundY + y, s, hole)

  // 左6
  for (let x = -4; x <= -1; x++) px(ctx, cx + x, groundY + 23, s, hole)
  for (let x = -7; x <= -3; x++) {
    px(ctx, cx + x, groundY + 24, s, hole)
    px(ctx, cx + x, groundY + 25, s, hole)
  }

  // 右6
  for (let x = 1; x <= 5; x++) px(ctx, cx + x, groundY + 23, s, hole)
  for (let x = 4; x <= 9; x++) {
    px(ctx, cx + x, groundY + 24, s, hole)
    px(ctx, cx + x, groundY + 25, s, hole)
  }

  // 縦トンネル7
  for (let y = 25; y <= 28; y++) px(ctx, cx, groundY + y, s, hole)

  // 左7
  for (let x = -3; x <= -1; x++) px(ctx, cx + x, groundY + 27, s, hole)
  for (let x = -6; x <= -2; x++) {
    px(ctx, cx + x, groundY + 28, s, hole)
    px(ctx, cx + x, groundY + 29, s, hole)
  }

  // 右7
  for (let x = 1; x <= 4; x++) px(ctx, cx + x, groundY + 27, s, hole)
  for (let x = 3; x <= 7; x++) {
    px(ctx, cx + x, groundY + 28, s, hole)
    px(ctx, cx + x, groundY + 29, s, hole)
  }

  // 縦トンネル8
  for (let y = 29; y <= 32; y++) px(ctx, cx, groundY + y, s, hole)

  // 左8
  for (let x = -4; x <= -1; x++) px(ctx, cx + x, groundY + 31, s, hole)
  for (let x = -7; x <= -3; x++) {
    px(ctx, cx + x, groundY + 32, s, hole)
    px(ctx, cx + x, groundY + 33, s, hole)
  }

  // 右8
  for (let x = 1; x <= 5; x++) px(ctx, cx + x, groundY + 31, s, hole)
  for (let x = 4; x <= 9; x++) {
    px(ctx, cx + x, groundY + 32, s, hole)
    px(ctx, cx + x, groundY + 33, s, hole)
  }

  // 縦トンネル9
  for (let y = 33; y <= 36; y++) px(ctx, cx, groundY + y, s, hole)

  // 左9（19部屋目の追加分）
  for (let x = -3; x <= -1; x++) px(ctx, cx + x, groundY + 35, s, hole)
  for (let x = -6; x <= -2; x++) {
    px(ctx, cx + x, groundY + 36, s, hole)
    px(ctx, cx + x, groundY + 37, s, hole)
  }

  // 縦トンネル10
  for (let y = 37; y <= 39; y++) px(ctx, cx, groundY + y, s, hole)

  // 最下層（女王の間）
  for (let x = -7; x <= 8; x++) {
    px(ctx, cx + x, groundY + 40, s, hole)
    px(ctx, cx + x, groundY + 41, s, hole)
    px(ctx, cx + x, groundY + 42, s, hole)
  }
  for (let x = -6; x <= 7; x++) px(ctx, cx + x, groundY + 43, s, hole)
}

export function draw(ctx, pw, ph, s) {
  // 地球シーンでは groundY を中央付近に
  const groundY = Math.floor(ph * 0.45)

  // 宇宙背景（全体を黒+星で塗る）
  drawSpace(ctx, pw, ph, s)

  // 地球の下半分に地下を重ねて描く
  const earthCx = Math.floor(pw / 2)
  const earthCy = Math.floor(ph * 0.32)
  const earthR = Math.min(Math.floor(pw * 0.3), Math.floor(ph * 0.25))

  // 地球を描画
  drawEarth(ctx, earthCx, earthCy, earthR, s)

  // 地下部分（地球の下半分から巣が伸びる）
  // 暗い土色の地下領域
  const dirtColors = ['#3A2A15', '#2E2010', '#251A0D', '#1C140A', '#151008']
  for (let y = groundY; y < ph; y++) {
    const depth = (y - groundY) / (ph - groundY)
    const ci = Math.min(dirtColors.length - 1, Math.floor(depth * dirtColors.length))
    pxRect(ctx, 0, y, pw, 1, s, dirtColors[ci])
  }

  // 薄い地表ライン（宇宙と地下の境界）
  for (let x = 0; x < pw; x++) {
    px(ctx, x, groundY - 1, s, '#2A1F10')
    px(ctx, x, groundY, s, '#1E1508')
  }

  const nestCx = Math.floor(pw / 2)

  drawNest19(ctx, nestCx, groundY, s)

  return { antX: nestCx, antY: groundY + 41 }
}
