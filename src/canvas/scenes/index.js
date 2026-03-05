import * as 落ち葉の下 from './落ち葉の下.js'
import * as 小石の隙間 from './小石の隙間.js'
import * as 草むら from './草むら.js'
import * as 木の根元 from './木の根元.js'
import * as 砂場 from './砂場.js'
import * as ベンチの下 from './ベンチの下.js'
import * as ブランコ from './ブランコ.js'
import * as 滑り台 from './滑り台.js'
import * as ジャングルジム from './ジャングルジム.js'
import * as 噴水 from './噴水.js'
import * as 公園 from './公園.js'
import * as 学校 from './学校.js'
import * as 住宅街 from './住宅街.js'
import * as 街 from './街.js'
import * as 都市 from './都市.js'
import * as 県 from './県.js'
import * as 日本 from './日本.js'
import * as アジア from './アジア.js'
import * as 地球 from './地球.js'
import * as 月 from './月.js'
import * as 太陽系 from './太陽系.js'
import * as 銀河 from './銀河.js'
import * as 宇宙 from './宇宙.js'

const scenes = {
  '落ち葉の下': 落ち葉の下.draw,
  '小石の隙間': 小石の隙間.draw,
  '草むら': 草むら.draw,
  '木の根元': 木の根元.draw,
  '砂場': 砂場.draw,
  'ベンチの下': ベンチの下.draw,
  'ブランコ': ブランコ.draw,
  '滑り台': 滑り台.draw,
  'ジャングルジム': ジャングルジム.draw,
  '噴水': 噴水.draw,
  '公園': 公園.draw,
  '学校': 学校.draw,
  '住宅街': 住宅街.draw,
  '街': 街.draw,
  '都市': 都市.draw,
  '県': 県.draw,
  '日本': 日本.draw,
  'アジア': アジア.draw,
  '地球': 地球.draw,
  '月': 月.draw,
  '太陽系': 太陽系.draw,
  '銀河': 銀河.draw,
  '宇宙': 宇宙.draw,
}

export const STAGES = [
  '落ち葉の下',
  '小石の隙間',
  '草むら',
  '木の根元',
  '砂場',
  'ベンチの下',
  'ブランコ',
  '滑り台',
  'ジャングルジム',
  '噴水',
  '公園',
  '学校',
  '住宅街',
  '街',
  '都市',
  '県',
  '日本',
  'アジア',
  '地球',
  '月',
  '太陽系',
  '銀河',
  '宇宙'
]

export function getScene(name) {
  const cleanName = name ? name.replace(/[^\u4E00-\u9FFF\u3040-\u309F\u30A0-\u30FFa-zA-Z0-9]/g, '').trim() : ''
  return scenes[cleanName] || ((ctx, pw, ph, pixel) => {
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, pw * pixel, ph * pixel)
  })
}
