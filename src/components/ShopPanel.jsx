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
      colorClass = 'text-stone-800'
    } else if (type === 'forager') {
      name = '採餌アリ'
      desc = '危険な地上へと向かい、仲間たちの命を繋ぐ食料を運ぶ冒険者。'
      effect = '食料生産 +2.3/秒'
      colorClass = 'text-stone-800'
    } else if (type === 'ant') {
      const ant = UNITS.find(a => a.id === id)
      if (!ant) { setHoveredInfo(null); return }
      name = ant.name
      desc = ant.desc
      colorClass = 'text-stone-800'
      effect = getAntEffectText(ant, state.territory)
    } else if (type === 'upgrade') {
      const upg = DIG_UPGRADES.find(u => u.id === id)
      if (!upg) { setHoveredInfo(null); return }
      name = upg.name
      desc = upg.desc
      colorClass = 'text-stone-800'
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
      className="flex flex-1 flex-col gap-4 overflow-y-auto border-l border-stone-300 bg-[#f7f0e2]/90 p-4 text-stone-800"
    >
      {/* ユニットセクション */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-stone-500">ユニット</h2>
          <div className="flex overflow-hidden rounded-lg border border-stone-300 bg-white/80">
            {[1, 10, 100, 'max'].map(m => (
              <button
                key={m}
                className={`border-l border-stone-300 px-3 py-1 text-sm font-bold transition-colors first:border-l-0 ${buyMode === m ? 'bg-amber-600 text-white' : 'text-stone-700 hover:bg-stone-100'}`}
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
            className="flex flex-col rounded-lg border border-stone-200 bg-white/75 p-3 transition-colors hover:bg-white active:bg-stone-50 disabled:opacity-50"
          >
            <div className="text-sm font-bold text-stone-700">掘削アリ</div>
            <div className="text-xl font-bold text-emerald-700">{formatNumber(state.diggers)}</div>
            <div className="text-xs font-bold text-stone-500">採掘力 +1</div>
            <div className="mt-1 text-xs font-bold text-amber-700">
              🍎{buyMode === 1 || diggerBuyAmount <= 1 ? formatNumber(diggerCost) : formatNumber(diggerTotalCost)}
            </div>
          </button>

          {/* 採餌アリ */}
          <button
            onClick={buyForager}
            onMouseEnter={(e) => handleMouseEnter(e, 'forager')}
            onMouseLeave={handleMouseLeave}
            disabled={state.food < foragerCost}
            className="flex flex-col rounded-lg border border-stone-200 bg-white/75 p-3 transition-colors hover:bg-white active:bg-stone-50 disabled:opacity-50"
          >
            <div className="text-sm font-bold text-stone-700">採餌アリ</div>
            <div className="text-xl font-bold text-rose-700">{formatNumber(state.foragers)}</div>
            <div className="text-xs font-bold text-stone-500">食料 +2.3/秒</div>
            <div className="mt-1 text-xs font-bold text-amber-700">
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
                className={`flex flex-col rounded-lg border bg-white/75 p-3 transition-all hover:bg-white active:bg-stone-50 disabled:opacity-50 ${isElectric ? 'border-yellow-300' : 'border-emerald-200'}`}
              >
                <div className={`truncate text-sm font-bold ${isElectric ? 'text-yellow-700' : 'text-emerald-700'}`}>{ant.name}</div>
                <div className={`text-xl font-bold ${isElectric ? 'text-yellow-600' : 'text-emerald-600'}`}>{formatNumber(count)}</div>
                <div className="truncate text-xs font-bold text-stone-500">{effectLabel}</div>
                <div className={`mt-1 text-xs font-bold ${isElectric ? 'text-yellow-700' : 'text-amber-700'}`}>
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
          <h2 className="text-sm font-semibold uppercase tracking-widest text-stone-500">進化</h2>
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
                        ? 'bg-[#f3e3b8] border-yellow-300 shadow-[0_6px_18px_rgba(217,119,6,0.10)]'
                        : upg.type === 'unlock' 
                          ? 'bg-[#dbe8c8] border-emerald-300 shadow-[0_6px_18px_rgba(34,197,94,0.10)]'
                          : 'bg-[#ead8b4] border-[#caa46b] shadow-[0_6px_18px_rgba(161,98,7,0.10)]'
                      : 'border-stone-200 bg-white/50 opacity-50'
                  }`}
                >
                  <div className="mb-auto text-sm font-bold leading-tight text-stone-800">{upg.name}</div>
                  <div className="flex justify-between items-end mt-2">
                    <div className="flex flex-col gap-0.5">
                      {upg.digMultiplier > 1 && (
                        <span className="text-xs font-bold leading-none text-[#8b5e34]">
                          採掘 +{Math.round((upg.digMultiplier - 1) * 100)}%
                        </span>
                      )}
                      {upg.foodMultiplier > 1 && (
                        <span className="text-xs font-bold leading-none text-amber-700">
                          食料 +{Math.round((upg.foodMultiplier - 1) * 100)}%
                        </span>
                      )}
                      {upg.type === 'unlock' && (
                        <span className="text-xs font-bold leading-none text-emerald-700">
                          解禁
                        </span>
                      )}
                    </div>
                    <span className={`text-base font-bold ${isElectric ? 'text-yellow-700' : 'text-amber-700'}`}>
                      {isElectric ? '⚡' : '🍎'}{formatNumber(cost)}
                    </span>
                  </div>
                </button>
              )
            })}
            {/* 伏せ枠 */}
            <div className="flex min-h-[80px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-stone-300 bg-white/40">
              <div className="text-2xl font-bold text-stone-400">？</div>
            </div>
          </div>
        </div>
      )}

      {/* デバッグ */}
      {import.meta.env.DEV && (
        <div className="mt-auto flex flex-col gap-2 border-t border-stone-300 pt-4">
          <h2 className="text-center text-xs font-semibold uppercase tracking-widest text-stone-500">デバッグメニュー</h2>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <div className="text-center text-[11px] text-stone-500">難易度 {difficulty}</div>
              <div className="grid grid-cols-4 gap-1">
                {[0.05, 0.1, 0.2, 1].map(value => (
                  <button
                    key={value}
                    onClick={() => setDifficulty(value)}
                    className={`rounded-md py-2 text-xs font-bold border transition-colors ${
                      difficulty === value
                        ? 'border-sky-500 bg-sky-600 text-sky-50'
                        : 'border-stone-300 bg-white/70 text-stone-700 hover:bg-white'
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={addDebugFood} className="flex-1 rounded-lg border border-amber-300 bg-white/70 py-3 text-sm font-bold text-amber-700 transition-transform active:scale-95 hover:bg-white">🍎 食料+</button>
              <button onClick={addDebugElectricity} className="flex-1 rounded-lg border border-yellow-300 bg-white/70 py-3 text-sm font-bold text-yellow-700 transition-transform active:scale-95 hover:bg-white">⚡ 電気+</button>
            </div>
            <button onClick={forceGameClear} className="w-full rounded-lg border border-[#caa46b] bg-white/70 py-3 text-sm font-bold text-[#8b5e34] transition-transform active:scale-95 hover:bg-white">🌀 クリア画面を表示する</button>
          </div>
        </div>
      )}

      <Tooltip data={tooltip} />
    </section>
  )
}
