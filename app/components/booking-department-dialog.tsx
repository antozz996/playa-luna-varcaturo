"use client";

import { useId, useRef } from "react";
import { ui, whatsappLinks, type Locale } from "../lib/i18n";
import { restaurantPhoneHref } from "../lib/site";
import styles from "./booking-department-dialog.module.css";

function departmentsFor(locale: Locale) {
  const t = ui[locale].dialog;
  const wa = whatsappLinks[locale];
  return [
    { name: t.beach, action: "WhatsApp", href: wa.beach, event: "whatsapp_beach_dialog", external: true },
    { name: t.restaurant, action: "WhatsApp", href: wa.restaurant, event: "whatsapp_restaurant_dialog", external: true },
    { name: t.restaurant, action: t.call, href: restaurantPhoneHref, event: "phone_restaurant_dialog", external: false },
    { name: t.events, action: "WhatsApp", href: wa.events, event: "whatsapp_events_dialog", external: true },
  ];
}

export function BookingDepartmentDialog({ mobile = false, locale = "it" }: { mobile?: boolean; locale?: Locale }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const id = useId();
  const t = ui[locale];
  const departments = departmentsFor(locale);

  return (
    <>
      <button
        type="button"
        className={mobile ? styles.mobileTrigger : `header-cta ${styles.desktopTrigger}`}
        aria-haspopup="dialog"
        aria-controls={id}
        data-event="booking_dialog_open"
        onClick={() => dialogRef.current?.showModal()}
      >
        {t.book} <span aria-hidden="true">↗</span>
      </button>

      <dialog
        id={id}
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby={id + "-title"}
        aria-describedby={id + "-description"}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            event.currentTarget.close();
          }
        }}
      >
        <div className={styles.content}>
          <div className={styles.topRow}>
            <p className={styles.eyebrow}>{t.dialog.eyebrow}</p>
            <button
              type="button"
              className={styles.close}
              aria-label={t.dialog.close}
              onClick={() => dialogRef.current?.close()}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>

          {/* Not a heading element: the dialog is in the header, before each page's H1. It stays the dialog's accessible name via aria-labelledby. */}
          <p id={id + "-title"} className={styles.title}>{t.dialog.title}</p>
          <p id={id + "-description"} className={styles.intro}>
            {t.dialog.intro}
          </p>

          <div className={styles.options}>
            {departments.map((department) => (
              <a
                key={department.event}
                href={department.href}
                target={department.external ? "_blank" : undefined}
                rel={department.external ? "noopener noreferrer" : undefined}
                className={styles.option}
                data-event={department.event}
                onClick={() => dialogRef.current?.close()}
              >
                <span className={styles.optionName}>{department.name}</span>
                <span className={styles.optionAction}>
                  {department.action} <span className={styles.arrow} aria-hidden="true">↗</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </dialog>
    </>
  );
}
