import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PortfolioExplorer } from "@/components/portfolio/portfolio-explorer";
import { getProjects } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const projects = await getProjects();

  return {
    title: "Portfolio Projects",
    description: `Explore ${projects.length} selected JavaScript, React, Angular, Vue, Node.js, mobile app, Firebase, AI bot, and workflow automation projects by Muhammad Mehdi Rajani.`,
    alternates: {
      canonical: "/portfolio",
    },
    keywords: [
      "Muhammad Mehdi Rajani portfolio",
      "JavaScript projects",
      "React projects",
      "Angular projects",
      "Vue projects",
      "Node.js projects",
      "Firebase projects",
      "AI automation projects",
      "Mobile app projects",
      "Workflow automation portfolio",
    ],
    openGraph: {
      title: "Portfolio | Muhammad Mehdi Rajani",
      description:
        "Selected project work across JavaScript, web apps, mobile apps, AI bots, Firebase, and automation workflows.",
      url: "/portfolio",
      type: "website",
      images: [
        {
          url: "/mehdi-portfolio-image.png",
          width: 1024,
          height: 526,
          alt: "Portfolio projects by Muhammad Mehdi Rajani",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Portfolio | Muhammad Mehdi Rajani",
      description:
        "JavaScript, React, Angular, Vue, Node.js, Firebase, mobile app, AI bot, and workflow automation projects.",
      images: ["/mehdi-portfolio-image.png"],
    },
  };
}

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <main className="min-h-screen overflow-hidden bg-[#f2f0ed] text-slate-950">
      <section className="relative px-5 py-20 sm:px-8 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(26,110,255,0.16),transparent_28%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.85),transparent_30%)]" />
        <div className="relative mx-auto max-w-7xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.26em] text-[#1a6eff]">
            {"// "}Portfolio
          </p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_0.55fr] lg:items-end">
            <div>
              <h1 className="max-w-4xl text-5xl font-black tracking-[-0.06em] sm:text-7xl">
                Work that looks sharp and runs clean.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                A dynamic project archive powered by Supabase, filtered by
                category, and designed for rich image/video walkthroughs.
              </p>
            </div>
            <div className="rounded-[2rem] border border-black/10 bg-white/70 p-6 shadow-xl shadow-black/[0.04]">
              <p className="text-sm leading-6 text-slate-600">
                Need the full CV context first?
              </p>
              <Link
                href="/"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#1a6eff] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0f52cc]"
              >
                Back to resume
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <PortfolioExplorer projects={projects} />
        </div>
      </section>
    </main>
  );
}
