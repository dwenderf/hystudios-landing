import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
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
