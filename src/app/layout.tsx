import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { PassportProvider } from "@/context/PassportContext";
import { BookmarksProvider } from "@/context/BookmarksContext";
import { ThemeProvider } from "@/context/ThemeContext";

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: "Bharat Bharman — Explore India, Experience Bharat",
  description:
    "Discover what lives beyond the landmark. A national cultural discovery platform revealing the living culture, thematic tourism circuits, artisan traditions, and hidden stories of India.",
  keywords: [
    "Bharat Bharman",
    "Explore India Experience Bharat",
    "Cultural Shadows",
    "Tourism Circuits",
    "UP Tourism",
    "Ramayana Circuit",
    "Buddhist Circuit",
    "National Parks of India",
    "Incredible India",
  ],
  icons: {
    icon: [
      { url: '/images/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/logo.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/images/logo.png' },
    ],
  },
  openGraph: {
    title: "Bharat Bharman — Explore India, Experience Bharat",
    description:
      "Don't just visit India. Discover what lives beyond the landmark.",
    type: "website",
    locale: "en_US",
    siteName: "Bharat Bharman",
    images: [
      {
        url: '/images/logo.png',
        width: 800,
        height: 800,
        alt: 'Bharat Bharman Logo',
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-navy-dark text-ivory">
        <ThemeProvider>
          <LanguageProvider>
            <PassportProvider>
              <BookmarksProvider>
                {children}
              </BookmarksProvider>
            </PassportProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
