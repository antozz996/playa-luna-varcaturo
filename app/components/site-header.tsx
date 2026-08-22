import Image from "next/image";
import Link from "next/link";
import { beachWhatsapp, mainNavigation } from "../lib/site";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand-logo-link" href="/" aria-label="Playa Luna, torna alla homepage">
        <Image className="brand-logo" src="/playaluna-logo.svg" alt="" width={524} height={344} unoptimized />
      </Link>

      <nav className="desktop-nav" aria-label="Navigazione principale">
        {mainNavigation.map((item) => (
          <Link href={item.href} key={item.href}>{item.label}</Link>
        ))}
      </nav>

      <a
        className="header-cta"
        href={beachWhatsapp}
        target="_blank"
        rel="noreferrer"
        data-event="whatsapp_beach"
      >
        Prenota <span aria-hidden="true">↗</span>
      </a>

      <details className="mobile-menu">
        <summary aria-label="Apri il menu">Menu</summary>
        <nav aria-label="Navigazione mobile">
          {mainNavigation.map((item) => (
            <Link href={item.href} key={item.href}>{item.label}</Link>
          ))}
        </nav>
      </details>
    </header>
  );
}
