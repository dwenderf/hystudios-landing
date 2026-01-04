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
    interest: "Request more information",
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
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 font-[family-name:var(--font-heading)] text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl animate-fade-in">
              Hudson Yards Studios
            </h1>

            <p className="mb-8 text-xl text-gray-600 sm:text-2xl animate-fade-in animate-delay-100">
              A new chapter in film finance is being written.
            </p>

            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-500 animate-fade-in animate-delay-200">
              Hudson Yards Studios is building the rails—modern infrastructure where capital moves with clarity, ownership is built to last, and stories become enduring assets in the next era of media. Foundation first.
            </p>
          </div>
        </div>

        {/* Decorative element */}
        <div className="absolute right-0 top-0 -z-10 h-full w-1/3 opacity-30">
          <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-gradient-to-br from-orange-200 to-orange-100 blur-3xl"></div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="border-t border-gray-100 py-24 min-h-screen flex items-center">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 font-[family-name:var(--font-heading)] text-4xl font-bold text-gray-900 sm:text-5xl animate-fade-in">
              Film is culturally massive — but financially outdated
            </h2>
            <div className="space-y-4 text-lg leading-relaxed text-gray-600 animate-fade-in animate-delay-100">
              <p>
                Film remains one of the world's most culturally important asset classes — yet its financial infrastructure has changed very little over decades.
              </p>
              <ul className="ml-6 space-y-2 list-disc">
                <li>Opaque, relationship-driven financing structures</li>
                <li>Capital is difficult for independent producers to access</li>
                <li>Investors face long holding periods and illiquidity</li>
                <li>Ownership and participation are hard to standardize or scale</li>
              </ul>
              <p className="pt-4 font-semibold text-gray-900">
                This is not a creativity problem. It is an infrastructure problem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Now Section */}
      <section className="bg-white/30 py-24 min-h-screen flex items-center">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 font-[family-name:var(--font-heading)] text-4xl font-bold text-gray-900 sm:text-5xl animate-fade-in">
              Film finance is ready for modernization
            </h2>
            <div className="space-y-4 text-lg leading-relaxed text-gray-600 animate-fade-in animate-delay-100">
              <ul className="ml-6 space-y-3 list-disc">
                <li>Global demand for content continues to grow</li>
                <li>Short-form and episodic formats are expanding rapidly</li>
                <li>Investors seek differentiated, yield-generating assets</li>
                <li>Fintech has transformed every major asset class except film</li>
              </ul>
              <p className="pt-4 font-semibold text-gray-900">
                Film is the laggard — and that creates opportunity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section className="border-t border-gray-100 py-24 min-h-screen flex flex-col" id="contact">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full flex-1 flex items-center">
          <div className="mx-auto w-full max-w-2xl">
            <h2 className="mb-12 text-center font-[family-name:var(--font-heading)] text-4xl font-bold text-gray-900 sm:text-5xl animate-fade-in">
              Want to learn more?
            </h2>

            {status === "success" ? (
              <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center animate-fade-in">
                <div className="mb-3 text-5xl">✓</div>
                <div className="mb-2 text-xl font-semibold text-gray-900">Thanks — received.</div>
                <div className="text-gray-600">
                  We'll follow up shortly from <span className="font-medium text-gray-900">hello@hystudios.io</span>.
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4 animate-fade-in animate-delay-100">
                {/* Honeypot */}
                <input
                  value={form.website}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    id="name"
                    required
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                  />
                  <input
                    id="email"
                    required
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                  />
                </div>

                <input
                  id="org"
                  placeholder="Company name (optional)"
                  value={form.org}
                  onChange={(e) => setForm({ ...form, org: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                />

                <textarea
                  id="message"
                  placeholder="Message (optional)"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={4}
                  className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                />

                {status === "error" && (
                  <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="w-full rounded-lg bg-gradient-to-r from-orange-600 to-orange-500 px-6 py-3 font-semibold text-white shadow-sm transition hover:from-orange-700 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? "Sending..." : "Submit"}
                </button>

                <p className="text-center text-xs leading-relaxed text-gray-500">
                  This site is informational and does not constitute an offer to sell or solicitation to buy securities.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Footer integrated into contact section */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full border-t border-gray-200 pt-8 mt-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              © {new Date().getFullYear()} Hudson Yards Studios. All rights reserved.
            </div>
            <a
              href="mailto:hello@hystudios.io"
              className="text-sm text-gray-600 transition hover:text-gray-900"
            >
              hello@hystudios.io
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
