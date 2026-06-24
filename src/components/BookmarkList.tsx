"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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

export default function BookmarkList() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    const savedBookmarks = localStorage.getItem("quran-bookmarks");
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }
  }, []);

  function removeBookmark(ayahNumber: number) {
    const updatedBookmarks = bookmarks.filter(
      (item) => item.ayahNumber !== ayahNumber
    );

    setBookmarks(updatedBookmarks);
    localStorage.setItem("quran-bookmarks", JSON.stringify(updatedBookmarks));
  }

  if (bookmarks.length === 0) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-10 text-center">
        <h2 className="text-2xl font-semibold text-white">
          No bookmarks yet
        </h2>
        <p className="mt-3 text-white/60">
          Open any Surah and click Bookmark on an Ayah.
        </p>

        <Link
          href="/quran"
          className="mt-6 inline-flex rounded-full bg-amber-400 px-6 py-3 font-semibold text-[#071812] transition hover:bg-amber-300"
        >
          Browse Quran
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {bookmarks.map((bookmark) => (
        <div
          key={bookmark.ayahNumber}
          className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
        >
          <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-white">
                Surah {bookmark.surahEnglishName} • Ayah{" "}
                {bookmark.numberInSurah}
              </h3>

              <p className="font-arabic-ui mt-1 text-2xl text-amber-300" dir="rtl">
                {bookmark.surahArabicName}
              </p>
            </div>

            <div className="flex gap-2">
              <Link
                href={`/quran/${bookmark.surahNumber}#ayah-${bookmark.numberInSurah}`}
                className="rounded-full border border-white/10 px-4 py-2 text-xs text-white/60 transition hover:border-amber-400 hover:text-amber-300"
              >
                Open
              </Link>

              <button
                onClick={() => removeBookmark(bookmark.ayahNumber)}
                className="rounded-full border border-red-400/30 px-4 py-2 text-xs text-red-300 transition hover:bg-red-400/10"
              >
                Remove
              </button>
            </div>
          </div>

          <p
            className="font-arabic arabic-text text-right text-4xl text-white md:text-5xl"
            dir="rtl"
          >
            {bookmark.arabicText}
          </p>

          <p className="mt-6 border-t border-white/10 pt-5 text-base leading-8 text-white/70">
            {bookmark.englishTranslation}
          </p>

          <p
            className="font-urdu urdu-text mt-5 text-right text-xl text-white/75 md:text-2xl"
            dir="rtl"
          >
            {bookmark.urduTranslation}
          </p>
        </div>
      ))}
    </div>
  );
}