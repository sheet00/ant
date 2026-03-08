import { useState, useEffect, useCallback } from 'react'
import {
  DIG_UPGRADES,
  ELECTRIC_UNIT_COST_MULTIPLIER,
  FOOD_UNIT_COST_MULTIPLIER,
  MILESTONES,
  UNITS,
} from '../data/gameData'

const DIFFICULTY = 0.2
const DIGGER_BASE_COST = 1
const DIGGER_COST_MULTIPLIER = 1.08
const FORAGER_BASE_COST = 1
const FORAGER_COST_MULTIPLIER = 1.04
const UPGRADE_COST_MULT = 1.5
const BASE_VISUAL_UNLOCK_ORDER = ['digger', 'forager']

export function useGameState() {
  const DEBUG = import.meta.env.DEV

  const [state, setState] = useState({
    food: 60,
    electricity: 0,
    diggers: 1,
    foragers: 2,
    territory: 0,
    upgradeLevels: {},
    visualUnlockOrder: BASE_VISUAL_UNLOCK_ORDER,
    unlockedAntOrder: [],
    ants: {}, // アリ種類ID -> 所持数
    gameCleared: false,
  })
  const [buyMode, setBuyMode] = useState(1) // 1 or 'max'
  const [difficulty, setDifficulty] = useState(0.1)
  const activeDifficulty = DEBUG ? difficulty : DIFFICULTY

  const getScaledMilestones = useCallback(() => {
    return MILESTONES.map((milestone) => ({
      ...milestone,
      at: Math.floor(milestone.at * activeDifficulty),
    }))
  }, [activeDifficulty])

  // 採掘倍率を計算
  const calcDigMultiplier = useCallback((levels) => {
    let mult = 1
    for (const upg of DIG_UPGRADES) {
      const level = levels[upg.id] || 0
      mult *= Math.pow(upg.digMultiplier, level)
    }
    return mult
  }, [])

  // 食料倍率を計算（進化から）
  const calcFoodMultiplier = useCallback((levels) => {
    let mult = 1
    for (const upg of DIG_UPGRADES) {
      if (upg.foodMultiplier) {
        const level = levels[upg.id] || 0
        mult *= Math.pow(upg.foodMultiplier, level)
      }
    }
    return mult
  }, [])

  const digMultiplier = calcDigMultiplier(state.upgradeLevels)
  const foodMultiplier = calcFoodMultiplier(state.upgradeLevels)

  const getTerritoryScale = (unit, territory) => {
    if (!unit.territoryPowerGrowth) return 1
    const territoryFactor = Math.max(10, territory + 10)
    return 1 + Math.log10(territoryFactor) * unit.territoryPowerGrowth
  }

  const getAntDigPower = (unit, count, territory) => {
    if (!unit.power || count <= 0) return 0
    return count * unit.power * getTerritoryScale(unit, territory)
  }

  const getAntEffectText = (unit, territory) => {
    const effects = []
    if (unit.id === 'generator') effects.push('電気 +0.2/匹・秒')
    if (unit.power) {
      const scaledPower = unit.power * getTerritoryScale(unit, territory)
      const powerLabel = scaledPower >= 10 ? scaledPower.toFixed(1) : scaledPower.toFixed(2)
      effects.push(`採掘 +${powerLabel}`)
      if (unit.territoryPowerGrowth) effects.push('進行で上昇')
    }
    if (unit.digBonusMult) effects.push(`採掘倍率 +${Math.round(unit.digBonusMult * 100)}%`)
    if (unit.foodBonusMult) effects.push(`食料倍率 +${Math.round(unit.foodBonusMult * 100)}%`)
    return effects.join(' / ')
  }

  // 追加ユニットによる採掘力
  const calcUnitPower = (ants, territory) => UNITS.reduce((total, unit) => {
    const count = ants[unit.id] || 0
    return total + getAntDigPower(unit, count, territory)
  }, 0)

  // 追加ユニットによる採掘倍率（%ボーナス）
  const calcUnitPowerMult = (ants) => UNITS.reduce((total, unit) => {
    const count = ants[unit.id] || 0
    return total + count * (unit.digBonusMult || 0)
  }, 0)

  // 追加ユニットによる食料倍率（%ボーナス）
  const calcUnitFoodMult = (ants) => UNITS.reduce((total, unit) => {
    const count = ants[unit.id] || 0
    return total + count * (unit.foodBonusMult || 0)
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
    return generatorCount * totalAnts * 0.2 // アリ1匹あたり0.2電気/秒
  }

  const unitPower = calcUnitPower(state.ants, state.territory)
  const unitPowerMult = 1 + calcUnitPowerMult(state.ants)
  const unitFoodMult = 1 + calcUnitFoodMult(state.ants)
  const electricityPerSec = calcElectricityPerSec(state)
  const baseDigPower = state.diggers + unitPower
  const totalDigMult = digMultiplier * unitPowerMult
  const totalFoodMult = foodMultiplier * unitFoodMult
  const digPower = baseDigPower * totalDigMult
  const foodPerSec = state.foragers * 2.3 * totalFoodMult

  // アンロックされたアリ種類
  const getUnlockedAnts = () => {
    const unlockedSet = new Set(
      UNITS.filter(ant => state.upgradeLevels[ant.unlockedBy] >= 1).map(ant => ant.id)
    )
    const ordered = []
    for (const antId of state.unlockedAntOrder || []) {
      const ant = UNITS.find(unit => unit.id === antId)
      if (!ant || !unlockedSet.has(antId)) continue
      ordered.push(ant)
      unlockedSet.delete(antId)
    }
    // 既存セーブ互換: 順序情報がない解禁済みユニットは定義順で末尾に補完
    for (const ant of UNITS) {
      if (unlockedSet.has(ant.id)) ordered.push(ant)
    }
    return ordered
  }

  // コスト計算
  const getCost = (owned, role = 'digger') => {
    const baseCost = role === 'forager' ? FORAGER_BASE_COST : DIGGER_BASE_COST
    const costMultiplier = role === 'forager' ? FORAGER_COST_MULTIPLIER : DIGGER_COST_MULTIPLIER
    return Math.floor(baseCost * Math.pow(costMultiplier, owned) * activeDifficulty)
  }

  const getTotalCost = (owned, n, role = 'digger') => {
    if (n <= 0) return 0
    const baseCost = role === 'forager' ? FORAGER_BASE_COST : DIGGER_BASE_COST
    const r = role === 'forager' ? FORAGER_COST_MULTIPLIER : DIGGER_COST_MULTIPLIER
    const first = baseCost * Math.pow(r, owned) * activeDifficulty
    if (r === 1) return Math.floor(first * n)
    return Math.floor(first * (Math.pow(r, n) - 1) / (r - 1))
  }

  const getMaxBuyable = (owned, food, role = 'digger') => {
    const baseCost = role === 'forager' ? FORAGER_BASE_COST : DIGGER_BASE_COST
    const r = role === 'forager' ? FORAGER_COST_MULTIPLIER : DIGGER_COST_MULTIPLIER
    const first = baseCost * Math.pow(r, owned) * activeDifficulty
    if (first > food) return 0
    if (r === 1) return Math.floor(food / first)
    // food >= first * (r^n - 1) / (r - 1) を n について解く
    const n = Math.floor(Math.log(food * (r - 1) / first + 1) / Math.log(r))
    return Math.max(0, n)
  }

  // アップグレードコスト
  const getUpgradeCost = (upg, extraLevels = 0) => {
    const level = (state.upgradeLevels[upg.id] || 0) + extraLevels
    return Math.floor(upg.cost * activeDifficulty * Math.pow(UPGRADE_COST_MULT, level))
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

  // 利用可能なアップグレード（系統ごとに購入済みの最大ID+3まで表示）
  const getAvailableUpgrades = () => {
    const scaledMilestones = getScaledMilestones()
    const purchasedIds = Object.keys(state.upgradeLevels).map(Number)
    const earthMilestone = scaledMilestones.find(m => m.name === '🌍 地球')
    const earthAt = earthMilestone ? earthMilestone.at : Infinity
    const rocketPreviewAt = earthAt * 0.9
    
    const maxFoodId = purchasedIds.filter(id => id < 26).length > 0 
      ? Math.max(...purchasedIds.filter(id => id < 26)) 
      : 0
    
    const maxElecId = purchasedIds.filter(id => id >= 26).length > 0 
      ? Math.max(...purchasedIds.filter(id => id >= 26)) 
      : 25

    // 電気系を表示するかどうか（id:25「電気の発見」が購入済みか）
    const isElectricUnlocked = state.upgradeLevels[25] >= 1

    const hasPrerequisites = (upg) => {
      if (!Array.isArray(upg.requires) || upg.requires.length === 0) return true
      return upg.requires.every(reqId => state.upgradeLevels[reqId] >= 1)
    }

    return DIG_UPGRADES.filter(upg => {
      // 既に持っているものは除外
      if (state.upgradeLevels[upg.id] >= 1) return false
      if (!hasPrerequisites(upg)) return false

      if (upg.id < 26) {
        if (upg.id === 25 && state.territory >= rocketPreviewAt) {
          return true
        }
        if (Array.isArray(upg.requires) && upg.requires.length > 0) {
          return true
        }
        // 食料系：購入済み最大ID+3まで表示（余裕を持たせる）
        return upg.id <= maxFoodId + 3
      } else {
        if (upg.id === 32 && isElectricUnlocked && state.territory >= rocketPreviewAt) {
          return true
        }
        // 電気系：電気開放済みかつ、購入済み最大ID+3まで
        return isElectricUnlocked && upg.id <= maxElecId + 3
      }
    }).sort((a, b) => {
      const aElectric = a.currency === 'electricity' ? 1 : 0
      const bElectric = b.currency === 'electricity' ? 1 : 0
      if (aElectric !== bElectric) return aElectric - bElectric
      if (a.cost !== b.cost) return a.cost - b.cost
      return a.id - b.id
    })
  }

  // マイルストーン情報
  const getMilestoneInfo = () => {
    const scaledMilestones = getScaledMilestones()
    let current = scaledMilestones[0]
    let next = scaledMilestones[1] || null
    for (let i = 0; i < scaledMilestones.length; i++) {
      if (state.territory >= scaledMilestones[i].at) {
        current = scaledMilestones[i]
        next = scaledMilestones[i + 1] || null
      } else {
        break
      }
    }
    return { current, next }
  }

  // 購入アクション
  const getBuyAmount = (maxBuyable) => {
    if (buyMode === 'max') return maxBuyable
    if (typeof buyMode === 'number') return Math.min(buyMode, maxBuyable)
    return Math.min(1, maxBuyable)
  }

  const buyDigger = () => {
    const maxBuyable = getMaxBuyable(state.diggers, state.food, 'digger')
    const n = getBuyAmount(maxBuyable)
    if (n <= 0) return
    const cost = getTotalCost(state.diggers, n, 'digger')
    setState(s => ({ ...s, food: s.food - cost, diggers: s.diggers + n }))
  }

  const buyForager = () => {
    const maxBuyable = getMaxBuyable(state.foragers, state.food, 'forager')
    const n = getBuyAmount(maxBuyable)
    if (n <= 0) return
    const cost = getTotalCost(state.foragers, n, 'forager')
    setState(s => ({ ...s, food: s.food - cost, foragers: s.foragers + n }))
  }

  // アリ種類のコスト計算
  const getAntCost = (ant, extraCount = 0) => {
    const count = (state.ants[ant.id] || 0) + extraCount
    const defaultCostMultiplier = ant.currency === 'electricity'
      ? ELECTRIC_UNIT_COST_MULTIPLIER
      : FOOD_UNIT_COST_MULTIPLIER
    const costMultiplier = ant.costMult ?? defaultCostMultiplier
    return Math.floor(ant.baseCost * Math.pow(costMultiplier, count) * activeDifficulty)
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
    const appendVisualUnlock = (s) => {
      const currentCount = s.ants[antId] || 0
      if (currentCount > 0) return s.visualUnlockOrder || BASE_VISUAL_UNLOCK_ORDER
      const prevOrder = s.visualUnlockOrder || BASE_VISUAL_UNLOCK_ORDER
      if (prevOrder.includes(antId)) return prevOrder
      return [...prevOrder, antId]
    }
    if (ant.currency === 'electricity') {
      setState(s => ({
        ...s,
        electricity: s.electricity - cost,
        ants: { ...s.ants, [antId]: (s.ants[antId] || 0) + n },
        visualUnlockOrder: appendVisualUnlock(s),
      }))
    } else {
      setState(s => ({
        ...s,
        food: s.food - cost,
        ants: { ...s.ants, [antId]: (s.ants[antId] || 0) + n },
        visualUnlockOrder: appendVisualUnlock(s),
      }))
    }
  }

  const buyUpgrade = (id) => {
    const upg = DIG_UPGRADES.find(u => u.id === id)
    if (!upg) return
    if (Array.isArray(upg.requires) && !upg.requires.every(reqId => state.upgradeLevels[reqId] >= 1)) return
    // 既に持っていたら買えない
    if ((state.upgradeLevels[upg.id] || 0) >= 1) return
    const cost = getUpgradeCost(upg)
    const isElectric = upg.currency === 'electricity'
    const currency = isElectric ? state.electricity : state.food
    if (currency < cost) return
    const newlyUnlockedAntIds = UNITS
      .filter(unit => unit.unlockedBy === upg.id)
      .map(unit => unit.id)
    const appendUnlockedAntOrder = (s) => {
      const prev = s.unlockedAntOrder || []
      if (newlyUnlockedAntIds.length === 0) return prev
      const next = [...prev]
      for (const antId of newlyUnlockedAntIds) {
        if (!next.includes(antId)) next.push(antId)
      }
      return next
    }
    if (isElectric) {
      setState(s => ({
        ...s,
        electricity: s.electricity - cost,
        upgradeLevels: { ...s.upgradeLevels, [upg.id]: 1 },
        unlockedAntOrder: appendUnlockedAntOrder(s),
      }))
    } else {
      setState(s => ({
        ...s,
        food: s.food - cost,
        upgradeLevels: { ...s.upgradeLevels, [upg.id]: 1 },
        unlockedAntOrder: appendUnlockedAntOrder(s),
      }))
    }
  }

  const resetGame = () => {
    setState({
      food: 60,
      electricity: 0,
      diggers: 1,
      foragers: 2,
      territory: 0,
      upgradeLevels: {},
      visualUnlockOrder: BASE_VISUAL_UNLOCK_ORDER,
      unlockedAntOrder: [],
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
  const forceGameClear = () => {
    const scaledMilestones = getScaledMilestones()
    const universeGoal = scaledMilestones[scaledMilestones.length - 1].at
    setState(s => ({ ...s, gameCleared: true, territory: universeGoal }))
  }

  // ゲームループ
  useEffect(() => {
    const interval = setInterval(() => {
      setState(s => {
        const scaledMilestones = getScaledMilestones()
        const digMult = calcDigMultiplier(s.upgradeLevels)
        const foodMult = calcFoodMultiplier(s.upgradeLevels)
        const uPower = calcUnitPower(s.ants, s.territory)
        const uPowerMult = 1 + calcUnitPowerMult(s.ants)
        const uFoodMult = 1 + calcUnitFoodMult(s.ants)
        const elecPerSec = calcElectricityPerSec(s)
        const newDigPower = (s.diggers + uPower) * digMult * uPowerMult
        const newFoodPerSec = s.foragers * 2.3 * uFoodMult * foodMult
        // クリア済みなら更新しない
        if (s.gameCleared) return s
        let newTerritory = s.territory + newDigPower * 0.2
        // 宇宙到達でゲームクリア
        const universeGoal = scaledMilestones[scaledMilestones.length - 1].at
        const cleared = newTerritory >= universeGoal
        return {
          ...s,
          food: s.food + newFoodPerSec * 0.1,
          electricity: s.electricity + elecPerSec * 0.1,
          territory: cleared ? universeGoal : newTerritory,
          gameCleared: cleared || s.gameCleared,
        }
      })
    }, 100)
    return () => clearInterval(interval)
  }, [calcDigMultiplier, calcFoodMultiplier, getScaledMilestones])

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
    difficulty: activeDifficulty,
    setDifficulty,
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
    forceGameClear,
    // 追加アリ
    getUnlockedAnts,
    getAntCost,
    getAntTotalCost,
    getAntMaxBuyable,
    getAntEffectText,
    buyAnt,
  }
}
