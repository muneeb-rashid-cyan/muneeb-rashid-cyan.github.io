# CLAUDE.md

Guidance for Claude Code (and any AI assistant) working in this repository.

## What this is

The personal portfolio website for **Muneeb Rashid — Senior AI Engineer** (Generative AI,
Agentic AI, MCP, LLMOps, MLOps). It is a single-page, static site with no build step and no
framework.

- **Live URL:** https://muneeb-rashid-cyan.github.io/
- **Repo:** https://github.com/muneeb-rashid-cyan/muneeb-rashid-cyan.github.io
- **Hosting:** GitHub Pages (serves the root of the `main` branch directly)

## Stack

Pure **HTML + CSS + vanilla JavaScript**. No npm, no bundler, no dependencies to install.
External resources are loaded via CDN only:

- Google Fonts — Inter, Space Grotesk, JetBrains Mono
- Font Awesome 6.5 (icons)

## Files

| File         | Purpose                                                                   |
|--------------|---------------------------------------------------------------------------|
| `index.html` | All page content and structure (single page, anchor-linked sections)      |
| `style.css`  | All styling — CSS custom properties, grid layouts, responsive breakpoints |
| `script.js`  | All interactivity — class-based vanilla JS, initialized on `DOMContentLoaded` |
| `CLAUDE.md`  | This file                                                                 |

> Add `Muneeb_Rashid_Resume.pdf` to the repo root — the "Download Resume" button in the
> About section links to it. Without the file that link 404s.

## Page sections (in `index.html`)

`hero` → `about` → `skills` → `experience` → `projects` → `education` → `contact` → footer.
Nav links and the mobile menu point to these section `id`s.

## How it works (`script.js`)

Everything is a small ES6 class, instantiated once at the bottom of the file:

- `NeuralCanvas` — animated neural-network particle background on the hero (`#particleCanvas`)
- `TypeWriter` — rotating job titles in the hero. **Edit the phrases array here**, not in HTML.
- `ScrollAnimator` — custom AOS via `IntersectionObserver`; elements opt in with `data-aos`
  (and optional `data-aos-delay`)
- `CounterAnimator` — animates hero stat numbers; driven by `data-count` attributes
- `ProgressAnimator` — animates the language skill bars; driven by `data-width`
- `Navbar`, `MobileMenu`, `BackToTop`, `ContactForm` — UI behaviors
- The contact form has **no backend** — it builds a `mailto:` link to `muneebcyan@gmail.com`

## Design system

Dark & futuristic. Core tokens live as CSS custom properties at the top of `style.css`:

- Background: `#0a0a0f`
- Accent cyan: `#00d4ff` (`--cyan`) · Accent purple: `#7c3aed` (`--purple`)
- Tag colors: `.tag-cyan` / `.tag-purple`; gradient text via `.text-gradient`

Keep new UI consistent with these tokens and the existing card/section patterns rather than
introducing new colors or component styles.

## Content rules (important)

**The résumé is the source of truth.** Keep the site aligned with Muneeb's current CV:

- Title: Senior AI Engineer | Generative AI · Agentic AI · MCP · LLMOps · MLOps
- 8+ years experience · AI products serving 100,000+ users at 95%+ accuracy · AWS, Azure, GCP
- Experience timeline: **Arbisoft** (Plano, TX, USA — current) → **PureLogics** → **SmartFun
  Studios** → **Yottabyte**
- Projects link to **real GitHub repos** under https://github.com/muneeb-rashid-cyan — when
  adding a project card, use the actual repo URL and a description grounded in the repo's README.
- Do **not** reintroduce relocation/visa or KSA/Gulf "Vision 2030" phrasing (intentionally removed).

## Local preview

No build needed. Open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Deploying

GitHub Pages auto-publishes on push to `main`:

```bash
git add -A
git commit -m "Update portfolio content"
git push origin main
```

Changes go live at https://muneeb-rashid-cyan.github.io/ within a minute or two.

## Conventions

- Match the existing indentation (2 spaces) and the sectioned comment banners in each file.
- Prefer editing the existing classes/patterns over adding new ones.
- No frameworks, no build tooling, no new runtime dependencies — keep it vanilla.
