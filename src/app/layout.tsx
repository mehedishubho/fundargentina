import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://fundargentina.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Fund Argentina — The World's Most Important Fake Fundraiser",
    template: "%s | Fund Argentina",
  },
  description:
    "The internet's most professional fake fundraising campaign dedicated to helping Argentina win the 2026 FIFA World Cup through imaginary donations. 100% satire. 0% real money.",
  keywords: [
    "Argentina",
    "Fund Argentina",
    "fake fundraiser",
    "satire",
    "Messi",
    "Lionel Messi",
    "football",
    "soccer",
    "donation",
    "meme",
    "2026 World Cup",
    "World Cup",
    "funny",
    "parody",
    "crowdfunding",
  ],
  authors: [{ name: "Fund Argentina" }],
  creator: "Fund Argentina",
  publisher: "Fund Argentina",
  openGraph: {
    title: "Fund Argentina — The World's Most Important Fake Fundraiser",
    description:
      "The internet's most professional fake fundraising campaign dedicated to helping Argentina win the 2026 FIFA World Cup through imaginary donations.",
    url: siteUrl,
    siteName: "Fund Argentina",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Fund Argentina - The World's Most Important Fake Fundraiser",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fund Argentina — The World's Most Important Fake Fundraiser",
    description:
      "The internet's most professional fake fundraising campaign dedicated to helping Argentina win the 2026 FIFA World Cup through imaginary donations.",
    images: ["/og-image.svg"],
    creator: "@fundargentina",
  },
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
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: siteUrl,
  },
  other: {
    "theme-color": "#0f172a",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Fund Argentina",
              alternateName: "FundArgentina",
              description:
                "The internet's most professional fake fundraising campaign dedicated to helping Argentina win the 2026 FIFA World Cup through imaginary donations.",
              url: siteUrl,
              potentialAction: {
                "@type": "SearchAction",
                target: `${siteUrl}/?search={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
              about: {
                "@type": "Thing",
                name: "2026 FIFA World Cup",
                sameAs: "https://en.wikipedia.org/wiki/2026_FIFA_World_Cup",
              },
              author: {
                "@type": "Organization",
                name: "Fund Argentina",
                url: siteUrl,
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              name: "Fund Argentina - Fake Fundraiser",
              description:
                "A satirical fundraising campaign to help Argentina win the 2026 FIFA World Cup through imaginary donations.",
              startDate: "2026-06-11",
              endDate: "2026-07-19",
              eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
              eventStatus: "https://schema.org/EventActiveMode",
              location: {
                "@type": "VirtualLocation",
                url: siteUrl,
              },
              organizer: {
                "@type": "Organization",
                name: "Fund Argentina",
                url: siteUrl,
              },
              performer: {
                "@type": "Person",
                name: "Lionel Messi",
                sameAs: "https://en.wikipedia.org/wiki/Lionel_Messi",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
