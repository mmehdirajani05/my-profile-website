"use client";

import Link from "next/link";
import { ExternalLink, X } from "lucide-react";
import { useMemo, useState } from "react";

import {
  PROJECT_CATEGORIES,
  type Project,
  type ProjectCategory,
} from "@/lib/projects";
import { ProjectCard } from "@/components/portfolio/project-card";
import { MediaSlider } from "@/components/ui/media-slider";

type Filter = "All" | ProjectCategory;

const filters: Filter[] = ["All", ...PROJECT_CATEGORIES];

export function PortfolioExplorer({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const [selected, setSelected] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    if (filter === "All") {
      return projects;
    }

    return projects.filter((project) => project.category === filter);
  }, [filter, projects]);

  return (
    <>
      <div className="sticky top-16 z-30 -mx-5 border-y border-white/10 bg-slate-950/80 px-5 py-4 backdrop-blur-xl sm:-mx-8 sm:px-8">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                filter === item
                  ? "bg-white text-slate-950"
                  : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item}
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
        <div className="rounded-[2rem] border border-dashed border-white/15 bg-white/[0.03] px-8 py-16 text-center">
          <p className="text-lg font-semibold text-white">No projects yet.</p>
          <p className="mt-2 text-slate-400">
            Add portfolio work from the admin dashboard and it will appear here.
          </p>
        </div>
      )}

      {selected ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selected.title}
          className="fixed inset-0 z-[70] overflow-y-auto bg-slate-950/90 px-5 py-6 backdrop-blur-xl sm:px-8"
        >
          <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-slate-900 p-4 shadow-2xl shadow-black/60 sm:p-6">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
                  {selected.category}
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {selected.title}
                </h2>
              </div>
              <button
                type="button"
                aria-label="Close project"
                onClick={() => setSelected(null)}
                className="grid size-11 shrink-0 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              >
                <X size={18} />
              </button>
            </div>

            <MediaSlider urls={selected.media_urls} title={selected.title} />

            <div className="mt-6 grid gap-6 md:grid-cols-[1fr_auto] md:items-start">
              <p className="text-base leading-8 text-slate-300">
                {selected.description}
              </p>
              {selected.project_url ? (
                <Link
                  href={selected.project_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-blue-300"
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
