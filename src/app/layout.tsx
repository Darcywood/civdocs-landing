import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CivDocs - Construction Management Software for Civil Contractors",
  description: "Pre-starts, timesheets, plant logbooks, and real-time cost tracking — all in one system. Built for civil contractors.",
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: "CivDocs - Construction Management Software for Civil Contractors",
    description: "Pre-starts, timesheets, plant logbooks, and real-time cost tracking — all in one system.",
    type: "website",
    siteName: "CivDocs",
  },
  twitter: {
    card: "summary_large_image",
    title: "CivDocs - Construction Management Software for Civil Contractors",
    description: "Pre-starts, timesheets, plant logbooks, and real-time cost tracking — all in one system.",
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
