import { formatNumber } from '../utils/format'

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
    <section className="flex-1 flex flex-col gap-4 p-4 overflow-y-auto">
      {/* ユニット */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-stone-400 uppercase tracking-widest">ユニット</h2>
          <div className="flex bg-stone-800 rounded-lg overflow-hidden border border-stone-700">
            <button
              className={`px-3 py-1 text-sm font-bold text-white transition-colors ${buyMode === 1 ? 'bg-amber-600' : 'hover:bg-stone-700'}`}
              onClick={() => setBuyMode(1)}
            >
              x1
            </button>
            <button
              className={`px-3 py-1 text-sm font-bold text-white transition-colors border-l border-stone-700 ${buyMode === 10 ? 'bg-amber-600' : 'hover:bg-stone-700'}`}
              onClick={() => setBuyMode(10)}
            >
              x10
            </button>
            <button
              className={`px-3 py-1 text-sm font-bold text-white transition-colors border-l border-stone-700 ${buyMode === 100 ? 'bg-amber-600' : 'hover:bg-stone-700'}`}
              onClick={() => setBuyMode(100)}
            >
              x100
            </button>
            <button
              className={`px-3 py-1 text-sm font-bold text-white transition-colors border-l border-stone-700 ${buyMode === 'max' ? 'bg-amber-600' : 'hover:bg-stone-700'}`}
              onClick={() => setBuyMode('max')}
            >
              xMax
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          <button
            onClick={buyDigger}
            disabled={state.food < diggerCost}
            className="flex flex-col bg-stone-800 hover:bg-stone-700 active:bg-stone-600 rounded-lg p-3 transition-colors border border-stone-700"
          >
            <div className="text-stone-200 font-bold">掘削アリ</div>
            <div className="text-green-400 text-xl font-bold">{formatNumber(state.diggers)}</div>
            <div className="text-stone-400 text-xs">採掘力 +1</div>
            <div className="text-amber-400 text-sm font-bold mt-1">
              🍎{buyMode === 1 || diggerBuyAmount <= 1 ? formatNumber(diggerCost) : `${formatNumber(diggerTotalCost)} (x${diggerBuyAmount})`}
            </div>
          </button>

          <button
            onClick={buyForager}
            disabled={state.food < foragerCost}
            className="flex flex-col bg-stone-800 hover:bg-stone-700 active:bg-stone-600 rounded-lg p-3 transition-colors border border-stone-700"
          >
            <div className="text-stone-200 font-bold">採餌アリ</div>
            <div className="text-red-400 text-xl font-bold">{formatNumber(state.foragers)}</div>
            <div className="text-stone-400 text-xs">食料 +1/秒</div>
            <div className="text-amber-400 text-sm font-bold mt-1">
              🍎{buyMode === 1 || foragerBuyAmount <= 1 ? formatNumber(foragerCost) : `${formatNumber(foragerTotalCost)} (x${foragerBuyAmount})`}
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
                disabled={!canBuy}
                className={`flex flex-col bg-stone-800 hover:bg-stone-700 active:bg-stone-600 rounded-lg p-3 transition-colors border ${isElectric ? 'border-yellow-600' : 'border-emerald-700'}`}
              >
                <div className={`font-bold truncate ${isElectric ? 'text-yellow-300' : 'text-emerald-300'}`}>{ant.name}</div>
                <div className={`text-xl font-bold ${isElectric ? 'text-yellow-400' : 'text-emerald-400'}`}>{formatNumber(count)}</div>
                <div className="text-stone-400 text-xs truncate">{ant.desc}</div>
                <div className={`text-sm font-bold mt-1 ${isElectric ? 'text-yellow-300' : 'text-amber-400'}`}>
                  {isElectric ? '⚡' : '🍎'}{buyMode === 1 || buyAmount <= 1 ? formatNumber(cost) : `${formatNumber(totalCost)} (x${buyAmount})`}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* 進化：倍率UP */}
      {availableUpgrades.filter(u => !u.type).length > 0 && (
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-semibold text-stone-400 uppercase tracking-widest">進化：倍率UP</h2>
          <div className="grid grid-cols-8 gap-2">
            {availableUpgrades.filter(u => !u.type).map(upg => {
              const isElectric = upg.currency === 'electricity'
              const canBuy = isElectric ? state.electricity >= upg.cost : state.food >= upg.cost
              const hasDig = upg.mult > 1
              const hasFood = upg.foodMult > 1
              return (
                <button
                  key={upg.id}
                  onClick={() => buyUpgrade(upg.id)}
                  disabled={!canBuy}
                  className={`flex flex-col rounded-lg p-2 transition-colors border text-left ${
                    canBuy
                      ? isElectric
                        ? 'bg-gradient-to-r from-yellow-900 to-yellow-800 hover:from-yellow-800 hover:to-yellow-700 border-yellow-600'
                        : 'bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 border-blue-600'
                      : 'bg-stone-800 border-stone-700 opacity-50'
                  }`}
                >
                  <div className="text-stone-100 font-bold text-sm truncate">{upg.name}</div>
                  <div className="text-stone-400 text-xs truncate">{upg.desc}</div>
                  <div className="flex justify-between items-center mt-1">
                    <div className="flex gap-1">
                      {hasDig && <span className="text-blue-300 text-xs font-bold">⛏️×{upg.mult}</span>}
                      {hasFood && <span className="text-amber-300 text-xs font-bold">🍎×{upg.foodMult}</span>}
                    </div>
                    <span className={`text-xs font-bold ${isElectric ? 'text-yellow-300' : 'text-amber-400'}`}>
                      {isElectric ? '⚡' : '🍎'}{formatNumber(upg.cost)}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* 進化：解禁 */}
      {availableUpgrades.filter(u => u.type === 'unlock').length > 0 && (
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-semibold text-stone-400 uppercase tracking-widest">進化：アンロック</h2>
          <div className="grid grid-cols-8 gap-2">
            {availableUpgrades.filter(u => u.type === 'unlock').map(upg => {
              const isElectric = upg.currency === 'electricity'
              const canBuy = isElectric ? state.electricity >= upg.cost : state.food >= upg.cost
              return (
                <button
                  key={upg.id}
                  onClick={() => buyUpgrade(upg.id)}
                  disabled={!canBuy}
                  className={`flex flex-col rounded-lg p-2 transition-colors border text-left ${
                    canBuy
                      ? isElectric
                        ? 'bg-gradient-to-r from-yellow-900 to-yellow-800 hover:from-yellow-800 hover:to-yellow-700 border-yellow-600'
                        : 'bg-gradient-to-r from-green-900 to-green-800 hover:from-green-800 hover:to-green-700 border-green-600'
                      : 'bg-stone-800 border-stone-700 opacity-50'
                  }`}
                >
                  <div className="text-stone-100 font-bold text-sm truncate">{upg.name}</div>
                  <div className={`text-xs truncate ${isElectric ? 'text-yellow-300' : 'text-green-300'}`}>{upg.desc}</div>
                  <div className="flex justify-end mt-1">
                    <span className={`text-xs font-bold ${isElectric ? 'text-yellow-300' : 'text-amber-400'}`}>
                      {isElectric ? '⚡' : '🍎'}{formatNumber(upg.cost)}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* デバッグ */}
      <div className="flex flex-col gap-2 mt-auto">
        <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-widest">デバッグ</h2>
        <div className="flex gap-2">
          <button
            onClick={addDebugFood}
            className="flex-1 bg-stone-800 hover:bg-stone-700 border border-amber-700 rounded-lg px-3 py-2 text-sm text-amber-400 font-bold"
          >
            🍎 食料MAX
          </button>
          <button
            onClick={addDebugElectricity}
            className="flex-1 bg-stone-800 hover:bg-stone-700 border border-yellow-700 rounded-lg px-3 py-2 text-sm text-yellow-300 font-bold"
          >
            ⚡ 電気MAX
          </button>
        </div>
      </div>
    </section>
  )
}
