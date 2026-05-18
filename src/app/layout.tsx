import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import SignupAttributionCapture from "@/components/marketing/SignupAttributionCapture";
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
        {/* Meta Pixel Code */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '838965695621381');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=838965695621381&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}
        {/* Google tag (gtag.js) — Google Ads */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18162388889"
          strategy="afterInteractive"
        />
        <Script
          id="google-ads-gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-18162388889');
            `,
          }}
        />
        <SignupAttributionCapture />
        {children}
      </body>
    </html>
  );
}
