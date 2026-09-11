# UA Force portfolio content

Added 11 September 2026 at the owner's request to make UA Force useful as a portfolio case for frontend / frontend-focused full-stack opportunities.

## Content and routes

- `/en/projects/ua-force`, `/ua/projects/ua-force`: shipped scope, role, technical challenges, limitations and roadmap.
- `/en/blog/ua-force-development`, `/ua/blog/ua-force-development`: distinct first-person development story, playtest feedback and lessons.
- Entries live in `src/jsonData/projects.json` and `src/jsonData/posts.json`. The optional `intro.slug` preserves the display name while allowing a clean project URL; existing project URLs are unchanged.
- The `editorial` layout renders the new entries. Existing content still uses the original block renderer.
- Homepage feature, project/blog listings and cross-links make both entries discoverable.
- Contact CTA goes directly to the owner's public email and LinkedIn. The Bella AI link connects the independent project to commercial experience.

## Evidence and claim boundaries

Source evidence reviewed in the existing UA Force workspace: `reboot/docs/PUBLIC_DEMO_AND_COOP.md`, `ONLINE_VERIFICATION.md`, `MOBILE_CONTROLS.md`, `GROWTH_MEASUREMENTS.md`, `src/game/pending-actions.ts`, and the September 11 gameplay capture notes.

The original idea was developed with a team. Current work is AI-assisted: the owner directs the product, requirements, prioritisation and hands-on acceptance. Do not rewrite this as an unsupported claim of sole manual implementation or asset authorship.

Game runtime is TypeScript / Canvas 2D / Vite. The old PlayCanvas viewer is not the public game. Co-op has two players and host authority, with signaling/STUN/TURN dependencies. Physical mobile coverage and wider network reliability remain testing priorities. No audience size or retention claim is made. This page does not publish private design discussions or all future mechanics.

## Media

`public/portfolio/uaforce/gameplay.png`: existing gameplay lightning frame, copied from the current game's marketing assets. `coop.mp4` and `coop-cover.jpg`: September 11 two-client co-op capture from a Mac. This is not represented as physical mobile footage. The video is muted by default, does not autoplay and uses `preload="none"`.

No new paid services, generation, tracking providers or dependencies were added.

## Search and sharing

Unique title/description, canonical, English/Ukrainian/x-default alternate URLs, Open Graph, Twitter large-image metadata, author and dated JSON-LD (`CreativeWork` / `BlogPosting` and breadcrumbs). Sitemap and existing LLM discovery files link to the new content. These provide indexable signals, not a ranking guarantee.

References: [Next.js Pages Head](https://nextjs.org/docs/pages/api-reference/components/head), [Google Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article).

## Validation

- Production build includes type validation and all four new static routes.
- HTTP/HTML checks: one H1, canonical, all language alternates, valid JSON-LD, OG image, muted video, contact and cross-links, homepage/index discovery, media URLs and sitemap.
- Existing Bella AI and blog `states` routes remain available.
- In-app browser: desktop 1366 × 900 and mobile 390 × 844; no horizontal overflow; language switch and project/blog client navigation update canonical and title. No console errors observed on the new pages.
- Responsive inspection exposed cramped existing navigation: small-screen links now use a two-row grid with 40px targets. Blog list now orders by date, so new content appears first.
- Browser tests remain silent; no contact forms submitted.
