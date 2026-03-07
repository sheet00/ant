import miningAntImage from '../assets/採掘アリ.png'
import foragerAntImage from '../assets/餌アリ.png'

export default function ColonyPanel() {
  return (
    <section className="flex-1 bg-[#f5ecda] p-6">
      <div className="mx-auto flex h-full max-w-5xl items-center justify-center">
        <div className="flex h-full w-full max-h-[720px] items-center justify-center rounded-[2rem] border border-stone-200 bg-[rgba(255,252,245,0.85)] p-8 shadow-[0_24px_60px_rgba(120,84,43,0.10)] backdrop-blur-sm">
          <div className="flex w-full flex-wrap items-center justify-center gap-8 lg:gap-12">
            <img
              src={miningAntImage}
              alt="採掘アリ"
              className="max-h-[320px] max-w-[42%] min-w-[220px] object-contain"
            />
            <img
              src={foragerAntImage}
              alt="餌アリ"
              className="max-h-[320px] max-w-[42%] min-w-[220px] object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
