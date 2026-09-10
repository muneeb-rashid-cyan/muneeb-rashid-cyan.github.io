# Muneeb Rashid — AI Engineer portfolio

A responsive, dependency-free portfolio built with HTML, CSS, and vanilla JavaScript. Career content comes from `Muneeb_Rashid_AI_Engineer_KSA.pdf`; the open-source collection is grounded in repository READMEs and source code from Muneeb's public GitHub account.

## Review locally

```bash
cd /Users/muneeb.rashid/Documents/portfolio_website
python3 -m http.server 8000 --bind 127.0.0.1
```

Visit http://127.0.0.1:8000. No build or installation is needed. If the preview server is already running, use the URL directly.

- [Content audit](review/CONTENT_AUDIT.md): all removed, corrected, retained, and restored claims.
- [Validation report](review/VALIDATION.md): test results and limitations.
- [Desktop preview](review/desktop.png), [mobile preview](review/mobile.png), [tablet preview](review/tablet.png).

## Interactions

The mobile menu supports keyboard navigation and Escape; project filters announce their result count. Each architecture walkthrough uses a native disclosure that also works without JavaScript. Email and phone links open the visitor's configured application. Copy-email reports success only when the clipboard write succeeds. Animations finish automatically and respect reduced motion.

All assets are local. The social-preview PNG is only referenced by social metadata, so it is not downloaded during normal browsing. CV downloads point to the original PDF.

## Publish only after approval

Changes are on `main`. Nothing has been committed or pushed. Inspect the diff and stage only the portfolio changes:

```bash
cd /Users/muneeb.rashid/Documents/portfolio_website
git branch --show-current
git diff --check
git diff -- index.html style.css script.js CLAUDE.md
git add index.html style.css script.js CLAUDE.md README.md robots.txt sitemap.xml assets/ review/ Muneeb_Rashid_AI_Engineer_KSA.pdf
git diff --cached --stat
git commit -m "Redesign AI engineer portfolio and align content with CV"
git push origin main
```

The existing GitHub Pages configuration serves the repository root. Public site: https://muneeb-rashid-cyan.github.io/. Unrelated `advancement/` files are deliberately excluded from the staging command.
