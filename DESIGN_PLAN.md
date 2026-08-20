# DJ Cannix — Design Plan

## Subject & Audience
**DJ Cannix** — Belgian DJ playing clubs, festivals, private events. Audience: event bookers, club promoters, fans following gigs. The site must feel **nocturnal, energetic, professional** — like walking into a well-run club.

---

## Color Tokens (4 core + neutrals)

| Token | Hex | Role |
|-------|-----|------|
| `bg-deep` | `#0A0A0F` | Page background — near-black with subtle blue undertone (club darkness) |
| `bg-surface` | `#111118` | Cards, modals, nav bar — one step up from deep |
| `fg-primary` | `#F0F0F5` | Primary text — soft white, not harsh |
| `fg-muted` | `#888899` | Secondary text, captions |
| `accent-cyan` | `#00E5CC` | **Signature accent** — electric teal/cyan (LED strip, visualizer, laser) |
| `accent-amber` | `#FFB800` | Warm accent — secondary CTAs, hover gold (stage light warmth) |
| `border-subtle` | `#222233` | Hairline borders, dividers |
| `focus-ring` | `#00E5CC` | Focus outline (same as accent) |

**Why not the defaults:** Avoids the "near-black + acid green" cliché by using **teal-cyan** (club LED/laser vernacular) + **amber** (stage wash) instead of pure green/red. The blue undertone in `bg-deep` makes it feel like a darkened room, not a void.

---

## Typography

| Role | Font | Weights | Notes |
|------|------|---------|-------|
| **Display** | **Syne** (Google Fonts) | 700, 800 | Wide, geometric, slightly extended — feels like a festival poster / soundwave. Used for logo, hero headlines, section titles. |
| **Body** | **DM Sans** (Google Fonts) | 400, 500, 600 | Neutral, clean, excellent readability. UI text, paragraphs, forms. |
| **Mono / Utility** | **JetBrains Mono** | 400, 500 | Timecodes, social handles, technical details. |

**Type scale (fluid, clamp):**
- `--text-xs`: 0.75rem / 12px
- `--text-sm`: 0.875rem / 14px
- `--text-base`: 1rem / 16px
- `--text-lg`: 1.125rem / 18px
- `--text-xl`: 1.375rem / 22px
- `--text-2xl`: clamp(1.75rem, 3vw + 1rem, 2.5rem)
- `--text-3xl`: clamp(2.25rem, 4vw + 1.25rem, 3.5rem)
- `--text-4xl`: clamp(3rem, 5vw + 1.5rem, 5rem) — **logo / hero only**

---

## Layout Concept

```
┌─────────────────────────────────────────────────────────────┐
│  SPLASH (full viewport)                                     │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  [LOGO ANIMATION]  ← center, scales up + glow       │   │
│  │       "CANNIX"                                        │   │
│  │  [bg video: club crowd / laser / DJ hands]          │   │
│  │                    [ GA VERDER ] ← btn, accent-cyan  │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                    │ click / scroll
                    ▼
┌─────────────────────────────────────────────────────────────┐
│  MAIN SITE — persistent header                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ LOGO          NAV (Home About Gallery Videos Contact)  │   │
│  │                  [☰] mobile                          │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ HOME: Hero (DJ photo + tagline + next gig CTA)      │   │
│  │ ABOUT: Split — bio left, stats/skills right          │   │
│  │ GALLERY: Masonry grid, lightbox, filtered by year    │   │
│  │ VIDEOS: Grid with play overlays, modal player        │   │
│  │ CONTACT: Form (Formspree/Netlify) + social links     │   │
│  └─────────────────────────────────────────────────────┘   │
│  FOOTER: social, legal, mailto                             │
└─────────────────────────────────────────────────────────────┘
```

**Responsive breakpoints:**
- Mobile: `< 640px` — hamburger, stacked sections, single-col grids
- Tablet: `640–1024px` — 2-col grids, condensed nav
- Desktop: `> 1024px` — full layout, hover reveals

---

## Signature Element: The Splash

**The one thing visitors remember:** Full-screen entry with:
1. **Background video** (muted, loop, plays inline) — club atmosphere, lasers, crowd energy
2. **Logo animation** — SVG logo draws in (stroke-dashoffset), then fills with `accent-cyan` glow pulse
3. **"Ga verder" button** — subtle float animation, ripple on click → smooth transition to main site (page transition via Next.js `app` router + Framer Motion layout animation)

**Reduced motion:** Respects `prefers-reduced-motion` — splash shows static logo + video poster, button appears immediately.

---

## Motion & Interaction

| Element | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| Logo draw (splash) | Stroke reveal → fill | 1.2s | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Logo glow pulse | Box-shadow scale | 2s loop | `ease-in-out` |
| Page transition | Shared layout (logo) + fade | 0.5s | `ease-out` |
| Nav link hover | Underline slide | 0.2s | `ease-out` |
| Card hover (gallery/video) | Scale 1.02 + glow border | 0.25s | `ease-out` |
| Form input focus | Border color + ring | 0.15s | `ease-out` |
| Mobile menu | Slide from right + fade | 0.3s | `cubic-bezier(0.16, 1, 0.3, 1)` |

**Restraint:** Only splash + page transition + micro-interactions. No scroll-jacking, no parallax, no auto-playing carousels.

---

## Accessibility Floor

- Semantic HTML5 (`header`, `nav`, `main`, `section`, `footer`)
- Focus visible on all interactive elements (`focus-ring` token)
- `prefers-reduced-motion` respected globally
- Color contrast: WCAG AA on all text (tested: `fg-primary` on `bg-deep` = 15.8:1)
- Alt text for all images, `aria-label` for icon buttons
- Form labels associated, error states announced
- Video: `playsinline`, `muted`, `loop`, `poster`, no autoplay with sound

---

## Tech Stack

- **Framework:** Next.js 15 (App Router, TypeScript, Turbopack)
- **Styling:** Tailwind CSS v4 (CSS-first config, `@theme` directive)
- **Animation:** Framer Motion (layout animations, shared element transitions)
- **Forms:** React Hook Form + Zod validation → Formspree/Netlify Functions
- **Images:** `next/image` with `priority` on splash poster, blur placeholders
- **Video:** `<video>` element with `preload="metadata"`, poster frame
- **Deployment:** Vercel (auto CI/CD from `main`)
- **CI:** GitHub Actions → lint, typecheck, build, deploy preview

---

## File Structure (planned)

```
src/
├── app/
│   ├── layout.tsx           # Root layout, fonts, providers
│   ├── page.tsx             # Splash page (entry)
│   ├── globals.css          # Tailwind v4 @theme, CSS vars
│   ├── components/
│   │   ├── Splash.tsx       # Logo animation + video bg + CTA
│   │   ├── Header.tsx       # Persistent nav + mobile menu
│   │   ├── Footer.tsx
│   │   ├── ui/              # Button, Input, Card, Modal, etc.
│   │   ├── Gallery.tsx      # Masonry + lightbox
│   │   ├── VideoGrid.tsx    # Video cards + modal player
│   │   └── ContactForm.tsx  # RHF + Zod + toast
│   ├── (main)/              # Route group for main site
│   │   ├── layout.tsx       # Header + Footer wrapper
│   │   ├── page.tsx         # Home
│   │   ├── about/page.tsx
│   │   ├── gallery/page.tsx
│   │   ├── videos/page.tsx
│   │   └── contact/page.tsx
│   └── api/
│       └── contact/route.ts # Serverless form handler (optional)
├── lib/
│   ├── utils.ts             # cn(), formatters
│   └── validations.ts       # Zod schemas
├── content/
│   ├── gallery.ts           # Image metadata (src, alt, year, event)
│   ├── videos.ts            # Video metadata (src, poster, title, desc)
│   └── bio.ts               # About copy
└── public/
    ├── videos/
    │   └── splash-bg.mp4    # Splash background (compressed, ~2MB)
    └── images/
        └── logo-cannix.svg  # Optimized SVG logo
```

---

## CI/CD Pipeline (`.github/workflows/ci-cd.yml`)

```yaml
name: CI/CD
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lint-typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '22', cache: 'npm' }
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck

  build:
    needs: lint-typecheck
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '22', cache: 'npm' }
      - run: npm ci
      - run: npm run build

  deploy-preview:
    needs: build
    if: github.event_name == 'pull_request'
    runs-on: ubuntu-latest
    steps:
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod=false'

  deploy-production:
    needs: build
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod=true'
```

---

## Content Placeholders (to be replaced with real assets)

| Asset | Spec | Status |
|-------|------|--------|
| Logo SVG | Single-path, stroke-based for draw animation | ⬜ Need from assets |
| Splash video | 1080p, 15-20s, H.264, ~2MB, poster frame | ⬜ Need from assets |
| Gallery images | 12 existing in `assets/images/` — rename, optimize | ✅ Ready |
| Video embeds | YouTube/Vimeo IDs or self-hosted MP4 | ⬜ Need from client |
| Bio copy | ~150 words NL/EN | ⬜ Need from client |
| Contact email / Formspree ID | | ⬜ Need from client |

---

## Next Steps

1. Initialize Next.js 15 project with Tailwind v4, TypeScript, ESLint
2. Create design tokens in `globals.css` via `@theme`
3. Build UI primitives (Button, Card, Input, Modal)
4. Implement Splash page with logo animation + video
5. Build main site layout + routing
6. Implement Gallery, Videos, Contact, About
7. Add Framer Motion page transitions
8. Configure CI/CD workflow
9. Deploy to Vercel preview → production