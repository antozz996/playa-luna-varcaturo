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

## Fase 5 — Accessibilità e UX ✅

- [x] **A1 · Banner cookie su mobile** — compatto (288 → 209 px), il pulsante flottante "Prenota" sale sopra il banner finché è aperto, "Prenota" sempre visibile nell'header mobile; niente più lampo del banner per chi ha già scelto; tolto `aria-live`. _Il testo del banner si accorcia in Fase 6 (G3)._
- [x] **A2 · Video** — pulsante pausa/riproduci (44 px, etichetta che cambia) sui video in evidenza; reduced-motion già dalla Fase 3.
- [x] **A3 · Landmark** — su tutte le 10 pagine header e footer fuori da `<main id="main">`, link "Vai al contenuto" visibile al focus. _Verificato._
- [x] **A4 · Menu mobile** — area di tocco 66×48 px, testo 12 px, chiusura con Esc (focus torna al pulsante) e tocco fuori; nome = testo visibile. _Verificato._
- [x] **A5 · Contrasti** — footer da 0,38–0,52 a 0,74 di opacità; dialog `#6b625a`; nuovo `--coral-strong #b8452a` (~5:1) per tutti gli sfondi con testo bianco; X del dialog 44 px.
- [x] **A6 · Nome accessibile = testo visibile** — flottanti "WhatsApp" (eventi/wedding), "Prenota"/"Chiama" (servizi).
- [x] **A7 · Alt dei video** — i video con descrizione hanno `role="img"` + `aria-label`; quelli decorativi restano nascosti.
- [x] **A8 · CTA** — beach club "Prenota il tuo posto su WhatsApp"; piscina (pagina e home) con `poolWhatsapp` ed evento `whatsapp_pool`; `tel:` senza nuova scheda; freccia "Scopri il ristorante" corretta.
- [x] **A9 · Tracking** (completato in Fase 6) — aggiunti `booking_dialog_open`, `menu_view`, `menu_pdf_open`, `menu_pdf_download`. _Resta: separare reparto e posizione in due parametri (si fa con G3, toccando lo stesso file)._
- [x] **A10 · Testi** — tutti i testi da 8–10 px portati a 11 px (12 px dove serviva); galleria piatti raggiungibile da tastiera; frecce decorative `aria-hidden`; `role="group"` sui gruppi con etichetta.
- [ ] **Non fatto** — ristorante prenotabile anche su WhatsApp: manca un numero WhatsApp del ristorante.

## Fase 6 — Privacy / GDPR ✅

- [x] **G1 · Dati titolare** — Lido Playaluna S.r.l., P.IVA 09146931218, sede legale Via Epitaffio 15, 80014 Giugliano in Campania (NA): in privacy, footer e schema (`legalName`, `vatID`). Unico punto: `legalEntity` in `app/lib/site.ts`. _Manca solo la PEC (campo pronto, compare quando compilato)._
- [x] **G2 · Informativa art. 13** — riscritta: titolare, dati trattati, finalità con base giuridica (6.1.a/b/c/f), destinatari (Vercel, Google, Microsoft, titolari autonomi Meta/Google), trasferimenti USA (DPF/SCC), conservazione, diritti artt. 15–22, revoca, reclamo al Garante.
- [x] **G3 · GA solo dopo il consenso** (Consent Mode "basic"): prima di "Accetta" non parte nessuna richiesta verso Google o Microsoft; tolta la dicitura "anonimo senza cookie". _Verificato_ simulando playaluna.it: 0 richieste prima, GA+Clarity dopo l'accettazione, 0 dopo il rifiuto, 0 errori CSP.
- [x] **G4 · Tabella cookie** — `/cookie` con nome, fornitore, finalità e durata (localStorage del consenso, `_ga`, `_ga_<ID>`, `_clck`, `_clsk`, `CLID`/`MUID`).
- [x] **G5 · Clarity `consentv2`** — granted dopo il consenso, denied al rifiuto.
- [x] **G6 · Consenso** — salvato con data e versione (`app/lib/consent.ts`), scade dopo 6 mesi, versione aumentabile se cambiano i servizi; X di chiusura = rifiuto; link a cookie e privacy; "Rifiuta" allo stesso livello di "Accetta".
- [x] **A9 · Tracking** (dalla Fase 5) — eventi `whatsapp_click`/`phone_click` con parametri separati `department` e `placement`.
- [ ] **Consiglio** — far rileggere privacy e cookie policy a un consulente privacy: i testi sono completi ma non sostituiscono una verifica legale.

## Fase 7 — Pulizia architettura ✅

- [x] **K1 · Un solo target di deploy (Vercel)** — rimossi vinext, Vite, worker, Wrangler, plugin Cloudflare (−144 pacchetti). Script standard `next dev/build/start`.
- [x] **K2 · Codice morto** — rimossi `chatgpt-auth.ts`, `examples/`, `db/`, `drizzle/`, `.openai/`, `build/`, `scripts/*.sh`, `vite.config.ts`, `tsconfig.tsbuildinfo` (ora in `.gitignore`), ~260 righe di CSS del vecchio pannello, keyframe `hero-in`. _Le classi `wedding-gallery-item-*-v3` sono invece usate (generate dinamicamente) e restano._
- [x] **K3 · Test** — `tests/smoke.test.mjs`: 20 controlli su 10 pagine (title, canonical, description, og, 1 H1, 1 main, skip link, JSON-LD valido, niente slash finali, niente `tel:` in nuova scheda, nessun residuo Sanity/Blob, tutti i media esistono). `npm test` = **20/20**.
- [x] **K4 · Script cross-platform** — `npm run dev` funziona su Windows (verificato: 200 su home, eventi, contatti).
- [x] **K5 · Dipendenze** — tolti `drizzle-orm`/`drizzle-kit`, versioni esatte, `.npmrc` ripulito (audit riattivato). **Dipendenze di produzione: 0 vulnerabilità** (erano 30). Restano 8 moderate solo negli strumenti ESLint (dev).
- [x] **K10 · README** — riscritto: comandi, struttura, come cambiare foto/video/menu/orari, impostazioni ffmpeg.
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
| 2026-11-09 | A1–A8, A10, A9~ | Landmark e skip link, menu mobile, pausa video, contrasti AA, banner compatto, CTA corretti. tsc/lint/build OK, verificato nel browser a 390×844, 0 errori console. |
| 2026-11-09 | K1–K5, K10 | Solo Next/Vercel, codice del template rimosso, smoke test 20/20, 0 vulnerabilità in produzione, `npm run dev` ok su Windows, README nuovo. |
| 2026-11-09 | G1–G6, A9 | Dati societari, informativa art. 13, tabella cookie, GA/Clarity solo dopo consenso (verificato via rete), consenso con scadenza 6 mesi. lint/tsc/test 20/20 OK. |
| 2026-11-09 | **Pubblicazione** | PR #13 unita in `main`, deploy di produzione su playaluna.it. Verificato sul sito vero: 10 pagine 200 con i nuovi title, CSP/HSTS/X-Frame attivi, media raggiungibili, video hero 3,5 MB con cache 7 giorni, `/gestione-foto` e `/studio` 404. |
| 2026-11-09 | **Bug GA preesistente** | Google Analytics non aveva mai inviato dati: il codice originale metteva array nel `dataLayer`, che gtag.js ignora. Corretto (`arguments` come nello snippet ufficiale). Verificato in produzione: 0 richieste prima del consenso, hit `g/collect` e cookie `_ga` dopo "Accetta", cookie cancellati dopo "Rifiuta", 0 violazioni CSP. |

| 2026-11-10 | Orari, contenuti | Bar tutti i giorni 9–18:30 tutto l'anno (sostituisce "bar e ristorante 9–19 ott–apr"); rimosso "Pozzuoli"; menu HTML, FAQ, PEC; variabili Vercel ripulite; redirect vercel.app; sitemap reinviata e indicizzazione richiesta per menu e contatti. |

## Stato finale

Tutte le 7 fasi completate e online. Restano solo azioni fuori dal codice:

- [ ] **Vercel → Settings → Domains**: redirect da `playa-luna-varcaturo-delta.vercel.app` a `playaluna.it` (SEO3).
- [ ] **Vercel → Environment Variables**: rimuovere `NEXT_PUBLIC_SANITY_*`, `SANITY_*`, `BLOB_READ_WRITE_TOKEN`, `MEDIA_ADMIN_PASSWORD`; impostare `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` (SEO4) o verificare il dominio via DNS in Search Console e inviare `https://playaluna.it/sitemap.xml`.
- [ ] **Vercel → Storage**: eliminare lo store Blob (non più usato).
- [ ] **Sanity**: archiviare il progetto `7xx613y2`.
- [x] **PEC** — `lidoplayaluna@pec.it` (trovata su ufficiocamerale.it, confermata dall'utente) in privacy policy.
- [x] **SEO8 · Contenuti** — menu 2026 completo in HTML (`app/lib/menu.ts`: cucina, vini, bollicine, drink, distillati, prezzi, allergeni, note) con indice sticky e schema `Menu`; FAQ con schema `FAQPage` su spiaggia, piscina, ristorante, eventi e contatti (`app/lib/faqs.ts`), solo con dati confermati: orari, parcheggio gratuito, animali ammessi, docce/spogliatoi, Wi-Fi, accesso disabili, bagnino, piscina con ingresso separato, prezzi su WhatsApp, servizio 10% non incluso. Servizi anche in `amenityFeature` dello schema. Test 22/22.
- [x] **SEO3 · vercel.app** — redirect 308 da `playa-luna-varcaturo-delta.vercel.app/*` a `https://playaluna.it/*` (in `next.config.ts`, le anteprime restano raggiungibili). Verificato.
- [x] **Variabili Vercel** — rimosse le 13 inutilizzate (Sanity, Blob, password pannello). Restano solo `NEXT_PUBLIC_GA_ID` e `NEXT_PUBLIC_CLARITY_ID`.
- [ ] **Store Blob** `store_oNhBO3F4WH7yWIqV` (sospeso, 0 file): Vercel vieta agli agenti di eliminarlo. _Azione utente_: Vercel → Storage → store → Settings → Delete, oppure `vercel blob delete-store store_oNhBO3F4WH7yWIqV` in un terminale.
- [ ] **Token Sanity**: revocare i token API (in particolare quello di scrittura) su sanity.io/manage e archiviare il progetto `7xx613y2`. _Azione utente._
- [x] **SEO4 · Search Console** — la proprietà di dominio `playaluna.it` era già verificata (nessun codice necessario). Sitemap reinviata: **8 pagine rilevate**. Stato indicizzazione: home, beach-club, ristorante, piscina, eventi, wedding già indicizzate; `/menu-ristorante` (escluso per il vecchio canonical con slash, già corretto) e `/contatti` (mai scansionata) → **indicizzazione richiesta** il 2026-11-10.
- [ ] Far rileggere privacy e cookie policy a un consulente.

## Da fare su Vercel/Sanity dopo il deploy

- Variabili **non più necessarie**, da rimuovere: `NEXT_PUBLIC_SANITY_*`, `SANITY_*`, `BLOB_READ_WRITE_TOKEN`, `MEDIA_ADMIN_PASSWORD`, `MEDIA_SESSION_SECRET`.
- **Vercel Blob store**: si può eliminare (sul sito live non è referenziato nessun file Blob).
- **Progetto Sanity** `7xx613y2`: si può archiviare dopo aver verificato il sito in produzione.
- Controllare in console del browser su playaluna.it che GA e Clarity non vengano bloccati dalla CSP.
