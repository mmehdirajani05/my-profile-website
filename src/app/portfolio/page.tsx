import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { StaticPortfolio } from "@/components/portfolio/static-portfolio";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Portfolio Projects",
  description:
    "Selected work across AI automation, Angular/React/Vue web apps, mobile applications, and WordPress projects by Muhammad Mehdi Rajani.",
  alternates: {
    canonical: "/portfolio",
  },
  keywords: [
    "Muhammad Mehdi Rajani portfolio",
    "AI automation projects",
    "Angular projects",
    "React projects",
    "Vue projects",
    "Mobile app projects",
    "WordPress projects",
    "Workflow automation portfolio",
  ],
  openGraph: {
    title: "Portfolio | Muhammad Mehdi Rajani",
    description:
      "Project showcase across AI automation, web frameworks, mobile apps, and WordPress.",
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
      "AI automation, Angular/React/Vue, mobile app, and WordPress project showcase.",
    images: ["/mehdi-portfolio-image.png"],
  },
};

const sectionNav = [
  { id: "ai-automation", label: "AI Automation" },
  { id: "web-frameworks", label: "Web Apps" },
  { id: "mobile-apps", label: "Mobile" },
  { id: "wordpress", label: "WordPress" },
];

export default function PortfolioPage() {
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
                A curated showcase of AI automation, web apps, mobile products,
                and WordPress builds — each section with sliding media
                walkthroughs.
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

      <section className="sticky top-16 z-30 border-y border-black/10 bg-[#f2f0ed]/85 px-5 py-4 backdrop-blur-xl sm:px-8">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto">
          {sectionNav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="shrink-0 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-[#1a6eff]/40 hover:text-[#1a6eff]"
            >
              {item.label}
            </a>
          ))}
        </div>
      </section>

      <section className="px-5 pb-24 pt-16 sm:px-8 lg:pt-20">
        <div className="mx-auto max-w-7xl">
          <StaticPortfolio />
        </div>
      </section>
    </main>
  );
}
