import Link from "next/link";
import { ExternalLink, Trash2 } from "lucide-react";

import { deleteProjectAction } from "@/app/admin/actions";
import { ProjectForm } from "@/components/admin/project-form";
import type { Project, ProjectCategory } from "@/lib/projects";

export function ProjectList({
  projects,
  categories,
}: {
  projects: Project[];
  categories: ProjectCategory[];
}) {
  if (!projects.length) {
    return (
      <div className="rounded-3xl border border-dashed border-white/15 bg-white/[0.03] p-8 text-center text-slate-400">
        No projects yet. Create the first one from the form.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <details
          key={project.id}
          className="group rounded-3xl border border-white/10 bg-white/[0.04] p-5"
        >
          <summary className="flex cursor-pointer list-none flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                <span className="rounded-full bg-blue-400/10 px-3 py-1 text-xs font-semibold text-blue-200">
                  {project.category}
                </span>
              </div>
              <p className="mt-2 line-clamp-1 text-sm text-slate-400">
                {project.description}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {project.project_url ? (
                <Link
                  href={project.project_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid size-10 place-items-center rounded-full bg-white/10 text-slate-200 hover:bg-white/20"
                >
                  <ExternalLink size={16} />
                </Link>
              ) : null}
              <form action={deleteProjectAction}>
                <input type="hidden" name="id" value={project.id} />
                <button
                  type="submit"
                  className="grid size-10 place-items-center rounded-full bg-red-500/10 text-red-200 hover:bg-red-500/20"
                  aria-label={`Delete ${project.title}`}
                >
                  <Trash2 size={16} />
                </button>
              </form>
            </div>
          </summary>
          <div className="mt-6 border-t border-white/10 pt-6">
            <ProjectForm project={project} categories={categories} />
          </div>
        </details>
      ))}
    </div>
  );
}
