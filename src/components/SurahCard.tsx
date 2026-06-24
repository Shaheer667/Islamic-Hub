import Link from "next/link";
import type { Surah } from "@/lib/quran";

type Props = {
    surah: Surah;
};

export default function SurahCard({ surah }: Props) {
    return (
        <Link
            href={`/quran/${surah.number}`}
            className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-amber-400/60 hover:bg-white/[0.07]"
        >
            <div className="flex items-start justify-between gap-4">
                <div className="flex gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400/10 text-sm font-bold text-amber-400">
                        {surah.number}
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-white group-hover:text-amber-300">
                            {surah.englishName}
                        </h3>
                        <p className="mt-1 text-sm text-white/55">
                            {surah.englishNameTranslation}
                        </p>
                        <p className="mt-2 text-xs uppercase tracking-wider text-emerald-300/80">
                            {surah.revelationType} • {surah.numberOfAyahs} Ayahs
                        </p>
                    </div>
                </div>

                <p className="font-arabic-ui text-3xl font-semibold text-white" dir="rtl">
                    {surah.name}
                </p>
            </div>
        </Link>
    );
}