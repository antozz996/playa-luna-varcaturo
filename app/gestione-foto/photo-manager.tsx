"use client";

import Image from "next/image";
import { useRef, useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";

type PhotoManagerProps = {
  authenticated: boolean;
  sections: Array<{ id: string; title: string; href: string; cards: Array<{ id: string; label: string; location: string; area: string; src: string; kind: "image" | "video"; source: string }> }>;
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

export function PhotoManager({ authenticated, sections }: PhotoManagerProps) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeSlot, setActiveSlot] = useState<string | null>(null);
  const [activePage, setActivePage] = useState("home");
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

  function chooseAsset(slot: string, type: "image" | "video") {
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
      const form = new FormData();
      form.set("file", asset);
      form.set("slot", slot);
      form.set("page", activePage);
      form.set("type", activeType);
      const response = await fetch("/api/media/direct-upload", { method: "POST", body: form });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Caricamento non riuscito.");
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

  const section = sections.find((item) => item.id === activePage) || sections[0];

  return (
    <main className="media-admin">
      <header className="media-admin-header">
        <div>
          <p className="media-kicker">Playa Luna · privato</p>
          <h1>Gestione foto</h1>
        </div>
        <a href="/" target="_blank" rel="noreferrer">Vedi il sito ↗</a>
      </header>
      <p className="media-intro">Scegli una pagina: ogni card mostra il contenuto attualmente visibile sul sito, con la sua posizione precisa. Puoi sostituirlo con una foto o un video; le foto vengono ottimizzate automaticamente.</p>
      <nav className="media-page-nav" aria-label="Pagine del sito">
        {sections.map((item) => <button className={item.id === section.id ? "is-active" : ""} type="button" key={item.id} onClick={() => { setActivePage(item.id); setStatus(""); }}>{item.title}</button>)}
        <a href={section.href} target="_blank" rel="noreferrer">Apri pagina ↗</a>
      </nav>
      <input ref={inputRef} className="sr-only" type="file" accept={activeType === "image" ? "image/jpeg,image/png,image/webp" : "video/mp4"} onChange={uploadAsset} />
      {status && <p className="media-status" role="status">{status}</p>}
      <section className="media-grid" aria-label="Foto homepage">
        {section.cards.map((item) => (
          <article className="media-card" key={item.id}>
            <div className="media-preview">
              {item.kind === "video" ? <video src={item.src} muted autoPlay loop playsInline /> : <Image src={item.src} alt={`Anteprima ${item.label}`} fill sizes="(max-width: 700px) 100vw, 33vw" />}
              <div className="media-badges">
                <span className="media-type">{item.kind === "video" ? "VIDEO ATTIVO" : "FOTO ATTIVA"}</span>
                <span className="media-origin">{item.source}</span>
              </div>
            </div>
            <div className="media-card-copy">
              <p className="media-area">{item.area}</p>
              <h2>{item.label}</h2>
              <p>{item.location}</p>
              <div className="media-actions">
                <button type="button" onClick={() => chooseAsset(item.id, "image")} disabled={Boolean(activeSlot)}>
                  {activeSlot === item.id && activeType === "image" ? "Attendi…" : "Cambia foto"}
                </button>
                <button className="media-video-button" type="button" onClick={() => chooseAsset(item.id, "video")} disabled={Boolean(activeSlot)}>
                  {activeSlot === item.id && activeType === "video" ? "Attendi…" : item.kind === "video" ? "Cambia video" : "Carica video"}
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
