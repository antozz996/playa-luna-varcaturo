// Smoke tests on the prerendered HTML produced by `next build` (run via `npm test`).
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
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
  for (const path of ["/beach-club", "/ristorante-sul-mare", "/piscina", "/eventi", "/contatti"]) {
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
