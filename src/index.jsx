import React from 'react'
import ReactDOM from 'react-dom/client'
import { createPortal } from 'react-dom'
import { useGameState } from './hooks/useGameState'
import Header from './components/Header'
import StatusPanel from './components/StatusPanel'
import ColonyPanel from './components/ColonyPanel'
import ShopPanel from './components/ShopPanel'
import './index.css'

function App() {
  const game = useGameState()

  return (
    <div className="bg-stone-900 text-stone-100 min-h-screen flex flex-col">
      <Header />
      
      <main className="flex flex-1 overflow-hidden relative">
        <StatusPanel game={game} />
        <ColonyPanel />
        <ShopPanel game={game} />
      </main>

      {game.state.gameCleared && createPortal(
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#050505',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999999,
            overflow: 'hidden'
          }}
        >
          {/* 宇宙のパーティクル背景 */}
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="star-particle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 3}px`,
                height: `${Math.random() * 3}px`,
                '--duration': `${2 + Math.random() * 4}s`,
                '--opacity': 0.2 + Math.random() * 0.8
              }}
            />
          ))}

          {/* メインパネル */}
          <div className="relative animate-float-up">
            <div className="bg-stone-900/80 backdrop-blur-xl border-[6px] border-yellow-500/50 rounded-[4rem] p-20 text-center max-w-3xl shadow-[0_0_100px_rgba(234,179,8,0.4)] animate-space-glow">
              <div className="text-[10rem] mb-10 drop-shadow-[0_0_30px_rgba(234,179,8,0.5)]">🌀</div>
              
              <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-yellow-500 to-amber-700 mb-10 tracking-[0.2em] uppercase leading-tight">
                宇宙制覇
              </h1>

              <div className="space-y-8 mb-16">
                <p className="text-4xl font-bold text-stone-100 tracking-tight">
                  アリのコロニーは宇宙の真理へ到達した。
                </p>
                <div className="h-1 w-32 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto" />
                <p className="text-xl text-stone-400 font-medium leading-relaxed max-w-lg mx-auto">
                  小さな一歩が積み重なり、巨大な文明となった。<br />
                  すべてのマイルストーンを達成し、アリたちは神となったのだ。
                </p>
              </div>

              <button
                onClick={game.resetGame}
                className="group relative bg-yellow-500 hover:bg-yellow-400 text-stone-950 font-black px-16 py-8 rounded-3xl text-4xl transition-all shadow-[0_20px_50px_rgba(234,179,8,0.3)] hover:-translate-y-2 active:translate-y-0 active:scale-95 overflow-hidden"
              >
                <span className="relative z-10">新世界を創造する</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
