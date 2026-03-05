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
    getUnlockedAnts,
    getAntCost,
    getAntTotalCost,
    getAntMaxBuyable,
    buyAnt,
  } = game

  const [tooltip, setTooltip] = useState(null)

  const showTooltip = (e, name, desc, colorClass) => {
    setTooltip({
      name,
      desc,
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
            onMouseEnter={(e) => showTooltip(e, '掘削アリ', '地面を掘って領地を広げます。採掘力が高いほど、新しい場所へ早く到達できます。', 'text-green-400')}
            onMouseLeave={hideTooltip}
            disabled={state.food < diggerCost}
            className="flex flex-col bg-stone-800 hover:bg-stone-700 active:bg-stone-600 rounded-lg p-3 transition-colors border border-stone-700 disabled:opacity-50"
          >
            <div className="text-stone-200 font-bold text-xs truncate">掘削アリ</div>
            <div className="text-green-400 text-lg font-bold">{formatNumber(state.diggers)}</div>
            <div className="text-amber-400 text-[10px] font-bold mt-1">
              🍎{buyMode === 1 || diggerBuyAmount <= 1 ? formatNumber(diggerCost) : formatNumber(diggerTotalCost)}
            </div>
          </button>

          {/* 採餌アリ */}
          <button
            onClick={buyForager}
            onMouseEnter={(e) => showTooltip(e, '採餌アリ', '地上の落ち葉などを集めて食料にします。アリを増やすための基本リソースです。', 'text-red-400')}
            onMouseLeave={hideTooltip}
            disabled={state.food < foragerCost}
            className="flex flex-col bg-stone-800 hover:bg-stone-700 active:bg-stone-600 rounded-lg p-3 transition-colors border border-stone-700 disabled:opacity-50"
          >
            <div className="text-stone-200 font-bold text-xs truncate">採餌アリ</div>
            <div className="text-red-400 text-lg font-bold">{formatNumber(state.foragers)}</div>
            <div className="text-amber-400 text-[10px] font-bold mt-1">
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

            return (
              <button
                key={ant.id}
                onClick={() => buyAnt(ant.id)}
                onMouseEnter={(e) => showTooltip(e, ant.name, ant.desc, isElectric ? 'text-yellow-300' : 'text-emerald-300')}
                onMouseLeave={hideTooltip}
                disabled={!canBuy}
                className={`flex flex-col bg-stone-800 hover:bg-stone-700 active:bg-stone-600 rounded-lg p-3 transition-all border disabled:opacity-50 ${isElectric ? 'border-yellow-600' : 'border-emerald-700'}`}
              >
                <div className={`font-bold text-xs truncate ${isElectric ? 'text-yellow-300' : 'text-emerald-300'}`}>{ant.name}</div>
                <div className={`text-lg font-bold ${isElectric ? 'text-yellow-400' : 'text-emerald-400'}`}>{formatNumber(count)}</div>
                <div className={`text-[10px] font-bold mt-1 ${isElectric ? 'text-yellow-300' : 'text-amber-400'}`}>
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
          <div className="grid grid-cols-4 gap-2">
            {availableUpgrades.map(upg => {
              const isElectric = upg.currency === 'electricity'
              const canBuy = isElectric ? state.electricity >= upg.cost : state.food >= upg.cost
              return (
                <button
                  key={upg.id}
                  onClick={() => buyUpgrade(upg.id)}
                  onMouseEnter={(e) => showTooltip(e, upg.name, upg.desc, 'text-stone-100')}
                  onMouseLeave={hideTooltip}
                  disabled={!canBuy}
                  className={`flex flex-col rounded-lg p-2 transition-all border text-left h-16 disabled:opacity-50 ${
                    canBuy
                      ? isElectric
                        ? 'bg-gradient-to-r from-yellow-900 to-yellow-800 border-yellow-600'
                        : upg.type === 'unlock' 
                          ? 'bg-gradient-to-r from-green-900 to-green-800 border-green-600'
                          : 'bg-gradient-to-r from-blue-900 to-blue-800 border-blue-600'
                      : 'bg-stone-800 border-stone-700 opacity-50'
                  }`}
                >
                  <div className="text-stone-100 font-bold text-[10px] truncate leading-tight mb-auto">{upg.name}</div>
                  <div className="flex justify-between items-center mt-auto">
                    <div className="flex gap-1">
                      {upg.mult > 1 && <span className="text-blue-300 text-[10px] font-bold">⛏️×{upg.mult}</span>}
                      {upg.foodMult > 1 && <span className="text-amber-300 text-[10px] font-bold">🍎×{upg.foodMult}</span>}
                    </div>
                    <span className={`text-[10px] font-bold ${isElectric ? 'text-yellow-300' : 'text-amber-400'}`}>
                      {isElectric ? '⚡' : '🍎'}{formatNumber(upg.cost)}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* デバッグ (開発時のみ表示) */}
      {import.meta.env.DEV && (
        <div className="flex flex-col gap-2 mt-auto">
          <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-widest border-t border-stone-800 pt-4">デバッグ</h2>
          <div className="flex gap-2">
            <button onClick={addDebugFood} className="flex-1 bg-stone-800 hover:bg-stone-700 border border-amber-700 rounded-lg px-2 py-1 text-[10px] text-amber-400 font-bold">🍎 食料+</button>
            <button onClick={addDebugElectricity} className="flex-1 bg-stone-800 hover:bg-stone-700 border border-yellow-700 rounded-lg px-2 py-1 text-[10px] text-yellow-300 font-bold">⚡ 電気+</button>
          </div>
        </div>
      )}

      <Tooltip data={tooltip} />
    </section>
  )
}
