import { Resend } from "resend";

export const runtime = "nodejs"; // keep Node runtime on Vercel

function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(input: string) {
    return input
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

export async function POST(req: Request) {
    try {
        const resendApiKey = process.env.RESEND_API_KEY;
        const toEmail = process.env.CONTACT_TO_EMAIL;
        const fromEmail = process.env.CONTACT_FROM_EMAIL;

        if (!resendApiKey || !toEmail || !fromEmail) {
            return Response.json(
                { ok: false, error: "Server is not configured." },
                { status: 500 }
            );
        }

        const body = await req.json().catch(() => null);
        if (!body) {
            return Response.json({ ok: false, error: "Invalid payload." }, { status: 400 });
        }

        const {
            name = "",
            email = "",
            org = "",
            interest = "Request the deck",
            message = "",
            website = "", // honeypot
        } = body as Record<string, string>;

        // Honeypot for spam bots
        if (website && website.trim().length > 0) {
            return Response.json({ ok: true }, { status: 200 });
        }

        const n = name.trim();
        const e = email.trim();
        const o = org.trim();
        const i = interest.trim();
        const m = message.trim();

        if (!n || n.length < 2) {
            return Response.json({ ok: false, error: "Please enter your name." }, { status: 400 });
        }
        if (!e || !isValidEmail(e)) {
            return Response.json({ ok: false, error: "Please enter a valid email." }, { status: 400 });
        }

        // Prevent abuse
        if (n.length > 120 || e.length > 160 || o.length > 160 || i.length > 80 || m.length > 2000) {
            return Response.json({ ok: false, error: "Input too long." }, { status: 400 });
        }

        const safe = {
            name: escapeHtml(n),
            email: escapeHtml(e),
            org: escapeHtml(o),
            interest: escapeHtml(i),
            message: escapeHtml(m),
        };

        let subject =
            safe.interest.toLowerCase().includes("call")
                ? `Intro call request — ${safe.name}${safe.org ? ` (${safe.org})` : ""}`
                : `Deck request — ${safe.name}${safe.org ? ` (${safe.org})` : ""}`;

        subject = `[HYS] ${subject}`;

        const html = `
      <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; line-height: 1.5;">
        <h2 style="margin: 0 0 12px;">New inbound from hystudios.io</h2>
        <p style="margin: 0 0 10px;"><b>Interest:</b> ${safe.interest}</p>
        <p style="margin: 0 0 10px;">
          <b>Name:</b> ${safe.name}<br/>
          <b>Email:</b> ${safe.email}<br/>
          <b>Org:</b> ${safe.org || "(not provided)"}
        </p>
        <p style="margin: 0 0 6px;"><b>Message:</b></p>
        <div style="white-space: pre-wrap; border: 1px solid #e5e7eb; border-radius: 10px; padding: 12px; background: #fafafa;">
          ${safe.message || "(none)"}
        </div>
        <p style="margin: 14px 0 0; color: #6b7280; font-size: 12px;">
          Sent via Next.js API route + Resend.
        </p>
      </div>
    `;

        const resend = new Resend(resendApiKey);

        const { data, error } = await resend.emails.send({
            from: fromEmail,
            to: toEmail,
            replyTo: e, // so "Reply" goes to the requester
            subject,
            html,
        });

        // If Resend returns an error object, surface it
        // (Resend typically returns { data, error } shape)
        if (error) {
            console.error("Resend send error:", error);
            return Response.json({ ok: false, error: "Email failed to send." }, { status: 502 });
        }

        if (!data?.id) {
            console.error("Resend send returned no id:", data);
            return Response.json(
                { ok: false, error: "Email service returned an unexpected response." },
                { status: 502 }
            );
        }

        console.log("Resend email sent:", data?.id);
        return Response.json({ ok: true }, { status: 200 });

    } catch (err) {
        console.error("Contact API error:", err);
        return Response.json({ ok: false, error: "Failed to send." }, { status: 500 });
    }
}
