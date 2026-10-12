import Image from "next/image";
import Link from "next/link";
import { mainNavigation } from "../lib/site";
import { BookingDepartmentDialog } from "./booking-department-dialog";

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

      <BookingDepartmentDialog />

      <details className="mobile-menu">
        <summary aria-label="Apri il menu">Menu</summary>
        <nav aria-label="Navigazione mobile">
          {mainNavigation.map((item) => (
            <Link href={item.href} key={item.href}>{item.label}</Link>
          ))}
          <BookingDepartmentDialog mobile />
        </nav>
      </details>
    </header>
  );
}
