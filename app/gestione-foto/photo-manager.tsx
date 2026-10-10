"use client";

import Image from "next/image";
import { useRef, useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { upload } from "@vercel/blob/client";
import type { HOME_MEDIA_SLOTS, HomeMediaSlot } from "@/app/lib/site-media";

type Slots = typeof HOME_MEDIA_SLOTS;

type PhotoManagerProps = {
  authenticated: boolean;
  slots: Slots;
  media: Partial<Record<HomeMediaSlot, string>>;
};

async function toWebp(file: File) {
  const bitmap = await createImageBitmap(file);
  const longestSide = Math.max(bitmap.width, bitmap.height);
  const scale = Math.min(1, 2400 / longestSide);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Il browser non riesce a preparare questa foto.");
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/webp", 0.88));
  if (!blob) throw new Error("La conversione della foto non è riuscita.");
  return new File([blob], `${file.name.replace(/\.[^.]+$/, "") || "foto"}.webp`, { type: "image/webp" });
}

export function PhotoManager({ authenticated, slots, media }: PhotoManagerProps) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeSlot, setActiveSlot] = useState<HomeMediaSlot | null>(null);
  const [status, setStatus] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoginError("");
    const response = await fetch("/api/media/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!response.ok) {
      const result = await response.json().catch(() => ({}));
      setLoginError(result.error || "Accesso non riuscito.");
      return;
    }
    router.refresh();
  }

  function choosePhoto(slot: HomeMediaSlot) {
    setActiveSlot(slot);
    setStatus("");
    inputRef.current?.click();
  }

  async function uploadPhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    const slot = activeSlot;
    event.target.value = "";
    if (!file || !slot) return;
    if (!file.type.startsWith("image/")) {
      setStatus("Scegli una foto in formato immagine.");
      return;
    }

    try {
      setStatus("Ottimizzo e carico la foto…");
      const optimized = await toWebp(file);
      const result = await upload(slots[slot].pathname, optimized, {
        access: "public",
        handleUploadUrl: "/api/media/upload",
        clientPayload: JSON.stringify({ slot }),
      });
      setStatus(`Foto salvata. L’aggiornamento sarà visibile entro un minuto.`);
      router.refresh();
      void result;
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Caricamento non riuscito.");
    } finally {
      setActiveSlot(null);
    }
  }

  if (!authenticated) {
    return (
      <main className="media-login">
        <form className="media-login-card" onSubmit={login}>
          <p className="media-kicker">Playa Luna</p>
          <h1>Gestione foto</h1>
          <p>Carica le immagini della homepage in pochi secondi, senza Sanity e senza GitHub.</p>
          <label>
            Password
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required />
          </label>
          {loginError && <p className="media-error" role="alert">{loginError}</p>}
          <button type="submit">Apri il pannello <span>→</span></button>
        </form>
      </main>
    );
  }

  return (
    <main className="media-admin">
      <header className="media-admin-header">
        <div>
          <p className="media-kicker">Playa Luna · privato</p>
          <h1>Gestione foto</h1>
        </div>
        <a href="/" target="_blank" rel="noreferrer">Vedi il sito ↗</a>
      </header>
      <p className="media-intro">Scegli un riquadro, carica la foto e salva. Le immagini sono ottimizzate automaticamente per il sito.</p>
      <input ref={inputRef} className="sr-only" type="file" accept="image/jpeg,image/png,image/webp" onChange={uploadPhoto} />
      {status && <p className="media-status" role="status">{status}</p>}
      <section className="media-grid" aria-label="Foto homepage">
        {(Object.entries(slots) as [HomeMediaSlot, Slots[HomeMediaSlot]][]).map(([slot, item]) => (
          <article className="media-card" key={slot}>
            <div className="media-preview">
              {media[slot] ? <Image src={media[slot]} alt="" fill sizes="(max-width: 700px) 100vw, 33vw" /> : <span>Nessuna foto caricata qui</span>}
            </div>
            <div className="media-card-copy">
              <h2>{item.label}</h2>
              <p>{item.description}</p>
              <button type="button" onClick={() => choosePhoto(slot)} disabled={Boolean(activeSlot)}>
                {activeSlot === slot ? "Attendi…" : media[slot] ? "Sostituisci foto" : "Carica foto"}
              </button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
