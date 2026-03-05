import { px } from './pixelUtils'

// かわいいピクセルアートのアリ（正面向き・チビキャラ風）
export function drawPixelAnt(ctx, ox, oy, s) {
  const B = '#2A1500' // 輪郭
  const D = '#8B5E3C' // 体（明るめ茶）
  const H = '#6B3F1F' // 体（暗め茶）
  const W = '#FFFFFF' // 白目
  const E = '#111111' // 瞳
  const P = '#FFB0C0' // ほっぺ（ピンク）
  const T = '#A06830' // 触角

  // --- 触角（ぴょこっと） ---
  px(ctx, ox - 3, oy - 7, s, T)
  px(ctx, ox - 4, oy - 8, s, T)
  px(ctx, ox + 3, oy - 7, s, T)
  px(ctx, ox + 4, oy - 8, s, T)
  px(ctx, ox - 5, oy - 9, s, '#C08040')
  px(ctx, ox + 5, oy - 9, s, '#C08040')
  px(ctx, ox - 2, oy - 6, s, T)
  px(ctx, ox + 2, oy - 6, s, T)

  // --- 頭（大きめ丸） ---
  for (let x = -2; x <= 2; x++) px(ctx, ox + x, oy - 6, s, B)
  for (let x = -3; x <= 3; x++) px(ctx, ox + x, oy - 5, s, B)
  px(ctx, ox - 2, oy - 5, s, D)
  px(ctx, ox - 1, oy - 5, s, D)
  px(ctx, ox, oy - 5, s, D)
  px(ctx, ox + 1, oy - 5, s, D)
  px(ctx, ox + 2, oy - 5, s, D)
  for (let y = -4; y <= -2; y++) {
    px(ctx, ox - 4, oy + y, s, B)
    px(ctx, ox + 4, oy + y, s, B)
    for (let x = -3; x <= 3; x++) px(ctx, ox + x, oy + y, s, D)
  }
  for (let x = -3; x <= 3; x++) px(ctx, ox + x, oy - 1, s, B)
  for (let x = -2; x <= 2; x++) px(ctx, ox + x, oy - 1, s, D)

  // --- 目（大きくてキラキラ 2x2） ---
  px(ctx, ox - 3, oy - 4, s, W)
  px(ctx, ox - 2, oy - 4, s, W)
  px(ctx, ox - 3, oy - 3, s, W)
  px(ctx, ox - 2, oy - 3, s, E)
  px(ctx, ox + 2, oy - 4, s, W)
  px(ctx, ox + 3, oy - 4, s, W)
  px(ctx, ox + 2, oy - 3, s, E)
  px(ctx, ox + 3, oy - 3, s, W)
  px(ctx, ox - 3, oy - 4, s, '#EEEEFF')
  px(ctx, ox + 3, oy - 4, s, '#EEEEFF')

  // --- ほっぺ ---
  px(ctx, ox - 3, oy - 2, s, P)
  px(ctx, ox + 3, oy - 2, s, P)

  // --- 口（にっこり） ---
  px(ctx, ox - 1, oy - 1, s, B)
  px(ctx, ox + 1, oy - 1, s, B)
  px(ctx, ox, oy - 2, s, B)

  // --- 小さい顎 ---
  px(ctx, ox - 1, oy, s, H)
  px(ctx, ox + 1, oy, s, H)

  // --- 胸部 ---
  for (let x = -2; x <= 2; x++) {
    px(ctx, ox + x, oy + 1, s, D)
    px(ctx, ox + x, oy + 2, s, D)
  }
  px(ctx, ox - 3, oy + 1, s, B)
  px(ctx, ox + 3, oy + 1, s, B)
  px(ctx, ox - 3, oy + 2, s, B)
  px(ctx, ox + 3, oy + 2, s, B)

  // --- 脚（短くてかわいい） ---
  px(ctx, ox - 4, oy + 1, s, B)
  px(ctx, ox - 5, oy, s, B)
  px(ctx, ox + 4, oy + 1, s, B)
  px(ctx, ox + 5, oy, s, B)
  px(ctx, ox - 4, oy + 2, s, B)
  px(ctx, ox - 5, oy + 2, s, B)
  px(ctx, ox + 4, oy + 2, s, B)
  px(ctx, ox + 5, oy + 2, s, B)
  px(ctx, ox - 4, oy + 3, s, B)
  px(ctx, ox - 5, oy + 4, s, B)
  px(ctx, ox + 4, oy + 3, s, B)
  px(ctx, ox + 5, oy + 4, s, B)

  // --- 腹部（ぷっくり丸い） ---
  for (let x = -2; x <= 2; x++) px(ctx, ox + x, oy + 3, s, D)
  for (let x = -3; x <= 3; x++) {
    px(ctx, ox + x, oy + 4, s, D)
    px(ctx, ox + x, oy + 5, s, D)
    px(ctx, ox + x, oy + 6, s, D)
    px(ctx, ox + x, oy + 7, s, D)
  }
  for (let x = -2; x <= 2; x++) px(ctx, ox + x, oy + 8, s, D)
  px(ctx, ox - 4, oy + 5, s, B)
  px(ctx, ox - 4, oy + 6, s, B)
  px(ctx, ox + 4, oy + 5, s, B)
  px(ctx, ox + 4, oy + 6, s, B)
  for (let x = -2; x <= 2; x++) {
    px(ctx, ox + x, oy + 5, s, H)
    px(ctx, ox + x, oy + 7, s, H)
  }
  px(ctx, ox + 1, oy + 4, s, '#A8724A')
  px(ctx, ox + 2, oy + 4, s, '#A8724A')
}
