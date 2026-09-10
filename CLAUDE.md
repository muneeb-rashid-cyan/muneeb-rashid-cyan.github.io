# Repository guidance

Muneeb Rashid's static portfolio. HTML, CSS, and vanilla JavaScript; no build, package installation, framework, CDN, or runtime dependency is required.

## Content authority

`Muneeb_Rashid_AI_Engineer_KSA.pdf` is the single source of truth for career content. Read both pages and PDF link annotations before changing claims. Current CV: Senior AI Engineer, Microsoft Certified AI-300, **5+ years**, **Riyadh, Saudi Arabia**, transferable Iqama. Do not infer a different experience total from calendar dates.

Experience: Arbisoft, Riyadh (Nov 2024–Present); PureLogics, Remote USA (May 2023–Oct 2024); SmartFun Studios, Remote USA (Jun 2020–Apr 2023); Yottabyte, Pakistan, **part-time** (Jun 2018–Feb 2020).

Only use CV-supported metrics with their exact context: MedQuery's healthcare platform serves 100,000+ active users; Storybook Studio serves 10,000+ daily active users, workflows cover 50+ scenes and voiceover in 15+ languages; FaceLite inference improves from 8s to 800ms (90% faster). No unsourced accuracy, savings, throughput, or availability claims.

The three selected CV projects remain separate from the **seven verified GitHub builds** now shown in the open-source collection. GitHub profile: https://github.com/muneeb-rashid-cyan. README/code-derived claims for those seven repositories must stay grounded in their public implementation. `advancement/` contains historical learning advice and proposed projects; it is not evidence of completed work. See `review/CONTENT_AUDIT.md` for the full reconciliation.

## Files and design

- `index.html`: semantic page content, native project details, social metadata and Person JSON-LD.
- `style.css`: ivory/ink/blue/lime design, responsive grids, print and reduced-motion styles.
- `script.js`: progressive enhancements for mobile navigation, project filtering, copy-email feedback, section highlighting, and finite entrance animation.
- `assets/`: local favicon and social-preview PNG.
- `robots.txt`, `sitemap.xml`: search discovery.
- `review/`: content audit, browser results and review screenshots; not linked from the public portfolio.

Sections: hero → selected projects → experience → expertise → about/education → contact. Preserve existing anchor IDs when possible. Content, navigation, contact links, and architecture disclosures must work without JavaScript. Respect reduced motion and keep keyboard focus visible. Never display a sent-message confirmation for a `mailto:` action.

Use the existing PDF filename for all downloads. Preserve the CV and user-owned notes. Avoid external fonts, icon libraries, large bitmap hero assets, continuous canvas animation, or unnecessary dependencies.

## Preview and publishing

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Preview: http://127.0.0.1:8000. Hosting: GitHub Pages, root of `main`. Public URL: https://muneeb-rashid-cyan.github.io/.

Do not commit or push during the current review task. README.md has exact commands the user can execute after approval. Stage the CV explicitly so the deployed download exists. Do not stage unrelated `advancement/` content.
