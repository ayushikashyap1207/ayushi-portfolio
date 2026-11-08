import { useEffect, useRef, useState } from "react";
import {
  Activity,
  ArrowDown,
  ArrowUpRight,
  Award,
  BookOpen,
  CalendarDays,
  Check,
  Copy,
  FileText,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  Presentation,
  Scale,
  ScanLine,
  ShieldAlert,
  Sparkles,
  Sprout,
  Store,
  X,
} from "lucide-react";
import {
  CERTS,
  EDUCATION,
  FACTS,
  NAV,
  PROFILE,
  PROJECTS,
  SKILL_GROUPS,
  STATS,
  TECH,
} from "./data";
import { TechIcon, techBrand, techIconBackground } from "./techIcons";

const GLYPHS = {
  sparkles: Sparkles,
  presentation: Presentation,
  scale: Scale,
  shield: ShieldAlert,
  activity: Activity,
  scan: ScanLine,
  file: FileText,
  sprout: Sprout,
  book: BookOpen,
  calendar: CalendarDays,
  store: Store,
};

const TICKER = [
  "Python",
  "PyTorch",
  "FastAPI",
  "LangChain",
  "React",
  "Docker",
  "PostgreSQL",
  "OpenCV",
  "RAG",
  "TypeScript",
];

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(prefersReducedMotion);

  useEffect(() => {
    if (visible) return;

    if (prefersReducedMotion()) {
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -48px 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [visible]);

  return [ref, visible];
}

function Reveal({
  children,
  className = "",
  delay = "0s",
  as: Tag = "div",
  ...rest
}) {
  const [ref, visible] = useReveal();

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`.trim()}
      style={{ "--delay": delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

function FlowerMark({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {Array.from({ length: 8 }).map((_, index) => (
        <ellipse
          key={index}
          cx="32"
          cy="18.5"
          rx="6.2"
          ry="13"
          stroke="currentColor"
          strokeWidth="1.4"
          transform={`rotate(${index * 45} 32 32)`}
        />
      ))}
      <circle cx="32" cy="32" r="3.6" fill="currentColor" />
    </svg>
  );
}

function useActiveSection() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const sections = NAV.map((item) =>
      document.getElementById(item.id)
    ).filter(Boolean);

    if (!sections.length || !("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-32% 0px -55% 0px", threshold: [0, 0.2, 0.6] }
    );

    sections.forEach((section) => io.observe(section));
    return () => io.disconnect();
  }, []);

  return active;
}

function SectionHead({ index, label, title, intro }) {
  return (
    <div className="section-head">
      <div className="section-kicker mono">
        <span className="kicker-index">{index}</span>
        <span>{label}</span>
      </div>
      <h2 className="section-title">{title}</h2>
      {intro ? <p className="section-intro">{intro}</p> : null}
    </div>
  );
}

function TechChip({ id }) {
  const tech = TECH[id];
  if (!tech) return null;

  return (
    <span className="chip">
      {tech.mono ? null : <TechIcon id={id} />}
      {tech.label}
    </span>
  );
}

function SocialLinks() {
  return (
    <div className="socials" aria-label="Social links">
      <a
        href={PROFILE.github}
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub profile"
      >
        <Github size={17} />
      </a>
      <a
        href={PROFILE.linkedin}
        target="_blank"
        rel="noreferrer"
        aria-label="LinkedIn profile"
      >
        <Linkedin size={17} />
      </a>
      <a href={`mailto:${PROFILE.email}`} aria-label="Email Ayushi">
        <Mail size={17} />
      </a>
    </div>
  );
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  }

  return (
    <button className="btn btn-ghost copy-btn" type="button" onClick={copy}>
      {copied ? (
        <Check size={16} aria-hidden="true" />
      ) : (
        <Copy size={16} aria-hidden="true" />
      )}
      <span aria-live="polite">{copied ? "Copied" : "Copy email"}</span>
    </button>
  );
}

function FeaturedProject({ project, delay }) {
  const Glyph = GLYPHS[project.glyph] ?? Sparkles;

  return (
    <Reveal as="article" className="work-item" delay={delay}>
      <div className="work-index" aria-hidden="true">
        <span className="mono">{project.number}</span>
        <span className="work-glyph">
          <Glyph size={18} />
        </span>
      </div>

      <div className="work-main">
        <div className="work-meta">
          <span className="mono">{project.date}</span>
          <span>{project.kicker}</span>
        </div>
        <h3>
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${project.title} on GitHub`}
          >
            {project.title}
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </h3>
        <p className="work-desc">{project.description}</p>
        <ul className="work-highlights">
          {project.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
        <div className="chips">
          {project.stack.map((id) => (
            <TechChip key={id} id={id} />
          ))}
        </div>
      </div>

      <div className="work-side">
        <span className="work-metric">{project.metric}</span>
        <a
          className="work-link"
          href={project.url}
          target="_blank"
          rel="noreferrer"
          aria-label={`${project.title} on GitHub`}
        >
          <Github size={14} aria-hidden="true" />
          GitHub
        </a>
      </div>
    </Reveal>
  );
}

function MoreCard({ project, delay }) {
  const Glyph = GLYPHS[project.glyph] ?? Sparkles;

  return (
    <Reveal as="article" className="mini-card" delay={delay}>
      <div className="mini-top">
        <span className="mono">{project.date}</span>
        <span className="mini-glyph" aria-hidden="true">
          <Glyph size={16} />
        </span>
      </div>
      <h3>
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${project.title} on GitHub`}
        >
          {project.title}
          <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </h3>
      <p>{project.description}</p>
      <div className="chips small">
        {project.stack.map((id) => (
          <TechChip key={id} id={id} />
        ))}
      </div>
      <div className="mini-foot">
        <span>{project.note ?? ""}</span>
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          aria-label={`${project.title} GitHub repository`}
        >
          <Github size={14} aria-hidden="true" />
          GitHub
        </a>
      </div>
    </Reveal>
  );
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 861px)");
    const closeOnDesktop = (event) => {
      if (event.matches) setMenuOpen(false);
    };

    if (mq.addEventListener) mq.addEventListener("change", closeOnDesktop);
    else mq.addListener(closeOnDesktop);

    return () => {
      if (mq.removeEventListener)
        mq.removeEventListener("change", closeOnDesktop);
      else mq.removeListener(closeOnDesktop);
    };
  }, []);

  const featured = PROJECTS.filter((project) => project.featured);
  const more = PROJECTS.filter((project) => !project.featured);

  return (
    <div className="site">
      <a className="skip" href="#main">
        Skip to content
      </a>

      <header className="nav-shell">
        <nav className="nav" aria-label="Primary">
          <a
            className="brand"
            href="#top"
            aria-label="Ayushi Kashyap, back to top"
          >
            <FlowerMark className="brand-mark" />
            <span className="brand-name">
              Ayushi <em>Kashyap</em>
            </span>
          </a>

          <div className="nav-links" id="primary-nav" data-open={menuOpen}>
            {NAV.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMenuOpen(false)}
                aria-current={active === item.id ? "location" : undefined}
              >
                {item.label}
              </a>
            ))}
            <a
              className="nav-mobile-resume"
              href={PROFILE.resume}
              target="_blank"
              rel="noreferrer"
            >
              Résumé <ArrowUpRight size={14} />
            </a>
          </div>

          <div className="nav-actions">
            <a
              className="nav-resume"
              href={PROFILE.resume}
              target="_blank"
              rel="noreferrer"
            >
              Résumé <ArrowUpRight size={13} />
            </a>
            <button
              className="burger"
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="primary-nav"
              onClick={() => setMenuOpen((value) => !value)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {menuOpen ? (
        <button
          className="nav-scrim"
          type="button"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        />
      ) : null}

      <main id="main">
        <section className="hero" id="top">
          <div className="wrap">
            <div className="hero-grid">
              <div className="hero-copy">
                <div className="status">
                  <span className="status-dot" />
                  {PROFILE.availability}
                </div>

                <h1 className="hero-name">
                  <span>Ayushi</span>
                  <span className="hero-name-last">
                    Kashyap
                    <FlowerMark className="hero-flower" />
                  </span>
                </h1>

                <p className="hero-lede">
                  I build <strong>applied AI systems</strong> that make it out of
                  the notebook — RAG pipelines, anomaly detection, and
                  multilingual tools for the people who need them.
                </p>

                <div className="hero-actions">
                  <a className="btn btn-primary" href="#work">
                    Explore selected work <ArrowDown size={16} />
                  </a>
                  <a
                    className="btn btn-ghost"
                    href={PROFILE.resume}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Download résumé <ArrowUpRight size={16} />
                  </a>
                </div>

                <SocialLinks />
              </div>

              <aside className="hero-card" aria-label="About Ayushi">
                <div className="hero-card-head">
                  <span className="mono">PORTFOLIO / 2026</span>
                  <FlowerMark />
                </div>

                <div className="hero-orbit">
                  <div className="hero-portrait">
                    <img
                      src="/ayushi-portrait.jpg"
                      alt="Portrait of Ayushi Kashyap"
                      width="156"
                      height="156"
                      decoding="async"
                    />
                  </div>
                  <span className="orbit-label">AI · ML · RAG</span>
                </div>

                <div className="hero-card-body">
                  <span className="mono">A LITTLE ABOUT ME</span>
                  <h2>Hi — I'm Ayushi.</h2>
                  <p>
                    Final-year AI & ML student at VIT Bhopal, based in
                    Bengaluru. Curious by default, and happiest when a messy
                    idea turns into something real.
                  </p>
                </div>

                <div className="hero-card-foot">
                  <span>
                    <MapPin size={14} /> {PROFILE.location}
                  </span>
                  <span>
                    <GraduationCap size={14} /> VIT Bhopal · 2027
                  </span>
                  <span>
                    <Award size={14} /> 7 certifications · 8.7 CGPA
                  </span>
                </div>
              </aside>
            </div>

            <dl className="hero-stats">
              {STATS.map((stat) => (
                <div className="stat" key={stat.label}>
                  <dt>{stat.label}</dt>
                  <dd>{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <div className="ticker" aria-hidden="true">
          <div className="ticker-track">
            {[0, 1].map((group) => (
              <div className="ticker-group" key={group}>
                {TICKER.map((item) => (
                  <span className="ticker-item" key={`${group}-${item}`}>
                    {item}
                    <FlowerMark className="ticker-flower" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <section className="section about" id="about">
          <div className="wrap">
            <Reveal>
              <SectionHead
                index="01"
                label="About me"
                title={
                  <>
                    A little more
                    <br />
                    <em>than code.</em>
                  </>
                }
              />
            </Reveal>

            <div className="about-grid">
              <Reveal className="about-copy" delay=".05s">
                <p>
                  I'm Ayushi — a final-year B.Tech CS student at{" "}
                  <strong>VIT Bhopal</strong>, specializing in AI & ML, and
                  currently based in <strong>Bengaluru</strong>. I got into
                  this field because I loved the feeling of making a machine do
                  something it couldn't do yesterday; I've been chasing that
                  feeling ever since.
                </p>
                <p>
                  I'm curious, steady, and easy to work with — or at least
                  that's what my teammates tell me. I ask a lot of questions, I
                  like understanding the <strong>why before the how</strong>,
                  and I'd rather build something small that genuinely helps
                  someone than something impressive that never leaves the
                  notebook. Outside of code, I'm usually reading, sketching
                  interfaces, or talking someone's ear off about an idea I just
                  had.
                </p>
                <blockquote className="about-quote">
                  “Good work starts with listening — to people, to data, and to
                  the problem.”
                </blockquote>
                <div className="about-links">
                  <a
                    className="text-link"
                    href={PROFILE.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub <ArrowUpRight size={14} />
                  </a>
                  <a
                    className="text-link"
                    href={PROFILE.linkedin}
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn <ArrowUpRight size={14} />
                  </a>
                  <a
                    className="text-link"
                    href={PROFILE.resume}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Résumé <ArrowUpRight size={14} />
                  </a>
                </div>
              </Reveal>

              <Reveal className="fact-card" delay=".12s">
                <div className="fact-card-head">
                  <span className="mono">AT A GLANCE</span>
                  <FlowerMark />
                </div>
                <dl>
                  {FACTS.map((fact) => (
                    <div className="fact-row" key={fact.label}>
                      <dt>{fact.label}</dt>
                      <dd>{fact.value}</dd>
                    </div>
                  ))}
                </dl>
                <a
                  className="fact-resume"
                  href={PROFILE.resume}
                  target="_blank"
                  rel="noreferrer"
                >
                  Read the full résumé <ArrowUpRight size={14} />
                </a>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="section stack" id="stack">
          <div className="wrap">
            <Reveal>
              <SectionHead
                index="02"
                label="Toolkit"
                title={
                  <>
                    The stack,
                    <br />
                    <em>logo by logo.</em>
                  </>
                }
                intro="One pipeline, every layer. These are the libraries and platforms I reach for when a model has to become a product."
              />
            </Reveal>

            <div className="stack-list">
              {SKILL_GROUPS.map((group, groupIndex) => (
                <Reveal
                  className="stack-row"
                  key={group.title}
                  delay={`${groupIndex * 0.04}s`}
                >
                  <div className="stack-label">
                    <span className="mono">
                      {String(groupIndex + 1).padStart(2, "0")}
                    </span>
                    <h3>{group.title}</h3>
                  </div>
                  <div className="stack-grid">
                    {group.items.map((id) => {
                      const tech = TECH[id];
                      return (
                        <div
                          className="tech-tile"
                          key={id}
                          style={{
                            "--brand": techBrand(id),
                            "--icon-bg": techIconBackground(id),
                          }}
                          title={tech.label}
                        >
                          <span className="tech-icon">
                            <TechIcon id={id} />
                          </span>
                          <span className="tech-name">{tech.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section work-band on-dark" id="work">
          <div className="wrap">
            <Reveal>
              <SectionHead
                index="03"
                label="Selected work"
                title={
                  <>
                    Six systems,
                    <br />
                    <em>shipped end to end.</em>
                  </>
                }
                intro="Each one started with a real problem and ended with a working interface, a measured result, and a repository you can read."
              />
            </Reveal>

            <div className="work-list">
              {featured.map((project, index) => (
                <FeaturedProject
                  key={project.id}
                  project={project}
                  delay={`${index * 0.04}s`}
                />
              ))}
            </div>

            <div className="work-foot">
              <span className="mono">MORE BUILDS BELOW</span>
              <a className="work-link" href="#more">
                See the archive <ArrowDown size={14} />
              </a>
            </div>
          </div>
        </section>

        <section className="section more" id="more">
          <div className="wrap">
            <Reveal>
              <SectionHead
                index="04"
                label="Archive"
                title={
                  <>
                    More from
                    <br />
                    <em>the build log.</em>
                  </>
                }
                intro="Smaller builds, team projects, and the earlier versions of ideas I kept working on."
              />
            </Reveal>

            <div className="more-grid">
              {more.map((project, index) => (
                <MoreCard
                  key={project.id}
                  project={project}
                  delay={`${index * 0.04}s`}
                />
              ))}

              <Reveal
                as="a"
                className="mini-card archive-card"
                href={PROFILE.github}
                target="_blank"
                rel="noreferrer"
                delay=".2s"
              >
                <div className="mini-top">
                  <span className="mono">THE FULL ARCHIVE</span>
                  <ArrowUpRight size={16} />
                </div>
                <h3>All 16 public repositories</h3>
                <p>
                  Coursework, experiments, and works in progress — the whole
                  build log.
                </p>
                <div className="mini-foot">
                  <span>github.com/ayushikashyap1207</span>
                  <Github size={15} />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="section credentials" id="credentials">
          <div className="wrap">
            <Reveal>
              <SectionHead
                index="05"
                label="Credentials"
                title={
                  <>
                    Certified,
                    <br />
                    <em>still curious.</em>
                  </>
                }
                intro="Seven certifications and a degree in progress — the formal layer underneath the projects."
              />
            </Reveal>

            <div className="credentials-grid">
              <div className="cert-list">
                {CERTS.map((cert, index) => (
                  <Reveal
                    className="cert-row"
                    key={cert.title}
                    delay={`${index * 0.05}s`}
                  >
                    <span className="cert-mark">
                      <TechIcon id={cert.mark} />
                    </span>
                    <div>
                      <h3>
                        {cert.url ? (
                          <a
                            href={cert.url}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`View ${cert.title} certificate`}
                          >
                            {cert.title}
                            <ArrowUpRight size={12} aria-hidden="true" />
                          </a>
                        ) : (
                          cert.title
                        )}
                      </h3>
                      <p>{cert.issuer}</p>
                    </div>
                    <span className="cert-date mono">{cert.date}</span>
                  </Reveal>
                ))}
              </div>

              <Reveal className="edu-card" delay=".1s">
                <span className="mono">EDUCATION</span>
                <div className="edu-cgpa">
                  {EDUCATION.cgpa}
                  <span>/10</span>
                </div>
                <h3>{EDUCATION.degree}</h3>
                <p>
                  {EDUCATION.specialization}
                  <br />
                  {EDUCATION.school}
                </p>
                <div className="edu-meta">
                  <span>{EDUCATION.years}</span>
                  <span>EXPECTED 2027</span>
                </div>
                <div className="edu-tags">
                  {EDUCATION.coursework.map((course) => (
                    <span key={course}>{course}</span>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="section contact-band on-dark" id="contact">
          <div className="wrap contact-grid">
            <Reveal>
              <div className="section-kicker mono">
                <span className="kicker-index">06</span>
                <span>Contact</span>
              </div>
              <h2 className="contact-title">
                Let's build something
                <br />
                <em>worth shipping.</em>
              </h2>
              <p className="contact-lede">
                I'm looking for 2027 new-grad AI/ML roles where I can own a
                system end to end — from the model and the eval to the interface
                someone actually uses.
              </p>
              <div className="contact-actions">
                <a className="btn btn-sun" href={`mailto:${PROFILE.email}`}>
                  <Mail size={16} /> Email me
                </a>
                <CopyEmail />
              </div>
            </Reveal>

            <Reveal as="address" className="contact-card" delay=".1s">
              <a className="contact-row" href={`mailto:${PROFILE.email}`}>
                <Mail />
                <span>
                  <small>Email</small>
                  <strong>{PROFILE.email}</strong>
                </span>
              </a>
              <a className="contact-row" href={`tel:${PROFILE.phoneTel}`}>
                <Phone />
                <span>
                  <small>Phone</small>
                  <strong>{PROFILE.phoneDisplay}</strong>
                </span>
              </a>
              <a
                className="contact-row"
                href={PROFILE.github}
                target="_blank"
                rel="noreferrer"
              >
                <Github />
                <span>
                  <small>GitHub</small>
                  <strong>github.com/ayushikashyap1207</strong>
                </span>
              </a>
              <a
                className="contact-row"
                href={PROFILE.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin />
                <span>
                  <small>LinkedIn</small>
                  <strong>linkedin.com/in/ayushi1207</strong>
                </span>
              </a>
              <a
                className="contact-row"
                href={PROFILE.resume}
                target="_blank"
                rel="noreferrer"
              >
                <FileText />
                <span>
                  <small>Résumé</small>
                  <strong>Download PDF</strong>
                </span>
              </a>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap footer-inner">
          <a className="footer-brand" href="#top">
            <FlowerMark />
            <span>Ayushi Kashyap</span>
          </a>
          <span>AI/ML Engineer · Bengaluru, India</span>
          <span>© 2026 · Built with React &amp; Vite</span>
        </div>
      </footer>
    </div>
  );
}
