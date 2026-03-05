import { useState, useEffect } from 'react'
import { useGameState } from './hooks/useGameState'
import Header from './components/Header'
import StatusPanel from './components/StatusPanel'
import AntVisual from './components/AntVisual'
import ShopPanel from './components/ShopPanel'

export default function App() {
  const game = useGameState()

  return (
    <div className="bg-stone-900 text-stone-100 min-h-screen flex flex-col">
      <Header />
      {game.state.gameCleared && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="bg-stone-800 border-2 border-yellow-500 rounded-2xl p-10 text-center max-w-lg">
            <div className="text-6xl mb-4">🌀</div>
            <h2 className="text-4xl font-bold text-yellow-400 mb-4">宇宙制覇！</h2>
            <p className="text-stone-300 text-lg mb-2">アリのコロニーは宇宙の果てまで到達した。</p>
            <p className="text-stone-400 text-sm mb-6">おめでとう！全マイルストーン達成！</p>
            <button
              onClick={game.resetGame}
              className="bg-yellow-500 hover:bg-yellow-400 text-stone-900 font-bold px-6 py-3 rounded-lg text-lg transition-colors"
            >
              最初からやる
            </button>
          </div>
        </div>
      )}
      <main className="flex flex-1 overflow-hidden">
        <StatusPanel game={game} />
        <AntVisual game={game} />
        <ShopPanel game={game} />
      </main>
    </div>
  )
}
