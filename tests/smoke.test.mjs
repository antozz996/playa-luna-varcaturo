// Smoke tests on the prerendered HTML produced by `next build` (run via `npm test`).
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
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
};

function read(path) {
  const file = join(appDir, pages[path]);
  assert.ok(existsSync(file), `${path}: missing prerendered file ${pages[path]} — run next build`);
  return readFileSync(file, "utf8");
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
    const match = source.match(/(?<!artt\.\s)\b\d{1,2}(:\d{2})?\s*–\s*\d{1,2}(:\d{2})?\b(?![\d/])/);
    assert.equal(match, null, `${file}: hard-coded hours "${match?.[0]}" — use hoursLabel/openingHours`);
  }
});

test("llms.txt is generated with hours and pages", () => {
  const file = join(appDir, "llms.txt.body");
  assert.ok(existsSync(file), "llms.txt prerendered");
  const text = readFileSync(file, "utf8");
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

    assert.match(html, /<html lang="it"/, "lang=it");
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
