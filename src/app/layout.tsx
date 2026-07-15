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

export const metadata: Metadata = {
  title: "Fund Argentina — The World's Most Important Fake Fundraiser",
  description:
    "The internet's most professional fake fundraising campaign dedicated to helping Argentina win absolutely nothing through imaginary donations.",
  keywords: [
    "Argentina",
    "fundraiser",
    "satire",
    "Messi",
    "football",
    "donation",
    "meme",
  ],
  openGraph: {
    title: "Fund Argentina — The World's Most Important Fake Fundraiser",
    description:
      "The internet's most professional fake fundraising campaign dedicated to helping Argentina win absolutely nothing through imaginary donations.",
    type: "website",
    locale: "en_US",
    siteName: "Fund Argentina",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fund Argentina — The World's Most Important Fake Fundraiser",
    description:
      "The internet's most professional fake fundraising campaign dedicated to helping Argentina win absolutely nothing through imaginary donations.",
  },
  robots: {
    index: true,
    follow: true,
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
              description:
                "The internet's most professional fake fundraising campaign.",
              url: "https://fundargentina.com",
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
