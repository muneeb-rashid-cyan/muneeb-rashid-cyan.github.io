# Portfolio validation

Tested 10 September 2026 on the local preview at http://127.0.0.1:8000. No commit, push, or deployment was performed.

## Browser and functional testing

**163 browser checks passed** in headless Google Chrome via Playwright. The reproducible script is [verify.cjs](verify.cjs); individual assertions and browser version are recorded in [browser-results.json](browser-results.json).

- Reflow at **320, 360, 390, 430, 650, 651, 768, 820, 1024, 1280, 1440, and 1920px**: all seven content anchors visible, no horizontal overflow.
- All navigation anchors resolve and clear the sticky header. Contact can stop at the bottom of the document when there is not enough remaining content to align it at the top.
- All project filters select the correct cards and announce count/state; every architecture disclosure opens with Enter and closes with Space.
- Mobile menu opens/closes, announces expanded state, closes on Escape, restores focus, moves focus to the selected section, and resets correctly across breakpoints.
- CV download succeeds with the original PDF filename; all referenced local resources return HTTP 200.
- Email/phone match PDF annotations. Clipboard success contains the exact email; simulated clipboard denial displays a truthful fallback.
- No duplicate IDs; one H1; valid Person JSON-LD; external links have `noopener` protection.
- Reduced-motion preferences disable smooth scrolling and animation.
- With JavaScript disabled: all ten project cards, navigation, contact links, and native architecture disclosures remain available; inactive enhancement controls stay hidden.
- Skip link is the first keyboard stop and focuses main content. No JavaScript errors or failed page-resource requests.
- Axe WCAG 2.1 A/AA and best-practice tests on mobile and desktop, including expanded architecture details: **zero violations**. Additional visible-label/accessibility-name checks pass. Reports: [mobile](axe-390.json), [desktop](axe-1440.json).

The optional experimental `p-as-heading` heuristic flags the large hero subtitle. It is intentionally a supporting paragraph beneath the page heading, rather than a section heading; it is not included in the WCAG conformance rule set. Automated checks do not substitute for a full assistive-technology audit. Safari and Firefox were not exercised in this session.

## Lighthouse

| Local lab measurement | Mobile | Desktop |
|---|---:|---:|
| Performance | 100 | 100 |
| Accessibility | 100 | 100 |
| Best practices | 100 | 100 |
| SEO | 100 | 100 |
| First contentful paint | 0.9 s | 0.9 s |
| Largest contentful paint | 1.2 s | 1.1 s |
| Total blocking time | 0 ms | 0 ms |
| Cumulative layout shift | 0 | 0 |

Full reports: [mobile Lighthouse](lighthouse-mobile.html), [desktop Lighthouse](lighthouse-desktop.html). Summary data: `lighthouse-mobile.json`, `lighthouse-desktop.json`.

Fixed the initial mobile navigation layout shift by setting its responsive state before main content paints. Replaced an overridden logo label with its natural accessible name. The remaining Lighthouse suggestions concern local-server caching, serving unminified source CSS, and the small stylesheet request chain. The site remains directly editable with no build step. Production caching and real-user timings depend on GitHub Pages and the visitor's network/device; these scores are local lab results.

HTML/CSS/JavaScript total: approximately **52 KB**, down from **119 KB** (56% reduction). No external fonts, icon CDN, framework, animation library, or runtime requests. Artwork is SVG/CSS; the social-preview PNG is not loaded by the page itself.

## Link checks and source limits

| Destination | Result |
|---|---|
| Every local section/asset/CV link | Resolves; resources HTTP 200 |
| GitHub profile | HTTP 200; public repository metadata also verified |
| Existing public portfolio / canonical URL | HTTP 200; remains the previously deployed version until the user publishes |
| LinkedIn | URL matches CV; HTTP 200 serves an automated-visitor challenge, so profile content was not independently verified |
| Email / telephone | Exact CV destinations validated; did not send email or place calls |
| Project source / live demo URLs | Seven public repository links resolve to the verified GitHub builds. No live demo URL was found in the reviewed repositories; none invented. The three CV project titles remain separate CV case studies. |

## Visual review

Inspected desktop, mobile, and tablet screenshots. Refined body typography and breakpoint layouts. Final artifacts:

- [Desktop hero](desktop-hero.png)
- [Full desktop page](desktop.png)
- [Full mobile page](mobile.png)
- [Full tablet page](tablet.png)

## Run the browser checks again

The website itself needs only Python's built-in server. Optional browser testing uses packages installed outside the repository:

```bash
npm install --prefix /tmp/portfolio-review-tools --no-audit --no-fund playwright @axe-core/playwright
NODE_PATH=/tmp/portfolio-review-tools/node_modules node review/verify.cjs
```

Run the server on port 8000 first. The test script uses an installed Google Chrome, creates an isolated headless profile, and refreshes the review artifacts. No test dependencies are needed by the deployed site.
