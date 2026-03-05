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
      className="pointer-events-none bg-stone-900 border-2 border-stone-500 p-4 rounded-xl shadow-[0_10px_50px_rgba(0,0,0,0.9)] text-stone-200 animate-in fade-in zoom-in duration-150"
      style={style}
    >
      <div className={`font-bold text-lg mb-2 border-b border-stone-700 pb-1 ${colorClass || 'text-stone-100'}`}>
        {name}
      </div>
      <div className="text-sm text-stone-300 leading-relaxed mb-3">
        {desc}
      </div>
      {effect && (
        <div className="text-sm font-bold text-amber-300 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
          {effect}
        </div>
      )}
      {/* 矢印 */}
      <div 
        className="absolute top-4 -right-2 w-4 h-4 bg-stone-900 border-r-2 border-t-2 border-stone-500 rotate-45"
      />
    </div>,
    document.body
  )
}
