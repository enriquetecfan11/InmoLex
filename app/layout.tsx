import type { Metadata } from "next";
import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/legal/CookieConsent";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "InmoLex | Compra, venta y alquiler",
    template: "%s | InmoLex",
  },
  description:
    "Agencia inmobiliaria en Madrid. Compra, vende o alquila propiedades con transparencia y asesoramiento personalizado.",
  icons: {
    icon: "/brand/logo-web.png",
    apple: "/brand/logo-web.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${sourceSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <Header />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
