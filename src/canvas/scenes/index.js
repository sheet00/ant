import { draw as 落ち葉の下 } from './落ち葉の下'
import { draw as 小石の隙間 } from './小石の隙間'
import { draw as 草むら } from './草むら'
import { draw as 木の根元 } from './木の根元'
import { draw as 砂場 } from './砂場'
import { draw as ベンチの下 } from './ベンチの下'
import { draw as ブランコ } from './ブランコ'
import { draw as 滑り台 } from './滑り台'
import { draw as ジャングルジム } from './ジャングルジム'
import { draw as 噴水 } from './噴水'
import { draw as 公園 } from './公園'
import { draw as 学校 } from './学校'
import { draw as 住宅街 } from './住宅街'
import { draw as 街 } from './街'
import { draw as 都市 } from './都市'
import { draw as 県 } from './県'
import { draw as 日本 } from './日本'
import { draw as アジア } from './アジア'
import { draw as 地球 } from './地球'
import { draw as 月 } from './月'
import { draw as 太陽系 } from './太陽系'
import { draw as 銀河 } from './銀河'
import { draw as 宇宙 } from './宇宙'

// マイルストーン名 → シーン描画関数
const scenes = {
  '落ち葉': 落ち葉の下,
  '小石': 小石の隙間,
  '草むら': 草むら,
  '木の根': 木の根元,
  '砂場': 砂場,
  'ベンチ': ベンチの下,
  'ブランコ': ブランコ,
  '滑り台': 滑り台,
  'ジャングルジム': ジャングルジム,
  '噴水': 噴水,
  '公園': 公園,
  '学校': 学校,
  '住宅街': 住宅街,
  '街': 街,
  '都市': 都市,
  '県': 県,
  '日本': 日本,
  'アジア': アジア,
  '地球': 地球,
  '月': 月,
  '太陽系': 太陽系,
  '銀河': 銀河,
  '宇宙': 宇宙,
}

// マイルストーン名からシーンを選ぶ（部分一致）
export function getScene(milestoneName) {
  for (const [key, drawFn] of Object.entries(scenes)) {
    if (milestoneName.includes(key)) return drawFn
  }
  return 落ち葉の下 // デフォルト
}
