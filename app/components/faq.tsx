import { jsonLd } from "../lib/schema";
import type { FaqItem } from "../lib/faqs";

/** Accessible FAQ list (native <details>) plus FAQPage structured data. */
export function Faq({ items, title = "Domande frequenti", id = "faq" }: { items: FaqItem[]; title?: string; id?: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <section className="faq shell" aria-labelledby={`${id}-title`}>
      <p className="eyebrow">Informazioni utili</p>
      <h2 id={`${id}-title`}>{title}</h2>
      <div className="faq-list">
        {items.map((item) => (
          <details key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
    </section>
  );
}
