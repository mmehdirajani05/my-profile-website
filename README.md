# Mehdi Portfolio Website

A component-based portfolio and admin dashboard built with Next.js App Router,
Tailwind CSS, TypeScript, Supabase, and Lucide icons.

## Directory Structure

```txt
src/
  app/
    admin/
      actions.ts
      login/page.tsx
      page.tsx
    portfolio/page.tsx
    globals.css
    layout.tsx
    page.tsx
  components/
    admin/
    navigation/
    portfolio/
    resume/
    ui/
  lib/
    supabase/
    admin-auth.ts
    projects.ts
supabase/schema.sql
```

## Setup

1. Copy `.env.example` to `.env.local` and fill in Supabase values.
2. Run `supabase/schema.sql` in the Supabase SQL editor.
3. Start the app:

```bash
npm run dev
```

## Routes

- `/` renders the CV/resume landing page.
- `/portfolio` server-renders Supabase projects and provides client-side filters.
- `/admin` is protected by `ADMIN_PASSWORD` and manages project CRUD plus media uploads.

## Supabase Notes

Public visitors use the anon key to read `projects`. Admin mutations use the
server-only service role key through Server Actions. The default media bucket is
`project-media`, configurable with `SUPABASE_PROJECT_MEDIA_BUCKET`.

Never expose `SUPABASE_SERVICE_ROLE_KEY` to the browser.

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
