import { useState, useEffect, useCallback } from 'react'
import { DIG_UPGRADES, MILESTONES, UNITS } from '../data/gameData'

const BASE_COST = 10
const COST_MULTIPLIER = 1.0
const UPGRADE_COST_MULT = 1.5

export function useGameState() {
  const DEBUG = true

  const [state, setState] = useState({
    food: 50,
    electricity: 0,
    diggers: 0,
    foragers: 1,
    territory: 0,
    upgradeLevels: {},
    ants: {}, // アリ種類ID -> 所持数
    gameCleared: false,
  })
  const [buyMode, setBuyMode] = useState(1) // 1 or 'max'

  // 採掘倍率を計算
  const calcDigMultiplier = useCallback((levels) => {
    let mult = 1
    for (const upg of DIG_UPGRADES) {
      const level = levels[upg.id] || 0
      mult *= Math.pow(upg.mult, level)
    }
    return mult
  }, [])

  // 食料倍率を計算（進化から）
  const calcFoodMultiplier = useCallback((levels) => {
    let mult = 1
    for (const upg of DIG_UPGRADES) {
      if (upg.foodMult) {
        const level = levels[upg.id] || 0
        mult *= Math.pow(upg.foodMult, level)
      }
    }
    return mult
  }, [])

  const digMultiplier = calcDigMultiplier(state.upgradeLevels)
  const foodMultiplier = calcFoodMultiplier(state.upgradeLevels)

  // 追加ユニットによる採掘力（固定値）
  const calcUnitPower = (ants) => UNITS.reduce((total, unit) => {
    const count = ants[unit.id] || 0
    return total + count * (unit.power || 0)
  }, 0)

  // 追加ユニットによる採掘倍率（%ボーナス）
  const calcUnitPowerMult = (ants) => UNITS.reduce((total, unit) => {
    const count = ants[unit.id] || 0
    return total + count * (unit.powerMult || 0)
  }, 0)

  // 追加ユニットによる食料倍率（%ボーナス）
  const calcUnitFoodMult = (ants) => UNITS.reduce((total, unit) => {
    const count = ants[unit.id] || 0
    return total + count * (unit.foodMult || 0)
  }, 0)

  // アリの総数
  const calcTotalAnts = (s) => {
    const basicAnts = s.diggers + s.foragers
    const unitAnts = Object.values(s.ants).reduce((a, b) => a + b, 0)
    return basicAnts + unitAnts
  }

  // 電気生産量（アリ酸電池 × アリ総数）
  const calcElectricityPerSec = (s) => {
    const generatorCount = s.ants['generator'] || 0
    const totalAnts = calcTotalAnts(s)
    return generatorCount * totalAnts * 0.01 // アリ1匹あたり0.01電気/秒
  }

  const unitPower = calcUnitPower(state.ants)
  const unitPowerMult = 1 + calcUnitPowerMult(state.ants)
  const unitFoodMult = 1 + calcUnitFoodMult(state.ants)
  const electricityPerSec = calcElectricityPerSec(state)
  const baseDigPower = state.diggers + unitPower
  const totalDigMult = digMultiplier * unitPowerMult
  const totalFoodMult = foodMultiplier * unitFoodMult
  const digPower = baseDigPower * totalDigMult
  const foodPerSec = state.foragers * totalFoodMult

  // アンロックされたアリ種類
  const getUnlockedAnts = () => {
    return UNITS.filter(ant => state.upgradeLevels[ant.unlockedBy] >= 1)
  }

  // コスト計算
  const getCost = (owned) => Math.floor(BASE_COST * Math.pow(COST_MULTIPLIER, owned))

  const getTotalCost = (owned, n) => {
    if (n <= 0) return 0
    const r = COST_MULTIPLIER
    const first = BASE_COST * Math.pow(r, owned)
    if (r === 1) return Math.floor(first * n)
    return Math.floor(first * (Math.pow(r, n) - 1) / (r - 1))
  }

  const getMaxBuyable = (owned, food) => {
    const r = COST_MULTIPLIER
    const first = BASE_COST * Math.pow(r, owned)
    if (first > food) return 0
    if (r === 1) return Math.floor(food / first)
    // food >= first * (r^n - 1) / (r - 1) を n について解く
    const n = Math.floor(Math.log(food * (r - 1) / first + 1) / Math.log(r))
    return Math.max(0, n)
  }

  // アップグレードコスト
  const getUpgradeCost = (upg, extraLevels = 0) => {
    const level = (state.upgradeLevels[upg.id] || 0) + extraLevels
    return Math.floor(upg.cost * Math.pow(UPGRADE_COST_MULT, level))
  }

  const getUpgradeMaxBuyable = (upg) => {
    let count = 0, total = 0
    while (true) {
      const cost = getUpgradeCost(upg, count)
      if (total + cost > state.food) break
      total += cost
      count++
    }
    return count
  }

  const getUpgradeTotalCost = (upg, n) => {
    let total = 0
    for (let i = 0; i < n; i++) total += getUpgradeCost(upg, i)
    return total
  }

  // 利用可能なアップグレード（未購入を全部表示）
  const getAvailableUpgrades = () => {
    return DIG_UPGRADES
      .filter(upg => !(state.upgradeLevels[upg.id] >= 1))
  }

  // マイルストーン情報
  const getMilestoneInfo = () => {
    let current = MILESTONES[0]
    let next = MILESTONES[1] || null
    for (let i = 0; i < MILESTONES.length; i++) {
      if (state.territory >= MILESTONES[i].at) {
        current = MILESTONES[i]
        next = MILESTONES[i + 1] || null
      } else {
        break
      }
    }
    return { current, next }
  }

  // 購入アクション
  const getBuyAmount = (maxBuyable) => {
    if (buyMode === 'max') return maxBuyable
    if (buyMode === 100) return Math.min(100, maxBuyable)
    return Math.min(1, maxBuyable)
  }

  const buyDigger = () => {
    const maxBuyable = getMaxBuyable(state.diggers, state.food)
    const n = getBuyAmount(maxBuyable)
    if (n <= 0) return
    const cost = getTotalCost(state.diggers, n)
    setState(s => ({ ...s, food: s.food - cost, diggers: s.diggers + n }))
  }

  const buyForager = () => {
    const maxBuyable = getMaxBuyable(state.foragers, state.food)
    const n = getBuyAmount(maxBuyable)
    if (n <= 0) return
    const cost = getTotalCost(state.foragers, n)
    setState(s => ({ ...s, food: s.food - cost, foragers: s.foragers + n }))
  }

  // アリ種類のコスト計算
  const getAntCost = (ant, extraCount = 0) => {
    const count = (state.ants[ant.id] || 0) + extraCount
    return Math.floor(ant.baseCost * Math.pow(ant.costMult, count))
  }
  const getAntTotalCost = (ant, n) => {
    let total = 0
    for (let i = 0; i < n; i++) total += getAntCost(ant, i)
    return total
  }
  const getAntMaxBuyable = (ant) => {
    const currency = ant.currency === 'electricity' ? state.electricity : state.food
    let count = 0, total = 0
    while (true) {
      const cost = getAntCost(ant, count)
      if (total + cost > currency) break
      total += cost
      count++
    }
    return count
  }

  const buyAnt = (antId) => {
    const ant = UNITS.find(a => a.id === antId)
    if (!ant) return
    if (!(state.upgradeLevels[ant.unlockedBy] >= 1)) return
    const maxBuyable = getAntMaxBuyable(ant)
    const n = getBuyAmount(maxBuyable)
    if (n <= 0) return
    const cost = getAntTotalCost(ant, n)
    if (ant.currency === 'electricity') {
      setState(s => ({
        ...s,
        electricity: s.electricity - cost,
        ants: { ...s.ants, [antId]: (s.ants[antId] || 0) + n }
      }))
    } else {
      setState(s => ({
        ...s,
        food: s.food - cost,
        ants: { ...s.ants, [antId]: (s.ants[antId] || 0) + n }
      }))
    }
  }

  const buyUpgrade = (id) => {
    const upg = DIG_UPGRADES.find(u => u.id === id)
    if (!upg) return
    // 既に持っていたら買えない
    if ((state.upgradeLevels[upg.id] || 0) >= 1) return
    const cost = upg.cost
    const isElectric = upg.currency === 'electricity'
    const currency = isElectric ? state.electricity : state.food
    if (currency < cost) return
    if (isElectric) {
      setState(s => ({
        ...s,
        electricity: s.electricity - cost,
        upgradeLevels: { ...s.upgradeLevels, [upg.id]: 1 }
      }))
    } else {
      setState(s => ({
        ...s,
        food: s.food - cost,
        upgradeLevels: { ...s.upgradeLevels, [upg.id]: 1 }
      }))
    }
  }

  const resetGame = () => {
    setState({
      food: 50,
      electricity: 0,
      diggers: 0,
      foragers: 1,
      territory: 0,
      upgradeLevels: {},
      ants: {},
      gameCleared: false,
    })
  }

  const addDebugFood = () => {
    setState(s => ({ ...s, food: s.food + 1e30 }))
  }
  const addDebugElectricity = () => {
    setState(s => ({ ...s, electricity: s.electricity + 1e30 }))
  }

  // ゲームループ
  useEffect(() => {
    const interval = setInterval(() => {
      setState(s => {
        const digMult = calcDigMultiplier(s.upgradeLevels)
        const foodMult = calcFoodMultiplier(s.upgradeLevels)
        const uPower = calcUnitPower(s.ants)
        const uPowerMult = 1 + calcUnitPowerMult(s.ants)
        const uFoodMult = 1 + calcUnitFoodMult(s.ants)
        const elecPerSec = calcElectricityPerSec(s)
        const newDigPower = (s.diggers + uPower) * digMult * uPowerMult
        const newFoodPerSec = s.foragers * uFoodMult * foodMult
        // クリア済みなら更新しない
        if (s.gameCleared) return s
        let newTerritory = s.territory + newDigPower * 0.01
        // ロケット開発(id:33)未購入なら地球(1e11)でキャップ
        const EARTH_CAP = 1e11
        if (!s.upgradeLevels[33] && newTerritory > EARTH_CAP) {
          newTerritory = EARTH_CAP
        }
        // 宇宙(1e20)到達でゲームクリア
        const UNIVERSE_GOAL = 1e20
        const cleared = newTerritory >= UNIVERSE_GOAL
        return {
          ...s,
          food: s.food + newFoodPerSec * 0.1,
          electricity: s.electricity + elecPerSec * 0.1,
          territory: cleared ? UNIVERSE_GOAL : newTerritory,
          gameCleared: cleared || s.gameCleared,
        }
      })
    }, 100)
    return () => clearInterval(interval)
  }, [calcDigMultiplier, calcFoodMultiplier])

  // 合計アップグレード数
  const totalUpgrades = Object.values(state.upgradeLevels).reduce((a, b) => a + b, 0)

  return {
    state,
    baseDigPower,
    digPower,
    totalDigMult,
    foodPerSec,
    totalFoodMult,
    electricityPerSec,
    totalUpgrades,
    buyMode,
    setBuyMode,
    getCost,
    getTotalCost,
    getMaxBuyable,
    getUpgradeCost,
    getUpgradeMaxBuyable,
    getUpgradeTotalCost,
    getAvailableUpgrades,
    getMilestoneInfo,
    buyDigger,
    buyForager,
    buyUpgrade,
    resetGame,
    addDebugFood,
    addDebugElectricity,
    // 追加アリ
    getUnlockedAnts,
    getAntCost,
    getAntTotalCost,
    getAntMaxBuyable,
    buyAnt,
  }
}
