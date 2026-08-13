import type { PortfolioSection } from "@/lib/portfolio-sections";

type ComingSoonProjectCardProps = {
  section: PortfolioSection;
};

export function ComingSoonProjectCard({ section }: ComingSoonProjectCardProps) {
  return (
    <div className="flex min-h-full w-full flex-col rounded-[2rem] border border-dashed border-black/15 bg-white/60 p-5 shadow-lg shadow-black/[0.03] sm:p-6">
      <div className="mb-5">
        <h3 className="text-xl font-bold tracking-tight text-slate-400 sm:text-2xl">
          Coming soon
        </h3>
        <p className="mt-2 text-sm leading-7 text-slate-400 sm:text-base">
          Another AI automation project is on the way.
        </p>
      </div>
      <div
        className="relative flex aspect-[16/10] min-h-[360px] w-full items-center justify-center overflow-hidden rounded-[2rem] border border-dashed border-black/10 sm:min-h-[440px] lg:min-h-[520px]"
        style={{
          background: `radial-gradient(circle at 20% 20%, ${section.accent}12, transparent 45%), linear-gradient(180deg, #f8f7f5 0%, #f2f0ed 100%)`,
        }}
      >
        <p
          className="px-6 text-center text-lg font-semibold tracking-tight text-slate-600 sm:text-xl"
          style={{ color: section.accent }}
        >
          Guess what is coming soon
        </p>
      </div>
    </div>
  );
}
