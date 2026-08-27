# Security

## Geheimen en configuratie

- Zet nooit API keys, tokens of `.env`-bestanden in Git.
- Gebruik voor lokale configuratie uitsluitend `.env.local`.
- Configureer productiegeheimen in Vercel Environment Variables.
- Gebruik aparte Resend- en testwaarden voor Preview en Production.
- Roteer een API key onmiddellijk wanneer die mogelijk is blootgesteld.

De enige publiek bedoelde configuratiewaarde is `NEXT_PUBLIC_GA_ID`. Alle andere mailconfiguratie blijft server-side.

## Beschermingsmaatregelen

De website gebruikt:

- Zod-validatie en maximale veldlengtes op de contact-API
- HTML escaping voordat formulierdata in e-mail wordt geplaatst
- Honeypot tegen eenvoudige bots
- Rate limiting per client-IP
- Resend API keys uitsluitend server-side
- `robots.txt` die API- en technische routes uitsluit
- CSP, HSTS, clickjacking- en MIME-sniffing-bescherming
- GitHub secrets scanning, npm auditing en Dependabot
- Minimale GitHub Actions permissions

Rate limiting in een serverless omgeving is per runtime-instance. Gebruik bij zware spam een externe WAF/rate-limitdienst, bijvoorbeeld Vercel Firewall.

## Kwetsbaarheid melden

Meld een beveiligingsprobleem privé via GitHub Security Advisories of via de repository-eigenaar. Plaats geen API keys, tokens, persoonsgegevens of exploitdetails in een publieke issue.
