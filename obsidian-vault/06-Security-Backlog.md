# Security Backlog

- [ ] Voeg Content Security Policy (CSP) en HSTS headers toe aan `vercel.json` #security #priority-high
- [ ] Voeg Rate Limiting toe aan de contact API route (`src/app/api/contact/route.ts`) #security #priority-high
- [ ] Voeg XSS-sanitisatie toe voor contactformulier invoervelden #security #priority-high
- [ ] Voer dagelijks `npm audit fix --only=prod` uit voor bekende pakketlekken #security #priority-high
- [ ] Verwijder gevoelige omgevingsvariabelen uit client-side bundels #security #priority-medium