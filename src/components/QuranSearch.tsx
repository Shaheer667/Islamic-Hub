"use client";

import { useState } from "react";
import SurahCard from "@/components/SurahCard";
import type { Surah } from "@/lib/quran";

type Props = {
  surahs: Surah[];
};

export default function QuranSearch({ surahs }: Props) {
  const [search, setSearch] = useState("");

  const filteredSurahs = surahs.filter((surah) => {
    const query = search.toLowerCase();

    return (
      surah.englishName.toLowerCase().includes(query) ||
      surah.englishNameTranslation.toLowerCase().includes(query) ||
      surah.name.includes(search) ||
      surah.number.toString().includes(query)
    );
  });

  return (
    <div>
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search Surah e.g. Fatihah, Yaseen, 36..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4 text-white outline-none placeholder:text-white/40 focus:border-amber-400"
        />

        <p className="mt-3 text-sm text-white/40">
          Showing {filteredSurahs.length} of {surahs.length} Surahs
        </p>
      </div>

      {filteredSurahs.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredSurahs.map((surah) => (
            <SurahCard key={surah.number} surah={surah} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center">
          <p className="text-white/60">No Surah found.</p>
        </div>
      )}
    </div>
  );
}