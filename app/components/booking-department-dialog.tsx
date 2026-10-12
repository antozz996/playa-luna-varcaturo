"use client";

import { useId, useRef } from "react";
import { beachWhatsapp, eventWhatsapp, restaurantPhoneHref } from "../lib/site";
import styles from "./booking-department-dialog.module.css";

const departments = [
  {
    name: "Beach Club",
    action: "WhatsApp",
    href: beachWhatsapp,
    event: "whatsapp_beach",
    external: true,
  },
  {
    name: "Ristorante",
    action: "Chiama",
    href: restaurantPhoneHref,
    event: "phone_restaurant",
    external: false,
  },
  {
    name: "Eventi",
    action: "WhatsApp",
    href: eventWhatsapp,
    event: "whatsapp_events",
    external: true,
  },
] as const;

export function BookingDepartmentDialog({ mobile = false }: { mobile?: boolean }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const id = useId();

  return (
    <>
      <button
        type="button"
        className={mobile ? styles.mobileTrigger : `header-cta ${styles.desktopTrigger}`}
        aria-haspopup="dialog"
        aria-controls={id}
        onClick={() => dialogRef.current?.showModal()}
      >
        Prenota <span aria-hidden="true">↗</span>
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
            <p className={styles.eyebrow}>Playa Luna / Prenotazioni</p>
            <button
              type="button"
              className={styles.close}
              aria-label="Chiudi il popup"
              onClick={() => dialogRef.current?.close()}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>

          <h2 id={id + "-title"} className={styles.title}>Cosa vuoi prenotare?</h2>
          <p id={id + "-description"} className={styles.intro}>
            Scegli il reparto da contattare.
          </p>

          <div className={styles.options}>
            {departments.map((department) => (
              <a
                key={department.name}
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
