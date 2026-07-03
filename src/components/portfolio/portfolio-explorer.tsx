"use client";

import Link from "next/link";
import { ExternalLink, X } from "lucide-react";
import { useMemo, useState } from "react";

import { projectCategoriesFromProjects, type Project } from "@/lib/projects";
import { ProjectCard } from "@/components/portfolio/project-card";
import { MediaSlider } from "@/components/ui/media-slider";

type Filter = "all" | string;

export function PortfolioExplorer({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<Project | null>(null);
  const categories = useMemo(() => projectCategoriesFromProjects(projects), [projects]);

  const filteredProjects = useMemo(() => {
    if (filter === "all") {
      return projects;
    }

    return projects.filter((project) => project.category_slug === filter);
  }, [filter, projects]);

  return (
    <>
      <div className="sticky top-16 z-30 -mx-5 border-y border-black/10 bg-[#f2f0ed]/85 px-5 py-4 backdrop-blur-xl sm:-mx-8 sm:px-8">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto">
          {[{ slug: "all", name: "All" }, ...categories].map((item) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => setFilter(item.slug)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                filter === item.slug
                  ? "border-[#1a6eff] bg-[#1a6eff] text-white"
                  : "border-black/10 bg-white/70 text-slate-700 hover:border-[#1a6eff]/40 hover:text-[#1a6eff]"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {filteredProjects.length ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={index % 5 === 0 ? "md:col-span-2 xl:col-span-2" : ""}
            >
              <ProjectCard project={project} onOpen={setSelected} />
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-[2rem] border border-dashed border-black/15 bg-white/60 px-8 py-16 text-center">
          <p className="text-lg font-semibold text-slate-950">No projects yet.</p>
          <p className="mt-2 text-slate-600">
            Add portfolio work from the admin dashboard and it will appear here.
          </p>
        </div>
      )}

      {selected ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selected.title}
          className="fixed inset-0 z-[70] overflow-y-auto bg-slate-950/55 px-5 py-6 backdrop-blur-xl sm:px-8"
        >
          <div className="mx-auto max-w-5xl rounded-[2rem] border border-black/10 bg-[#f8f6f2] p-4 shadow-2xl shadow-black/30 sm:p-6">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#1a6eff]">
                  {selected.category}
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                  {selected.title}
                </h2>
              </div>
              <button
                type="button"
                aria-label="Close project"
                onClick={() => setSelected(null)}
                className="grid size-11 shrink-0 place-items-center rounded-full bg-slate-950 text-white transition hover:bg-[#1a6eff]"
              >
                <X size={18} />
              </button>
            </div>

            <MediaSlider urls={selected.media_urls} title={selected.title} />

            <div className="mt-6 grid gap-6 md:grid-cols-[1fr_auto] md:items-start">
              <p className="text-base leading-8 text-slate-700">
                {selected.description}
              </p>
              {selected.project_url ? (
                <Link
                  href={selected.project_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1a6eff] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0f52cc]"
                >
                  Visit project
                  <ExternalLink size={16} />
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
