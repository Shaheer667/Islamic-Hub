import Link from "next/link";
import { notFound } from "next/navigation";
import { getSurahDetails } from "@/lib/quran";
import SurahReader from "@/components/SurahReader";

type PageProps = {
    params: Promise<{
        surah: string;
    }>;
};

export default async function SurahDetailPage({ params }: PageProps) {
    const resolvedParams = await params;
    const surah = resolvedParams?.surah;

    const surahNumber = Number(surah);

    if (!surah || Number.isNaN(surahNumber) || surahNumber < 1 || surahNumber > 114) {
        notFound();
    }

    const surahData = await getSurahDetails(surah);

    return (
        <main className="min-h-screen bg-[#071812]">
            <section className="mx-auto max-w-5xl px-5 py-10">
                <Link
                    href="/quran"
                    className="mb-8 inline-flex rounded-full border border-white/10 px-5 py-2 text-sm text-white/70 transition hover:border-amber-400 hover:text-amber-300"
                >
                    ← Back to Surahs
                </Link>

                <div className="mb-8 rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
                        Surah {surahData.number}
                    </p>

                    <h1 className="text-4xl font-bold text-white">
                        {surahData.englishName}
                    </h1>

                    <p
                        className="font-arabic-ui mt-3 text-6xl font-semibold text-amber-300"
                        dir="rtl"
                    >
                        {surahData.name}
                    </p>

                    <p className="mt-4 text-white/60">
                        {surahData.englishNameTranslation} • {surahData.revelationType} •{" "}
                        {surahData.numberOfAyahs} Ayahs
                    </p>
                </div>

                <SurahReader
                    ayahs={surahData.ayahs}
                    surahNumber={surahData.number}
                    surahEnglishName={surahData.englishName}
                    surahArabicName={surahData.name}
                />
            </section>
        </main>
    );
}