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
- [x] **S12 · JSON-LD** — escape di `<` tramite `jsonLd()` in `app/lib/schema.ts` (Fase 4).
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

## Fase 3 — Performance ✅

- [x] **P1 · Video pesanti** — tutti ricompressi: **da ~205 MB a 23 MB** (es. card Food & Drink 88 MB → 3,7 MB, piscina 64 MB → 3,8 MB).
  Poster `*-poster.webp` collegati automaticamente da `PageMedia`, `preload="metadata"`, lazy load a 300 px dal viewport.
- [x] **P2 · Hero invisibile fino a `loadeddata`** — con poster il video è visibile subito (opacity 1); tolta l'animazione `hero-in` da 1,5 s dall'elemento LCP. _Verificato a 390×844._
- [x] **P3 · Video `/eventi` e altri** — compressi (vedi P1). _Verificato_: gallerie eventi/wedding partono allo scroll.
- [x] **P4 · Cache `public/`** — `max-age=604800` (7 giorni) su images/videos/menus/svg. Quando si sostituisce un file conviene rinominarlo.
- [x] **P5 · Immagini** — 14 WebP ricodificati a qualità 78 (5,4 → 4,1 MB), eliminati 21 file non usati (2,3 MB, inclusa la jpg duplicata).
- [-] **P6 · Doppia ottimizzazione Sanity** — Sanity rimosso.
- [x] **P7 · `og.png` 1 MB** → `og.jpg` **74 KB** (6 riferimenti aggiornati).
- [x] **P8 · Logo header** → `loading="eager"`; immagine contatti ora ottimizzata (tolto `unoptimized`).
- [x] **P9 · `data-sanity` in produzione** — rimossi.
- [ ] **P10 · GA caricato prima del consenso** — spostato in Fase 6 (G3), è una scelta legale prima che di performance.
- [x] **Extra** — video non partono con `prefers-reduced-motion` (resta il poster) → copre parte di A2.

## Fase 4 — SEO ✅ (restano contenuti e impostazioni esterne)

- [x] **SEO1 · Trailing slash** — tutti i link interni senza `/` finale (nav, home, footer, banner, menu); canonical menu corretto; URL nello schema = canonical. _Verificato_: 0 link con slash su 10 pagine.
- [x] **SEO2 · Title** — home `Playa Luna | Beach club e ristorante sul mare a Varcaturo` (absolute), piscina senza brand ripetuto; title unici su tutte le pagine.
- [ ] **SEO3 · Host vercel.app indicizzabile** — redirect a playaluna.it. _Azione tua su Vercel → Settings → Domains._
- [ ] **SEO4 · Search Console** — impostare `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` su Vercel o verifica DNS, poi inviare la sitemap. _Azione tua._
- [x] **SEO5 · JSON-LD** — `app/lib/schema.ts`: entità unica `LocalBusiness+Restaurant` con `@id`, CAP 80014, orari stagionali, `hasMap`, `servesCuisine`, `hasMenu`, `acceptsReservations`, `logo`; reparti con `parentOrganization` (tolto `isPartOf`); un'unica `EventVenue` condivisa da eventi e wedding; piscina `PublicSwimmingPool`; escape di `<` (chiude S12). Coordinate geo omesse: OpenStreetMap non ha l'indirizzo preciso.
- [x] **SEO6 · Contatti** — blocco orari visibile, JSON-LD dell'attività, CAP e "Marina di Varcaturo" nel testo. Niente iframe Google Maps (imposterebbe cookie di terzi senza consenso): resta il link "Apri la mappa".
- [x] **SEO7 · H1 con keyword** — su tutte le pagine l'H1 è la riga piccola sopra lo slogan (stesso aspetto), lo slogan resta grande come `.display-title`; il titolo del dialog di prenotazione non è più un H2.
- [ ] **SEO8 · Contenuti sottili** (~270 parole) + FAQ; menu in HTML. _Da fare: serve materiale (servizi, prezzi indicativi, parcheggio, menu in testo)._ Menu aggiunto alla sitemap.
- [x] **SEO9 · Meta** — `pageOpenGraph()` per Open Graph completo su ogni pagina (anche privacy/cookie/menu), Twitter eredita dall'OG, sitemap con `lastModified` e senza `changeFrequency`, rimossi `keywords` e `Host:`.
- [x] **SEO10 · Etichette in italiano** — nav (Spiaggia, Ristorante, Eventi), footer, breadcrumb, card home ("Ristorante & Bar", "Eventi").
- [x] **Coerenza offerta** — colazione, pranzo e aperitivo; la sera solo eventi privati; orari: lido 8–19 mag–set, bar e ristorante 9–19 ott–apr, pranzo 12:30–16 tutto l'anno (in `site.ts`).
- [x] **Extra** — home e contatti si rigenerano ogni settimana (`revalidate`) per tenere aggiornate le date degli orari stagionali nello schema.

## Fase 5 — Accessibilità e UX

- [ ] **A1 · Banner cookie copre le CTA su mobile**.
- [~] **A2 · Video autoplay senza pausa / reduced-motion** (WCAG 2.2.2) — reduced-motion fatto in Fase 3; manca un pulsante pausa.
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
- [ ] **K2 · Codice morto template** — `chatgpt-auth.ts`, `examples/`, `db/`, `drizzle/`, `.openai/`, `tsconfig.tsbuildinfo`, ~27 regole CSS del vecchio pannello foto (`.media-*`), keyframe `hero-in`, classi `wedding-gallery-item-*-v3` inutilizzate.
- [ ] **K3 · Test sempre rosso** (`codex-preview`) → smoke test reali.
- [ ] **K4 · Script npm cross-platform** (risolto con K1).
- [ ] **K5 · Dipendenze inutili** (`drizzle-orm`), versioni esatte.
- [x] **K6 · Lint** — `experience-video.tsx` riscritto con `useSyncExternalStore`; `eslint app` = 0 errori, 0 avvisi.
- [x] **K7 · URL vercel.app hardcoded** — erano tutti nel codice Sanity, rimosso.
- [x] **K8 · `package-lock.json`** — aggiunto al repo.
- [x] **K9 · `vercel.json`** — build semplificata a `npm ci` + `next build`.

---

## Registro

| Data | Punti | Note |
|---|---|---|
| 2026-11-09 | S1–S5, K8 | Sessione firmata, rate limit, logout, Next 16.4.5, lockfile (commit `6788035`). |
| 2026-11-09 | S6–S13, C1–C10, P1~, P3, P4, P9, SEO2, K7, K9 | Media migrati in `public/`, rimossi Sanity/Blob/pannello (−915 pacchetti), video da 205 MB a 23 MB, header di sicurezza e cache. `tsc` e `next build` OK, 10 pagine 200, 27 media presenti, 0 errori console. |
| 2026-11-09 | P1, P2, P5, P7, P8, K6, A2~ | Poster sui video, hero visibile subito, reduced-motion, immagini ricodificate, 21 file inutili eliminati, og.jpg 74 KB. Lint/tsc/build OK, video verificati su mobile. |
| 2026-11-09 | Push | Branch `fix/audit-2026-11` su GitHub, anteprima Vercel OK (protetta da login). |
| 2026-11-09 | SEO1, SEO2, SEO5, SEO6, SEO7, SEO9, SEO10, S12 | H1 con keyword, schema unificato con orari, contatti con orari, link senza slash, OG completo, nav in italiano. 10 pagine: 1 H1 ciascuna, JSON-LD valido, 0 link con slash. |

## Da fare su Vercel/Sanity dopo il deploy

- Variabili **non più necessarie**, da rimuovere: `NEXT_PUBLIC_SANITY_*`, `SANITY_*`, `BLOB_READ_WRITE_TOKEN`, `MEDIA_ADMIN_PASSWORD`, `MEDIA_SESSION_SECRET`.
- **Vercel Blob store**: si può eliminare (sul sito live non è referenziato nessun file Blob).
- **Progetto Sanity** `7xx613y2`: si può archiviare dopo aver verificato il sito in produzione.
- Controllare in console del browser su playaluna.it che GA e Clarity non vengano bloccati dalla CSP.
