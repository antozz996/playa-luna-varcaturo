"use client";

import { useId, useRef } from "react";
import {
  beachWhatsapp,
  eventWhatsapp,
  poolWhatsapp,
  restaurantPhoneHref,
} from "../lib/site";
import styles from "./booking-department-dialog.module.css";

const departments = [
  {
    number: "01",
    name: "Beach Club",
    description: "Ombrelloni, lettini e giornate al mare",
    action: "Scrivi su WhatsApp",
    href: beachWhatsapp,
    event: "whatsapp_beach",
    external: true,
  },
  {
    number: "02",
    name: "Ristorante",
    description: "Prenotazioni tavoli e informazioni",
    action: "Chiama il ristorante",
    href: restaurantPhoneHref,
    event: "phone_restaurant",
    external: false,
  },
  {
    number: "03",
    name: "Piscina",
    description: "Disponibilità e accessi in piscina",
    action: "Scrivi su WhatsApp",
    href: poolWhatsapp,
    event: "whatsapp_pool",
    external: true,
  },
  {
    number: "04",
    name: "Eventi",
    description: "Feste, cerimonie e matrimoni",
    action: "Scrivi su WhatsApp",
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
        className={mobile ? styles.mobileTrigger : "header-cta"}
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
            <p className={styles.eyebrow}>Playa Luna · Prenotazioni</p>
            <button
              type="button"
              className={styles.close}
              aria-label="Chiudi il popup"
              onClick={() => dialogRef.current?.close()}
            >
              ×
            </button>
          </div>
          <h2 id={id + "-title"} className={styles.title}>Con quale reparto vuoi parlare?</h2>
          <p id={id + "-description"} className={styles.intro}>
            Seleziona il servizio che ti interessa. Ti metteremo in contatto con il reparto giusto.
          </p>
          <div className={styles.options}>
            {departments.map((department) => (
              <a
                key={department.number}
                href={department.href}
                target={department.external ? "_blank" : undefined}
                rel={department.external ? "noopener noreferrer" : undefined}
                className={styles.option}
                data-event={department.event}
                onClick={() => dialogRef.current?.close()}
              >
                <span className={styles.optionNumber}>{department.number}</span>
                <span className={styles.optionBody}>
                  <strong className={styles.optionName}>{department.name}</strong>
                  <span className={styles.optionDescription}>{department.description}</span>
                  <span className={styles.optionAction}>{department.action}</span>
                </span>
                <span className={styles.arrow} aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </div>
      </dialog>
    </>
  );
}
