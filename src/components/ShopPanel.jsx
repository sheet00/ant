import { useState, useEffect, useRef } from 'react'
import { formatNumber } from '../utils/format'
import { UNITS, DIG_UPGRADES } from '../data/gameData'
import Tooltip from './Tooltip'

export default function ShopPanel({ game }) {
  const {
    state,
    buyMode,
    setBuyMode,
    getCost,
    getTotalCost,
    getMaxBuyable,
    getUpgradeCost,
    getAvailableUpgrades,
    buyDigger,
    buyForager,
    buyUpgrade,
    addDebugFood,
    addDebugElectricity,
    forceGameClear,
    difficulty,
    setDifficulty,
    getUnlockedAnts,
    getAntCost,
    getAntTotalCost,
    getAntMaxBuyable,
    getAntEffectText,
    buyAnt,
  } = game

  const [tooltip, setTooltip] = useState(null)
  const [hoveredInfo, setHoveredInfo] = useState(null) // { type, id, rect }
  const mousePos = useRef({ x: 0, y: 0 })

  const availableUpgrades = getAvailableUpgrades()
  const unlockedAnts = getUnlockedAnts()

  // ツールチップの内容を常に最新の状態に保つ
  useEffect(() => {
    if (!hoveredInfo) {
      setTooltip(null)
      return
    }

    const { type, id, rect } = hoveredInfo
    let name = '', desc = '', effect = '', colorClass = ''
    
    if (type === 'digger') {
      name = '掘削アリ'
      desc = 'コロニーの土台を作る、最も献身的な働き手たち。'
      effect = '採掘力 +1'
      colorClass = 'text-green-400'
    } else if (type === 'forager') {
      name = '採餌アリ'
      desc = '危険な地上へと向かい、仲間たちの命を繋ぐ食料を運ぶ冒険者。'
      effect = '食料生産 +2.3/秒'
      colorClass = 'text-red-400'
    } else if (type === 'ant') {
      const ant = UNITS.find(a => a.id === id)
      if (!ant) { setHoveredInfo(null); return }
      name = ant.name
      desc = ant.desc
      colorClass = ant.currency === 'electricity' ? 'text-yellow-300' : 'text-emerald-300'
      effect = getAntEffectText(ant, state.territory)
    } else if (type === 'upgrade') {
      const upg = DIG_UPGRADES.find(u => u.id === id)
      if (!upg) { setHoveredInfo(null); return }
      name = upg.name
      desc = upg.desc
      colorClass = 'text-stone-100'
      const effects = []
      if (upg.digMultiplier > 1) effects.push(`採掘倍率 +${Math.round((upg.digMultiplier - 1) * 100)}%`)
      if (upg.foodMultiplier > 1) effects.push(`食料倍率 +${Math.round((upg.foodMultiplier - 1) * 100)}%`)
      if (upg.type === 'unlock') effects.push('新しいユニットの解禁')
      effect = effects.join(' / ')
    }

    setTooltip({ name, desc, effect, colorClass, rect })
  }, [hoveredInfo, state.upgradeLevels, state.ants, availableUpgrades.length, unlockedAnts.length])

  const handleMouseEnter = (e, type, id = null) => {
    setHoveredInfo({
      type,
      id,
      rect: e.currentTarget.getBoundingClientRect()
    })
  }

  const handleMouseLeave = () => {
    setHoveredInfo(null)
  }

  const handleMouseMove = (e) => {
    mousePos.current = { x: e.clientX, y: e.clientY }
  }

  const diggerCost = getCost(state.diggers, 'digger')
  const diggerMax = getMaxBuyable(state.diggers, state.food, 'digger')
  const diggerBuyAmount = buyMode === 'max' ? diggerMax : Math.min(buyMode, diggerMax)
  const diggerTotalCost = getTotalCost(state.diggers, diggerBuyAmount, 'digger')

  const foragerCost = getCost(state.foragers, 'forager')
  const foragerMax = getMaxBuyable(state.foragers, state.food, 'forager')
  const foragerBuyAmount = buyMode === 'max' ? foragerMax : Math.min(buyMode, foragerMax)
  const foragerTotalCost = getTotalCost(state.foragers, foragerBuyAmount, 'forager')

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="flex-1 flex flex-col gap-4 p-4 overflow-y-auto bg-stone-900 border-l border-stone-800"
    >
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
            onMouseEnter={(e) => handleMouseEnter(e, 'digger')}
            onMouseLeave={handleMouseLeave}
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
            onMouseEnter={(e) => handleMouseEnter(e, 'forager')}
            onMouseLeave={handleMouseLeave}
            disabled={state.food < foragerCost}
            className="flex flex-col bg-stone-800 hover:bg-stone-700 active:bg-stone-600 rounded-lg p-3 transition-colors border border-stone-700 disabled:opacity-50"
          >
            <div className="text-stone-200 font-bold text-sm">採餌アリ</div>
            <div className="text-red-400 text-xl font-bold">{formatNumber(state.foragers)}</div>
            <div className="text-stone-400 text-xs font-bold">食料 +2.3/秒</div>
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

            // ボタン表示用の効果
            const effectLabel = getAntEffectText(ant, state.territory)

            return (
              <button
                key={ant.id}
                onClick={() => buyAnt(ant.id)}
                onMouseEnter={(e) => handleMouseEnter(e, 'ant', ant.id)}
                onMouseLeave={handleMouseLeave}
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
              const cost = getUpgradeCost(upg)
              const canBuy = isElectric ? state.electricity >= cost : state.food >= cost
              return (
                <button
                  key={upg.id}
                  onClick={() => buyUpgrade(upg.id)}
                  onMouseEnter={(e) => handleMouseEnter(e, 'upgrade', upg.id)}
                  onMouseLeave={handleMouseLeave}
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
                      {upg.digMultiplier > 1 && (
                        <span className="text-blue-300 text-xs font-bold leading-none">
                          採掘 +{Math.round((upg.digMultiplier - 1) * 100)}%
                        </span>
                      )}
                      {upg.foodMultiplier > 1 && (
                        <span className="text-amber-300 text-xs font-bold leading-none">
                          食料 +{Math.round((upg.foodMultiplier - 1) * 100)}%
                        </span>
                      )}
                      {upg.type === 'unlock' && (
                        <span className="text-green-300 text-xs font-bold leading-none">
                          解禁
                        </span>
                      )}
                    </div>
                    <span className={`text-base font-bold ${isElectric ? 'text-yellow-300' : 'text-amber-400'}`}>
                      {isElectric ? '⚡' : '🍎'}{formatNumber(cost)}
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
            <div className="flex flex-col gap-1">
              <div className="text-[11px] text-stone-500 text-center">難易度 {difficulty}</div>
              <div className="grid grid-cols-4 gap-1">
                {[0.05, 0.1, 0.2, 1].map(value => (
                  <button
                    key={value}
                    onClick={() => setDifficulty(value)}
                    className={`rounded-md py-2 text-xs font-bold border transition-colors ${
                      difficulty === value
                        ? 'bg-blue-700 border-blue-500 text-blue-100'
                        : 'bg-stone-800 border-stone-700 text-stone-300 hover:bg-stone-700'
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={addDebugFood} className="flex-1 bg-stone-800 hover:bg-stone-700 border border-amber-700 rounded-lg py-3 text-sm text-amber-400 font-bold active:scale-95 transition-transform">🍎 食料+</button>
              <button onClick={addDebugElectricity} className="flex-1 bg-stone-800 hover:bg-stone-700 border border-yellow-700 rounded-lg py-3 text-sm text-yellow-300 font-bold active:scale-95 transition-transform">⚡ 電気+</button>
            </div>
            <button onClick={forceGameClear} className="w-full bg-stone-800 hover:bg-stone-700 border border-blue-700 rounded-lg py-3 text-sm text-blue-400 font-bold active:scale-95 transition-transform">🌀 クリア画面を表示する</button>
          </div>
        </div>
      )}

      <Tooltip data={tooltip} />
    </section>
  )
}
