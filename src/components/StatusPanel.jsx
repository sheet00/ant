import { formatNumber } from '../utils/format'

export default function StatusPanel({ game }) {
  const { state, baseDigPower, digPower, totalDigMult, foodPerSec, totalFoodMult, electricityPerSec, getMilestoneInfo } = game
  const { current, next } = getMilestoneInfo()

  const progressStart = current.at
  const progressEnd = next ? next.at : current.at
  const progressNow = state.territory - progressStart
  const progressTotal = progressEnd - progressStart
  const percent = next ? Math.min(100, Math.floor((progressNow / progressTotal) * 100)) : 100

  return (
    <aside className="w-72 bg-stone-800 border-r border-stone-700 flex flex-col gap-4 p-4">
      {/* 領地マイルストーン */}
      <div className="bg-stone-700/50 rounded-lg p-3">
        <div className="text-xl text-center font-bold">{current.name}</div>
        <div className="text-stone-400 text-xs text-center mt-1">
          領地: <span className="text-blue-400 font-bold">{formatNumber(Math.floor(state.territory))}</span> マス
        </div>

        <div className="mt-3">
          <div className="flex justify-between text-xs text-stone-400 mb-1">
            <span>次: <span className="text-stone-200">{next ? next.name : '制覇！'}</span></span>
            <span>{percent}%</span>
          </div>
          <div className="h-2 bg-stone-900 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${percent}%` }}
            />
          </div>
          <div className="text-xs text-stone-500 text-right mt-1">
            {formatNumber(Math.floor(state.territory))} / {next ? formatNumber(next.at) : '∞'}
          </div>
        </div>
      </div>

      {/* 食料 */}
      <div className="bg-stone-700/50 rounded-lg p-4">
        <div className="text-stone-400 text-sm mb-1">🍎 食料</div>
        <div className="text-3xl font-bold text-amber-400">{formatNumber(Math.floor(state.food))}</div>
        <div className="text-green-400 text-base">+{formatNumber(foodPerSec)}/秒</div>
        <div className="text-amber-300 text-sm">倍率 ×{formatNumber(totalFoodMult)}</div>
      </div>

      {/* 採掘 */}
      <div className="bg-stone-700/50 rounded-lg p-4">
        <div className="text-stone-400 text-sm mb-1">⛏️ 採掘</div>
        <div className="text-3xl font-bold text-blue-400">{formatNumber(Math.floor(baseDigPower))}</div>
        <div className="text-blue-300 text-base">+{formatNumber(Math.floor(digPower))}/秒</div>
        <div className="text-green-300 text-sm">倍率 ×{formatNumber(totalDigMult)}</div>
      </div>

      {/* 電気 */}
      <div className="bg-stone-700/50 rounded-lg p-4">
        <div className="text-stone-400 text-sm mb-1">⚡ 電気</div>
        <div className="text-3xl font-bold text-yellow-300">{formatNumber(Math.floor(state.electricity))}</div>
        <div className="text-yellow-200 text-base">+{formatNumber(electricityPerSec)}/秒</div>
      </div>

    </aside>
  )
}
