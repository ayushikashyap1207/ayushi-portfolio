# Ayushi — AI/ML Engineer Portfolio

A React + Vite portfolio site.

## Run it locally in VS Code

1. Unzip this folder and open it in VS Code.
2. Open a terminal in VS Code (`` Ctrl+` `` / `` Cmd+` ``) and make sure you're in this project folder.
3. Install dependencies:
   ```
   npm install
   ```
4. Start the dev server:
   ```
   npm run dev
   ```
5. Open the URL it prints (usually `http://localhost:5173`) in your browser.

You need [Node.js](https://nodejs.org) 18+ installed. Check with `node -v` in your terminal.

## Project structure

```
ayushi-portfolio/
├── index.html          entry HTML, loads src/main.jsx
├── package.json         dependencies + scripts
├── vite.config.js        Vite/React config
└── src/
    ├── main.jsx          mounts the app
    └── Portfolio.jsx      the portfolio page (all content + styles)
```

## Editing content

Everything — profile text, skills, projects, certifications, contact info — lives in
`src/Portfolio.jsx`. It's plain JSX with a few small components (`Project`, `Tag`, `Metric`, etc.),
so updating a bullet point, adding a new project, or changing a link is just editing text in that file.

## Build for deployment

```
npm run build
```

This outputs a static `dist/` folder you can deploy to Vercel, Netlify, GitHub Pages, or any static host.
