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
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500"></span>
              </span>
              Coming soon — Pre-seed fundraising open
            </div>

            <h1 className="mb-6 font-[family-name:var(--font-heading)] text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
              Hudson Yards Studios
            </h1>

            <p className="mb-8 text-xl text-gray-600 sm:text-2xl">
              Building the infrastructure for how films are financed, owned, and monetized in the digital era.
            </p>

            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-500">
              A modern film finance, studio, and technology platform — grounded in institutional discipline and built to last.
            </p>
          </div>
        </div>

        {/* Decorative element */}
        <div className="absolute right-0 top-0 -z-10 h-full w-1/3 opacity-30">
          <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-gradient-to-br from-orange-200 to-orange-100 blur-3xl"></div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="border-t border-gray-100 bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="mb-4 text-sm font-semibold uppercase tracking-wider text-orange-600">The Problem</div>
            <h2 className="mb-6 font-[family-name:var(--font-heading)] text-4xl font-bold text-gray-900 sm:text-5xl">
              Film is culturally massive — but financially outdated
            </h2>
            <div className="space-y-4 text-lg leading-relaxed text-gray-600">
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
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="mb-4 text-sm font-semibold uppercase tracking-wider text-orange-600">Why Now</div>
            <h2 className="mb-6 font-[family-name:var(--font-heading)] text-4xl font-bold text-gray-900 sm:text-5xl">
              Film finance is ready for modernization
            </h2>
            <div className="space-y-4 text-lg leading-relaxed text-gray-600">
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

      {/* Four Engines Section */}
      <section className="border-t border-gray-100 bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 text-center">
            <div className="mb-4 text-sm font-semibold uppercase tracking-wider text-orange-600">The Platform</div>
            <h2 className="mb-6 font-[family-name:var(--font-heading)] text-4xl font-bold text-gray-900 sm:text-5xl">
              Four coordinated pillars
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Hudson Yards Studios is not one product. It's an integrated ecosystem where each pillar can stand alone — but together, they compound.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <EngineCard
              number="01"
              title="Film Financing"
              subtitle="Yield Engine"
              description="Structured financing with disciplined underwriting and modern reporting. Providing capital to film projects through gap financing, bridge loans, and selective equity participation."
              accentColor="from-orange-500 to-orange-400"
            />
            <EngineCard
              number="02"
              title="Studio & Owned Content"
              subtitle="Asset Engine"
              description="Controlled production and owned IP designed to compound over time. Building a portfolio of films, shorts, and series with meaningful ownership stakes."
              accentColor="from-red-500 to-orange-500"
            />
            <EngineCard
              number="03"
              title="Tokenized Infrastructure"
              subtitle="Scale Engine"
              description="Digital ownership rails built for compliance and future liquidity. Enabling fractional participation and secondary markets within regulatory frameworks."
              accentColor="from-gray-700 to-gray-600"
            />
            <EngineCard
              number="04"
              title="Cultural Platform"
              subtitle="Brand Engine"
              description="Community, filmmaker relationships, and ecosystem development. Including the Hudson Yards Film Festival and creator partnerships that reinforce the platform."
              accentColor="from-blue-600 to-blue-500"
            />
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg font-semibold text-gray-900">
              This structure reduces risk while preserving upside.
            </p>
            <p className="mt-2 text-gray-600">
              Multiple revenue streams. Clear separation of risk. No single dependency.
            </p>
          </div>
        </div>
      </section>

      {/* Why This Team Wins Section */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 text-center">
            <div className="mb-4 text-sm font-semibold uppercase tracking-wider text-orange-600">The Team</div>
            <h2 className="mb-6 font-[family-name:var(--font-heading)] text-4xl font-bold text-gray-900 sm:text-5xl">
              Why this team wins
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              A rare combination of proven company-building, award-winning creative execution, and disciplined financial leadership.
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="grid gap-8 md:grid-cols-2">
              <TeamStrength
                title="Proven Zero-to-One Execution"
                description="CEO with a successful exit to Intercontinental Exchange (ICE), a major publicly traded exchange operator. Experience building regulated, durable platforms at scale."
              />
              <TeamStrength
                title="Creative Excellence"
                description="Emmy Award-winning President with deep production experience. Demonstrated ability to deliver premium projects at the highest professional standards."
              />
              <TeamStrength
                title="Financial Rigor"
                description="Senior financial expertise in fund structuring, cross-border operations, and disciplined capital management — critical in an industry where weak controls have historically undermined strong projects."
              />
              <TeamStrength
                title="Deep Industry Relationships"
                description="Experienced film producers and media advisors with extensive credits across features and television, providing practical insight and reducing execution risk."
              />
            </div>

            <div className="mt-12 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
              <p className="text-lg leading-relaxed text-gray-700">
                This team is not attempting to retrofit new technology onto an old studio model. The leadership's combined background across <span className="font-semibold text-gray-900">finance, production, and platform development</span> directly aligns with HYS's multi-prong approach.
              </p>
              <p className="mt-4 font-semibold text-gray-900">
                Execution over speculation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section className="border-t border-gray-100 bg-white py-24" id="contact">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="mb-4 text-sm font-semibold uppercase tracking-wider text-orange-600">Get Involved</div>
              <h2 className="mb-6 font-[family-name:var(--font-heading)] text-4xl font-bold text-gray-900 sm:text-5xl">
                Request the deck
              </h2>
              <p className="mb-6 text-lg leading-relaxed text-gray-600">
                We're sharing materials selectively with qualified investors and partners. Request the deck or schedule an intro call.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-orange-100">
                    <svg className="h-4 w-4 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Foundation First</div>
                    <div className="text-gray-600">Pre-seed capital enables initial financing activity, studio pipeline, and MVP platform development.</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-orange-100">
                    <svg className="h-4 w-4 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Built for Durability</div>
                    <div className="text-gray-600">Multiple revenue streams, institutional discipline, and a long-term vision for sustainable growth.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 shadow-sm">
              {status === "success" ? (
                <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
                  <div className="mb-2 text-4xl">✓</div>
                  <div className="mb-2 font-semibold text-gray-900">Thanks — received.</div>
                  <div className="text-gray-600">
                    We'll follow up shortly from <span className="font-medium text-gray-900">hello@hystudios.io</span>.
                  </div>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-4">
                  {/* Honeypot */}
                  <input
                    value={form.website}
                    onChange={(e) => setForm({ ...form, website: e.target.value })}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  <div>
                    <label htmlFor="interest" className="mb-2 block text-sm font-medium text-gray-700">
                      I'm interested in
                    </label>
                    <select
                      id="interest"
                      value={form.interest}
                      onChange={(e) => setForm({ ...form, interest: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                    >
                      <option>Request the deck</option>
                      <option>Request an intro call</option>
                      <option>Partnership inquiry</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
                        Name *
                      </label>
                      <input
                        id="name"
                        required
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                        Email *
                      </label>
                      <input
                        id="email"
                        required
                        type="email"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="org" className="mb-2 block text-sm font-medium text-gray-700">
                      Organization (optional)
                    </label>
                    <input
                      id="org"
                      placeholder="Company or fund name"
                      value={form.org}
                      onChange={(e) => setForm({ ...form, org: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-700">
                      Message (optional)
                    </label>
                    <textarea
                      id="message"
                      placeholder="Tell us about your interest..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={4}
                      className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                    />
                  </div>

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

                  <p className="text-xs leading-relaxed text-gray-500">
                    This site is informational and does not constitute an offer to sell or solicitation to buy securities.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
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
      </footer>
    </main>
  );
}

function EngineCard({
  number,
  title,
  subtitle,
  description,
  accentColor,
}: {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  accentColor: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition hover:shadow-md">
      <div className={`absolute left-0 top-0 h-1 w-full bg-gradient-to-r ${accentColor}`}></div>

      <div className="mb-4 text-sm font-bold text-gray-400">{number}</div>

      <h3 className="mb-2 font-[family-name:var(--font-heading)] text-2xl font-bold text-gray-900">
        {title}
      </h3>

      <div className="mb-4 text-sm font-semibold text-orange-600">{subtitle}</div>

      <p className="leading-relaxed text-gray-600">{description}</p>
    </div>
  );
}

function TeamStrength({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-3 font-[family-name:var(--font-heading)] text-xl font-bold text-gray-900">
        {title}
      </h3>
      <p className="leading-relaxed text-gray-600">{description}</p>
    </div>
  );
}
