import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import { languageAlternates } from "@/app/lib/i18n";
import { address, hasLegalEntity, legalEntity, pageOpenGraph } from "@/app/lib/site";

const description = "How the Playa Luna website processes personal data (art. 13 of EU Regulation 2016/679, GDPR).";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description,
  alternates: languageAlternates("en", "/en/privacy"),
  robots: { index: false, follow: true },
  openGraph: pageOpenGraph({ path: "/en/privacy", title: "Privacy Policy | Playa Luna", description, locale: "en" }),
};

export default function PrivacyPageEn() {
  const email = legalEntity.email;
  return (
    <div className="page-shell">
      <div className="legal-header"><SiteHeader locale="en" path="/en/privacy" /></div>
      <main id="main">
      <article className="legal-page shell">
        <p className="eyebrow">Notice under art. 13 GDPR</p>
        <h1>Privacy Policy</h1>
        <p className="legal-updated">Last updated: 10 November 2026</p>
        <p>
          This is an English translation for convenience. In case of discrepancy, the{" "}
          <Link href="/privacy" hrefLang="it">Italian version</Link> prevails.
        </p>

        <h2>1. Data controller</h2>
        {hasLegalEntity ? (
          <p>
            The data controller is {legalEntity.name}, VAT no. {legalEntity.vatNumber}, registered office at{" "}
            {legalEntity.registeredOffice}, Italy. Contact: <a href={`mailto:${email}`}>{email}</a>
            {legalEntity.pec ? (
              <> · certified email (PEC) <a href={`mailto:${legalEntity.pec}`}>{legalEntity.pec}</a></>
            ) : null}
            .
          </p>
        ) : (
          <p>
            The data controller is the operator of Playa Luna, {address.streetAddress}, {address.postalCode}{" "}
            {address.locality} ({address.region}), Italy. For any request about personal data write to{" "}
            <a href={`mailto:${email}`}>{email}</a>.
          </p>
        )}

        <h2>2. What data we process</h2>
        <p>
          <strong>Browsing data:</strong> to serve the pages, the servers hosting the site log technical data such as IP
          address, browser type, requested page, date and time.{" "}
          <strong>Cookie preference:</strong> the choice you make in the banner is stored on your device.{" "}
          <strong>Usage statistics:</strong> only if you consent, Google Analytics and Microsoft Clarity collect data on
          how the site is used (pages visited, clicks, device, approximate location).{" "}
          <strong>Data you send us:</strong> when you contact us by phone, WhatsApp or email we process the data you
          choose to share (name, number, date and details of the booking or event). The site has no data collection
          forms.
        </p>

        <h2>3. Purposes and legal bases</h2>
        <ul>
          <li><strong>Answering your requests and managing bookings and events</strong> — pre-contractual and contractual measures you request (art. 6.1.b GDPR).</li>
          <li><strong>Running the site and protecting it from abuse</strong> — legitimate interest of the controller (art. 6.1.f GDPR).</li>
          <li><strong>Statistics and site improvement</strong> with Google Analytics and Microsoft Clarity — only with your consent (art. 6.1.a GDPR), which you can withdraw at any time.</li>
          <li><strong>Legal obligations</strong> (for example tax and accounting) — art. 6.1.c GDPR.</li>
        </ul>
        <p>Providing data is optional, but without contact details we cannot answer requests or manage bookings. We do not carry out automated decision-making or profiling.</p>

        <h2>4. Recipients and processors</h2>
        <p>Data may be processed on behalf of the controller, within the limits of their roles, by:</p>
        <ul>
          <li><strong>Vercel Inc.</strong> — website hosting;</li>
          <li><strong>Google Ireland Ltd / Google LLC</strong> — Google Analytics (only with consent);</li>
          <li><strong>Microsoft Ireland Operations Ltd / Microsoft Corporation</strong> — Microsoft Clarity (only with consent);</li>
          <li>advisers and suppliers supporting administration and accounting.</li>
        </ul>
        <p>When you use the links to WhatsApp, Google Maps, Instagram or Facebook you move to services of Meta and Google, which process your data as independent controllers under their own policies.</p>

        <h2>5. Transfers outside the European Union</h2>
        <p>Some providers (Vercel, Google, Microsoft) may process data in the United States. Transfers are based on the EU-U.S. Data Privacy Framework, which these providers have joined, and/or on the standard contractual clauses approved by the European Commission.</p>

        <h2>6. How long we keep data</h2>
        <ul>
          <li>Requests and bookings: as long as needed to handle them; tax data for the period required by law (10 years).</li>
          <li>Technical browsing data: for the period strictly necessary for the security of the service.</li>
          <li>Google Analytics: up to 14 months. Microsoft Clarity: up to 13 months.</li>
          <li>Cookie preference: 6 months, after which you will be asked again.</li>
        </ul>

        <h2>7. Your rights</h2>
        <p>
          You can ask at any time for access, rectification, erasure, restriction of processing and data portability,
          and object to processing based on legitimate interest (arts. 15–22 GDPR), by writing to{" "}
          <a href={`mailto:${email}`}>{email}</a>. You can withdraw consent to statistics from the{" "}
          <Link href="/en/cookie">cookie page</Link>, without affecting processing already carried out. You also have the
          right to lodge a complaint with the Italian data protection authority, Garante per la protezione dei dati
          personali (<a href="https://www.garanteprivacy.it" target="_blank" rel="noreferrer">www.garanteprivacy.it</a>).
        </p>
      </article>
      </main>
      <SiteFooter locale="en" />
    </div>
  );
}
