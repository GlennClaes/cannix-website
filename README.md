# DJ Cannix Website

Professionele Next.js 15 website voor DJ Cannix met splash animatie, portfolio, videos, contact formulier en CI/CD naar Vercel.

## Features

- 🎬 **Splash pagina** - Full-screen entry met logo animatie, achtergrondvideo en "Ga verder" CTA
- 🎨 **Design systeem** - Aangepaste kleuren (teal/cyan + amber), typografie (Syne + DM Sans), motion tokens
- 📱 **Responsive** - Mobile-first met hamburger menu, touch-friendly
- 🖼️ **Gallery** - Masonry grid met lightbox, filter op jaar
- 🎥 **Videos** - Grid met modale player (YouTube/Vimeo/MP4)
- 📝 **Contact formulier** - React Hook Form + Zod validatie, API route
- ⚡ **Performance** - Next.js Image optimalisatie, lazy loading, blur placeholders
- ♿ **Accessibility** - Semantic HTML, focus states, reduced motion, ARIA labels
- 🔄 **CI/CD** - GitHub Actions → Vercel (preview + production)

## Tech Stack

- **Framework:** Next.js 15 (App Router, TypeScript, Turbopack)
- **Styling:** Tailwind CSS v4 (@theme directive)
- **Animation:** Framer Motion
- **Forms:** React Hook Form + Zod
- **Icons:** Lucide React
- **Deployment:** Vercel

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
npm install

# Copy environment template
cp .env.example .env.local
```

### Environment Variables

```env
# Optional: Formspree/email service
FORMSPREE_ENDPOINT=your_formspree_endpoint
RESEND_API_KEY=your_resend_key

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
│       └── contact/route.ts    # Serverless form handler
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

### Forms

De contact API route (`src/app/api/contact/route.ts`) logt naar console. Vervang met echte email service (Resend, Nodemailer, Formspree).

## Deployment

### Vercel (Aanbevolen)

1. Push naar GitHub
2. Importeer in Vercel
3. Voeg environment variables toe:
   - `VERCEL_TOKEN` (uit Vercel account settings)
   - `VERCEL_ORG_ID` (uit Vercel project settings)
   - `VERCEL_PROJECT_ID` (uit Vercel project settings)
4. GitHub Actions deployt automatisch:
   - **Pull Requests** → Preview deployment
   - **Push to main** → Production deployment

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