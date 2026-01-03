import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Hudson Yards Studios — Coming Soon",
  description:
    "Hudson Yards Studios is building the rails for modern film finance — a modern film finance, studio, and technology platform.",
  metadataBase: new URL("https://hystudios.io"),
  openGraph: {
    title: "Hudson Yards Studios — Coming Soon",
    description:
      "Modern infrastructure for how films are financed, owned, and monetized in the digital era.",
    url: "https://hystudios.io",
    siteName: "Hudson Yards Studios",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow:wght@700&family=Montserrat:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}

        {/* Plausible Analytics */}
        <Script
          defer
          data-domain="hystudios.io"
          src="https://plausible.io/js/script.js"
        />
      </body>
    </html>
  );
}
