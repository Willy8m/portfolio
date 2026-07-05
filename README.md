# Portfolio

A plain HTML/CSS/JS portfolio site — no build step, no framework, no dependencies.

## Structure

```
portfolio/
├── index.html      # page content and structure
├── css/style.css   # all visual styling (design tokens at the top)
└── js/main.js      # mobile nav, scroll progress, ridge animation, fade-ins
```

## Running it locally

You don't need a server for a static site like this — just open `index.html`
directly in a browser to preview it. (Some browsers restrict JS features when
opening files directly with `file://`; if anything looks off, run a tiny local
server instead: `python3 -m http.server` from inside the folder, then visit
`http://localhost:8000`.)
