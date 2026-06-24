import QuranSearch from "@/components/QuranSearch";
import { getSurahs } from "@/lib/quran";

export default async function QuranPage() {
  const surahs = await getSurahs();

  return (
    <main className="min-h-screen bg-[#071812]">
      <section className="mx-auto max-w-7xl px-5 py-14">
        <div className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
            The Holy Quran
          </p>

          <h1 className="text-4xl font-bold text-white">All Surahs</h1>

          <p className="mt-4 max-w-2xl text-white/60">
            Browse all 114 Surahs of the Holy Quran. Search by Surah name,
            number, Arabic name or meaning.
          </p>
        </div>

        <QuranSearch surahs={surahs} />
      </section>
    </main>
  );
}