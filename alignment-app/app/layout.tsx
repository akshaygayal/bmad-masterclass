import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// next/font self-hosts Inter at build time: no request to a font CDN at runtime.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Every route renders per request: the CSP nonce from proxy.ts can only be
// applied to dynamically rendered HTML, and AD-4 forbids cached session pages.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Requirements Interpretation Alignment",
  description: "Compare independent interpretations of a user story.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
