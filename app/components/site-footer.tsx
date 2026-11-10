import Image from "next/image";
import Link from "next/link";
import { ui, type Locale } from "../lib/i18n";
import {
  address,
  beachPhoneHref,
  beachPhoneNumber,
  eventPhoneHref,
  eventPhoneNumber,
  hasLegalEntity,
  legalEntity,
  mapsUrl,
  restaurantPhoneHref,
  restaurantPhoneNumber,
} from "../lib/site";

export function SiteFooter({ locale = "it" }: { locale?: Locale }) {
  const t = ui[locale];
  const f = t.footer;
  return (
    <footer id="contact">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Link className="brand-logo-link footer-logo-link" href={locale === "en" ? "/en" : "/"} aria-label={t.homeLabel}>
            <Image className="brand-logo footer-brand-logo" src="/playaluna-logo.svg" alt="" width={524} height={344} unoptimized />
          </Link>
          <p>{f.tagline}</p>
        </div>
        <div>
          <p className="footer-label">{f.where}</p>
          <a href={mapsUrl} target="_blank" rel="noreferrer" data-event="directions_click">
            {address.streetAddress}<br />{address.postalCode} {address.locality} ({address.region}){locale === "en" ? ", Italy" : ""}
          </a>
        </div>
        <div>
          <p className="footer-label">{f.contacts}</p>
          <a href={beachPhoneHref} data-event="phone_beach">{f.beach} · {beachPhoneNumber}</a>
          <a href={restaurantPhoneHref} data-event="phone_restaurant">{f.restaurant} · {restaurantPhoneNumber}</a>
          <a href={eventPhoneHref} data-event="phone_events">{f.events} · {eventPhoneNumber}</a>
        </div>
        <div>
          <p className="footer-label">{f.follow}</p>
          <a href="https://www.instagram.com/lidoplayaluna/" target="_blank" rel="noreferrer" data-event="instagram_click">Instagram <span aria-hidden="true">↗</span></a>
          <a href="https://www.facebook.com/Complesso.Playa.Luna/" target="_blank" rel="noreferrer" data-event="facebook_click">Facebook <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <div className="shell footer-bottom">
        <p>
          © {new Date().getFullYear()} {hasLegalEntity ? `${legalEntity.name} · ${f.vat} ${legalEntity.vatNumber}` : "Playa Luna"}
        </p>
        <div><Link href={f.privacy}>Privacy</Link><Link href={f.cookie}>Cookie</Link></div>
        <p>{f.motto}</p>
      </div>
    </footer>
  );
}
