import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import styles from "./menu.module.css";

export const metadata: Metadata = {
  title: "Menu del ristorante",
  description: "Consulta il menu 2026 del ristorante Playa Luna sul mare a Varcaturo.",
  alternates: { canonical: "/menu-ristorante/" },
};

const menuPdf = "/menus/Playa_Menu_ITA_2026_v11.pdf";

export default function RestaurantMenuPage() {
  return (
    <main>
      <SiteHeader />
      <section className={styles.menu} aria-labelledby="menu-title">
        <div className="shell">
          <nav className="breadcrumbs" aria-label="Percorso">
            <Link href="/">Home</Link><span>/</span>
            <Link href="/ristorante-sul-mare">Restaurant</Link><span>/</span><span>Menu</span>
          </nav>
          <p className="eyebrow">Restaurant · Playa Luna</p>
          <h1 id="menu-title" className={styles.title}>Il nostro <em>menu.</em></h1>
          <p>Scopri la proposta del ristorante Playa Luna.</p>
          <div className={styles.actions}>
            <a className="pill-button dark" href={menuPdf} target="_blank" rel="noopener noreferrer">
              Apri il PDF <span aria-hidden="true">↗</span>
            </a>
            <a className="pill-button dark" href={menuPdf} download>
              Scarica il menu <span aria-hidden="true">↓</span>
            </a>
          </div>
          <object className={styles.viewer} data={menuPdf} type="application/pdf" aria-label="Menu del ristorante Playa Luna 2026 in PDF">
            <p>Per visualizzare il menu, <a href={menuPdf} target="_blank" rel="noopener noreferrer">apri il PDF</a> oppure scaricalo con il pulsante qui sopra.</p>
          </object>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
