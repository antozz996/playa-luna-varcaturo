import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import { CookiePreferencesButton } from "@/app/components/cookie-preferences-button";
import { languageAlternates } from "@/app/lib/i18n";
import { pageOpenGraph } from "@/app/lib/site";

const description = "Cookies and storage tools used by the Playa Luna website, with provider, purpose and duration.";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description,
  alternates: languageAlternates("en", "/en/cookie"),
  robots: { index: false, follow: true },
  openGraph: pageOpenGraph({ path: "/en/cookie", title: "Cookie Policy | Playa Luna", description, locale: "en" }),
};

const technical = [
  { name: "playaluna-analytics-consent", provider: "Playa Luna (localStorage)", purpose: "Remembers your choice in the cookie banner", duration: "6 months" },
  { name: "playaluna-source", provider: "Playa Luna (sessionStorage)", purpose: "Remembers where you came from (e.g. Instagram, Google) to add a short code, such as [IG], at the end of the WhatsApp message you choose to send us. It is not sent to anyone until you send the message yourself", duration: "Until the tab is closed" },
];

const analytics = [
  { name: "_ga", provider: "Google (Google Analytics)", purpose: "Distinguishes visitors for aggregate statistics", duration: "2 years" },
  { name: "_ga_<ID>", provider: "Google (Google Analytics)", purpose: "Keeps the state of the measurement session", duration: "2 years" },
  { name: "_clck", provider: "Microsoft (Clarity)", purpose: "Visitor identifier for Clarity", duration: "1 year" },
  { name: "_clsk", provider: "Microsoft (Clarity)", purpose: "Links the pages viewed in one session", duration: "1 day" },
  { name: "CLID, MUID", provider: "Microsoft (clarity.ms, bing.com)", purpose: "Technical identifiers of the Clarity service", duration: "1 year" },
];

const marketing = [
  { name: "_fbp", provider: "Meta (Meta Pixel)", purpose: "Recognises the browser to measure visits coming from our ads and contacts (WhatsApp, phone)", duration: "3 months" },
  { name: "_fbc", provider: "Meta (Meta Pixel)", purpose: "Remembers the click on a Facebook or Instagram ad that brought you to the site", duration: "3 months" },
  { name: "fr", provider: "Meta (facebook.com)", purpose: "Advertising: showing and measuring ads to people who visited the site. Set by Meta on its own domain if you have an account or have used its services", duration: "3 months" },
];

function CookieTable({ caption, rows }: { caption: string; rows: typeof analytics }) {
  return (
    <div className="legal-table-wrap">
      <table className="legal-table">
        <caption>{caption}</caption>
        <thead>
          <tr><th scope="col">Name</th><th scope="col">Provider</th><th scope="col">Purpose</th><th scope="col">Duration</th></tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}><th scope="row">{row.name}</th><td>{row.provider}</td><td>{row.purpose}</td><td>{row.duration}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function CookiePageEn() {
  return (
    <div className="page-shell">
      <div className="legal-header"><SiteHeader locale="en" path="/en/cookie" /></div>
      <main id="main">
      <article className="legal-page shell">
        <p className="eyebrow">Preferences</p>
        <h1>Cookie Policy</h1>
        <p className="legal-updated">Last updated: 10 November 2026</p>
        <p>
          This is an English translation for convenience. In case of discrepancy, the{" "}
          <Link href="/cookie" hrefLang="it">Italian version</Link> prevails.
        </p>

        <h2>Technical tools</h2>
        <p>These are needed for the site to work and do not require consent. The site sets no technical cookies of its own: it only stores your banner choice in the browser and, for the length of your visit, a source code that stays on your device.</p>
        <CookieTable caption="Technical tools" rows={technical} />

        <h2>Analytics cookies (only with consent)</h2>
        <p>
          Google Analytics and Microsoft Clarity are loaded <strong>only after you press “Accept”</strong>. Before
          consent the site sends no data to Google or Microsoft. We use them for aggregate statistics and to understand
          how to improve the pages; we do not use them for advertising. Data may be transferred to the United States as
          described in the <Link href="/en/privacy">privacy policy</Link>.
        </p>
        <CookieTable caption="Analytics cookies" rows={analytics} />

        <h2>Marketing cookies (only with consent)</h2>
        <p>
          With the same consent (“Accept”) we turn on the <strong>Meta Pixel</strong>, which tells Meta the pages visited
          and the clicks on WhatsApp and phone. We use it to measure the results of our ads on Facebook and Instagram and to
          show them to people who have already visited the site. Before consent the site sends no data to Meta. For the
          collection and transmission of the data Playa Luna and Meta are joint controllers: details are in the{" "}
          <Link href="/en/privacy">privacy policy</Link>.
        </p>
        <CookieTable caption="Marketing cookies" rows={marketing} />

        <h2>How to change your choice</h2>
        <p>You can review or withdraw consent at any time with the button below: the banner will be shown again. If you reject, the analytics and marketing cookies set by the site are deleted (the “fr” cookie is on Meta’s domain and is managed from your Facebook account or browser settings). You will be asked again after 6 months or if the tools we use change.</p>
        <CookiePreferencesButton locale="en" />

        <h2>External services</h2>
        <p>Links to WhatsApp, Google Maps, Instagram and Facebook lead to external services, which apply their own cookies and policies only once you open them.</p>
      </article>
      </main>
      <SiteFooter locale="en" />
    </div>
  );
}
