"use client";

import { useMemo, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function Page() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    org: "",
    interest: "Request the deck",
    message: "",
    website: "", // honeypot
  });

  const canSubmit = useMemo(() => {
    return form.name.trim().length >= 2 && form.email.trim().length >= 5 && status !== "loading";
  }, [form, status]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;

      if (!res.ok || !data?.ok) {
        setStatus("error");
        setError(data?.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  }

  return (
    <main className="min-h-screen bg-[#0b0d12] text-white">
      <div className="mx-auto max-w-5xl px-5 py-16">
        <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
          <span className="h-2 w-2 rounded-full bg-[#6ee7ff] shadow-[0_0_18px_rgba(110,231,255,.55)]" />
          Coming soon — building the rails for modern film finance
        </div>

        <h1 className="mt-6 text-5xl font-semibold tracking-tight">Hudson Yards Studios</h1>

        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-white/70">
          A modern film finance, studio, and technology platform building infrastructure for how films are financed,
          owned, and monetized in the digital era — grounded in institutional discipline and built to last.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card
            title="Film Financing (Yield Engine)"
            body="Structured financing with disciplined underwriting and modern reporting."
          />
          <Card
            title="Studio & Owned Content (Asset Engine)"
            body="Controlled production and owned IP designed to compound over time."
          />
          <Card
            title="Tokenized Infrastructure (Scale Engine)"
            body="Digital ownership rails built for compliance and future liquidity—when the market aligns."
          />
          <Card
            title="Cultural Platform (Brand Engine)"
            body="Community, filmmaker relationships, and ecosystem development that reinforces the platform."
          />
        </div>

        <section className="mt-10 grid grid-cols-1 gap-6 border-t border-white/10 pt-10 md:grid-cols-5">
          <div className="md:col-span-3">
            <div className="text-xs uppercase tracking-[.18em] text-white/60">Foundation first</div>
            <h2 className="mt-3 text-2xl font-semibold">What we’re building first</h2>
            <p className="mt-3 text-white/70 leading-relaxed">
              The pre-seed phase is about establishing a durable foundation: initial structured financing activity,
              an owned content pipeline, a compliance-first tokenization MVP, and key partnerships.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:col-span-2">
            <h3 className="text-base font-semibold">Request the deck</h3>
            <p className="mt-2 text-sm text-white/70">
              We’re sharing materials selectively. Request the deck or an intro call below.
            </p>

            {status === "success" ? (
              <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-white/80">
                <div className="font-semibold">Thanks — received.</div>
                <div className="mt-1 text-white/70">
                  We’ll follow up shortly from <span className="text-white">hello@hystudios.io</span>.
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="mt-4 space-y-3">
                {/* Honeypot */}
                <input
                  value={form.website}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <select
                  value={form.interest}
                  onChange={(e) => setForm({ ...form, interest: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none"
                >
                  <option>Request the deck</option>
                  <option>Request an intro call</option>
                  <option>Partnership inquiry</option>
                  <option>Other</option>
                </select>

                <input
                  required
                  placeholder="Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none"
                />
                <input
                  required
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none"
                />
                <input
                  placeholder="Organization (optional)"
                  value={form.org}
                  onChange={(e) => setForm({ ...form, org: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none"
                />
                <textarea
                  placeholder="Message (optional)"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={4}
                  className="w-full resize-none rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none"
                />

                {status === "error" && <div className="text-sm text-red-300">{error}</div>}

                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="w-full rounded-xl bg-gradient-to-br from-[#6ee7ff] to-[#a78bfa] px-4 py-2 text-sm font-semibold text-black disabled:opacity-50"
                >
                  {status === "loading" ? "Sending…" : "Submit"}
                </button>

                <div className="text-[11px] leading-relaxed text-white/50">
                  This site is informational and does not constitute an offer to sell or solicitation to buy securities.
                </div>
              </form>
            )}
          </div>
        </section>

        <footer className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50">
          <div>© {new Date().getFullYear()} Hudson Yards Studios</div>
          <a className="hover:text-white/70" href="mailto:hello@hystudios.io">
            hello@hystudios.io
          </a>
        </footer>
      </div>
    </main>
  );
}

function Card({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-2 text-sm leading-relaxed text-white/70">{body}</div>
    </div>
  );
}
