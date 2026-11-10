// Smoke tests on the prerendered HTML produced by `next build` (run via `npm test`).
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, sep } from "node:path";
import { test } from "node:test";

const root = process.cwd();
const appDir = join(root, ".next", "server", "app");

const pages = {
  "/": "index.html",
  "/beach-club": "beach-club.html",
  "/ristorante-sul-mare": "ristorante-sul-mare.html",
  "/menu-ristorante": "menu-ristorante.html",
  "/piscina": "piscina.html",
  "/eventi": "eventi.html",
  "/wedding": "wedding.html",
  "/contatti": "contatti.html",
  "/privacy": "privacy.html",
  "/cookie": "cookie.html",
  "/en": "en.html",
  "/en/beach-club": "en/beach-club.html",
  "/en/restaurant": "en/restaurant.html",
  "/en/menu": "en/menu.html",
  "/en/contact": "en/contact.html",
  "/en/privacy": "en/privacy.html",
  "/en/cookie": "en/cookie.html",
};

// IT page -> EN page (hreflang pairs, see app/lib/i18n.ts).
const pairs = {
  "/": "/en",
  "/beach-club": "/en/beach-club",
  "/ristorante-sul-mare": "/en/restaurant",
  "/menu-ristorante": "/en/menu",
  "/contatti": "/en/contact",
  "/privacy": "/en/privacy",
  "/cookie": "/en/cookie",
};

// Locally and on GitHub the prerendered HTML is in .next/server/app; on Vercel the build may place it
// elsewhere under .next, so fall back to searching the whole build folder.
const nextDir = join(root, ".next");
let buildFiles;
function findInBuild(name) {
  if (!buildFiles) {
    const walk = (dir) => {
      try {
        return readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? (e.name === "cache" ? [] : walk(join(dir, e.name))) : [join(dir, e.name)]));
      } catch {
        return [];
      }
    };
    buildFiles = walk(nextDir);
  }
  // "en/menu.html" must only match a file inside an "en" folder, "menu.html" never one inside "en".
  const parts = name.split("/");
  const file = parts.pop();
  const folder = parts.join(sep);
  const inRightFolder = (f) => {
    const dir = f.split(sep).slice(0, -1).join(sep);
    return folder ? dir.endsWith(`${sep}${folder}`) : !dir.endsWith(`${sep}en`);
  };
  const exact = buildFiles.find((f) => f.endsWith(`${sep}${file}`) && f.includes(`${sep}app${sep}`) && inRightFolder(f));
  if (exact) return exact;
  // Vercel build adapter: .next/output/functions/<route>.prerender-fallback.<ext>
  const base = file.replace(/\.(html|body)$/, "");
  return buildFiles.find((f) => f.split(sep).pop().startsWith(`${base}.prerender-fallback`) && inRightFolder(f));
}

function locate(name) {
  const direct = join(appDir, name);
  if (existsSync(direct)) return direct;
  const found = findInBuild(name);
  if (found) return found;
  const htmls = (buildFiles ?? []).filter((f) => f.endsWith(".html")).slice(0, 10).map((f) => f.replace(root, ""));
  assert.fail(`missing prerendered file ${name} — run next build. HTML files found: ${htmls.join(", ") || "none"}`);
}

function read(path) {
  return readFileSync(locate(pages[path]), "utf8");
}

test("FAQ with FAQPage schema on the service and contact pages", () => {
  for (const path of ["/beach-club", "/ristorante-sul-mare", "/piscina", "/eventi", "/wedding", "/contatti"]) {
    const html = read(path);
    assert.match(html, /"@type":"FAQPage"/, `${path}: FAQPage schema`);
    assert.match(html, /<details><summary>/, `${path}: visible FAQ`);
  }
});

test("menu is readable HTML with prices and Menu schema", () => {
  const html = read("/menu-ristorante");
  assert.match(html, /Linguina all’astice con pomodorini/);
  assert.match(html, /30,00 €/);
  assert.match(html, /"@type":"Menu"/);
  assert.match(html, /Allergeni:/);
});

test("opening hours are never hard-coded in pages (single source: app/lib/site.ts)", () => {
  const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]));
  const pages = walk(join(root, "app")).filter((f) => f.endsWith(".tsx"));
  for (const file of pages) {
    const source = readFileSync(file, "utf8");
    // Hour ranges use an en dash ("8–19", "12:30–16"); legal references like "artt. 15–22" are excluded.
    const match = source.match(/(?<!(?:artt|arts)\.\s)\b\d{1,2}(:\d{2})?\s*–\s*\d{1,2}(:\d{2})?\b(?![\d/])/);
    assert.equal(match, null, `${file}: hard-coded hours "${match?.[0]}" — use hoursLabel/openingHours`);
  }
});

test("English pages: translated menu, English WhatsApp, links to the Italian pages", () => {
  const menu = read("/en/menu");
  assert.match(menu, /Lobster linguine|linguine/i);
  assert.match(menu, /€30\.00/);
  assert.match(menu, /Allergens:/);
  assert.doesNotMatch(menu, /Allergeni:/);
  const home = read("/en");
  assert.match(home, /wa\.me\/[0-9]+\?text=Hi%20Playa%20Luna/, "WhatsApp message in English");
  assert.doesNotMatch(home, /text=Ciao/, "no Italian WhatsApp messages");
  assert.match(home, /class="lang-switch" href="\/"/, "language switch back to Italian");
});

test("paired pages declare each other with hreflang", () => {
  const abs = (p) => `https://playaluna.it${p === "/" ? "" : p}`;
  for (const [it, en] of Object.entries(pairs)) {
    for (const path of [it, en]) {
      const html = read(path);
      for (const [lang, target] of [["it", it], ["en", en], ["x-default", it]]) {
        const href = abs(target).replace(/[.]/g, "\\.");
        assert.match(html, new RegExp(`<link rel="alternate" hrefLang="${lang}" href="${href}/?"`), `${path}: hreflang ${lang}`);
      }
    }
  }
});

test("llms.txt is generated with hours and pages", () => {
  const text = readFileSync(locate("llms.txt.body"), "utf8");
  assert.match(text, /## Orari/);
  assert.match(text, /menu-ristorante/);
});

test("every video has a poster and a mobile version", () => {
  const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]));
  const videos = walk(join(root, "public", "videos")).filter((f) => f.endsWith(".mp4") && !f.endsWith("-mobile.mp4"));
  assert.ok(videos.length > 0, "videos found");
  for (const video of videos) {
    assert.ok(existsSync(video.replace(/\.mp4$/, "-poster.webp")), `${video}: missing poster`);
    assert.ok(existsSync(video.replace(/\.mp4$/, "-mobile.mp4")), `${video}: missing mobile version`);
  }
});

for (const path of Object.keys(pages)) {
  test(`${path} renders a complete, valid page`, () => {
    const html = read(path);

    const lang = path.startsWith("/en") ? "en" : "it";
    assert.match(html, new RegExp(`<html lang="${lang}"`), `lang=${lang}`);
    assert.match(html, /<title>[^<]{10,}<\/title>/, "has a title");
    assert.match(html, /<link rel="canonical" href="https:\/\/playaluna\.it[^"]*"/, "has an absolute canonical");
    assert.match(html, /<meta name="description" content="[^"]{40,}"/, "has a meta description");
    assert.match(html, /property="og:url"/, "has og:url");

    const h1s = html.match(/<h1[\s>]/g) ?? [];
    assert.equal(h1s.length, 1, "exactly one H1");

    assert.equal((html.match(/<main[\s>]/g) ?? []).length, 1, "exactly one <main>");
    assert.doesNotMatch(html, /<main[^>]*>(?:(?!<\/main>)[\s\S])*<header class="site-header"/, "header outside <main>");
    assert.match(html, /class="skip-link" href="#main"/, "skip link");

    for (const [, json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
      assert.doesNotThrow(() => JSON.parse(json), "JSON-LD parses");
    }

    const slashLinks = [...html.matchAll(/href="(\/[a-z][a-z-]*\/)"/g)].map((m) => m[1]);
    assert.deepEqual(slashLinks, [], "no internal links with a trailing slash");

    assert.doesNotMatch(html, /href="tel:[^"]*"[^>]*target="_blank"/, "tel: links do not open a new tab");
    assert.doesNotMatch(html, /cdn\.sanity\.io|blob\.vercel-storage\.com/, "no Sanity/Blob leftovers");
  });

  test(`${path} references only media that exist in /public`, () => {
    const html = read(path);
    const refs = new Set(
      [...html.matchAll(/(?:src|url|poster|data|href)=(?:\\?")?(\/(?:images|videos|menus)\/[^"\\&?\s,)]+)/g)].map((m) =>
        decodeURIComponent(m[1]),
      ),
    );
    for (const ref of refs) {
      assert.ok(existsSync(join(root, "public", ref)), `${path}: missing file public${ref}`);
    }
  });
}
