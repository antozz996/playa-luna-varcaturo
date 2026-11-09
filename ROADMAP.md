# Roadmap correzioni — audit 9 novembre 2026

Audit multi-agente (codice, sicurezza, SEO, performance, accessibilità/UX, privacy/CMS/contenuti).
Voto iniziale complessivo: **5,5/10**. Branch di lavoro: `fix/audit-2026-11`.

Legenda: `[x]` risolto e verificato · `[~]` parziale · `[ ]` da fare

---

## Fase 1 — Sicurezza (urgente)

- [x] **S1 · Cookie admin falsificabile** (`app/lib/media-admin.ts`)
  Sessione ora firmata HMAC-SHA256 con scadenza 12h e nonce casuale. Chiave: `MEDIA_SESSION_SECRET`,
  fallback `MEDIA_ADMIN_PASSWORD` (cambiare password invalida tutte le sessioni).
  _Verificato_: cookie `authorized` → 401, firma alterata → 401, token valido → accesso.
- [x] **S2 · Login senza rate limit** (`app/api/media/login/route.ts`)
  Max 5 errori / 15 min per IP → 429, ritardo 500ms su errore. Confronto password su hash SHA-256
  (non rivela più la lunghezza). _Verificato_: 6° tentativo → 429.
  Nota: limiter in memoria per istanza; per un limite globale servirebbe Upstash/KV.
- [x] **S3 · Logout mancante** — aggiunto `DELETE /api/media/login`. _(manca il pulsante nell'UI → vedi C8)_
- [x] **S4 · Next 16.2.6 con advisory critici** → aggiornato a **16.4.5** (versioni esatte), build OK.
- [~] **S5 · Dipendenze vulnerabili** — da 30 (1 critica, 11 alte) a **27 (0 critiche, 9 alte, 18 moderate)**.
  Restano dipendenze transitive di Sanity/Vite/Wrangler che richiedono aggiornamenti breaking.
- [ ] **S6 · Header di sicurezza** — CSP, HSTS, X-Content-Type-Options, Referrer-Policy,
  Permissions-Policy, `frame-ancestors 'none'` su `/gestione-foto`.
- [ ] **S7 · `remotePatterns` Blob troppo ampio** — limitare al proprio store `<id>.public.blob.vercel-storage.com`.
- [ ] **S8 · Webhook revalidate** — firma `sanity-webhook-signature` via `parseBody` invece del secret in query.
- [ ] **S9 · Route legacy `/api/media/upload`** — rimuovere; unificare la logica slot→path.
- [ ] **S10 · Validazione magic bytes** su upload (WEBP/MP4).
- [ ] **S11 · Errori interni restituiti al client** — messaggi generici, dettaglio solo nei log.
- [ ] **S12 · JSON-LD** — escape di `<` in `JSON.stringify`.
- [ ] **S13 · Token Sanity** — usare solo `SANITY_API_READ_TOKEN` (Viewer), togliere fallback.

## Fase 2 — CMS e media (alta)

- [ ] **C1 · Slot hardcoded che ignorano CMS/upload** — eliminare `localImage`/`localVideo` con priorità;
  ordine unico: Blob > Sanity > fallback. (home ×7, beach-club, piscina, ristorante, wedding)
- [ ] **C2 · `/eventi` non legge gli upload Blob** — allineare a `wedding`.
- [ ] **C3 · Doppio sistema media Blob + Sanity** — decidere una fonte unica.
- [ ] **C4 · 28 `head()` Blob per richiesta** — una `list()` cachata con tag, invalidata dagli upload.
- [ ] **C5 · `revalidate: 30`** → 3600 + `revalidateTag` dal webhook.
- [ ] **C6 · Errori Sanity silenziati** (`catch {}`) → log.
- [ ] **C7 · GROQ singleton** — `*[_id == $type][0]{…}`, bloccare creazione duplicati.
- [ ] **C8 · Pannello foto** — pulsante logout, testi "homepage" sulle altre pagine, testo da sviluppo.
- [ ] **C9 · Descrizioni schema "Foto attuale"** non corrispondenti ai fallback reali.
- [ ] **C10 · Singleton "Impostazioni sito"** (contatti, orari, menu PDF, avvisi) editabile dal gestore.

## Fase 3 — Performance (alta)

- [ ] **P1 · Video hero home 9 MB** — poster, ricompressione <2,5 MB, `preload="metadata"`.
- [ ] **P2 · Hero invisibile fino a `loadeddata`** — poster sempre visibile, togliere animazione 1,5s dall'LCP.
- [ ] **P3 · Video `/eventi` 6,9 MB** e altri in `public/` (~15 MB) — ricomprimere.
- [ ] **P4 · Cache `public/`** — `max-age=31536000, immutable` su immagini/video/svg.
- [ ] **P5 · Immagini sorgente sovradimensionate** (25 MB in `public/`), jpg duplicata.
- [ ] **P6 · Doppia ottimizzazione immagini Sanity** — loader custom.
- [ ] **P7 · `og.png` 1 MB** → <200 KB.
- [ ] **P8 · Logo header lazy** → eager; `contatti` senza `unoptimized`.
- [ ] **P9 · `data-sanity` in produzione** — solo in draft mode.

## Fase 4 — SEO (media)

- [ ] **SEO1 · Trailing slash** — link senza `/` finale (evita 308), canonical menu, URL schema.
- [ ] **SEO2 · Title home duplicato** (`title.absolute`), piscina con brand ripetuto.
- [ ] **SEO3 · Host vercel.app indicizzabile** — redirect a playaluna.it (impostazione Vercel).
- [ ] **SEO4 · Search Console** — impostare `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` o verifica DNS.
- [ ] **SEO5 · JSON-LD** — entità unica con `@id`, CAP, geo, orari, `hasMap`, `servesCuisine`, `hasMenu`;
  correggere `isPartOf`; unificare EventVenue.
- [ ] **SEO6 · Contatti** — JSON-LD, mappa, orari.
- [ ] **SEO7 · H1 con keyword**, niente H2 del dialog prima dell'H1.
- [ ] **SEO8 · Contenuti sottili** (~270 parole) + FAQ; menu in HTML e in sitemap.
- [ ] **SEO9 · OG/Twitter per pagina**, sitemap con `lastModified`, rimuovere `keywords` e `Host:`.
- [ ] **SEO10 · Etichette nav in italiano**.

## Fase 5 — Accessibilità e UX (media)

- [ ] **A1 · Banner cookie copre le CTA su mobile** — compatto, z-index CTA.
- [ ] **A2 · Video autoplay senza pausa / reduced-motion** (WCAG 2.2.2).
- [ ] **A3 · Landmark** — header/footer fuori da `<main>`, skip link.
- [ ] **A4 · Bottone Menu 35×16px**, Escape, click fuori, aria-label dinamico.
- [ ] **A5 · Contrasti** — footer, dialog, bianco su corallo.
- [ ] **A6 · Nome accessibile ≠ testo visibile** (WA/Contattaci).
- [ ] **A7 · Alt perso quando l'immagine diventa video**.
- [ ] **A8 · CTA** — beach-club "Prenota", piscina con `poolWhatsapp`, `tel:` senza `_blank`, Prenota nell'header mobile.
- [ ] **A9 · Tracking** — tassonomia evento/posizione, `booking_dialog_open`, `menu_view`.
- [ ] **A10 · Testi 8-10px** → min 12px; caroselli focusabili; frecce `aria-hidden`.

## Fase 6 — Privacy / GDPR (alta — richiede dati dal titolare)

- [ ] **G1 · Dati titolare** — ragione sociale, P.IVA, sede, PEC in privacy e footer. _Serve input._
- [ ] **G2 · Informativa art. 13** — basi giuridiche, trasferimenti extra-UE, conservazione, responsabili, reclamo.
- [ ] **G3 · "Anonimo senza cookie"** — GA solo dopo consenso (Consent Mode basic) o testo corretto.
- [ ] **G4 · Tabella cookie** completa.
- [ ] **G5 · Clarity `consentv2`**.
- [ ] **G6 · Consenso con timestamp/versione e scadenza**, X di chiusura, link privacy.

## Fase 7 — Pulizia architettura (bassa)

- [ ] **K1 · Un solo target di deploy** (Vercel) — rimuovere vinext/vite/worker/wrangler/Cloudflare.
- [ ] **K2 · Codice morto template** — `chatgpt-auth.ts`, `examples/`, `db/`, `drizzle/`, `.openai/`, svg, `tsconfig.tsbuildinfo`.
- [ ] **K3 · Test sempre rosso** (`codex-preview`) → smoke test reali.
- [ ] **K4 · Script npm cross-platform**.
- [ ] **K5 · Dipendenze inutili** (`drizzle-orm`, `@sanity/client`), versioni esatte.
- [ ] **K6 · Lint** — `set-state-in-effect` in `experience-video.tsx`.
- [ ] **K7 · URL hardcoded** vercel.app → env `NEXT_PUBLIC_SITE_URL`.
- [ ] **K8 · `package-lock.json`** — [x] aggiunto al repo.

---

## Registro

| Data | Punti | Note |
|---|---|---|
| 2026-11-09 | S1, S2, S3, S4, S5~, K8 | Sessione firmata, rate limit, logout, Next 16.4.5, lockfile. Build `next build` e `tsc` OK. |

**Azione richiesta in produzione (Vercel):** aggiungere `MEDIA_SESSION_SECRET` (stringa casuale ≥32 caratteri).
Dopo il deploy tutte le sessioni admin esistenti vengono invalidate: serve rifare login.
