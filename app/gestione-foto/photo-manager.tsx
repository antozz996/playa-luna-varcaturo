"use client";

import Image from "next/image";
import { useRef, useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { upload } from "@vercel/blob/client";
import { HOME_MEDIA_PRESENTATION } from "@/app/lib/site-media-presentation";
import type { HOME_MEDIA_SLOTS, HomeMediaSlot } from "@/app/lib/site-media";

type Slots = typeof HOME_MEDIA_SLOTS;

type PhotoManagerProps = {
  authenticated: boolean;
  slots: Slots;
  previews: Record<HomeMediaSlot, { src: string; kind: "image" | "video"; source: string }>;
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

export function PhotoManager({ authenticated, slots, previews }: PhotoManagerProps) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeSlot, setActiveSlot] = useState<HomeMediaSlot | null>(null);
  const [activeType, setActiveType] = useState<"image" | "video">("image");
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

  function chooseAsset(slot: HomeMediaSlot, type: "image" | "video") {
    setActiveSlot(slot);
    setActiveType(type);
    setStatus("");
    inputRef.current?.click();
  }

  async function uploadAsset(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    const slot = activeSlot;
    event.target.value = "";
    if (!file || !slot) return;
    if (activeType === "image" && !file.type.startsWith("image/")) {
      setStatus("Scegli una foto in formato immagine.");
      return;
    }
    if (activeType === "video" && !file.type.startsWith("video/")) {
      setStatus("Scegli un video MP4.");
      return;
    }

    try {
      setStatus(activeType === "image" ? "Ottimizzo e carico la foto…" : "Carico il video…");
      const asset = activeType === "image" ? await toWebp(file) : file;
      const pathname = activeType === "image" ? slots[slot].pathname : slots[slot].pathname.replace(/\.webp$/, ".mp4");
      const result = await upload(pathname, asset, {
        access: "public",
        handleUploadUrl: "/api/media/upload",
        clientPayload: JSON.stringify({ slot, type: activeType }),
      });
      setStatus(`${activeType === "image" ? "Foto" : "Video"} salvato. L’aggiornamento sarà visibile entro un minuto.`);
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
          <p>Gestisci foto e video della homepage in pochi secondi, senza Sanity e senza GitHub.</p>
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
      <p className="media-intro">Ogni card mostra il contenuto attualmente visibile sul sito, con la sua posizione precisa. Puoi sostituirlo con una foto o un video; le foto vengono ottimizzate automaticamente.</p>
      <input ref={inputRef} className="sr-only" type="file" accept={activeType === "image" ? "image/jpeg,image/png,image/webp" : "video/mp4"} onChange={uploadAsset} />
      {status && <p className="media-status" role="status">{status}</p>}
      <section className="media-grid" aria-label="Foto homepage">
        {(Object.entries(slots) as [HomeMediaSlot, Slots[HomeMediaSlot]][]).map(([slot, item]) => (
          <article className="media-card" key={slot}>
            <div className="media-preview">
              {previews[slot].kind === "video" ? <video src={previews[slot].src} muted autoPlay loop playsInline /> : <Image src={previews[slot].src} alt={`Anteprima ${item.label}`} fill sizes="(max-width: 700px) 100vw, 33vw" />}
              <div className="media-badges">
                <span className="media-type">{previews[slot].kind === "video" ? "VIDEO ATTIVO" : "FOTO ATTIVA"}</span>
                <span className="media-origin">{previews[slot].source}</span>
              </div>
            </div>
            <div className="media-card-copy">
              <p className="media-area">{HOME_MEDIA_PRESENTATION[slot].area} · {HOME_MEDIA_PRESENTATION[slot].format}</p>
              <h2>{item.label}</h2>
              <p>{HOME_MEDIA_PRESENTATION[slot].location}</p>
              <div className="media-actions">
                <button type="button" onClick={() => chooseAsset(slot, "image")} disabled={Boolean(activeSlot)}>
                  {activeSlot === slot && activeType === "image" ? "Attendi…" : "Cambia foto"}
                </button>
                <button className="media-video-button" type="button" onClick={() => chooseAsset(slot, "video")} disabled={Boolean(activeSlot)}>
                  {activeSlot === slot && activeType === "video" ? "Attendi…" : previews[slot].kind === "video" ? "Cambia video" : "Carica video"}
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
