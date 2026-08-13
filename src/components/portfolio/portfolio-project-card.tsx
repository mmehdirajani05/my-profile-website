"use client";

import { ExternalLink } from "lucide-react";

import { ComingSoonProjectCard } from "@/components/portfolio/coming-soon-project-card";
import { SectionMediaCarousel } from "@/components/portfolio/section-media-carousel";
import type { PortfolioProject, PortfolioSection } from "@/lib/portfolio-sections";

function ProjectDetails({
  project,
  section,
  compact = false,
}: {
  project: PortfolioProject;
  section: PortfolioSection;
  compact?: boolean;
}) {
  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <h3
          className={`font-bold tracking-tight text-slate-950 ${
            compact ? "text-lg" : "text-xl sm:text-2xl"
          }`}
        >
          {project.title}
        </h3>
        {project.projectUrl ? (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-black/10 px-2.5 py-1 text-[11px] font-semibold text-slate-700">
            Visit
            <ExternalLink size={11} />
          </span>
        ) : null}
      </div>
      {project.roleNote ? (
        <p
          className={`mt-2 font-semibold leading-6 ${
            compact ? "text-xs sm:text-sm" : "text-sm leading-7 sm:text-base"
          }`}
          style={{ color: section.accent }}
        >
          {project.roleNote}
        </p>
      ) : null}
      <p
        className={`mt-2 text-slate-600 ${
          compact
            ? "line-clamp-3 text-xs leading-6 sm:text-sm"
            : "text-sm leading-7 sm:text-base"
        }`}
      >
        {project.summary}
      </p>
    </>
  );
}

export function PortfolioProjectCard({
  project,
  section,
}: {
  project: PortfolioProject;
  section: PortfolioSection;
}) {
  if (project.comingSoon) {
    return <ComingSoonProjectCard section={section} />;
  }

  const openProject = () => {
    if (project.projectUrl) {
      window.open(project.projectUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!project.projectUrl) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProject();
    }
  };

  const isCompactMobile = Boolean(project.mobileScreens);

  const cardClassName = `w-full rounded-[1.75rem] border border-black/10 bg-white/60 shadow-lg shadow-black/[0.03] ${
    isCompactMobile ? "p-4 sm:p-5" : "rounded-[2rem] p-5 sm:p-6"
  } ${
    project.projectUrl
      ? "cursor-pointer transition hover:-translate-y-0.5 hover:border-black/20 hover:shadow-xl hover:shadow-black/[0.06]"
      : ""
  }`;

  const carousel = (
    <SectionMediaCarousel
      key={project.id}
      projectId={project.id}
      slides={project.slides}
      title={project.title}
      accent={section.accent}
      fullPageCaptures={project.fullPageCaptures}
      mobileScreens={project.mobileScreens}
      compactMobile={isCompactMobile}
      visitUrl={project.projectUrl}
    />
  );

  if (isCompactMobile) {
    return (
      <div
        role={project.projectUrl ? "link" : undefined}
        tabIndex={project.projectUrl ? 0 : undefined}
        onClick={openProject}
        onKeyDown={handleKeyDown}
        className={cardClassName}
      >
        <div className="mb-4">
          <ProjectDetails project={project} section={section} compact />
        </div>
        <div className="flex justify-center">{carousel}</div>
      </div>
    );
  }

  return (
    <div
      role={project.projectUrl ? "link" : undefined}
      tabIndex={project.projectUrl ? 0 : undefined}
      onClick={openProject}
      onKeyDown={handleKeyDown}
      className={cardClassName}
    >
      <div className="mb-5">
        <ProjectDetails project={project} section={section} />
      </div>
      <div className="w-full">{carousel}</div>
    </div>
  );
}
