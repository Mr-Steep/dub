import type { Metadata } from "next";
import { Saira_Condensed, Archivo, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Saira_Condensed({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-display",
  display: "swap",
});
const head = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-head",
  display: "swap",
});
const body = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SPADAR Automotive — Private Luxury Vehicle Brokerage",
  description:
    "Direct sourcing of hypercars, armored saloons and ultra-rare collector pieces. DMCC Free Zone, Dubai.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${head.variable} ${body.variable} ${mono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
