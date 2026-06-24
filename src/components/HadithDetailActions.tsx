"use client";

import { useEffect, useState } from "react";
import type { HadithItem } from "@/lib/hadith";

type Props = {
  hadith: HadithItem;
};

export default function HadithDetailActions({ hadith }: Props) {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("hadith-bookmarks");

    if (!stored) return;

    try {
      const bookmarks: HadithItem[] = JSON.parse(stored);
      setSaved(bookmarks.some((item) => item.id === hadith.id));
    } catch {
      setSaved(false);
    }
  }, [hadith.id]);

  async function copyHadith() {
    const text = `${hadith.arabicText ? `${hadith.arabicText}\n\n` : ""}${
      hadith.englishText
    }${hadith.urduText ? `\n\n${hadith.urduText}` : ""}\n\nReference: ${
      hadith.reference
    }`;

    await navigator.clipboard.writeText(text);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  }

  function toggleSave() {
    const stored = localStorage.getItem("hadith-bookmarks");
    let bookmarks: HadithItem[] = [];

    if (stored) {
      try {
        bookmarks = JSON.parse(stored);
      } catch {
        bookmarks = [];
      }
    }

    const alreadySaved = bookmarks.some((item) => item.id === hadith.id);

    let updatedBookmarks: HadithItem[];

    if (alreadySaved) {
      updatedBookmarks = bookmarks.filter((item) => item.id !== hadith.id);
      setSaved(false);
    } else {
      updatedBookmarks = [...bookmarks, hadith];
      setSaved(true);
    }

    localStorage.setItem("hadith-bookmarks", JSON.stringify(updatedBookmarks));
  }

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={copyHadith}
        className="rounded-full border border-white/10 px-5 py-2 text-sm text-white/70 transition hover:border-amber-400 hover:text-amber-300"
      >
        {copied ? "Copied" : "Copy Hadith"}
      </button>

      <button
        onClick={toggleSave}
        className={`rounded-full px-5 py-2 text-sm font-medium transition ${
          saved
            ? "bg-amber-400 text-[#071812]"
            : "border border-white/10 text-white/70 hover:border-amber-400 hover:text-amber-300"
        }`}
      >
        {saved ? "Saved" : "Save Hadith"}
      </button>
    </div>
  );
}