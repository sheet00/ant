export function draw(ctx, pw, ph, pixel) {
  // 夜空
  ctx.fillStyle = '#191970'
  ctx.fillRect(0, 0, pw * pixel, ph * pixel)

  let seed = 1201
  function random() {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }

  // 摩天楼
  for(let i=0; i<12; i++) {
    const bh = random() * 80 + 40
    const bw = random() * 20 + 15
    const bx = random() * pw
    ctx.fillStyle = '#000033'
    ctx.fillRect(bx * pixel, (ph - bh) * pixel, bw * pixel, bh * pixel)
    
    // 窓の明かり (点々)
    ctx.fillStyle = random() > 0.3 ? '#FFFFE0' : '#888'
    for(let w=0; w<bh/8; w++) {
      for(let k=0; k<bw/6; k++) {
        if(random() > 0.5) {
          ctx.fillRect((bx + 3 + k*6) * pixel, (ph - bh + 5 + w*8) * pixel, 2 * pixel, 2 * pixel)
        }
      }
    }
  }

  // 道路と車のライト
  ctx.fillStyle = '#000'
  ctx.fillRect(0, ph * 0.9 * pixel, pw * pixel, ph * 0.1 * pixel)
  
  for(let i=0; i<10; i++) {
    ctx.fillStyle = '#FF0000'
    ctx.fillRect(random() * pw * pixel, (ph * 0.92) * pixel, 4 * pixel, 2 * pixel)
    ctx.fillStyle = '#FFF'
    ctx.fillRect(random() * pw * pixel, (ph * 0.96) * pixel, 4 * pixel, 2 * pixel)
  }
}
