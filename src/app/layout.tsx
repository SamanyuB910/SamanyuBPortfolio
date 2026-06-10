import type { Metadata } from "next";
import { Hanken_Grotesk, Fragment_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Providers } from "@/components/providers";
import { site } from "@/lib/site";
import "./globals.css";

const clash = localFont({
  src: [
    { path: "../fonts/ClashGrotesk-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/ClashGrotesk-Semibold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-clash",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

const fragment = Fragment_Mono({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-fragment",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${clash.variable} ${hanken.variable} ${fragment.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <noscript>
          <style>{`[data-reveal]{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <Providers>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-surface focus:px-3 focus:py-2 focus:text-ink"
          >
            Skip to content
          </a>
          {children}
        </Providers>
      </body>
    </html>
  );
}
