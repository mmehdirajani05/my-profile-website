"use client";

import Image from "next/image";
import { ArrowUpRight, ImageIcon, Play } from "lucide-react";

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
      className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] text-left shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-blue-400/60"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
        {preview ? (
          isVideoUrl(preview) ? (
            <>
              <video
                src={preview}
                muted
                loop
                playsInline
                preload="metadata"
                className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105"
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
              className="object-cover opacity-85 transition duration-500 group-hover:scale-105"
            />
          )
        ) : (
          <div className="grid h-full place-items-center text-slate-600">
            <ImageIcon size={40} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/15 to-transparent" />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6">
        <div className="mb-3 inline-flex rounded-full border border-blue-300/30 bg-blue-400/10 px-3 py-1 text-xs font-semibold text-blue-100">
          {project.category}
        </div>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-white">
              {project.title}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-300">
              {project.description}
            </p>
          </div>
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-slate-950 transition group-hover:bg-blue-300">
            <ArrowUpRight size={18} />
          </span>
        </div>
      </div>
    </button>
  );
}
