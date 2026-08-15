import Image from "next/image";

const stats = [
  ["9", "+", "Years building"],
  ["16", "+", "Apps shipped"],
  ["5", "", "Frameworks led"],
  ["3", "", "Teams managed"],
];

const aboutRows = [
  ["FOCUS", "Frontend Architecture"],
  ["CURRENTLY", "Senior Software Engineer / Automation Engineer"],
  ["BUILDING", "AI Automation · n8n"],
  ["STUDYING", "M.S. Artificial Intelligence"],
  ["BASE", "Karachi · Remote-ready"],
];

const experience = [
  {
    company: "Independent / Freelance",
    mark: "F",
    markClass: "ghost",
    meta: "Automation Engineering",
    location: "Remote",
    tenure: "Oct 2025 — Present",
    roles: [
      {
        title: "Senior Software & Automation Engineer",
        dates: "Oct 2025 — Present",
        now: true,
        bullets: [
          <>
            Deliver <strong>n8n-powered automation workflows</strong> for
            business clients, slashing manual operational workload per
            engagement.
          </>,
          <>
            Build AI-integrated solutions that wire SaaS platforms together end
            to end — process automation with no custom backend to maintain.
          </>,
        ],
        metrics: [
          ["~", "50%", "Manual work cut"],
          ["", "3+", "Business clients"],
        ],
      },
    ],
  },
  {
    company: "Securiti.ai",
    mark: "S",
    markClass: "",
    meta: "Global Data Security SaaS",
    location: "Karachi, Pakistan",
    tenure: "Oct 2021 — Oct 2025",
    roles: [
      {
        title: "Technical Lead",
        dates: "",
        now: true,
        bullets: [
          <>
            Spearhead frontend architecture for the{" "}
            <strong>Data Command Center</strong> product, aligning engineering
            direction across the team to hit quarterly release milestones.
          </>,
          <>
            Drive adoption of scalable Vue.js component patterns, cutting
            cross-team UI inconsistencies platform-wide.
          </>,
        ],
        metrics: [
          ["~", "15%", "Fewer UI inconsistencies"],
          ["", "5+", "Engineers aligned"],
        ],
      },
      {
        title: "Senior Software Engineer",
        dates: "",
        now: false,
        bullets: [
          <>
            Architected responsive, production-grade UI for Securiti&apos;s Data
            Command Center in Vue.js, directly supporting onboarding of
            enterprise-tier clients across major releases.
          </>,
          <>
            Led code reviews and enforced engineering standards across the
            frontend team, driving down critical production bugs over two
            consecutive quarters.
          </>,
          <>
            Tightened sprint delivery by owning Agile ceremonies — planning,
            standups, retros — lifting team velocity.
          </>,
          <>
            Mentored junior engineers in clean code and scalable UI
            architecture, shortening onboarding ramp-up.
          </>,
        ],
        metrics: [
          ["~", "10%", "Fewer prod bugs"],
          ["~", "20%", "Velocity gain"],
          ["", "4+", "Engineers mentored"],
        ],
      },
    ],
  },
  {
    company: "IOMechs",
    mark: "IO",
    markClass: "alt",
    meta: "Software Consultancy",
    location: "Karachi, Pakistan",
    tenure: "Jun 2018 — Oct 2021",
    roles: [
      {
        title: "Software Engineer",
        dates: "Jun 2018 — Oct 2021",
        now: false,
        bullets: [
          <>
            Engineered client-facing web apps with React and Ant Design —
            pixel-accurate, performant interfaces across industries.
          </>,
          <>
            Scaled large enterprise modules with Angular and Angular Material
            for high-concurrency user bases with zero critical performance
            regressions.
          </>,
          <>
            Integrated third-party APIs — including Microsoft Yammer — via
            Node.js, removing manual data-syncing overhead from a client&apos;s
            internal comms platform.
          </>,
          <>
            Built end-to-end test suites with Cypress and Jasmine/Karma, raising
            coverage and cutting post-release defects.
          </>,
          <>
            Designed full system architecture and led a 4-person team across
            client projects, delivering on schedule and within budget.
          </>,
        ],
        metrics: [
          ["", "8+", "Apps delivered"],
          ["~", "85%", "Test coverage"],
          ["~", "5+", "Engineers mentored"],
        ],
      },
    ],
  },
];

const skillGroups = [
  ["01", "Languages", ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3"]],
  [
    "02",
    "Frameworks",
    ["React", "Angular", "Vue.js", "Next.js", "Node.js", "Express.js", "React Native"],
  ],
  ["03", "Cloud & Automation", ["Firebase", "n8n", "REST APIs", "Webhooks", "CI/CD"]],
  [
    "04",
    "Data, Testing & Tools",
    [
      "Firestore",
      "MongoDB",
      "Git",
      "Cypress",
      "Jasmine",
      "Karma",
      "Ant Design",
      "Angular Material",
      "Agile / Scrum",
    ],
  ],
] satisfies Array<[string, string, string[]]>;

const education = [
  {
    dates: "Aug 2024 — Aug 2026",
    badgeClass: "badge-now",
    badge: "In progress",
    degree: "M.S. in Artificial Intelligence",
    school: "National University of Computer & Emerging Sciences (FAST)",
  },
  {
    dates: "Jul 2014 — Sep 2018",
    badgeClass: "badge-done",
    badge: "Completed",
    degree: "B.E. in Computer Science",
    school: "NED University of Engineering & Technology",
  },
];

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#1A6EFF" strokeWidth="2">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#1A6EFF" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="M19.05 4.95A9.9 9.9 0 0 0 3.7 17.3L3 21l3.78-.68A9.9 9.9 0 0 0 19.05 4.95Z" />
      <path d="M8.8 8.9c.22-.5.42-.52.74-.52h.54c.18 0 .42.05.64.5.24.5.8 1.95.87 2.1.07.14.12.3.02.5-.1.2-.16.32-.32.5-.16.18-.34.4-.48.54-.16.16-.32.34-.14.64.18.3.78 1.28 1.68 2.07 1.15 1.03 2.12 1.35 2.42 1.5.3.16.48.14.66-.08.18-.2.76-.88.96-1.18.2-.3.4-.25.68-.16.28.1 1.76.83 2.06.98.3.16.5.24.58.38.08.14.08.82-.2 1.6-.28.78-1.62 1.5-2.26 1.56-.58.05-1.32.08-2.14-.14-.5-.14-1.14-.36-1.96-.72-3.45-1.5-5.7-4.98-5.88-5.2-.18-.24-1.4-1.86-1.4-3.54 0-1.68.88-2.5 1.2-2.84Z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="#1A6EFF">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 17.34V10.4H6.04v6.94h2.3zM7.19 9.4a1.34 1.34 0 1 0 0-2.67 1.34 1.34 0 0 0 0 2.67zm10.15 7.94v-3.8c0-2.03-1.08-2.97-2.53-2.97-1.17 0-1.69.64-1.98 1.1v-.94h-2.3c.03.65 0 6.94 0 6.94h2.3v-3.88c0-.2.01-.41.07-.56.17-.41.55-.84 1.18-.84.83 0 1.16.63 1.16 1.56v3.72h2.3z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#1A6EFF" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </svg>
  );
}

export function ResumePage() {
  return (
    <main className="cv-page">
      <section className="hero">
        <div className="wrap">
          <div className="hero-grid">
            <div>
              <span className="eyebrow">
                Senior Software Engineer · Automation Engineer / Workflow
                Automation Engineer
              </span>
              <h1>
                Muhammad
                <br />
                Mehdi <span className="last">Rajani</span>
              </h1>
              <p className="lede">
                I architect and ship <strong>scalable mobile/web applications</strong>,
                automation workflows, and the frontend teams that build them. 9+
                years across React, Angular, Vue, Next.js, Node, and workflow
                automation.
              </p>
              <div className="contact-row">
                <a className="chip" href="mailto:mehdi.devofficial@gmail.com">
                  <MailIcon />
                  mehdi.devofficial@gmail.com
                </a>
                <a className="chip" href="tel:+923343450462">
                  <PhoneIcon />
                  +92 334 3450462
                </a>
                <a
                  className="chip chip-whatsapp"
                  href="https://wa.me/923343450462"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon />
                  WhatsApp
                </a>
                <a
                  className="chip"
                  href="https://www.linkedin.com/in/muhammad-mehdi-rajani/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedinIcon />
                  LinkedIn
                </a>
                <a
                  className="chip"
                  href="https://github.com/mmehdirajani05"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GlobeIcon />
                  Github
                </a>
              </div>
            </div>

            <div className="photo-card">
              <div className="pc-top">
                <span className="pc-tag">
                  Available for contract/freelance projects
                </span>
              </div>
              <div className="pc-monogram">
                <Image
                  src="/mehdi-portfolio-image.png"
                  alt="Muhammad Mehdi Rajani portrait"
                  fill
                  preload
                  unoptimized
                  sizes="(max-width: 880px) 300px, 360px"
                  className="pc-photo"
                />
              </div>
              <div className="pc-bottom">
                <div className="role">Senior Software Engineer / Automation Engineer</div>
                <div className="sub">
                  Former Tech Lead at{" "}
                  <a
                    href="https://securiti.ai/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Securiti.ai
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="statstrip">
            {stats.map(([number, suffix, label]) => (
              <div className="stat" key={label}>
                <div className="num">
                  {number}
                  {suffix ? <span className="u">{suffix}</span> : null}
                </div>
                <div className="cap">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="about">
        <div className="wrap">
          <div className="about-grid">
            <div>
              <span className="eyebrow">About</span>
              <p className="about-body">
                I own frontend delivery end to end at a global{" "}
                <strong>data-security SaaS</strong> company — from architecture
                decisions to the component patterns a whole team builds on.
                Lately I&apos;ve been building{" "}
                <strong>AI-powered automation</strong> with n8n while finishing
                an M.S. in Artificial Intelligence.
              </p>
            </div>
            <div className="about-side">
              {aboutRows.map(([key, value]) => (
                <div className="row" key={key}>
                  <span className="k">{key}</span>
                  <span className="v">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section experience-section" id="experience">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Experience</span>
            <h2>Career, read like a dashboard.</h2>
            <p>Each role with the work that mattered and the numbers behind it.</p>
          </div>

          <div className="xp">
            {experience.map((company) => (
              <article className="role-card" key={company.company}>
                <div className="rc-head">
                  <div className={`co-mark ${company.markClass}`}>
                    {company.mark}
                  </div>
                  <div className="rc-id">
                    <div className="co">{company.company}</div>
                    <div className="meta">
                      {company.meta} <span className="dot">·</span>{" "}
                      {company.location}
                    </div>
                  </div>
                  <span className="tenure">{company.tenure}</span>
                </div>

                {company.roles.map((role) => (
                  <div className="role-block" key={role.title}>
                    <div className="rb-head">
                      <span className="title">{role.title}</span>
                      <span className="dates">
                        {role.now && role.dates.includes("Present") ? (
                          <>
                            {role.dates.replace("Present", "")}
                            <span className="now">Present</span>
                          </>
                        ) : (
                          role.dates
                        )}
                      </span>
                    </div>
                    <ul className="bullets">
                      {role.bullets.map((bullet, index) => (
                        <li key={index}>{bullet}</li>
                      ))}
                    </ul>
                    <div className="metrics">
                      {role.metrics.map(([prefix, value, label]) => (
                        <div className="metric" key={label}>
                          <div className="m-num">
                            {prefix ? <span className="pre">{prefix}</span> : null}
                            {value}
                          </div>
                          <div className="m-lab">{label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section skills-section" id="skills">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Toolkit</span>
            <h2>What I build with.</h2>
            <p>
              Nine years of frontend depth, plus the automation and infra layer
              around it.
            </p>
          </div>
          <div className="skill-grid">
            {skillGroups.map(([number, title, skills]) => (
              <div className="skill-card" key={title}>
                <h3>
                  <span className="n">{number}</span> {title}
                </h3>
                <div className="tags">
                  {skills.map((skill) => (
                    <span className="tag" key={skill}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="education">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Education</span>
            <h2>Foundations.</h2>
          </div>
          <div className="edu-grid">
            {education.map((item) => (
              <div className="edu-card" key={item.degree}>
                <div className="ecap">
                  <span>{item.dates}</span>
                  <span className={item.badgeClass}>{item.badge}</span>
                </div>
                <div className="degree">{item.degree}</div>
                <div className="school">{item.school}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="wrap">
          <div className="foot-cta">
            <div className="inner">
              <span className="eyebrow foot-eyebrow">Let&apos;s talk</span>
              <h2>Building a team that ships fast?</h2>
              <p>
                I&apos;m open to senior frontend and technical-lead roles —
                remote or Karachi-based. Let&apos;s get into the details.
              </p>
            </div>
            <div className="foot-actions">
              <a className="btn-white" href="mailto:mehdi.devofficial@gmail.com">
                <MailIcon />
                Email me
              </a>
              <a
                className="btn-whatsapp"
                href="https://wa.me/923343450462"
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon />
                WhatsApp
              </a>
              <a
                className="btn-ghost"
                href="https://www.linkedin.com/in/muhammad-mehdi-rajani/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Connect on LinkedIn
              </a>
            </div>
          </div>

          <div className="colophon">
            <span>© 2026 Muhammad Mehdi Rajani</span>
            <span>Karachi, Pakistan · +92 334 3450462</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
