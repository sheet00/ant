export function draw(ctx, pw, ph, pixel) {
  // 夕暮れの空
  ctx.fillStyle = '#FF7F50'
  ctx.fillRect(0, 0, pw * pixel, ph * pixel)

  let seed = 1101
  function random() {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }

  // 街並みのシルエット
  ctx.fillStyle = '#2F4F4F'
  for(let i=0; i<8; i++) {
    const bh = random() * 40 + 20
    ctx.fillRect(i * (pw * 0.125) * pixel, (ph - bh) * pixel, (pw * 0.12) * pixel, bh * pixel)
  }

  // 街灯
  for(let i=0; i<3; i++) {
    const lx = (pw * 0.2 + i * (pw * 0.3))
    ctx.fillStyle = '#333'
    ctx.fillRect(lx * pixel, ph * 0.4 * pixel, 2 * pixel, ph * 0.6 * pixel)
    ctx.fillStyle = '#FFFF00'
    ctx.fillRect((lx - 4) * pixel, ph * 0.38 * pixel, 10 * pixel, 6 * pixel)
  }

  // 地面
  ctx.fillStyle = '#111'
  ctx.fillRect(0, ph * 0.9 * pixel, pw * pixel, ph * 0.1 * pixel)

  // 窓の明かり
  ctx.fillStyle = '#FFD700'
  for(let i=0; i<30; i++) {
    const wx = random() * pw
    const wy = ph * 0.6 + random() * (ph * 0.3)
    ctx.fillRect(wx * pixel, wy * pixel, 2 * pixel, 2 * pixel)
  }
}
