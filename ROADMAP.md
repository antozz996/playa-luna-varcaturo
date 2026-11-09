# Roadmap correzioni — audit 9 novembre 2026

Audit multi-agente (codice, sicurezza, SEO, performance, accessibilità/UX, privacy/CMS/contenuti).
Voto iniziale complessivo: **5,5/10**. Branch di lavoro: `fix/audit-2026-11` (solo locale).

Legenda: `[x]` risolto e verificato · `[~]` parziale · `[ ]` da fare · `[-]` non più applicabile

## Decisioni prese

| Data | Decisione |
|---|---|
| 2026-11-09 | **Media nel repository** (`public/`), aggiornati via GitHub da Roberto/Claude. Costo di storage zero. |
| 2026-11-09 | **Rimossi Sanity, Vercel Blob e pannello `/gestione-foto`**: Sanity serviva solo ai media. |
| 2026-11-09 | **Deploy solo su Vercel** — vinext/Cloudflare da rimuovere (Fase 7). |
| 2026-11-09 | **Video 1080p, tagliati a 15 s in loop**, max 2 Mbps, senza audio. |
| 2026-11-09 | Si procede **una fase alla volta**, push solo su conferma. |

---

## Fase 1 — Sicurezza ✅

- [-] **S1 · Cookie admin falsificabile** — prima corretto con sessione HMAC (commit `6788035`), poi l'intero pannello è stato rimosso.
- [-] **S2 · Login senza rate limit** — idem: corretto, poi rimosso insieme al pannello.
- [-] **S3 · Logout mancante** — pannello rimosso.
- [x] **S4 · Next 16.2.6 con advisory critici** → **16.4.5** (versioni esatte).
- [x] **S5 · Dipendenze vulnerabili** — rimossi 915 pacchetti (Sanity, Blob). _Da ricontrollare con `npm audit` a fine Fase 7 (vinext/wrangler)._
- [x] **S6 · Header di sicurezza** — CSP, HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy su tutte le pagine (`next.config.ts`). _Verificato_: nessuna violazione CSP in console. GA/Clarity verificabili solo in produzione.
- [x] **S7 · `remotePatterns` troppo ampio** — rimossi: nessuna immagine remota.
- [-] **S8 · Webhook revalidate** — endpoint rimosso.
- [-] **S9 · Route legacy upload** — tutte le route `/api/media/*` rimosse.
- [-] **S10 · Magic bytes upload** — niente più upload.
- [-] **S11 · Errori interni al client** — route rimosse.
- [ ] **S12 · JSON-LD** — escape di `<` (rischio ora nullo: dati tutti statici). Da fare in Fase 4 con lo schema.
- [-] **S13 · Token Sanity** — Sanity rimosso.

## Fase 2 — CMS e media ✅

- [x] **C1 · Slot hardcoded che ignorano CMS** — un solo componente `PageMedia` con file locali; ogni pagina mostra esattamente ciò che era online.
- [x] **C2 · `/eventi` non legge gli upload** — non più applicabile, tutto locale.
- [x] **C3 · Doppio sistema media** — unica fonte: `public/`.
- [x] **C4 · 28 `head()` Blob per richiesta** — zero chiamate esterne.
- [x] **C5 · `revalidate: 30`** — tutte le pagine ora statiche (○), nessuna funzione server.
- [-] **C6–C9** — codice Sanity e pannello rimossi.
- [-] **C10 · Impostazioni sito editabili** — non serve: modifiche via GitHub.
- [x] **Migrazione** — scaricati in `public/` gli 8 media che il sito live prendeva da Sanity (4 video, 4 foto), con i loro testi alternativi.

## Fase 3 — Performance (prossima)

- [~] **P1 · Video pesanti** — tutti ricompressi: **da ~205 MB a 23 MB** (es. card Food & Drink 88 MB → 3,7 MB, piscina 64 MB → 3,8 MB).
  Poster `*-poster.webp` generati accanto a ogni video. **Manca**: collegarli (`poster`), `preload="metadata"` sull'hero.
- [ ] **P2 · Hero invisibile fino a `loadeddata`** — mostrare il poster subito, togliere animazione 1,5 s dall'LCP.
- [x] **P3 · Video `/eventi` e altri** — compressi (vedi P1).
- [x] **P4 · Cache `public/`** — `max-age=604800` (7 giorni) su images/videos/menus/svg. Quando si sostituisce un file conviene rinominarlo.
- [ ] **P5 · Immagini sorgente sovradimensionate** (`public/` ~25 MB), jpg duplicata `beach-detail-2f8a3953.jpg`.
- [-] **P6 · Doppia ottimizzazione Sanity** — Sanity rimosso.
- [ ] **P7 · `og.png` 1 MB** → <200 KB.
- [ ] **P8 · Logo header lazy** → eager; `contatti` senza `unoptimized`.
- [x] **P9 · `data-sanity` in produzione** — rimossi.
- [ ] **P10 · GA caricato prima del consenso** (legato a G3).

## Fase 4 — SEO

- [ ] **SEO1 · Trailing slash** — link senza `/` finale (evita 308), canonical menu, URL schema.
- [x] **SEO2 · Title home duplicato** — era un difetto di vinext; con `next build` il titolo è corretto. _(piscina: brand ripetuto ancora da sistemare)_
- [ ] **SEO3 · Host vercel.app indicizzabile** — redirect a playaluna.it (impostazione Vercel).
- [ ] **SEO4 · Search Console** — `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` o verifica DNS.
- [ ] **SEO5 · JSON-LD** — entità unica con `@id`, CAP, geo, orari, `hasMap`, `servesCuisine`, `hasMenu`; correggere `isPartOf`; unificare EventVenue.
- [ ] **SEO6 · Contatti** — JSON-LD, mappa, orari.
- [ ] **SEO7 · H1 con keyword**, niente H2 del dialog prima dell'H1.
- [ ] **SEO8 · Contenuti sottili** (~270 parole) + FAQ; menu in HTML e in sitemap.
- [ ] **SEO9 · OG/Twitter per pagina**, sitemap con `lastModified`, rimuovere `keywords` e `Host:`.
- [ ] **SEO10 · Etichette nav in italiano**.

## Fase 5 — Accessibilità e UX

- [ ] **A1 · Banner cookie copre le CTA su mobile**.
- [ ] **A2 · Video autoplay senza pausa / reduced-motion** (WCAG 2.2.2).
- [ ] **A3 · Landmark** — header/footer fuori da `<main>`, skip link.
- [ ] **A4 · Bottone Menu 35×16 px**, Escape, click fuori, aria-label dinamico.
- [ ] **A5 · Contrasti** — footer, dialog, bianco su corallo.
- [ ] **A6 · Nome accessibile ≠ testo visibile** (WA/Contattaci).
- [ ] **A7 · Alt perso quando l'immagine diventa video**.
- [ ] **A8 · CTA** — beach-club "Prenota", piscina con `poolWhatsapp`, `tel:` senza `_blank`, Prenota nell'header mobile.
- [ ] **A9 · Tracking** — tassonomia evento/posizione, `booking_dialog_open`, `menu_view`.
- [ ] **A10 · Testi 8–10 px** → min 12 px; caroselli focusabili; frecce `aria-hidden`.

## Fase 6 — Privacy / GDPR (serve input del titolare)

- [ ] **G1 · Dati titolare** — ragione sociale, P.IVA, sede, PEC. _Serve input._
- [ ] **G2 · Informativa art. 13** — basi giuridiche, trasferimenti extra-UE, conservazione, responsabili, reclamo.
- [ ] **G3 · "Anonimo senza cookie"** — GA solo dopo consenso o testo corretto.
- [ ] **G4 · Tabella cookie** completa.
- [ ] **G5 · Clarity `consentv2`**.
- [ ] **G6 · Consenso con timestamp/versione e scadenza**, X di chiusura, link privacy.

## Fase 7 — Pulizia architettura

- [ ] **K1 · Un solo target di deploy** (Vercel) — rimuovere vinext/vite/worker/wrangler/Cloudflare, script `next dev/build/start`.
- [ ] **K2 · Codice morto template** — `chatgpt-auth.ts`, `examples/`, `db/`, `drizzle/`, `.openai/`, svg, `tsconfig.tsbuildinfo`.
- [ ] **K3 · Test sempre rosso** (`codex-preview`) → smoke test reali.
- [ ] **K4 · Script npm cross-platform** (risolto con K1).
- [ ] **K5 · Dipendenze inutili** (`drizzle-orm`), versioni esatte.
- [ ] **K6 · Lint** — `set-state-in-effect` in `experience-video.tsx`.
- [x] **K7 · URL vercel.app hardcoded** — erano tutti nel codice Sanity, rimosso.
- [x] **K8 · `package-lock.json`** — aggiunto al repo.
- [x] **K9 · `vercel.json`** — build semplificata a `npm ci` + `next build`.

---

## Registro

| Data | Punti | Note |
|---|---|---|
| 2026-11-09 | S1–S5, K8 | Sessione firmata, rate limit, logout, Next 16.4.5, lockfile (commit `6788035`). |
| 2026-11-09 | S6–S13, C1–C10, P1~, P3, P4, P9, SEO2, K7, K9 | Media migrati in `public/`, rimossi Sanity/Blob/pannello (−915 pacchetti), video da 205 MB a 23 MB, header di sicurezza e cache. `tsc` e `next build` OK, 10 pagine 200, 27 media presenti, 0 errori console. |

## Da fare su Vercel/Sanity dopo il deploy

- Variabili **non più necessarie**, da rimuovere: `NEXT_PUBLIC_SANITY_*`, `SANITY_*`, `BLOB_READ_WRITE_TOKEN`, `MEDIA_ADMIN_PASSWORD`, `MEDIA_SESSION_SECRET`.
- **Vercel Blob store**: si può eliminare (sul sito live non è referenziato nessun file Blob).
- **Progetto Sanity** `7xx613y2`: si può archiviare dopo aver verificato il sito in produzione.
- Controllare in console del browser su playaluna.it che GA e Clarity non vengano bloccati dalla CSP.
