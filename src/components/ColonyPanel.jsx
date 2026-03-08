import miningAntImage from '../assets/02_掘削アリ.png'
import foragerAntImage from '../assets/01_採餌アリ.png'
import wasteAreaImage from '../assets/03_廃土置き場.png'
import soldierAntImage from '../assets/04_兵隊アリ.png'

export default function ColonyPanel({ game }) {
  const ants = game?.state?.ants || {}
  const visualUnlockOrder = game?.state?.visualUnlockOrder || ['digger', 'forager']
  const visualOrderMap = new Map(visualUnlockOrder.map((id, index) => [id, index]))

  const visualUnits = [
    {
      id: 'digger',
      name: '採掘アリ',
      src: miningAntImage,
      unlocked: true,
    },
    {
      id: 'forager',
      name: '採餌アリ',
      src: foragerAntImage,
      unlocked: true,
    },
    {
      id: 'strongDigger',
      name: '兵隊アリ',
      src: soldierAntImage,
      unlocked: (ants.strongDigger || 0) > 0,
    },
    {
      id: 'wasteArea',
      name: '廃土置き場',
      src: wasteAreaImage,
      unlocked: (ants.wasteArea || 0) > 0,
    },
  ]
    .filter(unit => unit.unlocked)
    .sort((a, b) => {
      const aOrder = visualOrderMap.has(a.id) ? visualOrderMap.get(a.id) : Number.MAX_SAFE_INTEGER
      const bOrder = visualOrderMap.has(b.id) ? visualOrderMap.get(b.id) : Number.MAX_SAFE_INTEGER
      return aOrder - bOrder
    })

  return (
    <section className="flex-1 bg-[#f5ecda] p-6">
      <div className="mx-auto flex h-full max-w-5xl items-center justify-center">
        <div className="flex h-full w-full max-h-[720px] items-center justify-center rounded-[2rem] border border-stone-200 bg-[rgba(255,252,245,0.85)] p-8 shadow-[0_24px_60px_rgba(120,84,43,0.10)] backdrop-blur-sm">
          <div className="flex w-full flex-wrap items-end justify-center gap-6 lg:gap-10">
            {visualUnits.map(unit => (
              <img
                key={unit.id}
                src={unit.src}
                alt={unit.name}
                className="w-[220px] md:w-[250px] lg:w-[280px] h-auto object-contain"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
