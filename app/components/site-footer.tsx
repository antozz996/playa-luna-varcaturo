import Image from "next/image";
import Link from "next/link";
import { mapsUrl, phoneHref, phoneNumber } from "../lib/site";

export function SiteFooter() {
  return (
    <footer id="contact">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Link className="brand-logo-link footer-logo-link" href="/" aria-label="Playa Luna, torna alla homepage">
            <Image className="brand-logo footer-brand-logo" src="/playaluna-logo.svg" alt="" width={524} height={344} unoptimized />
          </Link>
          <p>Beach club · Restaurant · Events</p>
        </div>
        <div>
          <p className="footer-label">Dove siamo</p>
          <a href={mapsUrl} target="_blank" rel="noreferrer" data-event="directions_click">
            Via Marina di Varcaturo, 42<br />Giugliano in Campania (NA)
          </a>
        </div>
        <div>
          <p className="footer-label">Contatti</p>
          <a href={phoneHref} data-event="phone_click">{phoneNumber}</a>
        </div>
        <div>
          <p className="footer-label">Seguici</p>
          <a href="https://www.instagram.com/lidoplayaluna/" target="_blank" rel="noreferrer" data-event="instagram_click">Instagram ↗</a>
          <a href="https://www.facebook.com/Complesso.Playa.Luna/" target="_blank" rel="noreferrer" data-event="facebook_click">Facebook ↗</a>
        </div>
      </div>
      <div className="shell footer-bottom">
        <p>© {new Date().getFullYear()} Playa Luna</p>
        <div><Link href="/privacy/">Privacy</Link><Link href="/cookie/">Cookie</Link></div>
        <p>Made with the Mediterranean in mind.</p>
      </div>
    </footer>
  );
}
