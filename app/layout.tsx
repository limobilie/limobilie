import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CookieBanner from "./components/CookieBanner";

import TrackVisit from '@/app/components/TrackVisit';  // 🔹 Importation ici

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Limobilie",
  description: "Agence immobilière – vente, location et services",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <TrackVisit /> {/* 🔹 Enregistre la visite ici */}
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}