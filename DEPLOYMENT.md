# Cannix website: mailing, hosting, and automation

This guide describes the complete production setup for Cannix on Vercel, with Resend for email, GitHub Actions for CI, and automatic deployments.

## 1. Prerequisites

- A GitHub account with access to `GlennClaes/cannix-website`
- A Vercel account
- A Vercel project; `cannix.be` is optional and can be linked later
- A Resend account
- Node.js 22+ for local checks
- Docker Desktop, only if you want to test locally with Docker

## 2. Setting up Resend for email

The contact form uses the Resend API. Vercel cannot send emails itself without an external email provider.

1. Create an account at [resend.com](https://resend.com).
2. Go to **Domains** and add `cannix.be`.
3. Add all SPF, DKIM, and any DMARC records at your DNS provider.
4. Wait until Resend marks the domain as **Verified**.
5. Create an API key with permission to send emails.
6. Use a sender on the verified domain:

```env
MAIL_FROM=Cannix Website <bookings@cannix.be>
MAIL_TO=bookings@cannix.be
RESEND_API_KEY=re_xxxxxxxxx
```

Do not use `onboarding@resend.dev` for production. That sender is only suitable for limited testing.

## 3. Create the Vercel project

1. Go to [vercel.com](https://vercel.com) and log in.
2. Choose **Add New → Project**.
3. Import `GlennClaes/cannix-website`.
4. Check the project settings:
   - **Framework preset:** Next.js
   - **Install command:** `npm ci`
   - **Build command:** `npm run build`
   - **Node.js version:** 22 or 24

The repository supports Node.js 22 and 24 (`package.json`). In Vercel, prefer Node.js 24; Node.js 22 remains supported for local and Docker builds.
5. Add these variables under **Settings → Environment Variables**:

| Variable | Production | Preview | Development |
|---|---:|---:|---:|
| `RESEND_API_KEY` | Yes | Yes | Optional |
| `MAIL_TO` | Yes | Yes | Optional |
| `MAIL_FROM` | Yes | Yes | Optional |
| `SITE_URL` | Optional | Optional | Optional |
As long as `cannix.be` is not yet available, leave `SITE_URL` empty. The site will then
automatically use the Vercel deployment URL (and `http://localhost:3000` locally). Once the domain
is linked, set `SITE_URL=https://cannix.be` for Production.
Preview deployments automatically get `noindex` so that temporary URLs do not appear in Google.

For Preview, preferably use a separate test mailbox so that test submissions do not mix with real bookings.

## 4. Connect the domain

1. Open **Settings → Domains** in Vercel once you have the domain available.
2. Add `cannix.be`.
3. Add the DNS records that Vercel shows.
4. Optionally set `www.cannix.be` as a redirect to `cannix.be`.
5. Wait until Vercel has automatically activated the certificate.
6. Check:

```text
https://cannix.be
https://cannix.be/robots.txt
https://cannix.be/sitemap.xml
https://cannix.be/api/health
```

## 5. Automatic deployments

Use Vercel's native GitHub integration for the actual deployment. The separate `CD - Deployment Verification` workflow then automatically checks the live homepage, healthcheck, robots.txt, and sitemap.

### Release policy

- **No automatic release for small fixes**.
- **Release automatically only on breaking changes**.
- Required signals:
  - commit subject contains `!`
  - or `BREAKING CHANGE:` in the commit message
  - or `feat!:` / `fix!:`
- GitHub Actions then automatically creates a new `vX.0.0` tag and publishes a GitHub Release.

### Nightly checks

The `nightly-loop.js` workflow runs at fixed times and performs additional production checks, including:

- bundle-size check
- SEO smoke test for homepage, robots.txt, and sitemap
- Lighthouse score check
- audit and security scans
- log and dashboard updates

- Pull request to `main`: automatic Preview Deployment
- Push to `main`: automatic Production Deployment
- After a successful CI run: automatic production smoke test when the GitHub repository variable `PRODUCTION_URL` is set
- Vercel automatically provides HTTPS, build caching, and rollback options

With this approach, you do not need `VERCEL_TOKEN`, `VERCEL_ORG_ID`, or `VERCEL_PROJECT_ID` in GitHub Secrets. For the CD workflow, set the repository variable `PRODUCTION_URL` as soon as you want to check a public URL, for example the Vercel URL or later `https://cannix.be`.

## 6. GitHub Actions CI

The CI workflow automatically checks:

- ESLint
- TypeScript
- Next.js production build
- Vulnerabilities in production dependencies

The workflow runs on pushes and pull requests to `main`. You can also start it manually via **GitHub → Actions → CI → Run workflow**.

Recommended branch protection for `main`:

1. Open **Repository Settings → Branches**.
2. Add a branch rule for `main`.
3. Require a pull request.
4. Require the **Lint, Typecheck and Build** check.
5. Block direct pushes if desired.

## 7. Security and maintenance automation

The repository contains additional workflows for:

- Secrets scanning
- Daily npm security audit
- Nightly SEO/performance-maintenance loop
- Automatic Dependabot updates for npm and GitHub Actions
- GitHub Releases via `.github/workflows/release.yml`

Dependabot groups compatible updates. Major updates for Zod and Lucide are deliberately not opened automatically because they may contain API changes; run those only after a targeted migration and full testing.

For workflows that write logs back to the repository, GitHub Actions needs write permissions:

1. Open **Settings → Actions → General**.
2. Find **Workflow permissions**.
3. Choose **Read and write permissions**.
4. Save.

Write permissions are used only because the security and nightly workflows write their reports to `obsidian-vault/`.

## 8. Releases

Create a release by pushing a semver tag to GitHub:

```bash
git tag v1.0.0
git push origin v1.0.0
```

The release workflow automatically creates a GitHub Release with generated release notes. The tag must use the `vMAJOR.MINOR.PATCH` format.

## 9. Local configuration

Create `.env.local` locally. This file must never be pushed to GitHub.

```env
RESEND_API_KEY=re_xxxxxxxxx
MAIL_TO=bookings@cannix.be
MAIL_FROM=Cannix Website <bookings@cannix.be>
```

Install dependencies and run all checks:

```bash
npm ci
npm run check
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## 10. Testing the contact form

After a deployment, test:

1. Open `/contact`.
2. Fill in a valid booking request.
3. Submit the form.
4. Check that the email arrives at `MAIL_TO`.
5. Click **Reply** and check that the reply goes to the requester.
6. Check in Resend **Logs** that the email was delivered successfully.

Expected API statuses:

| Status | Meaning |
|---:|---|
| `200` | Request processed |
| `400` | Invalid input |
| `429` | Too many requests from the same address |
| `502` | Resend could not send the email |
| `503` | Email environment missing in Vercel |

## 11. Healthcheck and monitoring

The `/api/health` endpoint returns JSON:

```json
{
  "status": "ok",
  "service": "cannix-website"
}
```

This URL can be used in an external uptime monitor. Check at least:

```text
https://cannix.be/api/health
```

Vercel additionally shows deployment logs, function logs, and runtime errors in the project dashboard.

## 12. Using Docker locally

Docker is not needed for Vercel, but can be used locally to test the production container:

```bash
docker compose up --build
```

The website then runs at:

```text
http://localhost:3000
```

For a working email test, the following environment variables must be passed to Docker:

```powershell
$env:RESEND_API_KEY="re_xxxxxxxxx"
$env:MAIL_TO="bookings@cannix.be"
$env:MAIL_FROM="Cannix Website <bookings@cannix.be>"
docker compose up --build
```

## 13. SEO check after going live

Check after the first production deployment:

1. `https://cannix.be/robots.txt` is reachable.
2. `https://cannix.be/sitemap.xml` contains the public pages.
3. `/videos` is currently not in the navigation or sitemap.
4. Google Search Console is linked to `cannix.be`.
5. Submit `https://cannix.be/sitemap.xml` in Search Console.
6. Check the homepage and contact page with Rich Results Test and PageSpeed Insights.
7. Check Open Graph previews with a social sharing debugger.

### Google Search Console and Business Profile

These steps require external accounts and cannot be performed by the application:

1. Create a **Domain property** in [Google Search Console](https://search.google.com/search-console)
   for `cannix.be` and complete the DNS verification, or use the URL-prefix method.
2. Submit `https://cannix.be/sitemap.xml` and request indexing of the homepage and contact page.
3. Create or claim the [Google Business Profile](https://www.google.com/business/), complete the
   address or service-area verification, and only fill in real business details, categories,
   opening hours, and profile links.
4. Keep profile data consistent with the site and only add reviews if they actually exist;
   the site does not generate review or rating schema without real source data.

## 14. Free hosting: expectations

The basic setup can run for free:

- Vercel Hobby for hosting and deployments
- GitHub Actions within the available free limits
- Resend within the available free sending limits
- GitHub Dependabot and secrets scanning

Always check the current limits and terms of service. A commercial website may fall outside the terms of a free Hobby plan.

## 15. Production checklist

- [ ] Resend account created
- [ ] `cannix.be` verified in Resend
- [ ] SPF/DKIM/DMARC configured correctly
- [ ] Resend API key created
- [ ] Vercel project linked to GitHub
- [ ] `RESEND_API_KEY` set in Vercel
- [ ] `MAIL_TO` set in Vercel
- [ ] `MAIL_FROM` set with a verified domain
- [ ] `cannix.be` linked to Vercel
- [ ] HTTPS active
- [ ] CI ran successfully
- [ ] Preview deployment tested
- [ ] Production deployment tested
- [ ] `/robots.txt` checked
- [ ] `/sitemap.xml` checked
- [ ] `/api/health` returns `status: ok`
- [ ] Real contact form tested
- [ ] Email received and reply tested
- [ ] Google Search Console linked
- [ ] Google Business Profile created or claimed
- [ ] Branch protection configured
