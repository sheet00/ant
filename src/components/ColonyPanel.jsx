import miningAntImage from '../assets/02_掘削アリ.png'
import foragerAntImage from '../assets/01_採餌アリ.png'
import wasteAreaImage from '../assets/03_廃土置き場.png'
import soldierAntImage from '../assets/04_兵隊アリ.png'
import shiftTableImage from '../assets/05_交代勤務.png'
import ventTunnelImage from '../assets/06_換気縦穴.png'
import exitRouteImage from '../assets/07_バイパス通路.png'
import fungusGardenImage from '../assets/08_菌類園.png'
import queenChamberImage from '../assets/09_女王の間.png'
import subColonyImage from '../assets/10_サテライト巣.png'
import aphidImage from '../assets/11_アブラムシ牧場.png'
import wheelImage from '../assets/12_運搬車.png'
import metalToolImage from '../assets/13_金属スクレーパー.png'
import generatorImage from '../assets/14_生体発電.png'
import electricDrillImage from '../assets/15_電動ドリル.png'
import dynamiteImage from '../assets/16_発破掘削.png'
import shieldMachineImage from '../assets/17_シールドマシン.png'
import nuclearDrillImage from '../assets/18_原子力掘削.png'
import laserDrillImage from '../assets/19_収束レーザー.png'

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
    {
      id: 'shiftTable',
      name: '交代勤務',
      src: shiftTableImage,
      unlocked: (ants.shiftTable || 0) > 0,
    },
    {
      id: 'ventTunnel',
      name: '換気縦穴',
      src: ventTunnelImage,
      unlocked: (ants.ventTunnel || 0) > 0,
    },
    {
      id: 'exitRoute',
      name: 'バイパス通路',
      src: exitRouteImage,
      unlocked: (ants.exitRoute || 0) > 0,
    },
    {
      id: 'fungusGarden',
      name: '菌類園',
      src: fungusGardenImage,
      unlocked: (ants.fungusGarden || 0) > 0,
    },
    {
      id: 'queenChamber',
      name: '女王の間',
      src: queenChamberImage,
      unlocked: (ants.queenChamber || 0) > 0,
    },
    {
      id: 'subColony',
      name: 'サテライト巣',
      src: subColonyImage,
      unlocked: (ants.subColony || 0) > 0,
    },
    {
      id: 'aphid',
      name: 'アブラムシ牧場',
      src: aphidImage,
      unlocked: (ants.aphid || 0) > 0,
    },
    {
      id: 'wheel',
      name: '運搬車',
      src: wheelImage,
      unlocked: (ants.wheel || 0) > 0,
    },
    {
      id: 'metalTool',
      name: '金属スクレーパー',
      src: metalToolImage,
      unlocked: (ants.metalTool || 0) > 0,
    },
    {
      id: 'generator',
      name: '生体発電',
      src: generatorImage,
      unlocked: (ants.generator || 0) > 0,
    },
    {
      id: 'electricDrill',
      name: '電動ドリル',
      src: electricDrillImage,
      unlocked: (ants.electricDrill || 0) > 0,
    },
    {
      id: 'dynamite',
      name: '発破掘削',
      src: dynamiteImage,
      unlocked: (ants.dynamite || 0) > 0,
    },
    {
      id: 'shieldMachine',
      name: 'シールドマシン',
      src: shieldMachineImage,
      unlocked: (ants.shieldMachine || 0) > 0,
    },
    {
      id: 'nuclearDrill',
      name: '原子力掘削',
      src: nuclearDrillImage,
      unlocked: (ants.nuclearDrill || 0) > 0,
    },
    {
      id: 'laserDrill',
      name: '収束レーザー',
      src: laserDrillImage,
      unlocked: (ants.laserDrill || 0) > 0,
    },
  ]
    .filter(unit => unit.unlocked)
    .sort((a, b) => {
      const aOrder = visualOrderMap.has(a.id) ? visualOrderMap.get(a.id) : Number.MAX_SAFE_INTEGER
      const bOrder = visualOrderMap.has(b.id) ? visualOrderMap.get(b.id) : Number.MAX_SAFE_INTEGER
      return bOrder - aOrder
    })
  const visibleCount = Math.max(1, visualUnits.length)
  const columnCount = visibleCount <= 2 ? 2 : visibleCount <= 6 ? 3 : 4
  const gapPx = 12

  return (
    <section className="flex-1 min-h-0 bg-[#f5ecda] p-6">
      <div className="mx-auto flex h-full max-w-5xl items-center justify-center">
        <div
          className="grid h-full w-full place-items-center content-start"
          style={{
            gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
            gap: `${gapPx}px`,
          }}
        >
          {visualUnits.map(unit => (
            <img
              key={unit.id}
              src={unit.src}
              alt={unit.name}
              className="h-auto object-contain"
              style={{ width: 'clamp(140px, 20vw, 240px)' }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
