import type { Metadata } from "next";
import { LockKeyhole } from "lucide-react";

import { loginAction } from "@/app/admin/actions";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: {
    index: false,
    follow: false,
  },
};

type LoginPageProps = {
  searchParams?: Promise<{
    error?: string;
  }>;
};

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const hasError = params?.error === "1";

  return (
    <main className="grid min-h-screen place-items-center bg-slate-950 px-5 py-16 text-white">
      <section className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-black/30">
        <div className="grid size-12 place-items-center rounded-2xl bg-blue-400 text-slate-950">
          <LockKeyhole size={22} />
        </div>
        <h1 className="mt-6 text-3xl font-black tracking-tight">
          Admin dashboard
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          Enter the password from `ADMIN_PASSWORD` to manage portfolio projects.
        </p>

        <form action={loginAction} className="mt-8 grid gap-4">
          <label className="grid gap-2">
            <span className="admin-label">Password</span>
            <input
              name="password"
              type="password"
              required
              className="admin-input"
              placeholder="Enter admin password"
            />
          </label>
          {hasError ? (
            <p className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">
              Invalid password. Please try again.
            </p>
          ) : null}
          <button
            type="submit"
            className="rounded-full bg-blue-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-blue-300"
          >
            Sign in
          </button>
        </form>
      </section>
    </main>
  );
}
