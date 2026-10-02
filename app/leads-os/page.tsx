"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";

const API_BASE = "https://rbbwwqmnlgqlzadbbebp.supabase.co/functions/v1/leads-os";
const RECOVERY_API = "https://rbbwwqmnlgqlzadbbebp.supabase.co/functions/v1/meta-recovery";
const TOKEN_KEY = "playa-leads-session";

type Lead = {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  event_type: string | null;
  event_date: string | null;
  guests: number | null;
  package_interest: string | null;
  source: string;
  campaign_name: string | null;
  ad_name: string | null;
  status: string;
  recovered: boolean;
  created_at: string;
};

type SyncRun = {
  id: number;
  run_type: string;
  status: string;
  checked_count: number;
  inserted_count: number;
  duplicate_count: number;
  started_at: string;
};

type DashboardData = {
  stats: Record<string, number>;
  leads: Lead[];
  sync_runs: SyncRun[];
};

const statusLabels: Record<string, string> = {
  new: "Nuovo",
  contacted: "Contattato",
  qualified: "Qualificato",
  quote: "Preventivo",
  visit: "Sopralluogo",
  booked: "Prenotato",
  lost: "Perso",
};

function whatsapp(phone: string | null) {
  if (!phone) return null;
  let digits = phone.replace(/\D/g, "");
  if (!digits) return null;
  if (!digits.startsWith("39")) digits = `39${digits}`;
  return `https://wa.me/${digits}`;
}

export default function LeadsOSPage() {
  const [token, setToken] = useState("");
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);
  const [recoveryConfigured, setRecoveryConfigured] = useState<boolean | null>(null);

  const api = useCallback(async (path: string, init: RequestInit = {}, authToken = token) => {
    const headers = new Headers(init.headers);
    headers.set("Content-Type", "application/json");
    if (authToken) headers.set("Authorization", `Bearer ${authToken}`);

    const response = await fetch(`${API_BASE}${path}`, {
      ...init,
      headers,
      cache: "no-store",
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      if (response.status === 401 && path !== "/login") {
        sessionStorage.removeItem(TOKEN_KEY);
        setToken("");
        setData(null);
      }
      throw new Error(payload.error || "Errore di comunicazione.");
    }
    return payload;
  }, [token]);

  const load = useCallback(async (authToken = token) => {
    if (!authToken) return;
    try {
      const payload = await api("/dashboard", { method: "GET" }, authToken);
      setData(payload);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore.");
    }
  }, [api, token]);

  useEffect(() => {
    const saved = sessionStorage.getItem(TOKEN_KEY) || "";
    setToken(saved);
    setReady(true);
    if (saved) void load(saved);

    void fetch(`${RECOVERY_API}/health`, { cache: "no-store" })
      .then((response) => response.json())
      .then((payload) => setRecoveryConfigured(Boolean(payload.configured)))
      .catch(() => setRecoveryConfigured(null));
  }, [load]);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const form = new FormData(event.currentTarget);
    try {
      const payload = await api("/login", {
        method: "POST",
        body: JSON.stringify({ password: String(form.get("password") || "") }),
      }, "");
      sessionStorage.setItem(TOKEN_KEY, payload.token);
      setToken(payload.token);
      await load(payload.token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Accesso non riuscito.");
    } finally {
      setBusy(false);
    }
  }

  async function logout() {
    try {
      if (token) await api("/logout", { method: "POST", body: "{}" });
    } catch {
      // Local logout must still complete.
    }
    sessionStorage.removeItem(TOKEN_KEY);
    setToken("");
    setData(null);
  }

  async function createLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const form = event.currentTarget;
    const entries = Object.fromEntries(new FormData(form).entries());
    try {
      await api("/leads", { method: "POST", body: JSON.stringify(entries) });
      form.reset();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Salvataggio non riuscito.");
    } finally {
      setBusy(false);
    }
  }

  async function setStatus(id: string, status: string) {
    setBusy(true);
    setError("");
    try {
      await api("/status", {
        method: "PATCH",
        body: JSON.stringify({ id, status }),
      });
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Aggiornamento non riuscito.");
    } finally {
      setBusy(false);
    }
  }

  async function runRecovery() {
    if (!token) return;
    setBusy(true);
    setError("");
    try {
      const response = await fetch(RECOVERY_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ lookback_hours: 168 }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error || "Recovery non riuscito.");
      await load();
      setError(`Recovery completato: ${payload.inserted} recuperati, ${payload.duplicates} già presenti.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Recovery non riuscito.");
    } finally {
      setBusy(false);
    }
  }

  async function changePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fd = new FormData(form);
    const next = String(fd.get("new_password") || "");
    const confirm = String(fd.get("confirm_password") || "");
    if (next !== confirm) {
      setError("Le due password non coincidono.");
      return;
    }

    setBusy(true);
    setError("");
    try {
      await api("/change-password", {
        method: "POST",
        body: JSON.stringify({ new_password: next }),
      });
      sessionStorage.removeItem(TOKEN_KEY);
      setToken("");
      setData(null);
      setError("Password aggiornata. Accedi di nuovo.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Cambio password non riuscito.");
    } finally {
      setBusy(false);
    }
  }

  if (!ready) return <main className="leads-login"><p>Caricamento…</p></main>;

  if (!token || !data) {
    return (
      <main className="leads-login">
        <form className="login-card" onSubmit={login}>
          <p className="eyebrow">PLAYA LUNA · INTERNAL</p>
          <h1>Leads OS</h1>
          <p className="login-copy">Accesso riservato alla gestione commerciale.</p>
          <label>
            Password
            <input name="password" type="password" autoComplete="current-password" required autoFocus />
          </label>
          {error ? <p className="error-message">{error}</p> : null}
          <button className="lead-primary" type="submit" disabled={busy}>
            {busy ? "Accesso…" : "Entra"}
          </button>
        </form>
      </main>
    );
  }

  const lastRun = data.sync_runs[0];

  return (
    <main className="leads-shell">
      <header className="leads-topbar">
        <div>
          <p className="eyebrow">PLAYA LUNA · COMMERCIAL CONTROL</p>
          <h1>Leads OS</h1>
        </div>
        <button className="lead-ghost" type="button" onClick={logout}>Esci</button>
      </header>

      {error ? <div className="system-message">{error}</div> : null}

      <section className="lead-metrics">
        <article><span>Lead</span><strong>{data.stats.total || 0}</strong></article>
        <article><span>Da contattare</span><strong>{data.stats.new || 0}</strong></article>
        <article><span>Preventivi</span><strong>{data.stats.quote || 0}</strong></article>
        <article><span>Sopralluoghi</span><strong>{data.stats.visit || 0}</strong></article>
        <article><span>Prenotati</span><strong>{data.stats.booked || 0}</strong></article>
        <article><span>Recuperati</span><strong>{data.stats.recovered || 0}</strong></article>
      </section>

      <section className="lead-panel">
        <div className="lead-panel-heading">
          <div>
            <p className="eyebrow">INGRESSO MANUALE</p>
            <h2>Nuovo lead</h2>
          </div>
          <p>Usabile subito. Quando colleghiamo Meta, gli stessi record entreranno automaticamente.</p>
        </div>

        <form className="lead-form-grid" onSubmit={createLead}>
          <label>Nome<input name="name" required /></label>
          <label>Telefono<input name="phone" inputMode="tel" /></label>
          <label>Email<input name="email" type="email" /></label>
          <label>Evento
            <select name="event_type" defaultValue="Laurea">
              <option>Laurea</option><option>18 anni</option><option>Compleanno</option>
              <option>Cerimonia</option><option>Corporate</option><option>Wedding</option><option>Altro</option>
            </select>
          </label>
          <label>Data evento<input name="event_date" type="date" /></label>
          <label>Invitati<input name="guests" type="number" min="1" /></label>
          <label>Formula
            <select name="package_interest" defaultValue="">
              <option value="">Da definire</option><option>Aperitivo</option><option>Cena</option>
              <option>Cena + party</option><option>Solo party</option>
            </select>
          </label>
          <label>Sorgente
            <select name="source" defaultValue="manual">
              <option value="manual">Manuale</option><option value="meta">Meta</option>
              <option value="website">Sito</option><option value="whatsapp">WhatsApp</option>
            </select>
          </label>
          <label>Campagna<input name="campaign_name" placeholder="es. Lauree Ottobre" /></label>
          <label>Ad<input name="ad_name" placeholder="es. Trasformazione 18:30" /></label>
          <label className="lead-wide">Note<textarea name="notes" rows={2} /></label>
          <button className="lead-primary" type="submit" disabled={busy}>Salva lead</button>
        </form>
      </section>

      <section className="lead-panel">
        <div className="lead-panel-heading">
          <div>
            <p className="eyebrow">RECOVERY</p>
            <h2>Salute sincronizzazione</h2>
          </div>
          <div className="recovery-actions">
            <p>
              {lastRun
                ? `${lastRun.run_type} · ${lastRun.status} · inseriti ${lastRun.inserted_count} · duplicati ${lastRun.duplicate_count}`
                : recoveryConfigured === false
                  ? "Backend pronto · connessione Meta ancora da autorizzare."
                  : recoveryConfigured === true
                    ? "Connessione Meta configurata · recovery pronto."
                    : "Stato connessione Meta non disponibile."}
            </p>
            <button
              className="lead-ghost"
              type="button"
              disabled={busy || recoveryConfigured !== true}
              onClick={() => void runRecovery()}
            >
              Esegui recovery Meta
            </button>
          </div>
        </div>
      </section>

      <section className="lead-panel">
        <div className="lead-panel-heading">
          <div>
            <p className="eyebrow">PIPELINE</p>
            <h2>Lead recenti</h2>
          </div>
          <p>{data.stats.new || 0} contatti richiedono ancora il primo contatto.</p>
        </div>

        <div className="lead-table-wrap">
          <table className="lead-table">
            <thead>
              <tr><th>Lead</th><th>Evento</th><th>Fonte</th><th>Stato</th><th>Azioni</th></tr>
            </thead>
            <tbody>
              {data.leads.length === 0 ? (
                <tr><td colSpan={5} className="lead-empty">Nessun lead. Inserisci il primo contatto di prova.</td></tr>
              ) : data.leads.map((lead) => {
                const wa = whatsapp(lead.phone);
                return (
                  <tr key={lead.id}>
                    <td>
                      <strong>{lead.name}</strong>
                      <small>{lead.phone || lead.email || "Nessun recapito"}</small>
                      <small>{new Date(lead.created_at).toLocaleString("it-IT")}</small>
                    </td>
                    <td>
                      <strong>{lead.event_type || "Da definire"}</strong>
                      <small>{lead.guests ? `${lead.guests} invitati` : "Invitati da definire"}</small>
                      <small>{lead.event_date || "Data da definire"}</small>
                    </td>
                    <td>
                      <strong>
                        {lead.source}
                        {lead.recovered ? <span className="recovered-badge">RECOVERED</span> : null}
                      </strong>
                      <small>{lead.campaign_name || "—"}</small>
                      <small>{lead.ad_name || "—"}</small>
                    </td>
                    <td>
                      <select
                        value={lead.status}
                        disabled={busy}
                        onChange={(event) => void setStatus(lead.id, event.target.value)}
                      >
                        {Object.entries(statusLabels).map(([value, label]) => (
                          <option key={value} value={value}>{label}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      {wa ? <a className="lead-wa" href={wa} target="_blank" rel="noreferrer">WhatsApp ↗</a> : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="lead-panel security-panel">
        <div>
          <p className="eyebrow">SICUREZZA</p>
          <h2>Cambia password</h2>
          <p>La modifica chiude tutte le sessioni attive e richiede un nuovo accesso.</p>
        </div>
        <form className="password-form" onSubmit={changePassword}>
          <input name="new_password" type="password" minLength={12} placeholder="Nuova password" required />
          <input name="confirm_password" type="password" minLength={12} placeholder="Ripeti password" required />
          <button className="lead-primary" type="submit" disabled={busy}>Aggiorna password</button>
        </form>
      </section>
    </main>
  );
}
