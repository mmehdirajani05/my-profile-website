export type PortfolioSlide = {
  id: string;
  type: "placeholder" | "image" | "video";
  src?: string;
  label: string;
};

export type PortfolioProject = {
  id: string;
  title: string;
  summary: string;
  slides: PortfolioSlide[];
  projectUrl?: string;
  fullPageCaptures?: boolean;
  mobileScreens?: boolean;
  roleNote?: string;
  comingSoon?: boolean;
};

export type PortfolioSection = {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  accent: string;
  projects: PortfolioProject[];
};

const placeholderSlides = (
  projectId: string,
  labels: string[],
): PortfolioSlide[] =>
  labels.map((label, index) => ({
    id: `${projectId}-slide-${index + 1}`,
    type: "placeholder",
    label,
  }));

const imageSlides = (
  projectId: string,
  items: { src: string; label: string }[],
): PortfolioSlide[] =>
  items.map((item, index) => ({
    id: `${projectId}-slide-${index + 1}`,
    type: "image",
    src: item.src,
    label: item.label,
  }));

const videoSlides = (
  projectId: string,
  items: { src: string; label: string }[],
): PortfolioSlide[] =>
  items.map((item, index) => ({
    id: `${projectId}-slide-${index + 1}`,
    type: "video",
    src: item.src,
    label: item.label,
  }));

export const PORTFOLIO_SECTIONS: PortfolioSection[] = [
  {
    id: "ai-automation",
    title: "AI Automation",
    eyebrow: "Workflows & AI bots",
    description:
      "n8n pipelines, AI agents, and business automations. Each project below can hold its own image or video walkthrough.",
    accent: "#1a6eff",
    projects: [
      {
        id: "ai-real-estate-bot",
        title: "Real Estate Bot",
        summary:
          "AI automation bot for real estate workflows — lead handling, property inquiries, and follow-up orchestration.",
        slides: videoSlides("ai-real-estate-bot", [
          {
            src: "/portfolio/automation/realestatebot.mp4",
            label: "Real estate bot demo",
          },
        ]),
      },
      {
        id: "ai-food-ordering-assistant",
        title: "Food Ordering Assistant",
        summary:
          "AI assistant that guides customers through food ordering, menu questions, and order confirmation flows.",
        slides: videoSlides("ai-food-ordering-assistant", [
          {
            src: "/portfolio/automation/foodorderingbot.mp4",
            label: "Food ordering assistant demo",
          },
        ]),
      },
      {
        id: "ai-automation-slot-3",
        title: "Coming soon",
        summary: "Another AI automation project is on the way.",
        comingSoon: true,
        slides: [],
      },
    ],
  },
  {
    id: "web-frameworks",
    title: "Angular / React / Vue",
    eyebrow: "Web applications",
    description:
      "SPA and full-stack web apps across Angular, React, Vue, and Next.js.",
    accent: "#7c3aed",
    projects: [
      {
        id: "web-securiti",
        title: "Securiti.ai",
        summary:
          "Enterprise DataAI command platform for data security, AI governance, privacy, and compliance across hybrid multicloud.",
        roleNote: "Worked as Lead Software Engineer for 4 years.",
        projectUrl: "https://securiti.ai/",
        fullPageCaptures: true,
        slides: imageSlides("web-securiti", [
          {
            src: "/showcase/web/securiti-home.png",
            label: "Homepage",
          },
        ]),
      },
      {
        id: "web-icplan",
        title: "ICPlan",
        summary:
          "Enterprise planning and communications workspace built with Angular for folders, plans, calendars, and team workflows.",
        roleNote: "Built with Angular.",
        fullPageCaptures: true,
        slides: imageSlides("web-icplan", [
          {
            src: "/showcase/web/icplan-home.jpg",
            label: "Plans & communications",
          },
          {
            src: "/showcase/web/icplan-workspace.jpg",
            label: "Workspace folders",
          },
          {
            src: "/showcase/web/icplan-calendar.jpg",
            label: "Master calendar",
          },
        ]),
      },
      {
        id: "web-personal-portfolio",
        title: "Personal Portfolio",
        summary:
          "This portfolio website — resume, project showcase, and contact hub for freelance and senior engineering roles.",
        roleNote: "This portfolio is on Next.js.",
        projectUrl: "https://muhammadmehdi.dev/",
        fullPageCaptures: true,
        slides: imageSlides("web-personal-portfolio", [
          {
            src: "/showcase/web/portfolio-site-home.jpg",
            label: "Homepage",
          },
        ]),
      },
    ],
  },
  {
    id: "mobile-apps",
    title: "Mobile Apps",
    eyebrow: "iOS & Android",
    description:
      "Cross-platform mobile apps for healthcare, booking, and real-time user experiences.",
    accent: "#059669",
    projects: [
      {
        id: "mobile-estenarh",
        title: "Estenarh",
        summary:
          "Ministry of Health licensed app for online therapy, medical consultations, and family health support in Arabic and English.",
        projectUrl: "https://estenarh.com/en",
        roleNote: "Work as software developer on this project",
        mobileScreens: true,
        slides: imageSlides("mobile-estenarh", [
          {
            src: "/portfolio/mobile/estenarh-screen-1.png",
            label: "Splash screen",
          },
          {
            src: "/portfolio/mobile/estenarh-screen-2.png",
            label: "Home screen",
          },
          {
            src: "/portfolio/mobile/estenarh-screen-3.png",
            label: "Consultation flow",
          },
          {
            src: "/portfolio/mobile/estenarh-screen-4.png",
            label: "Booking screen",
          },
        ]),
      },
      {
        id: "mobile-medcare",
        title: "MedCare Telehealth",
        summary:
          "Telehealth mobile app for booking appointments, virtual care, and patient services with HIPAA-compliant workflows.",
        mobileScreens: true,
        slides: imageSlides("mobile-medcare", [
          {
            src: "/portfolio/mobile/medcare2.png",
            label: "Splash screen",
          },
          {
            src: "/portfolio/mobile/medcare4.png",
            label: "Home screen",
          },
          {
            src: "/portfolio/mobile/medcare1.png",
            label: "Book appointment",
          },
          {
            src: "/portfolio/mobile/medcare3.png",
            label: "App menu",
          },
        ]),
      },
    ],
  },
  {
    id: "wordpress",
    title: "WordPress",
    eyebrow: "Sites & themes",
    description:
      "Custom WordPress themes and marketing sites built for performance, lead generation, and SEO.",
    accent: "#d97706",
    projects: [
      {
        id: "wp-seven-star-securities",
        title: "Seven Star Securities",
        summary:
          "Financial services website with investor resources, trading platforms, and market insights.",
        projectUrl: "https://sevenstarsec.com/",
        fullPageCaptures: true,
        slides: imageSlides("wp-seven-star-securities", [
          {
            src: "/portfolio/wordpress/sevenstar-home.png",
            label: "Homepage",
          },
          {
            src: "/portfolio/wordpress/sevenstar-about.png",
            label: "About page",
          },
        ]),
      },
      {
        id: "wp-mars-growth",
        title: "Mars Growth System",
        summary:
          "YouTube growth agency site with service plans, creator testimonials, and portfolio showcase.",
        projectUrl: "https://marsgrowthsystem.com/",
        fullPageCaptures: true,
        slides: imageSlides("wp-mars-growth", [
          {
            src: "/portfolio/wordpress/mars-home.png",
            label: "Homepage",
          },
          {
            src: "/portfolio/wordpress/mars-about.png",
            label: "About page",
          },
        ]),
      },
      {
        id: "wp-textured-lab",
        title: "Textured Lab",
        summary:
          "Animation and design studio site with service pages, project galleries, and lead capture.",
        projectUrl: "https://texturedlab.com/",
        fullPageCaptures: true,
        slides: imageSlides("wp-textured-lab", [
          {
            src: "/portfolio/wordpress/texturedlab-home.png",
            label: "Homepage",
          },
          {
            src: "/portfolio/wordpress/texturedlab-about.png",
            label: "About page",
          },
        ]),
      },
    ],
  },
];
