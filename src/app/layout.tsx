import type { Metadata } from "next";
import {
  Inter,
  Amiri_Quran,
  Noto_Naskh_Arabic,
  Noto_Nastaliq_Urdu,
} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const amiriQuran = Amiri_Quran({
  subsets: ["arabic"],
  weight: "400",
  variable: "--font-amiri-quran",
  display: "swap",
});

const notoNaskhArabic = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-naskh-arabic",
  display: "swap",
});

const notoNastaliqUrdu = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-nastaliq-urdu",
  display: "swap",
});

export const metadata: Metadata = {
  title: "IslamicHub - Quran, Hadith & Prayer Times",
  description:
    "Read Quran online, explore Hadith, check prayer times and Islamic calendar.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${amiriQuran.variable} ${notoNaskhArabic.variable} ${notoNastaliqUrdu.variable} font-english`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}