# Ayushi Kashyap — Portfolio

A React + Vite portfolio for an AI/ML engineer. Editorial type, a navy / ice / teal / amber palette, a credentials section sourced from LinkedIn, and a project showcase sourced from GitHub.

## Run it locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`). Node.js 18+ is required.

## Project structure

```
ayushi-portfolio/
├── index.html                 entry HTML, fonts, SEO + social meta, JSON-LD
├── public/
│   ├── Ayushi-Kashyap-Resume.pdf
│   ├── ayushi-portrait.jpg    hero portrait (GitHub avatar)
│   ├── favicon.svg
│   ├── og.png                 1200×630 social-share card
│   ├── robots.txt
│   └── sitemap.xml
└── src/
    ├── main.jsx               mounts the app and loads the stylesheet
    ├── Portfolio.jsx          page layout, sections, interactions
    ├── data.js                profile, links, skills, projects, certifications
    ├── techIcons.jsx          Simple Icons mapping + logo fallbacks
    └── styles.css             theme tokens, layout, responsive rules
```

## Editing content

- **Profile, links, stats** → `PROFILE`, `STATS`, `FACTS` in `src/data.js`
- **Skills + logo wall** → `TECH` and `SKILL_GROUPS` in `src/data.js`
- **Projects** → `PROJECTS` in `src/data.js`. Every card needs `title`, `date`, `url`, `description`, `stack`, and either `featured: true` or `featured: false`.
- **Certifications + education** → `CERTS` and `EDUCATION` in `src/data.js`
- **Colors and type** → the `:root` block at the top of `src/styles.css`

## Theme

```css
--canvas: #0b1220;      /* navy page */
--ink: #121b2e;         /* raised surfaces and dark bands */
--cream: #e7ecf5;       /* ice text and light cards */
--accent: #4fd8c4;      /* teal */
--accent-soft: #f2a94e; /* amber */
```

The type pairing is Instrument Serif (display), Manrope (body), and JetBrains Mono (labels). The palette is the one used by the deployed portfolio: `#0B1220`, `#121B2E`, `#182342`, `#243252`, `#E7ECF5`, `#8FA1BD`, `#5B6B87`, `#4FD8C4`, `#F2A94E`.

## Projects shown

The site highlights 11 project repositories from [@ayushikashyap1207](https://github.com/ayushikashyap1207): LedgerMind, Nyaya Mitra v2, PresentIQ, Behavioural Anomaly Detection, IntentFlow, Pothole Detector, NYAYA-MITRA, Crop Recommendation, Book Recommendation, EventHub India, and Book Store Management.

Each has a GitHub link, a short description, highlights, metrics where available, and a tech-stack chip row. The archive card links to all 16 public repositories. Profile, portfolio, résumé, and language-practice repos are intentionally excluded from the project grid.

## Certifications

The credentials come from the public LinkedIn profile:

- Data Labeling Job Simulation — Forage, Jul 2026
- Introduction to Internet of Things — NPTEL, May 2026
- Computer Vision — Vityarthi, Mar 2026
- Applied Machine Learning in Python — University of Michigan / Coursera, Dec 2025
- Graphs Camp — AlgoUniversity, Jun 2025
- Cloud Computing — NPTEL, May 2025
- Data Structures and Analysis — Apna College, Aug 2023

LinkedIn's own page auth-walls automated requests; these details were collected from the public profile search result. Certificate links are in `CERTS` in `src/data.js`.

## Assets

- **Portrait:** replace `public/ayushi-portrait.jpg` with a professional headshot when you have one. The circular crop and cool teal duotone are applied in CSS.
- **Résumé:** replace `public/Ayushi-Kashyap-Resume.pdf`; the nav and hero download links point to it.
- **Social card:** `public/og.png` is already generated at 1200×630. Regenerate it if the name, role, or headline changes.
- **Logos:** brand marks come from [Simple Icons](https://simpleicons.org/). Brands without a mark (OpenAI, Groq, ChromaDB, Llama, Tesseract, gTTS) use a monogram tile.

## Build and deploy

```bash
npm run build
npm run preview
```

`dist/` is a static bundle that can be deployed to Vercel, Netlify, GitHub Pages, or any static host. The canonical URL and social image currently point to `https://portfolio-ayushi-268a.vercel.app/`; update those in `index.html` and `public/robots.txt` / `public/sitemap.xml` if the domain changes.
