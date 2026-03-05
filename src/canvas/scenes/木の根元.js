export function draw(ctx, pw, ph, pixel) {
  // 空
  ctx.fillStyle = '#87CEEB'
  ctx.fillRect(0, 0, pw * pixel, ph * pixel)

  let seed = 101
  function random() {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }

  // 奥の森・茂み
  ctx.fillStyle = '#3CB371'
  for(let i=0; i<6; i++) {
    const cx = random() * pw
    const cr = random() * 30 + 20
    ctx.beginPath()
    ctx.arc(cx * pixel, ph * 0.6 * pixel, cr * pixel, 0, Math.PI * 2)
    ctx.fill()
  }

  // 地面
  ctx.fillStyle = '#8B4513'
  ctx.fillRect(0, ph * 0.7 * pixel, pw * pixel, ph * 0.3 * pixel)
  ctx.fillStyle = '#228B22'
  ctx.fillRect(0, ph * 0.7 * pixel, pw * pixel, 6 * pixel)

  // 一本の木 (中央に配置)
  const treeX = pw * 0.5
  const treeW = pw * 0.15
  
  // 幹
  ctx.fillStyle = '#8B4513'
  ctx.fillRect((treeX - treeW/2) * pixel, -ph * 0.1 * pixel, treeW * pixel, ph * 0.8 * pixel)
  
  // 幹の影 (左側)
  ctx.fillStyle = '#5C4033'
  ctx.fillRect((treeX - treeW/2) * pixel, -ph * 0.1 * pixel, treeW * 0.3 * pixel, ph * 0.8 * pixel)

  // 左の根っこ
  ctx.beginPath()
  ctx.moveTo((treeX - treeW/2) * pixel, ph * 0.5 * pixel)
  ctx.lineTo((treeX - treeW * 1.5) * pixel, ph * 0.75 * pixel)
  ctx.lineTo((treeX - treeW/2) * pixel, ph * 0.75 * pixel)
  ctx.fill()

  // 右の根っこ
  ctx.fillStyle = '#8B4513'
  ctx.beginPath()
  ctx.moveTo((treeX + treeW/2) * pixel, ph * 0.5 * pixel)
  ctx.lineTo((treeX + treeW * 1.5) * pixel, ph * 0.75 * pixel)
  ctx.lineTo((treeX + treeW/2) * pixel, ph * 0.75 * pixel)
  ctx.fill()

  // 手前の草 (根本付近に生える)
  ctx.fillStyle = '#006400'
  for (let i = 0; i < pw; i += 3) {
    const gh = random() * 10 + 5
    ctx.fillRect(i * pixel, (ph * 0.75 - gh) * pixel, 2 * pixel, gh * pixel)
  }
}
