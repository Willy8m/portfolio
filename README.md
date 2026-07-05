# Portfolio

A plain HTML/CSS/JS portfolio site — no build step, no framework, no dependencies.

## Structure

```
portfolio/
├── index.html      # page content and structure
├── css/style.css   # all visual styling (design tokens at the top)
└── js/main.js      # mobile nav, scroll progress, ridge animation, fade-ins
```

## Before you deploy — things to personalize

- `index.html`: replace the placeholder email (`you@example.com`), GitHub/LinkedIn
  links, and the three project cards in the "Work" section with your real ones.
- Swap the last name / add one if you'd like it in the title tag and hero.
- Everything else (colors, fonts, spacing) lives in `css/style.css` under the
  "DESIGN TOKENS" section at the top if you want to tweak the palette.

## Running it locally

You don't need a server for a static site like this — just open `index.html`
directly in a browser to preview it. (Some browsers restrict JS features when
opening files directly with `file://`; if anything looks off, run a tiny local
server instead: `python3 -m http.server` from inside the folder, then visit
`http://localhost:8000`.)

## Deploying to Cloudflare Pages

1. **Create a GitHub repository** and push this folder to it:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. Go to the [Cloudflare dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Authorize Cloudflare to access your GitHub account and select this repository.
4. Build settings: since this is plain HTML/CSS/JS with no build step, leave the
   **build command** empty and set the **output directory** to `/` (the project root).
5. Click **Save and Deploy**. Cloudflare will give you a free `*.pages.dev` URL
   within a minute or two.
6. (Optional) Add a custom domain later under the project's **Custom domains** tab —
   free on Cloudflare Pages if you own a domain.

From now on, every `git push` to `main` automatically redeploys the live site.
