export const PROJECT_CATEGORIES = [
  "WebSite",
  "Mobile App",
  "AI Bot / Automation / Workflow",
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export type Project = {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  media_urls: string[];
  project_url: string | null;
  created_at: string;
};

export type ProjectInsert = {
  title: string;
  description: string;
  category: ProjectCategory;
  media_urls: string[];
  project_url?: string | null;
};

export function isProjectCategory(value: string): value is ProjectCategory {
  return PROJECT_CATEGORIES.includes(value as ProjectCategory);
}

export function isVideoUrl(url: string) {
  return /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url);
}

export function firstMediaUrl(project: Project) {
  return project.media_urls.find(Boolean) ?? null;
}
