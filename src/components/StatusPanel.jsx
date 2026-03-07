import { formatNumber } from '../utils/format'

export default function StatusPanel({ game }) {
  const { state, baseDigPower, digPower, totalDigMult, foodPerSec, totalFoodMult, electricityPerSec, getMilestoneInfo } = game
  const { current, next } = getMilestoneInfo()
  const showRocketHint = current.name === '🌍 地球' && !state.upgradeLevels[33]

  const progressStart = current.at
  const progressEnd = next ? next.at : current.at
  const progressNow = state.territory - progressStart
  const progressTotal = progressEnd - progressStart
  const percent = next ? Math.min(100, Math.floor((progressNow / progressTotal) * 100)) : 100
  const remaining = next ? Math.max(0, Math.ceil(progressEnd - state.territory)) : 0

  return (
    <aside className="flex w-72 flex-col gap-4 border-r border-stone-300 bg-[#f7f0e2]/90 p-4 text-stone-800">
      {/* 進行マイルストーン */}
      <div className="rounded-lg border border-stone-200 bg-white/70 p-3 shadow-sm">
        <div className="text-xl text-center font-bold">{current.name}</div>
        <div className="mt-1 text-center text-xs text-stone-500">
          {next ? <>次の到達先まで <span className="font-bold text-sky-700">{formatNumber(remaining)}</span></> : '宇宙到達済み'}
        </div>
        {showRocketHint && (
          <div className="mt-2 text-center text-[11px] text-amber-700">
            次は「電気の発見」から「ロケット開発」
          </div>
        )}

        <div className="mt-3">
          <div className="mb-1 flex justify-between text-xs text-stone-500">
            <span>次: <span className="text-stone-700">{next ? next.name : '制覇！'}</span></span>
            <span>{percent}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-stone-200">
            <div
              className="h-full bg-[#a16207] transition-all duration-300"
              style={{ width: `${percent}%` }}
            />
          </div>
          <div className="mt-1 text-right text-xs text-stone-400">
            {next ? `${formatNumber(percent)}%` : '100%'}
          </div>
        </div>
      </div>

      {/* 食料 */}
      <div className="rounded-lg border border-stone-200 bg-white/70 p-4 shadow-sm">
        <div className="mb-1 text-sm text-stone-500">🍎 食料</div>
        <div className="text-3xl font-bold text-amber-700">{formatNumber(Math.floor(state.food))}</div>
        <div className="text-base text-emerald-700">+{formatNumber(foodPerSec)}/秒</div>
        <div className="text-sm text-amber-600">倍率 ×{formatNumber(totalFoodMult)}</div>
      </div>

      {/* 採掘 */}
      <div className="rounded-lg border border-stone-200 bg-white/70 p-4 shadow-sm">
        <div className="mb-1 text-sm text-stone-500">⛏️ 採掘</div>
        <div className="text-3xl font-bold text-[#8b5e34]">{formatNumber(Math.floor(baseDigPower))}</div>
        <div className="text-base text-[#a16207]">+{formatNumber(Math.floor(digPower))}/秒</div>
        <div className="text-sm text-emerald-700">倍率 ×{formatNumber(totalDigMult)}</div>
      </div>

      {/* 電気 */}
      <div className="rounded-lg border border-stone-200 bg-white/70 p-4 shadow-sm">
        <div className="mb-1 text-sm text-stone-500">⚡ 電気</div>
        <div className="text-3xl font-bold text-amber-600">{formatNumber(Math.floor(state.electricity))}</div>
        <div className="text-base text-yellow-700">+{formatNumber(electricityPerSec)}/秒</div>
      </div>

    </aside>
  )
}
