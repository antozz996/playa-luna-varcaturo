import Image from "next/image";
import Link from "next/link";
import { otherLanguagePath, ui, type Locale } from "../lib/i18n";
import { BookingDepartmentDialog } from "./booking-department-dialog";
import { MobileMenu } from "./mobile-menu";

type SiteHeaderProps = {
  locale?: Locale;
  /** Current page path, used to link the same page in the other language. */
  path?: string;
};

export function SiteHeader({ locale = "it", path = "/" }: SiteHeaderProps) {
  const t = ui[locale];
  const other: Locale = locale === "it" ? "en" : "it";

  const navLinks = t.nav.map((item) =>
    item.note ? (
      <Link href={item.href} key={item.href} hrefLang="it" aria-label={`${item.label} (${item.note})`}>
        {item.label} <span className="nav-note" aria-hidden="true">IT</span>
      </Link>
    ) : (
      <Link href={item.href} key={item.href}>{item.label}</Link>
    ),
  );

  return (
    <header className="site-header">
      <Link className="brand-logo-link" href={locale === "en" ? "/en" : "/"} aria-label={t.homeLabel}>
        <Image className="brand-logo" src="/playaluna-logo.svg" alt="" width={524} height={344} unoptimized loading="eager" />
      </Link>

      <nav className="desktop-nav" aria-label={t.mainNav}>
        {navLinks}
      </nav>

      <div className="header-actions">
        {/* Plain <a>: the two languages use different root layouts, so this is a full page load anyway. */}
        <a
          className="lang-switch"
          href={otherLanguagePath(locale, path)}
          hrefLang={other}
          lang={other}
          aria-label={t.languageSwitch.aria}
          data-event={`language_${other}`}
        >
          {t.languageSwitch.label}
        </a>
        <BookingDepartmentDialog locale={locale} />
      </div>

      <MobileMenu label={t.menu}>
        <nav aria-label={t.mobileNav}>
          {navLinks}
          <BookingDepartmentDialog locale={locale} mobile />
        </nav>
      </MobileMenu>
    </header>
  );
}
