import type { Metadata } from "next";

import { ResumePage } from "@/components/resume/resume-page";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mehdirajani.com";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title:
    "Software Engineer for JavaScript, Angular, React, Vue, Node, Firebase & AI Automation",
  description:
    "Hire Muhammad Mehdi Rajani, a software engineer with 9+ years of experience in JavaScript, Angular, React, Vue, Node.js, Firebase, mobile/web apps, AI bots, and workflow automation.",
  alternates: {
    canonical: "/",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Muhammad Mehdi Rajani",
      url: siteUrl,
      image: `${siteUrl}/mehdi-portfolio-image.png`,
      jobTitle: [
        "Software Engineer",
        "Senior Software Engineer",
        "Frontend Engineer",
        "Automation Engineer",
      ],
      description:
        "Software engineer experienced in JavaScript, Angular, React, Vue, Node.js, Firebase, AI bots, workflow automations, and scalable web/mobile applications.",
      email: "mailto:mehdi.devofficial@gmail.com",
      telephone: "+923343450462",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Karachi",
        addressCountry: "PK",
      },
      sameAs: [
        "https://www.linkedin.com/in/muhammad-mehdi-rajani/",
        "https://github.com/mmehdirajani05",
        "https://wa.me/923343450462",
      ],
      knowsAbout: [
        "JavaScript",
        "TypeScript",
        "Angular",
        "React",
        "Vue.js",
        "Next.js",
        "Node.js",
        "Firebase",
        "React Native",
        "AI Bots",
        "Workflow Automation",
        "n8n",
        "Frontend Architecture",
        "Mobile App Development",
        "Web Application Development",
      ],
      alumniOf: [
        {
          "@type": "CollegeOrUniversity",
          name: "NED University of Engineering & Technology",
        },
        {
          "@type": "CollegeOrUniversity",
          name: "National University of Computer & Emerging Sciences (FAST)",
        },
      ],
      worksFor: {
        "@type": "Organization",
        name: "Independent / Freelance",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Muhammad Mehdi Rajani Portfolio",
      description:
        "Resume and portfolio for Muhammad Mehdi Rajani, software engineer and AI automation engineer.",
      publisher: {
        "@id": `${siteUrl}/#person`,
      },
      inLanguage: "en",
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profile`,
      url: siteUrl,
      name: "Muhammad Mehdi Rajani - Software Engineer",
      about: {
        "@id": `${siteUrl}/#person`,
      },
      isPartOf: {
        "@id": `${siteUrl}/#website`,
      },
      inLanguage: "en",
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ResumePage />
    </>
  );
}
