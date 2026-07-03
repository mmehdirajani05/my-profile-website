import Link from "next/link";

const showPortfolio = process.env.NEXT_PUBLIC_SHOW_PORTFOLIO === "true";

const navItems = [
  {
    label: "About",
    href: "/#about",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
        <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
      </svg>
    ),
  },
  {
    label: "Experience",
    href: "/#experience",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
        <path d="M4 8h16v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8Z" />
        <path d="M9 13h6" />
      </svg>
    ),
  },
  {
    label: "Skills",
    href: "/#skills",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m8 9-4 3 4 3" />
        <path d="m16 9 4 3-4 3" />
        <path d="m14 5-4 14" />
      </svg>
    ),
  },
  {
    label: "Education",
    href: "/#education",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m3 8 9-4 9 4-9 4-9-4Z" />
        <path d="M7 10.2V15c0 1.7 2.2 3 5 3s5-1.3 5-3v-4.8" />
      </svg>
    ),
  },
  ...(showPortfolio
    ? [
        {
          label: "Portfolio",
          href: "/portfolio",
          icon: (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 5h16v14H4V5Z" />
              <path d="M8 9h8" />
              <path d="M8 13h5" />
            </svg>
          ),
        },
      ]
    : []),
];

export function Navbar() {
  return (
    <header className="cv-header">
      <div className="wrap nav">
        <Link href="/" className="brand">
          <span className="mark">MM</span>
          <span>Muhammad Mehdi</span>
        </Link>

        <nav className="nav-links" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
          <Link href="mailto:mehdi.nedian@gmail.com" className="nav-cta">
            Get in touch
          </Link>
        </nav>
      </div>
    </header>
  );
}
