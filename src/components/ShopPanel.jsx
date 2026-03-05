import { useState } from 'react'
import { formatNumber } from '../utils/format'
import Tooltip from './Tooltip'

export default function ShopPanel({ game }) {
  const {
    state,
    buyMode,
    setBuyMode,
    getCost,
    getTotalCost,
    getMaxBuyable,
    getAvailableUpgrades,
    buyDigger,
    buyForager,
    buyUpgrade,
    addDebugFood,
    addDebugElectricity,
    forceGameClear,
    getUnlockedAnts,
    getAntCost,
    getAntTotalCost,
    getAntMaxBuyable,
    buyAnt,
  } = game

  const [tooltip, setTooltip] = useState(null)

  const showTooltip = (e, name, desc, colorClass, effect) => {
    setTooltip({
      name,
      desc,
      effect,
      rect: e.currentTarget.getBoundingClientRect(),
      colorClass
    })
  }

  const hideTooltip = () => setTooltip(null)

  const diggerCost = getCost(state.diggers)
  const diggerMax = getMaxBuyable(state.diggers, state.food)
  const diggerBuyAmount = buyMode === 'max' ? diggerMax : Math.min(buyMode, diggerMax)
  const diggerTotalCost = getTotalCost(state.diggers, diggerBuyAmount)

  const foragerCost = getCost(state.foragers)
  const foragerMax = getMaxBuyable(state.foragers, state.food)
  const foragerBuyAmount = buyMode === 'max' ? foragerMax : Math.min(buyMode, foragerMax)
  const foragerTotalCost = getTotalCost(state.foragers, foragerBuyAmount)

  const availableUpgrades = getAvailableUpgrades()
  const unlockedAnts = getUnlockedAnts()

  return (
    <section className="flex-1 flex flex-col gap-4 p-4 overflow-y-auto bg-stone-900 border-l border-stone-800">
      {/* ユニットセクション */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-stone-400 uppercase tracking-widest">ユニット</h2>
          <div className="flex bg-stone-800 rounded-lg overflow-hidden border border-stone-700">
            {[1, 10, 100, 'max'].map(m => (
              <button
                key={m}
                className={`px-3 py-1 text-sm font-bold text-white transition-colors border-l first:border-l-0 border-stone-700 ${buyMode === m ? 'bg-amber-600' : 'hover:bg-stone-700'}`}
                onClick={() => setBuyMode(m)}
              >
                {m === 'max' ? 'xMax' : `x${m}`}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {/* 掘削アリ */}
          <button
            onClick={buyDigger}
            onMouseEnter={(e) => showTooltip(e, '掘削アリ', 'コロニーの土台を作る、最も献身的な働き手たち。', 'text-green-400', '採掘力 +1')}
            onMouseLeave={hideTooltip}
            disabled={state.food < diggerCost}
            className="flex flex-col bg-stone-800 hover:bg-stone-700 active:bg-stone-600 rounded-lg p-3 transition-colors border border-stone-700 disabled:opacity-50"
          >
            <div className="text-stone-200 font-bold text-sm">掘削アリ</div>
            <div className="text-green-400 text-xl font-bold">{formatNumber(state.diggers)}</div>
            <div className="text-stone-400 text-xs font-bold">採掘力 +1</div>
            <div className="text-amber-400 text-xs font-bold mt-1">
              🍎{buyMode === 1 || diggerBuyAmount <= 1 ? formatNumber(diggerCost) : formatNumber(diggerTotalCost)}
            </div>
          </button>

          {/* 採餌アリ */}
          <button
            onClick={buyForager}
            onMouseEnter={(e) => showTooltip(e, '採餌アリ', '危険な地上へと向かい、仲間たちの命を繋ぐ食料を運ぶ冒険者。', 'text-red-400', '食料生産 +1/秒')}
            onMouseLeave={hideTooltip}
            disabled={state.food < foragerCost}
            className="flex flex-col bg-stone-800 hover:bg-stone-700 active:bg-stone-600 rounded-lg p-3 transition-colors border border-stone-700 disabled:opacity-50"
          >
            <div className="text-stone-200 font-bold text-sm">採餌アリ</div>
            <div className="text-red-400 text-xl font-bold">{formatNumber(state.foragers)}</div>
            <div className="text-stone-400 text-xs font-bold">食料 +1/秒</div>
            <div className="text-amber-400 text-xs font-bold mt-1">
              🍎{buyMode === 1 || foragerBuyAmount <= 1 ? formatNumber(foragerCost) : formatNumber(foragerTotalCost)}
            </div>
          </button>

          {/* 解禁されたユニット */}
          {unlockedAnts.map(ant => {
            const count = state.ants[ant.id] || 0
            const cost = getAntCost(ant)
            const maxBuy = getAntMaxBuyable(ant)
            const buyAmount = buyMode === 'max' ? maxBuy : Math.min(buyMode, maxBuy)
            const totalCost = getAntTotalCost(ant, buyAmount)
            const isElectric = ant.currency === 'electricity'
            const canBuy = isElectric ? state.electricity >= cost : state.food >= cost

            // 効果テキストの生成
            const effects = []
            if (ant.id === 'generator') {
              effects.push('電気 +0.01/匹·秒')
            }
            if (ant.power) effects.push(`採掘 +${ant.power}`)
            if (ant.powerMult) effects.push(`採掘倍率 +${Math.round(ant.powerMult * 100)}%`)
            if (ant.foodMult) effects.push(`食料倍率 +${Math.round(ant.foodMult * 100)}%`)

            const effectLabel = effects.join(' / ')

            return (
              <button
                key={ant.id}
                onClick={() => buyAnt(ant.id)}
                onMouseEnter={(e) => showTooltip(e, ant.name, ant.desc, isElectric ? 'text-yellow-300' : 'text-emerald-300', effectLabel)}
                onMouseLeave={hideTooltip}
                disabled={!canBuy}
                className={`flex flex-col bg-stone-800 hover:bg-stone-700 active:bg-stone-600 rounded-lg p-3 transition-all border disabled:opacity-50 ${isElectric ? 'border-yellow-600' : 'border-emerald-700'}`}
              >
                <div className={`font-bold text-sm truncate ${isElectric ? 'text-yellow-300' : 'text-emerald-300'}`}>{ant.name}</div>
                <div className={`text-xl font-bold ${isElectric ? 'text-yellow-400' : 'text-emerald-400'}`}>{formatNumber(count)}</div>
                <div className="text-stone-400 text-xs font-bold truncate">{effectLabel}</div>
                <div className={`text-xs font-bold mt-1 ${isElectric ? 'text-yellow-300' : 'text-amber-400'}`}>
                  {isElectric ? '⚡' : '🍎'}{buyMode === 1 || buyAmount <= 1 ? formatNumber(cost) : formatNumber(totalCost)}
                </div>
              </button>
            )
          })}

        </div>
      </div>

      {/* 進化セクション */}
      {availableUpgrades.length > 0 && (
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-semibold text-stone-400 uppercase tracking-widest">進化</h2>
          <div className="grid grid-cols-2 gap-2">
            {availableUpgrades.map(upg => {
              const isElectric = upg.currency === 'electricity'
              const canBuy = isElectric ? state.electricity >= upg.cost : state.food >= upg.cost
              
              // ツールチップ用の効果テキスト
              const effects = []
              if (upg.mult > 1) effects.push(`採掘倍率 +${Math.round((upg.mult - 1) * 100)}%`)
              if (upg.foodMult > 1) effects.push(`食料倍率 +${Math.round((upg.foodMult - 1) * 100)}%`)
              if (upg.type === 'unlock') effects.push('新しいユニットの解禁')
              const tooltipEffect = effects.join(' / ')

              return (
                <button
                  key={upg.id}
                  onClick={() => buyUpgrade(upg.id)}
                  onMouseEnter={(e) => showTooltip(e, upg.name, upg.desc, 'text-stone-100', tooltipEffect)}
                  onMouseLeave={hideTooltip}
                  disabled={!canBuy}
                  className={`flex flex-col rounded-lg p-3 transition-all border text-left min-h-[80px] disabled:opacity-50 ${
                    canBuy
                      ? isElectric
                        ? 'bg-gradient-to-r from-yellow-900 to-yellow-800 border-yellow-600 shadow-[0_0_10px_rgba(234,179,8,0.2)]'
                        : upg.type === 'unlock' 
                          ? 'bg-gradient-to-r from-green-900 to-green-800 border-green-600 shadow-[0_0_10px_rgba(34,197,94,0.2)]'
                          : 'bg-gradient-to-r from-blue-900 to-blue-800 border-blue-600 shadow-[0_0_10px_rgba(59,130,246,0.2)]'
                      : 'bg-stone-800 border-stone-700 opacity-50'
                  }`}
                >
                  <div className="text-stone-100 font-bold text-sm leading-tight mb-auto">{upg.name}</div>
                  <div className="flex justify-between items-end mt-2">
                    <div className="flex flex-col gap-0.5">
                      {upg.mult > 1 && (
                        <span className="text-blue-300 text-xs font-bold leading-none">
                          採掘 +{Math.round((upg.mult - 1) * 100)}%
                        </span>
                      )}
                      {upg.foodMult > 1 && (
                        <span className="text-amber-300 text-xs font-bold leading-none">
                          食料 +{Math.round((upg.foodMult - 1) * 100)}%
                        </span>
                      )}
                      {upg.type === 'unlock' && (
                        <span className="text-green-300 text-xs font-bold leading-none">
                          解禁
                        </span>
                      )}
                    </div>
                    <span className={`text-base font-bold ${isElectric ? 'text-yellow-300' : 'text-amber-400'}`}>
                      {isElectric ? '⚡' : '🍎'}{formatNumber(upg.cost)}
                    </span>
                  </div>
                </button>
              )
            })}
            {/* 伏せ枠 */}
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-stone-700 min-h-[80px] bg-stone-900/30">
              <div className="text-stone-600 font-bold text-2xl">？</div>
            </div>
          </div>
        </div>
      )}

      {/* デバッグ */}
      {import.meta.env.DEV && (
        <div className="flex flex-col gap-2 mt-auto pt-4 border-t border-stone-800">
          <h2 className="text-xs font-semibold text-stone-500 uppercase tracking-widest text-center">デバッグメニュー</h2>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <button 
                onClick={addDebugFood} 
                className="flex-1 bg-stone-800 hover:bg-stone-700 border border-amber-700 rounded-lg py-3 text-sm text-amber-400 font-bold active:scale-95 transition-transform"
              >
                🍎 食料+
              </button>
              <button 
                onClick={addDebugElectricity} 
                className="flex-1 bg-stone-800 hover:bg-stone-700 border border-yellow-700 rounded-lg py-3 text-sm text-yellow-300 font-bold active:scale-95 transition-transform"
              >
                ⚡ 電気+
              </button>
            </div>
            <button 
              onClick={forceGameClear} 
              className="w-full bg-stone-800 hover:bg-stone-700 border border-blue-700 rounded-lg py-3 text-sm text-blue-400 font-bold active:scale-95 transition-transform"
            >
              🌀 クリア画面を表示する
            </button>
          </div>
        </div>
      )}


      <Tooltip data={tooltip} />
    </section>
  )
}
