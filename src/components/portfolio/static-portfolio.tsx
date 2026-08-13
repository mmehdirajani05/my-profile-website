import { PortfolioProjectCard } from "@/components/portfolio/portfolio-project-card";
import type { PortfolioSection } from "@/lib/portfolio-sections";
import { PORTFOLIO_SECTIONS } from "@/lib/portfolio-sections";

function sectionGridClass(section: PortfolioSection) {
  const hasMobileGrid = section.projects.some((project) => project.mobileScreens);

  if (hasMobileGrid) {
    return "grid gap-6 md:grid-cols-2 xl:grid-cols-3 lg:gap-6";
  }

  if (section.projects.length >= 3) {
    return "grid gap-10 md:grid-cols-2 xl:grid-cols-3 lg:gap-8";
  }

  return "grid gap-10 lg:grid-cols-2 lg:gap-8";
}

export function StaticPortfolio() {
  return (
    <div className="space-y-24 lg:space-y-32">
      {PORTFOLIO_SECTIONS.map((section, index) => (
        <article key={section.id} id={section.id} className="scroll-mt-28">
          <div className="mb-10 flex flex-col gap-4 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p
                className="font-mono text-xs font-semibold uppercase tracking-[0.26em]"
                style={{ color: section.accent }}
              >
                {String(index + 1).padStart(2, "0")} · {section.eyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
                {section.title}
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-slate-600 lg:text-right">
              {section.description}
            </p>
          </div>

          <div className={sectionGridClass(section)}>
            {section.projects.map((project) => (
              <PortfolioProjectCard
                key={project.id}
                project={project}
                section={section}
              />
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
