import { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Mail, Phone, ExternalLink, Menu, X, Award, GraduationCap, ArrowRight } from "lucide-react";

const GITHUB_URL = "https://tinyurl.com/githpro";
const LINKEDIN_URL = "https://tinyurl.com/prolikin";
const EMAIL = "toayushikashyap@gmail.com";
const PHONE_DISPLAY = "+91 7858849788";
const PHONE_TEL = "+917858849788";

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setVisible(true)),
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, className = "", style = {} }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transition: "opacity .6s ease, transform .6s ease",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Tag({ children }) {
  return <span className="tag">{children}</span>;
}
function StackTag({ children }) {
  return <span className="stack-tag mono">{children}</span>;
}
function Metric({ children, amber = false }) {
  return <span className={"metric mono" + (amber ? " amber" : "")}>{children}</span>;
}

function TStat({ num, label, delay }) {
  return (
    <div className="tstat">
      <div className="scan" style={{ animationDelay: delay }} />
      <div className="num mono">{num}</div>
      <div className="label">{label}</div>
    </div>
  );
}

function Project({ date, title, url, stack, bullets, metrics }) {
  return (
    <div className="project">
      <div className="project-top">
        <div>
          <div className="project-date mono">{date}</div>
          <div className="project-title">
            {title}
            <a href={url} target="_blank" rel="noreferrer" aria-label="Open project">
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </div>
      <div className="project-stack">
        {stack.map((s) => (
          <StackTag key={s}>{s}</StackTag>
        ))}
      </div>
      <ul>
        {bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
      <div className="metrics">
        {metrics.map((m, i) => (
          <Metric key={i} amber={m.amber}>
            {m.text}
          </Metric>
        ))}
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [navOpen, setNavOpen] = useState(false);

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#certifications", label: "Certifications" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <div className="pf-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap');

        .pf-root{
          --bg:#0B1220; --surface:#121B2E; --surface-2:#182342; --border:#243252;
          --text:#E7ECF5; --text-dim:#8FA1BD; --text-faint:#5B6B87;
          --teal:#4FD8C4; --teal-dim:rgba(79,216,196,0.13);
          --amber:#F2A94E; --amber-dim:rgba(242,169,78,0.13);
          background:var(--bg); color:var(--text); font-family:'Inter',sans-serif;
          line-height:1.6; -webkit-font-smoothing:antialiased; position:relative; overflow-x:hidden;
          min-height:100vh;
        }
        .pf-root *{box-sizing:border-box;}
        .pf-root a{color:inherit;text-decoration:none;}
        .pf-root ::selection{background:var(--teal-dim);color:var(--teal);}
        .mono{font-family:'JetBrains Mono',monospace;}
        .display{font-family:'Space Grotesk',sans-serif;}

        .wrap{max-width:1080px;margin:0 auto;padding:0 28px;}
        .pf-section{padding:96px 0;}
        @media(max-width:640px){ .pf-section{padding:64px 0;} }

        .grid-bg{
          position:fixed;inset:0;z-index:0;pointer-events:none;
          background-image:
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px);
          background-size:64px 64px; opacity:0.35;
          mask-image:radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%);
        }

        header{ position:fixed;top:0;left:0;right:0;z-index:100;
          background:rgba(11,18,32,0.82); backdrop-filter:blur(10px); border-bottom:1px solid var(--border); }
        nav{display:flex;align-items:center;justify-content:space-between;padding:18px 28px;max-width:1080px;margin:0 auto;}
        .logo{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:1.05rem;letter-spacing:0.02em;}
        .logo span{color:var(--teal);}
        .nav-links{display:flex;gap:32px;align-items:center;}
        .nav-links a{font-size:0.88rem;color:var(--text-dim);transition:color .2s;}
        .nav-links a:hover{color:var(--text);}
        .nav-icons{display:flex;gap:16px;align-items:center;}
        .nav-icons a{color:var(--text-dim);display:flex;transition:color .2s;}
        .nav-icons a:hover{color:var(--teal);}
        .burger{display:none;background:none;border:none;color:var(--text);cursor:pointer;padding:4px;}

        @media(max-width:760px){
          .nav-links{
            position:fixed;top:60px;left:0;right:0;background:var(--surface);
            border-bottom:1px solid var(--border);flex-direction:column;align-items:flex-start;
            padding:20px 28px;gap:18px;transform:translateY(-130%);transition:transform .25s ease;
          }
          .nav-links.open{transform:translateY(0);}
          .burger{display:block;}
        }

        .hero{padding-top:168px;padding-bottom:80px;position:relative;}
        .eyebrow{font-size:0.78rem;letter-spacing:0.14em;color:var(--teal);display:inline-flex;align-items:center;gap:8px;margin-bottom:22px;}
        .eyebrow::before{content:'';width:7px;height:7px;border-radius:50%;background:var(--teal);animation:pulse 2s infinite;}
        @keyframes pulse{0%{box-shadow:0 0 0 0 rgba(79,216,196,0.45);}70%{box-shadow:0 0 0 8px rgba(79,216,196,0);}100%{box-shadow:0 0 0 0 rgba(79,216,196,0);}}
        h1.pf-name{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:clamp(2.6rem,7vw,4.6rem);line-height:1.02;letter-spacing:-0.02em;margin:0;}
        .tagline{font-size:clamp(1.05rem,2.4vw,1.35rem);color:var(--text-dim);max-width:620px;margin-top:22px;font-weight:400;}
        .tagline b{color:var(--text);font-weight:600;}

        .cta-row{display:flex;gap:14px;margin-top:38px;flex-wrap:wrap;}
        .btn{padding:12px 24px;border-radius:8px;font-size:0.92rem;font-weight:600;display:inline-flex;align-items:center;gap:8px;transition:all .2s;border:none;cursor:pointer;}
        .btn-primary{background:var(--teal);color:#06231E;}
        .btn-primary:hover{background:#68e5d3;transform:translateY(-1px);}
        .btn-outline{border:1px solid var(--border);color:var(--text);background:transparent;}
        .btn-outline:hover{border-color:var(--teal);color:var(--teal);}

        .contact-icons{display:flex;gap:18px;margin-top:36px;}
        .contact-icons a{width:40px;height:40px;border:1px solid var(--border);border-radius:8px;display:flex;align-items:center;justify-content:center;color:var(--text-dim);transition:all .2s;}
        .contact-icons a:hover{border-color:var(--teal);color:var(--teal);transform:translateY(-2px);}

        .telemetry{margin-top:64px;border:1px solid var(--border);border-radius:12px;background:var(--surface);overflow:hidden;position:relative;}
        .telemetry-head{display:flex;align-items:center;justify-content:space-between;padding:10px 18px;border-bottom:1px solid var(--border);font-size:0.72rem;color:var(--text-faint);letter-spacing:0.08em;}
        .telemetry-dots{display:flex;gap:6px;}
        .telemetry-dots span{width:7px;height:7px;border-radius:50%;background:var(--border);display:block;}
        .telemetry-body{display:grid;grid-template-columns:repeat(4,1fr);}
        @media(max-width:760px){ .telemetry-body{grid-template-columns:repeat(2,1fr);} }
        .tstat{padding:22px 18px;border-right:1px solid var(--border);position:relative;overflow:hidden;}
        .tstat:last-child{border-right:none;}
        .tstat .num{font-size:1.5rem;font-weight:600;color:var(--text);}
        .tstat .label{font-size:0.72rem;color:var(--text-faint);letter-spacing:0.05em;margin-top:4px;}
        .scan{position:absolute;top:0;left:-40%;width:40%;height:100%;background:linear-gradient(90deg,transparent,rgba(79,216,196,0.08),transparent);animation:sweep 5s linear infinite;}
        @keyframes sweep{0%{left:-40%;}100%{left:110%;}}
        @media(prefers-reduced-motion:reduce){ .scan{animation:none;display:none;} .eyebrow::before{animation:none;} }

        .sec-head{margin-bottom:44px;}
        .sec-num{font-size:0.78rem;color:var(--teal);letter-spacing:0.1em;margin-bottom:10px;}
        .sec-title{font-size:clamp(1.7rem,3.4vw,2.3rem);font-weight:600;}
        .sec-sub{color:var(--text-dim);margin-top:10px;max-width:600px;font-size:0.98rem;}

        .about-grid{display:grid;grid-template-columns:1.4fr 1fr;gap:56px;align-items:start;}
        @media(max-width:760px){.about-grid{grid-template-columns:1fr;gap:32px;}}
        .about-text p{color:var(--text-dim);font-size:1.02rem;margin:0 0 16px;}
        .about-text b{color:var(--text);}
        .fact-list{display:flex;flex-direction:column;gap:0;}
        .fact{display:flex;justify-content:space-between;padding:16px 0;border-bottom:1px solid var(--border);}
        .fact:first-child{border-top:1px solid var(--border);}
        .fact .k{color:var(--text-faint);font-size:0.85rem;}
        .fact .v{color:var(--teal);font-size:0.92rem;}

        .skills-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px;}
        @media(max-width:640px){.skills-grid{grid-template-columns:1fr;}}
        .skill-card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:24px;}
        .skill-card h4{font-size:0.82rem;color:var(--text-faint);letter-spacing:0.08em;margin:0 0 16px;text-transform:uppercase;}
        .tags{display:flex;flex-wrap:wrap;gap:8px;}
        .tag{font-size:0.82rem;padding:6px 12px;border-radius:100px;background:var(--surface-2);border:1px solid var(--border);color:var(--text-dim);}

        .project{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:32px;margin-bottom:22px;transition:border-color .2s;}
        .project:hover{border-color:#324164;}
        .project-top{display:flex;justify-content:space-between;align-items:flex-start;gap:16px;flex-wrap:wrap;margin-bottom:6px;}
        .project-date{font-size:0.76rem;color:var(--text-faint);letter-spacing:0.05em;}
        .project-title{font-family:'Space Grotesk',sans-serif;font-size:1.3rem;font-weight:600;margin-top:6px;display:flex;align-items:center;gap:10px;}
        .project-title a{color:var(--text-dim);display:flex;transition:color .2s;}
        .project-title a:hover{color:var(--teal);}
        .project-stack{display:flex;flex-wrap:wrap;gap:8px;margin:16px 0 18px;}
        .stack-tag{font-size:0.72rem;padding:4px 10px;border-radius:5px;background:var(--surface-2);color:var(--text-dim);border:1px solid var(--border);}
        .project ul{list-style:none;display:flex;flex-direction:column;gap:9px;margin:0 0 20px;padding:0;}
        .project li{color:var(--text-dim);font-size:0.94rem;padding-left:18px;position:relative;}
        .project li::before{content:'—';position:absolute;left:0;color:var(--text-faint);}
        .metrics{display:flex;flex-wrap:wrap;gap:10px;}
        .metric{font-size:0.78rem;font-weight:600;padding:8px 14px;border-radius:8px;background:var(--teal-dim);color:var(--teal);}
        .metric.amber{background:var(--amber-dim);color:var(--amber);}

        .card-row{display:grid;grid-template-columns:1fr 1fr;gap:20px;}
        @media(max-width:760px){.card-row{grid-template-columns:1fr;}}
        .info-card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:28px;}
        .info-card .icon{color:var(--teal);margin-bottom:14px;}
        .info-card h4{font-family:'Space Grotesk',sans-serif;font-size:1.1rem;font-weight:600;margin:0 0 6px;}
        .info-card .sub{color:var(--text-dim);font-size:0.9rem;}
        .info-card .meta{font-size:0.78rem;color:var(--text-faint);margin-top:14px;}

        .contact-box{background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:52px 40px;text-align:center;}
        .contact-box h2{font-size:clamp(1.6rem,3.4vw,2.1rem);font-weight:600;margin:0 0 14px;}
        .contact-box p{color:var(--text-dim);max-width:480px;margin:0 auto 32px;}
        .contact-grid{display:flex;justify-content:center;gap:14px;flex-wrap:wrap;}

        .pf-footer{border-top:1px solid var(--border);padding:32px 0;text-align:center;color:var(--text-faint);font-size:0.82rem;position:relative;}
      `}</style>

      <div className="grid-bg" />

      <header>
        <nav>
          <div className="logo">
            AYUSHI<span>.</span>
          </div>
          <div className={"nav-links" + (navOpen ? " open" : "")}>
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setNavOpen(false)}>
                {l.label}
              </a>
            ))}
            <div className="nav-icons">
              <a href={GITHUB_URL} target="_blank" rel="noreferrer" aria-label="GitHub">
                <Github size={18} />
              </a>
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href={`mailto:${EMAIL}`} aria-label="Email">
                <Mail size={18} />
              </a>
            </div>
          </div>
          <button className="burger" aria-label="Menu" onClick={() => setNavOpen((v) => !v)}>
            {navOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      <main className="wrap" style={{ position: "relative", zIndex: 1 }}>
        <section className="hero">
          <div className="eyebrow mono">AI/ML ENGINEER · BENGALURU, INDIA</div>
          <h1 className="pf-name">Ayushi</h1>
          <p className="tagline">
            I design and ship applied ML systems — from <b>real-time anomaly detection</b> pipelines to{" "}
            <b>multilingual generative-AI</b> assistants — turning research ideas into working, measurable software.
          </p>

          <div className="cta-row">
            <a href="#projects" className="btn btn-primary">
              View Projects <ArrowRight size={16} />
            </a>
            <a href="#contact" className="btn btn-outline">
              Get in Touch
            </a>
          </div>

          <div className="contact-icons">
            <a href={GITHUB_URL} target="_blank" rel="noreferrer" aria-label="GitHub">
              <Github size={18} />
            </a>
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href={`mailto:${EMAIL}`} aria-label="Email">
              <Mail size={18} />
            </a>
            <a href={`tel:${PHONE_TEL}`} aria-label="Phone">
              <Phone size={18} />
            </a>
          </div>

          <Reveal className="telemetry">
            <div className="telemetry-head">
              <span>flagship_run.log</span>
              <div className="telemetry-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <div className="telemetry-body">
              <TStat num="89%" label="PRECISION @ TOP-1%" delay="0s" />
              <TStat num="18.6K+" label="SESSIONS SCORED" delay="1.2s" />
              <TStat num="20K" label="SYNTHETIC / RUN" delay="2.4s" />
              <TStat num="3" label="SHIPPED PROJECTS" delay="3.6s" />
            </div>
          </Reveal>
        </section>

        <section id="about" className="pf-section">
          <Reveal className="sec-head">
            <div className="sec-num mono">01 · PROFILE</div>
            <div className="sec-title display">About</div>
          </Reveal>
          <Reveal className="about-grid">
            <div className="about-text">
              <p>
                I'm a <b>B.Tech Computer Science</b> student specializing in <b>AI & ML</b> at Vellore Institute of
                Technology, Bhopal, graduating in 2027. I focus on building applied machine learning systems
                end-to-end — architecting the pipeline, training and validating the models, and shipping the
                interface around them.
              </p>
              <p>
                My work spans <b>real-time anomaly detection</b> for cybersecurity, <b>multilingual generative AI</b>{" "}
                for legal accessibility, and <b>full-stack ML applications</b> — with an emphasis on measurable
                outcomes: precision, latency, and accuracy numbers I can defend, not just demos.
              </p>
            </div>
            <div className="fact-list">
              <div className="fact">
                <span className="k">CGPA</span>
                <span className="v mono">8.68 / 10</span>
              </div>
              <div className="fact">
                <span className="k">Graduation</span>
                <span className="v mono">Expected 2027</span>
              </div>
              <div className="fact">
                <span className="k">Location</span>
                <span className="v mono">Bengaluru, IN</span>
              </div>
              <div className="fact">
                <span className="k">Certifications</span>
                <span className="v mono">1</span>
              </div>
            </div>
          </Reveal>
        </section>

        <section id="skills" className="pf-section">
          <Reveal className="sec-head">
            <div className="sec-num mono">02 · STACK</div>
            <div className="sec-title display">Tech Stack</div>
            <div className="sec-sub">Tools and frameworks I use to take a model from notebook to production.</div>
          </Reveal>
          <Reveal className="skills-grid">
            <div className="skill-card">
              <h4>Generative AI &amp; NLP</h4>
              <div className="tags">
                <Tag>LLaMA 3.1</Tag>
                <Tag>Prompt Engineering</Tag>
                <Tag>RAG Pipelines</Tag>
                <Tag>gTTS</Tag>
                <Tag>Multilingual NLP</Tag>
              </div>
            </div>
            <div className="skill-card">
              <h4>Machine Learning</h4>
              <div className="tags">
                <Tag>Scikit-learn</Tag>
                <Tag>Random Forest</Tag>
                <Tag>KNN</Tag>
                <Tag>Isolation Forest</Tag>
                <Tag>LSTM Autoencoders</Tag>
                <Tag>Ensemble Learning</Tag>
              </div>
            </div>
            <div className="skill-card">
              <h4>Data &amp; Infrastructure</h4>
              <div className="tags">
                <Tag>Pandas</Tag>
                <Tag>NumPy</Tag>
                <Tag>MySQL</Tag>
                <Tag>PostgreSQL</Tag>
                <Tag>Kafka</Tag>
                <Tag>Redis</Tag>
                <Tag>Git / GitHub</Tag>
                <Tag>Gradio</Tag>
              </div>
            </div>
            <div className="skill-card">
              <h4>Languages</h4>
              <div className="tags">
                <Tag>Java</Tag>
              </div>
            </div>
          </Reveal>
        </section>

        <section id="projects" className="pf-section">
          <Reveal className="sec-head">
            <div className="sec-num mono">03 · WORK</div>
            <div className="sec-title display">Projects</div>
            <div className="sec-sub">Three systems, three different problems — security, legal access, and agriculture.</div>
          </Reveal>

          <Reveal>
            <Project
              date="JULY 2026"
              title="Behavioral Anomaly Detection for Cybersecurity"
              url="https://tinyurl.com/mrax9es7"
              stack={["Python", "PyTorch", "Scikit-learn", "Kafka", "Redis", "FastAPI", "PostgreSQL", "React"]}
              bullets={[
                "Architected a three-layer platform — batch ML pipeline, live dashboard, real-time streaming — modeling normal behavior across 3 entity types (users, service accounts, edge devices).",
                "Generated and scored 20,000 synthetic sessions per run, with 8% cold-start entities and 2% injected attacks, to validate detection under realistic class imbalance.",
                "Built a dual-detector engine (Isolation Forest for cold-start entities, LSTM Autoencoder over 5-session sliding windows) fused via percentile-rank normalization.",
                "Trained a RandomForest classifier to categorize alerts into 6 attack types, with a z-score-based explainability module for plain-language analyst alerts.",
                "Engineered a FastAPI + PostgreSQL/TimescaleDB backend, a React dashboard, and a Kafka + Redis streaming pipeline with per-entity state via the Okta API.",
              ]}
              metrics={[{ text: "89% precision @ top-1% alert budget" }, { text: "18,600+ sessions scored", amber: true }]}
            />
            <Project
              date="MARCH 2026"
              title="Nyaya Mitra — AI Legal Document Assistant"
              url="https://tinyurl.com/prtwo2"
              stack={["Python", "Groq API", "Gradio", "PyPDF2", "gTTS"]}
              bullets={[
                "Built a multilingual legal-document assistant using LLaMA 3.1 to parse and simplify FIRs and court notices for rural populations across 4+ regional languages.",
                "Designed a structured extraction pipeline converting dense legal jargon into JSON-formatted, actionable insights.",
                "Integrated text-to-speech support across 4+ regional languages, improving accessibility for semi-literate users.",
              ]}
              metrics={[{ text: "4+ regional languages" }]}
            />
            <Project
              date="JANUARY 2025"
              title="Crop Recommendation System — Full-Stack Application"
              url="https://tinyurl.com/gprth3"
              stack={["Python", "Scikit-learn", "Flask", "Node.js", "Express", "MongoDB", "OpenWeatherMap API"]}
              bullets={[
                "Designed a 3-tier full-stack application using Flask for ML model inference and Node.js/Express for API orchestration.",
                "Modeled soil and meteorological parameters (NPK, pH, rainfall) for crop selection.",
                "Optimized MongoDB queries and indexing, cutting data retrieval and response times.",
                "Integrated OpenWeatherMap API to deliver real-time agricultural analytics through an interactive UI.",
              ]}
              metrics={[{ text: "90%+ prediction accuracy" }, { text: "40% faster queries", amber: true }]}
            />
          </Reveal>
        </section>

        <section id="certifications" className="pf-section">
          <Reveal className="sec-head">
            <div className="sec-num mono">04 · CREDENTIALS</div>
            <div className="sec-title display">Certifications &amp; Education</div>
          </Reveal>
          <Reveal className="card-row">
            <div className="info-card">
              <div className="icon">
                <Award size={24} />
              </div>
              <h4>Applied Machine Learning in Python</h4>
              <div className="sub">University of Michigan</div>
              <div className="meta mono">DEC 2025</div>
            </div>
            <div className="info-card">
              <div className="icon">
                <GraduationCap size={24} />
              </div>
              <h4>B.Tech, Computer Science</h4>
              <div className="sub">Vellore Institute of Technology, Bhopal — AI &amp; ML Specialization</div>
              <div className="meta mono">CGPA 8.68/10 · EXPECTED 2027</div>
            </div>
          </Reveal>
        </section>

        <section id="contact" className="pf-section">
          <Reveal className="contact-box">
            <h2 className="display">Let's build something.</h2>
            <p>Open to AI/ML engineering roles and collaborations — reach out directly, or find me on GitHub and LinkedIn.</p>
            <div className="contact-grid">
              <a href={`mailto:${EMAIL}`} className="btn btn-primary">
                <Mail size={16} /> {EMAIL}
              </a>
              <a href={`tel:${PHONE_TEL}`} className="btn btn-outline">
                <Phone size={16} /> {PHONE_DISPLAY}
              </a>
              <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="btn btn-outline">
                GitHub
              </a>
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="btn btn-outline">
                LinkedIn
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="pf-footer">
        <div className="wrap">Ayushi — AI/ML Engineer · Bengaluru, India</div>
      </footer>
    </div>
  );
}
