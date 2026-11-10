# Playa Luna · sito ufficiale

Sito di Playa Luna a Marina di Varcaturo (beach club, ristorante, piscina, eventi, wedding).
Next.js 16 + React 19, pagine statiche, deploy su Vercel. Live: https://playaluna.it

## Comandi

```bash
npm install        # dipendenze
npm run dev        # sviluppo su http://localhost:3000
npm run build      # build di produzione
npm start          # serve la build
npm run lint       # ESLint
npm run typecheck  # TypeScript
npm test           # build + smoke test su tutte le pagine (tests/smoke.test.mjs)
```

Funziona su Windows, macOS e Linux. Node >= 22.13.

**Controlli automatici.** Vercel pubblica solo se passano lint, TypeScript, build e smoke test
(`buildCommand` in `vercel.json`): se un controllo fallisce, il sito resta alla versione precedente.
Gli stessi controlli girano su GitHub Actions (`.github/workflows/ci.yml`) a ogni push.

## Struttura

- `app/` — pagine (`page.tsx` per rotta), componenti in `app/components/`
- `app/lib/site.ts` — **dati centrali**: telefoni, WhatsApp, indirizzo, orari, navigazione
- `app/lib/schema.ts` — dati strutturati schema.org (LocalBusiness, reparti, breadcrumb)
- `public/images/`, `public/videos/`, `public/menus/` — tutti i media del sito
- `next.config.ts` — redirect dal vecchio sito, header di sicurezza (CSP) e cache
- `ROADMAP.md` — stato delle correzioni dopo l'audit

## Cambiare foto, video o menu

I media vivono nel repository: non c'è CMS né storage esterno a pagamento.

1. Metti il file in `public/images/…` o `public/videos/…` con un **nome nuovo**
   (es. `hero-2027.webp`): la cache dei browser dura 7 giorni, un nome nuovo la aggira.
2. Aggiorna il percorso nella pagina (`app/…/page.tsx`).
3. Foto: WebP, lato lungo max 2048 px, qualità ~78.
   Video: MP4 H.264, max 1080 px di lato corto, 15 s in loop, senza audio, ≤ 2 Mbps,
   e un poster `nome-poster.webp` accanto (lo usa `PageMedia` in automatico):
   ```bash
   ffmpeg -i input.mp4 -t 15 -an -vf "scale=w='min(1080,iw)':h=-2,fps=30,format=yuv420p" \
     -c:v libx264 -preset slow -crf 26 -maxrate 2M -bufsize 4M -movflags +faststart output.mp4
   ffmpeg -ss 0.5 -i output.mp4 -frames:v 1 -q:v 80 output-poster.webp
   ```
4. `npm test`, commit, push: Vercel pubblica in ~1 minuto.

Menu PDF: sostituisci il file in `public/menus/` e aggiorna `menuPdf` in `app/menu-ristorante/page.tsx`.

## Orari e contatti

Si cambiano in un solo punto: `app/lib/site.ts` (`openingHours`, telefoni, WhatsApp, `eventFacts`,
`poolFacts`). Pagina contatti, FAQ, descrizioni, `/llms.txt` e dati strutturati per Google si aggiornano
da soli; un test fallisce se un orario viene scritto a mano in una pagina.

La home cambia da sola con la stagione (`seasonState()`): estiva dal 15 aprile al 30 settembre.

## Analytics e privacy

Google Analytics (`NEXT_PUBLIC_GA_ID`) e Microsoft Clarity (`NEXT_PUBLIC_CLARITY_ID`) si
attivano solo su playaluna.it, gestiti da `app/components/analytics-consent.tsx`.
Se si aggiunge un servizio esterno va autorizzato nella CSP in `next.config.ts`.
