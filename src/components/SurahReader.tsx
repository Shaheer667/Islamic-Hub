"use client";

import { useEffect, useState } from "react";
import type { Ayah } from "@/lib/quran";
import AyahAudioPlayer from "@/components/AyahAudioPlayer";

type Props = {
  ayahs: Ayah[];
  surahNumber: number;
  surahEnglishName: string;
  surahArabicName: string;
};

type TranslationMode = "english" | "urdu" | "both" | "arabic";

type Bookmark = {
  ayahNumber: number;
  numberInSurah: number;
  surahNumber: number;
  surahEnglishName: string;
  surahArabicName: string;
  arabicText: string;
  englishTranslation: string;
  urduTranslation: string;
};

const BISMILLAH = "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";

const options: { label: string; value: TranslationMode }[] = [
  { label: "English", value: "english" },
  { label: "Urdu", value: "urdu" },
  { label: "Both", value: "both" },
  { label: "Arabic Only", value: "arabic" },
];

function splitBismillah(text: string, surahNumber: number, ayahNumber: number) {
  const shouldSplit =
    ayahNumber === 1 &&
    surahNumber !== 1 &&
    surahNumber !== 9 &&
    text.startsWith(BISMILLAH);

  if (!shouldSplit) {
    return {
      bismillah: "",
      remainingText: text,
    };
  }

  return {
    bismillah: BISMILLAH,
    remainingText: text.replace(BISMILLAH, "").trim(),
  };
}

export default function SurahReader({
  ayahs,
  surahNumber,
  surahEnglishName,
  surahArabicName,
}: Props) {
  const [mode, setMode] = useState<TranslationMode>("english");
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [copiedAyah, setCopiedAyah] = useState<number | null>(null);

  useEffect(() => {
    const savedBookmarks = localStorage.getItem("quran-bookmarks");

    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }
  }, []);

  function saveBookmarks(updatedBookmarks: Bookmark[]) {
    setBookmarks(updatedBookmarks);
    localStorage.setItem("quran-bookmarks", JSON.stringify(updatedBookmarks));
  }

  function isBookmarked(ayahNumber: number) {
    return bookmarks.some((item) => item.ayahNumber === ayahNumber);
  }

  function toggleBookmark(ayah: Ayah) {
    const alreadyBookmarked = isBookmarked(ayah.number);

    if (alreadyBookmarked) {
      const updatedBookmarks = bookmarks.filter(
        (item) => item.ayahNumber !== ayah.number
      );

      saveBookmarks(updatedBookmarks);
    } else {
      const newBookmark: Bookmark = {
        ayahNumber: ayah.number,
        numberInSurah: ayah.numberInSurah,
        surahNumber,
        surahEnglishName,
        surahArabicName,
        arabicText: ayah.arabicText,
        englishTranslation: ayah.englishTranslation,
        urduTranslation: ayah.urduTranslation,
      };

      saveBookmarks([...bookmarks, newBookmark]);
    }
  }

  async function copyAyah(ayah: Ayah) {
    const text = `${ayah.arabicText}\n\n${ayah.englishTranslation}\n\n${ayah.urduTranslation}`;

    await navigator.clipboard.writeText(text);
    setCopiedAyah(ayah.number);

    setTimeout(() => {
      setCopiedAyah(null);
    }, 1500);
  }

  return (
    <div>
      <div className="sticky top-0 z-20 mb-6 border-b border-white/10 bg-[#071812]/90 py-4 backdrop-blur">
        <div className="flex flex-wrap gap-3">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => setMode(option.value)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                mode === option.value
                  ? "bg-amber-400 text-[#071812]"
                  : "border border-white/10 text-white/70 hover:border-amber-400 hover:text-amber-300"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-5">
        {ayahs.map((ayah) => {
          const { bismillah, remainingText } = splitBismillah(
            ayah.arabicText,
            surahNumber,
            ayah.numberInSurah
          );

          return (
            <div
              id={`ayah-${ayah.numberInSurah}`}
              key={ayah.number}
              className="scroll-mt-28 rounded-3xl border border-white/10 bg-white/[0.04] p-6"
            >
              <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/10 text-sm font-bold text-amber-400">
                    {ayah.numberInSurah}
                  </div>

                  <p className="text-sm text-white/40">
                    Juz {ayah.juz} • Page {ayah.page}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => copyAyah(ayah)}
                    className="rounded-full border border-white/10 px-4 py-2 text-xs text-white/60 transition hover:border-amber-400 hover:text-amber-300"
                  >
                    {copiedAyah === ayah.number ? "Copied" : "Copy"}
                  </button>

                  <button
                    onClick={() => toggleBookmark(ayah)}
                    className={`rounded-full px-4 py-2 text-xs transition ${
                      isBookmarked(ayah.number)
                        ? "bg-amber-400 text-[#071812]"
                        : "border border-white/10 text-white/60 hover:border-amber-400 hover:text-amber-300"
                    }`}
                  >
                    {isBookmarked(ayah.number) ? "Bookmarked" : "Bookmark"}
                  </button>
                </div>
              </div>

              <div dir="rtl" className="text-right">
                {bismillah && (
                  <p className="font-arabic arabic-text mb-6 text-center text-4xl text-amber-300 md:text-5xl">
                    {bismillah}
                  </p>
                )}

                {remainingText && (
                  <p className="font-arabic arabic-text text-4xl text-white md:text-5xl">
                    {remainingText}
                  </p>
                )}
              </div>

              {mode !== "arabic" && (
                <div className="mt-6 border-t border-white/10 pt-5">
                  {(mode === "english" || mode === "both") && (
                    <p className="text-base leading-8 text-white/70">
                      {ayah.englishTranslation}
                    </p>
                  )}

                  {(mode === "urdu" || mode === "both") && (
                    <p
                      className="font-urdu urdu-text mt-5 text-right text-xl text-white/75 md:text-2xl"
                      dir="rtl"
                    >
                      {ayah.urduTranslation}
                    </p>
                  )}
                </div>
              )}

              <AyahAudioPlayer sources={ayah.audioSources || []} />
            </div>
          );
        })}
      </div>
    </div>
  );
}