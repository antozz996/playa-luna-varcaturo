export type KeyFact = { label: string; value: string };

/** Compact "at a glance" facts block (dl): seasons, hours, capacity, services. */
export function KeyFacts({ title, facts, id }: { title: string; facts: KeyFact[]; id: string }) {
  return (
    <section className="key-facts shell" aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className="eyebrow">{title}</h2>
      <dl>
        {facts.map((fact) => (
          <div key={fact.label}>
            <dt>{fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
