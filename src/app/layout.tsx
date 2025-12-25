import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CivDocs - Civil Construction Management Software",
  description: "All-in-one civil construction software: digital pre-starts, timesheets, plant hire logbooks, cost tracking, and AI-powered insights. Start free trial.",
  keywords: ["civil construction", "construction management", "plant hire", "timesheets", "logbooks", "prestarts", "cost tracking", "construction software", "civil contractor"],
  authors: [{ name: "CivDocs" }],
  creator: "CivDocs",
  publisher: "CivDocs",
  metadataBase: new URL("https://civdocs.com.au"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "CivDocs - Civil Construction Management Software",
    description: "All-in-one civil construction software: digital pre-starts, timesheets, plant hire logbooks, cost tracking, and AI-powered insights. Start free trial.",
    url: "https://civdocs.com.au",
    siteName: "CivDocs",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "/CivDocs-logo-1000x400.svg",
        width: 1000,
        height: 400,
        alt: "CivDocs - Civil Construction Management",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CivDocs - Civil Construction Management Software",
    description: "Simplify civil construction management with CivDocs.",
    images: ["/CivDocs-logo-1000x400.svg"],
  },
  icons: {
    icon: [
      { url: "/favicon-for-app/favicon.ico", sizes: "any" },
      { url: "/favicon-for-app/icon0.svg", type: "image/svg+xml" },
      { url: "/favicon-for-app/icon1.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/favicon-for-app/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
