export function draw(ctx, pw, ph, pixel) {
  // 空
  ctx.fillStyle = '#87CEEB'
  ctx.fillRect(0, 0, pw * pixel, ph * pixel)

  let seed = 901
  function random() {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }

  // 地面 (校庭)
  ctx.fillStyle = '#EEDD82'
  ctx.fillRect(0, ph * 0.7 * pixel, pw * pixel, ph * 0.3 * pixel)

  // 校舎
  ctx.fillStyle = '#F5F5DC'
  ctx.fillRect(pw * 0.1 * pixel, ph * 0.2 * pixel, pw * 0.8 * pixel, ph * 0.5 * pixel)

  // 屋根
  ctx.fillStyle = '#8B4513'
  ctx.fillRect(pw * 0.08 * pixel, ph * 0.18 * pixel, pw * 0.84 * pixel, 10 * pixel)

  // 窓 (グリッド)
  ctx.fillStyle = '#B0E0E6'
  for(let r=0; r<3; r++) {
    for(let c=0; c<6; c++) {
      const wx = pw * 0.15 + c * (pw * 0.12)
      const wy = ph * 0.25 + r * (ph * 0.15)
      ctx.fillRect(wx * pixel, wy * pixel, 15 * pixel, 15 * pixel)
    }
  }

  // 玄関
  ctx.fillStyle = '#A52A2A'
  ctx.fillRect(pw * 0.45 * pixel, ph * 0.55 * pixel, pw * 0.1 * pixel, ph * 0.15 * pixel)

  // 時計
  ctx.fillStyle = '#FFF'
  ctx.beginPath()
  ctx.arc(pw * 0.5 * pixel, ph * 0.1 * pixel, 10 * pixel, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = '#000'
  ctx.fillRect(pw * 0.5 * pixel, ph * 0.08 * pixel, 1 * pixel, 4 * pixel)
  ctx.fillRect(pw * 0.5 * pixel, ph * 0.1 * pixel, 4 * pixel, 1 * pixel)
}
