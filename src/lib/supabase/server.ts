import { createClient } from "@supabase/supabase-js";

import type { Project } from "@/lib/projects";

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
    return [];
  }

  const { data, error } = await supabase
    .from("projects")
    .select("id,title,description,category,media_urls,project_url,created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch projects", error);
    return [];
  }

  return (data ?? []) as Project[];
}
