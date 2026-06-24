import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";

import { logoutAction } from "@/app/admin/actions";
import { ProjectForm } from "@/components/admin/project-form";
import { ProjectList } from "@/components/admin/project-list";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getProjects } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const projects = await getProjects();

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-10 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.26em] text-blue-300">
              {"// "}Admin
            </p>
            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              Portfolio dashboard
            </h1>
            <p className="mt-3 max-w-2xl text-slate-400">
              Create, update, and delete portfolio projects. Media files upload
              directly into the configured Supabase Storage bucket.
            </p>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-white/10"
            >
              <LogOut size={16} />
              Logout
            </button>
          </form>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-xl font-bold">Add a project</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Use a concise title, a story-led description, and one or more
              images/videos for the slider.
            </p>
            <div className="mt-6">
              <ProjectForm />
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 className="text-xl font-bold">Existing projects</h2>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-300">
                {projects.length} total
              </span>
            </div>
            <ProjectList projects={projects} />
          </section>
        </div>
      </div>
    </main>
  );
}
