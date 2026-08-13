"use client";

import Image from "next/image";
import { ArrowUpRight, ImageIcon, Play } from "lucide-react";

import { HydrationSafeVideo } from "@/components/ui/hydration-safe-video";
import { firstMediaUrl, isVideoUrl, type Project } from "@/lib/projects";

type ProjectCardProps = {
  project: Project;
  onOpen: (project: Project) => void;
};

export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const preview = firstMediaUrl(project);

  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      className="group relative overflow-hidden rounded-[2rem] border border-black/10 bg-white text-left shadow-xl shadow-black/[0.06] transition duration-300 hover:-translate-y-1 hover:border-[#1a6eff]/50 hover:shadow-2xl hover:shadow-black/[0.08]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">
        {preview ? (
          isVideoUrl(preview) ? (
            <>
              <HydrationSafeVideo
                src={preview}
                muted
                loop
                playsInline
                preload="metadata"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                placeholderClassName="h-full w-full"
              />
              <span className="absolute left-5 top-5 grid size-11 place-items-center rounded-full bg-black/50 text-white backdrop-blur">
                <Play size={17} fill="currentColor" />
              </span>
            </>
          ) : (
            <Image
              src={preview}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          )
        ) : (
          <div className="grid h-full place-items-center text-slate-600">
            <ImageIcon size={40} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/88 via-slate-950/10 to-transparent" />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6">
        <div className="mb-3 inline-flex rounded-full border border-white/25 bg-white/90 px-3 py-1 text-xs font-semibold text-[#1a6eff] shadow-sm">
          {project.category}
        </div>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-white">
              {project.title}
            </h3>
            <span className="mt-2 line-clamp-2 block text-sm leading-6 text-slate-300">
              {project.summary ?? project.description}
            </span>
          </div>
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-slate-950 transition group-hover:bg-[#1a6eff] group-hover:text-white">
            <ArrowUpRight size={18} />
          </span>
        </div>
      </div>
    </button>
  );
}
