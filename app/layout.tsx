import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Saira+Condensed:ital,wght@0,700;0,900;1,700;1,900&family=Archivo:wght@400;500;600;700;800&family=Manrope:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
