import type { Metadata } from "next";
import { Cormorant_Garamond, Noto_Sans_SC, Source_Sans_3 } from "next/font/google";
import { getLocale } from "next-intl/server";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "600"],
});

const notoSansSc = Noto_Sans_SC({
  variable: "--font-noto-sc",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  icons: {
    icon: "/brand/logo-web.png",
    apple: "/brand/logo-web.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let locale = "es";
  try {
    locale = await getLocale();
  } catch {
    locale = "es";
  }

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${sourceSans.variable} ${notoSansSc.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
