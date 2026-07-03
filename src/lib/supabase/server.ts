import { createClient } from "@supabase/supabase-js";

import {
  DEFAULT_PROJECT_CATEGORIES,
  DUMMY_PROJECTS,
  type Project,
  type ProjectCategory,
} from "@/lib/projects";

export function createSupabaseServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return null;
  }

  return createClient(url, anonKey, {
    auth: {
      persistSession: false,
    },
  });
}

export async function getProjects(): Promise<Project[]> {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return DUMMY_PROJECTS;
  }

  const { data, error } = await supabase
    .from("portfolio_projects")
    .select(
      `
        id,
        category_id,
        title,
        summary,
        description,
        project_url,
        source_url,
        featured,
        sort_order,
        created_at,
        category:portfolio_categories(name, slug),
        media:portfolio_project_media(public_url, sort_order)
      `,
    )
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch projects", error);
    return DUMMY_PROJECTS;
  }

  const projects = (data ?? []).map((project) => {
    const category = Array.isArray(project.category)
      ? project.category[0]
      : project.category;
    const media = Array.isArray(project.media) ? project.media : [];

    return {
      id: project.id,
      category_id: project.category_id,
      title: project.title,
      summary: project.summary,
      description: project.description,
      category: category?.name ?? "Uncategorized",
      category_slug: category?.slug ?? "uncategorized",
      media_urls: media
        .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
        .map((item) => item.public_url)
        .filter(Boolean),
      project_url: project.project_url,
      source_url: project.source_url,
      featured: project.featured,
      sort_order: project.sort_order,
      created_at: project.created_at,
    } satisfies Project;
  });

  return projects.length ? projects : DUMMY_PROJECTS;
}

export async function getProjectCategories(): Promise<ProjectCategory[]> {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return [...DEFAULT_PROJECT_CATEGORIES];
  }

  const { data, error } = await supabase
    .from("portfolio_categories")
    .select("id,name,slug")
    .eq("is_active", true)
    .order("display_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) {
    console.error("Failed to fetch project categories", error);
    return [...DEFAULT_PROJECT_CATEGORIES];
  }

  return data?.length ? data : [...DEFAULT_PROJECT_CATEGORIES];
}
