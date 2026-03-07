import { createPortal } from 'react-dom'

export default function Tooltip({ data }) {
  if (!data) return null

  const { name, desc, rect, colorClass, effect } = data

  // ツールチップの位置計算 (ターゲットの左側に配置)
  const style = {
    position: 'fixed',
    top: rect.top,
    right: window.innerWidth - rect.left + 12, // ターゲットの左から12px離す
    width: '280px',
    zIndex: 9999,
  }

  return createPortal(
    <div
      className="pointer-events-none rounded-xl border-2 border-stone-300 bg-[rgba(255,250,242,0.96)] p-4 text-stone-700 shadow-[0_10px_40px_rgba(120,84,43,0.18)] animate-in fade-in zoom-in duration-150"
      style={style}
    >
      <div className={`mb-2 border-b border-stone-200 pb-1 text-lg font-bold ${colorClass || 'text-stone-800'}`}>
        {name}
      </div>
      <div className="mb-3 text-sm leading-relaxed text-stone-600">
        {desc}
      </div>
      {effect && (
        <div className="flex items-center gap-2 text-sm font-bold text-amber-700">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
          {effect}
        </div>
      )}
      {/* 矢印 */}
      <div 
        className="absolute top-4 -right-2 h-4 w-4 rotate-45 border-r-2 border-t-2 border-stone-300 bg-[rgba(255,250,242,0.96)]"
      />
    </div>,
    document.body
  )
}
