export const DEFAULT_PROJECT_CATEGORIES = [
  {
    id: "website",
    name: "WebSite",
    slug: "website",
  },
  {
    id: "mobile-app",
    name: "Mobile App",
    slug: "mobile-app",
  },
  {
    id: "automation",
    name: "Automation",
    slug: "automation",
  },
] as const;

export type ProjectCategory = {
  id: string;
  name: string;
  slug: string;
};

export type Project = {
  id: string;
  category_id: string | null;
  title: string;
  summary: string | null;
  description: string;
  category: string;
  category_slug: string;
  media_urls: string[];
  project_url: string | null;
  source_url?: string | null;
  featured?: boolean;
  sort_order?: number;
  created_at: string;
};

export type ProjectInsert = {
  title: string;
  summary?: string | null;
  description: string;
  category_id: string;
  project_url?: string | null;
  source_url?: string | null;
  featured?: boolean;
  sort_order?: number;
};

export type ProjectMediaInsert = {
  project_id: string;
  media_type: "image" | "video";
  path: string;
  public_url: string;
  alt_text?: string | null;
  sort_order: number;
};

export function isVideoUrl(url: string) {
  return /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url);
}

export function firstMediaUrl(project: Project) {
  return project.media_urls.find(Boolean) ?? null;
}

export function projectCategoriesFromProjects(projects: Project[]) {
  const categories = new Map<string, string>();

  for (const project of projects) {
    categories.set(project.category_slug, project.category);
  }

  return Array.from(categories, ([slug, name]) => ({ slug, name }));
}

export const DUMMY_PROJECTS: Project[] = [
  {
    id: "dummy-website-1",
    category_id: "website",
    title: "SaaS Analytics Website",
    summary: "Marketing site and dashboard preview for a data platform.",
    description:
      "A polished SaaS website concept with conversion-focused landing sections, product storytelling, responsive dashboard previews, and production-ready Next.js structure.",
    category: "WebSite",
    category_slug: "website",
    media_urls: ["/mehdi-portfolio-image.png"],
    project_url: "https://example.com",
    source_url: null,
    featured: true,
    sort_order: 1,
    created_at: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "dummy-mobile-1",
    category_id: "mobile-app",
    title: "Service Booking Mobile App",
    summary: "Mobile app flow for bookings, payments, and provider tracking.",
    description:
      "A mobile product case study covering onboarding, service discovery, booking management, payment states, and real-time status updates for customers and providers.",
    category: "Mobile App",
    category_slug: "mobile-app",
    media_urls: ["/mehdi-portfolio-image.png"],
    project_url: null,
    source_url: null,
    featured: false,
    sort_order: 2,
    created_at: "2026-01-02T00:00:00.000Z",
  },
  {
    id: "dummy-automation-1",
    category_id: "automation",
    title: "Lead Routing Automation",
    summary: "n8n workflow that qualifies leads and updates business tools.",
    description:
      "An automation workflow that captures web leads, validates data, enriches records, routes opportunities to the right owner, and sends follow-up notifications.",
    category: "Automation",
    category_slug: "automation",
    media_urls: ["/mehdi-portfolio-image.png"],
    project_url: null,
    source_url: null,
    featured: false,
    sort_order: 3,
    created_at: "2026-01-03T00:00:00.000Z",
  },
];
