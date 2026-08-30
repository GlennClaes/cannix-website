# Cannix Website

[![Node.js 22](https://img.shields.io/badge/Node.js-22-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Next.js 16](https://img.shields.io/badge/Next.js-16-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![Vercel](https://img.shields.io/badge/Deployment-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

A production-ready marketing and booking website for Cannix, built with Next.js and deployed to Vercel. The project includes multilingual routing, a contact form, SEO metadata, accessibility-focused frontend work, and automated release and maintenance checks.

For infrastructure, DNS, deployment, and production configuration, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## Overview

- Marketing website and booking funnel for live DJ services
- Multilingual routing for Dutch, English, French, and German
- Contact form with validation and email delivery
- Search and metadata configuration for production deployment
- Automated CI, nightly QA checks, and major-release flow

## Tech Stack

- **Framework:** Next.js 16 (App Router, TypeScript, Turbopack)
- **Styling:** Tailwind CSS v4 (@theme directive)
- **Animation:** Framer Motion
- **Forms:** React Hook Form + Zod
- **Icons:** Lucide React
- **Deployment:** Vercel (native Git integration)
- **Runtime:** Node.js 22

## Getting Started

### Prerequisites

- Node.js 22+
- npm 10+

### Installation

```bash
# Clone repository
git clone <repository-url>
cd cannix-website

# Install dependencies
npm ci

# Copy environment template
cp .env.example .env.local
```

### Environment Variables

```env
# Optional: canonical site URL. Leave empty until a custom domain is connected.
SITE_URL=

# Resend (required for the contact form in production)
RESEND_API_KEY=re_...
MAIL_TO=bookings@cannix.be
MAIL_FROM=Cannix Website <bookings@cannix.be>

# Optional: Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in je browser.

### Build & Production

```bash
npm run build
npm run start
```

### Linting & Formatting

```bash
npm run lint
npm run typecheck
npm run format
```

## Documentation

- [SECURITY.md](./SECURITY.md) — security policy and responsible disclosure
- [CONTRIBUTING.md](./CONTRIBUTING.md) — contribution workflow and coding standards
- [DEPLOYMENT.md](./DEPLOYMENT.md) — Vercel, DNS, environment, and release setup
- [CHANGELOG.md](./CHANGELOG.md) — release history and policy
- [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) — community conduct expectations

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout, fonts, providers
│   ├── page.tsx                # Splash page (entry point)
│   ├── globals.css             # Tailwind v4 @theme, design tokens
│   ├── components/
│   │   ├── Splash.tsx          # Logo animation + video bg + CTA
│   │   ├── Header.tsx          # Persistent nav + mobile menu
│   │   ├── Footer.tsx
│   │   ├── ContactForm.tsx     # RHF + Zod form
│   │   └── ui/                 # Button, Input, Card, Modal
│   ├── (main)/                 # Route group for main site
│   │   ├── layout.tsx          # Header + Footer wrapper
│   │   ├── home/page.tsx       # Home hero + stats + upcoming
│   │   ├── about/page.tsx      # Bio, stats, philosophy
│   │   ├── gallery/page.tsx    # Masonry grid + lightbox
│   │   ├── videos/page.tsx     # Video grid + modal player
│   │   └── contact/page.tsx    # Contact form + FAQ
│   └── api/
│       ├── contact/route.ts    # Resend form handler
│       └── health/route.ts     # Monitoring healthcheck
├── lib/
│   ├── utils.ts                # cn(), formatters
│   └── validations.ts          # Zod schemas
├── content/
│   ├── gallery.ts              # Image metadata
│   ├── videos.ts               # Video metadata
│   └── bio.ts                  # About copy, socials, stats
└── public/
    ├── videos/
    │   └── splash-bg.mp4       # Splash background (add your own)
    └── images/
        ├── logo_cannix.png     # Logo (from assets)
        └── *.jpg               # Gallery images (from assets)
```

## Required Assets

Voeg deze assets toe aan `public/`:

| Bestand | Specificaties | Opmerking |
|---------|--------------|-----------|
| `public/videos/splash-bg.mp4` | 1080p, 15-20s, H.264, ~2MB, muted, loop | Achtergrondvideo splash |
| `public/videos/splash-poster.jpg` | 1920x1080, ~100KB | Poster frame voor video |
| `public/images/logo_cannix.png` | Transparant, ~120x54px | Logo in header/footer |

De gallery afbeeldingen worden automatisch gekopieerd vanuit `assets/images/`.

## Customization

### Design Tokens

Bewerk `src/app/globals.css` → `@theme` blok voor kleuren, typografie, spacing, shadows.

### Content

- **Bio/Stats/Socials:** `src/content/bio.ts`
- **Gallery items:** `src/content/gallery.ts`
- **Video items:** `src/content/videos.ts` (vervang YouTube IDs)

### SEO after launch

Verifieer de site in Google Search Console, dien `/sitemap.xml` in en voeg het bedrijfsprofiel (Google Business Profile) handmatig toe of claim het. Controleer adres-, categorie- en contactgegevens daar rechtstreeks; deze externe verificatie en profielinstellingen kunnen niet vanuit de repository worden uitgevoerd.


## Deployment

### Release strategy

- No release is created for every push.
- A release is created only for a true breaking change.
- Release detection checks for conventional breaking indicators:
  - `feat!:` or `fix!:`
  - `BREAKING CHANGE:` in the commit body
  - `!` in the commit subject
- When detected, GitHub Actions creates a `vX.0.0` tag and publishes a GitHub Release.

Example:

```bash
git commit -m "feat!: rewrite booking flow for multilingual forms"
```

Normal `feat`, `fix`, and `chore` commits do not trigger a release.

### Vercel deployment

1. Push the repository to GitHub.
2. Import it into Vercel.
3. Add the required environment variables in Vercel project settings for preview and production:
   - `RESEND_API_KEY`
   - `MAIL_TO`
   - `MAIL_FROM` (must use a verified Resend sender)
   - `SITE_URL=https://cannix.be` for production
4. Connect the repository to Vercel. Preview deployments are created automatically for pull requests and production deployments on `main`.

Resend requires domain verification (SPF/DKIM). Do not use `onboarding@resend.dev` for a production sender.

### Nightly automation

The nightly workflow runs automatically at 00:00 CET and validates:

- `npm audit --omit=dev --audit-level=high`
- ESLint
- TypeScript
- production build
- bundle-size budget
- SEO smoke checks for `/`, `/robots.txt`, and `/sitemap.xml`
- Lighthouse
- secrets scan and dependency checks

Results are logged to the nightly log directory and dashboard.

### Docker

```bash
docker compose up --build
```

De compose-configuratie werkt zonder `.env.local`; zet `RESEND_API_KEY`, `MAIL_TO` en `MAIL_FROM` als environment variables voor een werkende mailflow.

### Andere Platforms

```bash
npm run build
# Output in .next/ - deploy naar Node.js hosting
```

## Accessibility Checklist

- [x] Semantic HTML5 landmarks
- [x] Focus visible states (custom focus ring)
- [x] `prefers-reduced-motion` respected
- [x] Color contrast WCAG AA
- [x] Alt text for all images
- [x] ARIA labels for icon buttons
- [x] Form labels + error announcements
- [x] Keyboard navigable

## Performance Targets

- LCP < 2.5s
- CLS < 0.1
- FID < 100ms
- All images optimized (AVIF/WebP)
- Video compressed, poster frame used

## License

MIT - Feel free to use for your own projects.

---

**Gemaakt met ❤️ voor DJ Cannix**