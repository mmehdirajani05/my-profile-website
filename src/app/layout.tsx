import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";

import { Navbar } from "@/components/navigation/navbar";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mehdirajani.com";
const siteTitle =
  "Muhammad Mehdi Rajani | Software Engineer, AI Automation Engineer";
const siteDescription =
  "Muhammad Mehdi Rajani is a software engineer experienced in JavaScript, Angular, React, Vue, Node.js, Firebase, AI bots, workflow automations, and scalable web/mobile apps.";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Muhammad Mehdi Rajani Portfolio",
  authors: [{ name: "Muhammad Mehdi Rajani", url: siteUrl }],
  creator: "Muhammad Mehdi Rajani",
  publisher: "Muhammad Mehdi Rajani",
  category: "Software Engineering Portfolio",
  title: {
    default: siteTitle,
    template: "%s | Muhammad Mehdi Rajani",
  },
  description: siteDescription,
  keywords: [
    "Muhammad Mehdi Rajani",
    "Mehdi Rajani",
    "Software Engineer",
    "Senior Software Engineer",
    "Frontend Engineer",
    "Automation Engineer",
    "JavaScript Developer",
    "TypeScript Developer",
    "Angular Developer",
    "React Developer",
    "Vue Developer",
    "Node.js Developer",
    "Firebase Developer",
    "AI Automation Engineer",
    "AI Bots",
    "Workflow Automation",
    "n8n Automation",
    "Web App Developer",
    "Mobile App Developer",
    "Karachi Software Engineer",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icon.svg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "/",
    siteName: "Muhammad Mehdi Rajani",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/mehdi-portfolio-image.png",
        width: 1024,
        height: 526,
        alt: "Muhammad Mehdi Rajani - Software Engineer and AI Automation Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/mehdi-portfolio-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
