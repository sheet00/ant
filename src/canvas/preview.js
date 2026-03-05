import { draw as 落ち葉の下 } from './scenes/落ち葉の下'
import { draw as 小石の隙間 } from './scenes/小石の隙間'
import { draw as 草むら } from './scenes/草むら'
import { draw as 木の根元 } from './scenes/木の根元'
import { draw as 砂場 } from './scenes/砂場'
import { draw as ベンチの下 } from './scenes/ベンチの下'
import { draw as ブランコ } from './scenes/ブランコ'
import { draw as 滑り台 } from './scenes/滑り台'
import { draw as ジャングルジム } from './scenes/ジャングルジム'
import { draw as 噴水 } from './scenes/噴水'
import { draw as 公園 } from './scenes/公園'
import { draw as 学校 } from './scenes/学校'
import { draw as 住宅街 } from './scenes/住宅街'
import { draw as 街 } from './scenes/街'
import { draw as 都市 } from './scenes/都市'
import { draw as 県 } from './scenes/県'
import { draw as 日本 } from './scenes/日本'
import { draw as アジア } from './scenes/アジア'
import { draw as 地球 } from './scenes/地球'
import { draw as 月 } from './scenes/月'
import { draw as 太陽系 } from './scenes/太陽系'
import { draw as 銀河 } from './scenes/銀河'
import { draw as 宇宙 } from './scenes/宇宙'

const scenes = [
  { name: '🍂 落ち葉の下', draw: 落ち葉の下 },
  { name: '🪨 小石の隙間', draw: 小石の隙間 },
  { name: '🌱 草むら', draw: 草むら },
  { name: '🪵 木の根元', draw: 木の根元 },
  { name: '🪣 砂場', draw: 砂場 },
  { name: '🪑 ベンチの下', draw: ベンチの下 },
  { name: '🎠 ブランコ', draw: ブランコ },
  { name: '🛝 滑り台', draw: 滑り台 },
  { name: '🧗 ジャングルジム', draw: ジャングルジム },
  { name: '⛲ 噴水', draw: 噴水 },
  { name: '🌳 公園', draw: 公園 },
  { name: '🏫 学校', draw: 学校 },
  { name: '🏘️ 住宅街', draw: 住宅街 },
  { name: '🏙️ 街', draw: 街 },
  { name: '🌆 都市', draw: 都市 },
  { name: '🗾 県', draw: 県 },
  { name: '🗻 日本', draw: 日本 },
  { name: '🌏 アジア', draw: アジア },
  { name: '🌍 地球', draw: 地球 },
  { name: '🌙 月', draw: 月 },
  { name: '☀️ 太陽系', draw: 太陽系 },
  { name: '🌌 銀河', draw: 銀河 },
  { name: '🌀 宇宙', draw: 宇宙 },
]

const PREVIEW_W = 400
const PREVIEW_H = 300
const PIXEL = 3

const grid = document.getElementById('grid')

for (const scene of scenes) {
  const card = document.createElement('div')
  card.className = 'card'

  const title = document.createElement('h2')
  title.textContent = scene.name
  card.appendChild(title)

  const canvas = document.createElement('canvas')
  canvas.width = PREVIEW_W
  canvas.height = PREVIEW_H
  canvas.style.width = PREVIEW_W + 'px'
  canvas.style.height = PREVIEW_H + 'px'
  card.appendChild(canvas)

  const ctx = canvas.getContext('2d')
  ctx.imageSmoothingEnabled = false

  const pw = Math.floor(PREVIEW_W / PIXEL)
  const ph = Math.floor(PREVIEW_H / PIXEL)

  scene.draw(ctx, pw, ph, PIXEL)

  grid.appendChild(card)
}
