# Security Policy

## Supported versions

The project is actively maintained on the latest `main` branch and latest production deployment. Security fixes are prioritized for the current branch and the currently deployed site.

## Secrets and environment variables

- Never commit secrets, API keys, tokens, or `.env` files to Git.
- Keep local configuration in `.env.local` only.
- Store production secrets in Vercel Environment Variables or GitHub Actions secrets.
- Do not expose server-side values to the browser using `NEXT_PUBLIC_*` unless they are intentionally public.
- Use separate Resend and test credentials for preview and production.
- Rotate any leaked credential immediately and revoke it in the upstream provider.

The only browser-exposed configuration value in this project should be intentionally public frontend metadata, such as analytics IDs when used.

## Security measures in place

The application applies the following protections:

- Zod validation on every form submission boundary
- Field length limits and structured validation for contact requests
- HTML escaping before sending form data in emails
- Simple bot protection via honeypot checks
- In-memory rate limiting for contact submissions
- Server-side Resend API usage only
- Restricted robots and sitemap setup for public routes only
- Least-privilege GitHub Actions permissions
- Dependency auditing with GitHub and npm tooling
- Production and preview deployment checks before release validation

Note: in-memory rate limiting is per runtime instance. For very high-risk spam environments, use an external WAF, CDN bot protection, or Redis-backed rate limiting.

## Reporting a vulnerability

Please report security issues privately and responsibly.

Preferred options:

- GitHub Security Advisories for the repository
- Direct contact with the repository maintainer through the project owner account

Do not open a public issue for a vulnerability report. Please do not include API keys, secrets, personal data, or exploit details in public discussion.

When reporting, include:

- a clear description of the issue
- affected version or commit SHA
- steps to reproduce the problem
- impact assessment
- suggested mitigation if known

We aim to acknowledge valid reports promptly and work toward a fix with responsible disclosure.