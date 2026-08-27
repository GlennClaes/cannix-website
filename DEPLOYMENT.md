# Cannix website: mailing, hosting en automatisatie

Deze handleiding beschrijft de volledige productie-instelling voor Cannix op Vercel met Resend voor e-mail, GitHub Actions voor CI en automatische deployments.

## 1. Vereisten

- Een GitHub-account met toegang tot `GlennClaes/cannix-website`
- Een Vercel-account
- Het domein `cannix.be`
- Een Resend-account
- Node.js 22+ voor lokale controles
- Docker Desktop, alleen wanneer je lokaal met Docker wilt testen

## 2. Resend instellen voor e-mail

Het contactformulier gebruikt de Resend API. Vercel kan zelf geen e-mails versturen zonder een externe mailprovider.

1. Maak een account aan op [resend.com](https://resend.com).
2. Ga naar **Domains** en voeg `cannix.be` toe.
3. Voeg alle SPF-, DKIM- en eventuele DMARC-records toe bij je DNS-provider.
4. Wacht tot Resend het domein als **Verified** markeert.
5. Maak een API key aan met rechten om e-mails te versturen.
6. Gebruik een afzender op het geverifieerde domein:

```env
MAIL_FROM=Cannix Website <bookings@cannix.be>
MAIL_TO=bookings@cannix.be
RESEND_API_KEY=re_xxxxxxxxx
```

Gebruik `onboarding@resend.dev` niet voor productie. Die afzender is alleen geschikt voor beperkte tests.

## 3. Vercel project aanmaken

1. Ga naar [vercel.com](https://vercel.com) en log in.
2. Kies **Add New → Project**.
3. Importeer `GlennClaes/cannix-website`.
4. Controleer de projectinstellingen:
   - **Framework preset:** Next.js
   - **Install command:** `npm ci`
   - **Build command:** `npm run build`
   - **Node.js version:** 22
5. Voeg in **Settings → Environment Variables** deze variabelen toe:

| Variabele | Production | Preview | Development |
|---|---:|---:|---:|
| `RESEND_API_KEY` | Ja | Ja | Optioneel |
| `MAIL_TO` | Ja | Ja | Optioneel |
| `MAIL_FROM` | Ja | Ja | Optioneel |

Gebruik voor Preview bij voorkeur een aparte testmailbox, zodat testaanvragen niet tussen echte boekingen terechtkomen.

## 4. Domein koppelen

1. Open in Vercel **Settings → Domains**.
2. Voeg `cannix.be` toe.
3. Voeg de DNS-records toe die Vercel toont.
4. Stel `www.cannix.be` eventueel in als redirect naar `cannix.be`.
5. Wacht tot Vercel het certificaat automatisch heeft geactiveerd.
6. Controleer:

```text
https://cannix.be
https://cannix.be/robots.txt
https://cannix.be/sitemap.xml
https://cannix.be/api/health
```

## 5. Automatische deployments

Gebruik de native GitHub-integratie van Vercel voor de eigenlijke deployment. De aparte `CD - Deployment Verification` workflow controleert daarna automatisch de live homepage, healthcheck, robots.txt en sitemap.

- Pull request naar `main`: automatische Preview Deployment
- Push naar `main`: automatische Production Deployment
- Na een geslaagde CI-run: automatische production smoke test
- Vercel maakt automatisch HTTPS, build caching en rollbackmogelijkheden beschikbaar

Je hebt voor deze aanpak geen `VERCEL_TOKEN`, `VERCEL_ORG_ID` of `VERCEL_PROJECT_ID` nodig in GitHub Secrets. De CD-workflow controleert de publieke URL `https://cannix.be`.

## 6. GitHub Actions CI

De CI-workflow controleert automatisch:

- ESLint
- TypeScript
- Next.js production build
- Kwetsbaarheden in productie-dependencies

De workflow draait bij pushes en pull requests naar `main`. Je kunt hem ook handmatig starten via **GitHub → Actions → CI → Run workflow**.

Aanbevolen branch protection voor `main`:

1. Open **Repository Settings → Branches**.
2. Voeg een branch rule toe voor `main`.
3. Vereis een pull request.
4. Vereis de check **Lint, Typecheck and Build**.
5. Blokkeer directe pushes indien gewenst.

## 7. Security- en onderhoudsautomatisatie

De repository bevat aanvullende workflows voor:

- Secrets scanning
- Dagelijkse npm security audit
- Nightly SEO/performance-maintenance loop
- Automatische Dependabot-updates voor npm en GitHub Actions

Voor workflows die logs naar de repository terugschrijven moet GitHub Actions schrijfrechten hebben:

1. Open **Settings → Actions → General**.
2. Zoek **Workflow permissions**.
3. Kies **Read and write permissions**.
4. Sla op.

Gebruik schrijfrechten alleen omdat de security- en nightly-workflows hun rapporten naar `obsidian-vault/` schrijven.

## 8. Releases

Maak een release door een semver-tag naar GitHub te pushen:

```bash
git tag v1.0.0
git push origin v1.0.0
```

De release-workflow maakt automatisch een GitHub Release met gegenereerde release notes. De tag moet het formaat `vMAJOR.MINOR.PATCH` gebruiken.

## 9. Lokale configuratie

Maak lokaal `.env.local` aan. Dit bestand mag nooit naar GitHub worden gepusht.

```env
RESEND_API_KEY=re_xxxxxxxxx
MAIL_TO=bookings@cannix.be
MAIL_FROM=Cannix Website <bookings@cannix.be>
```

Installeer dependencies en voer alle controles uit:

```bash
npm ci
npm run check
npm run dev
```

Open daarna [http://localhost:3000](http://localhost:3000).

## 10. Contactformulier testen

Test na een deployment:

1. Open `/contact`.
2. Vul een geldige bookingaanvraag in.
3. Verstuur het formulier.
4. Controleer of de mail binnenkomt op `MAIL_TO`.
5. Klik op **Reply** en controleer of het antwoord naar de aanvrager gaat.
6. Controleer in Resend **Logs** of de mail succesvol is afgeleverd.

Verwachte API-statussen:

| Status | Betekenis |
|---:|---|
| `200` | Aanvraag verwerkt |
| `400` | Ongeldige invoer |
| `429` | Te veel aanvragen vanaf hetzelfde adres |
| `502` | Resend kon de mail niet versturen |
| `503` | Mailomgeving ontbreekt in Vercel |

## 11. Healthcheck en monitoring

De endpoint `/api/health` geeft JSON terug:

```json
{
  "status": "ok",
  "service": "cannix-website"
}
```

Deze URL kan gebruikt worden in een externe uptime-monitor. Controleer minstens:

```text
https://cannix.be/api/health
```

Vercel toont daarnaast deploymentlogs, function logs en runtime errors in het projectdashboard.

## 12. Docker lokaal gebruiken

Docker is niet nodig voor Vercel, maar kan lokaal gebruikt worden om de productiecontainer te testen:

```bash
docker compose up --build
```

De website draait dan op:

```text
http://localhost:3000
```

Voor een werkende mailtest moeten de volgende environment variables aan Docker worden meegegeven:

```powershell
$env:RESEND_API_KEY="re_xxxxxxxxx"
$env:MAIL_TO="bookings@cannix.be"
$env:MAIL_FROM="Cannix Website <bookings@cannix.be>"
docker compose up --build
```

## 13. SEO-controle na livegang

Controleer na de eerste productie-deployment:

1. `https://cannix.be/robots.txt` is bereikbaar.
2. `https://cannix.be/sitemap.xml` bevat de publieke pagina’s.
3. `/videos` staat voorlopig niet in de navigatie of sitemap.
4. Google Search Console is gekoppeld aan `cannix.be`.
5. Dien `https://cannix.be/sitemap.xml` in bij Search Console.
6. Controleer de homepage en contactpagina met Rich Results Test en PageSpeed Insights.
7. Controleer Open Graph previews met een social sharing debugger.

## 14. Gratis hosting: verwachtingen

De basisopstelling kan gratis draaien:

- Vercel Hobby voor hosting en deployments
- GitHub Actions binnen de beschikbare gratis limieten
- Resend binnen de beschikbare gratis verzendlimieten
- GitHub Dependabot en secrets scanning

Controleer altijd de actuele limieten en gebruiksvoorwaarden. Een commerciële website kan buiten de voorwaarden van een gratis Hobby-plan vallen.

## 15. Productie-checklist

- [ ] Resend-account aangemaakt
- [ ] `cannix.be` geverifieerd in Resend
- [ ] SPF/DKIM/DMARC correct ingesteld
- [ ] Resend API key aangemaakt
- [ ] Vercel-project gekoppeld aan GitHub
- [ ] `RESEND_API_KEY` ingesteld in Vercel
- [ ] `MAIL_TO` ingesteld in Vercel
- [ ] `MAIL_FROM` ingesteld met geverifieerd domein
- [ ] `cannix.be` gekoppeld aan Vercel
- [ ] HTTPS actief
- [ ] CI succesvol uitgevoerd
- [ ] Preview deployment getest
- [ ] Production deployment getest
- [ ] `/robots.txt` gecontroleerd
- [ ] `/sitemap.xml` gecontroleerd
- [ ] `/api/health` geeft `status: ok`
- [ ] Echt contactformulier getest
- [ ] Mail ontvangen en reply getest
- [ ] Google Search Console gekoppeld
- [ ] Branch protection ingesteld
