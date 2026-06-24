import HadithClient from "@/components/HadithClient";

export default function HadithPage() {
  return (
    <main className="min-h-screen bg-[#071812]">
      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
            Hadith Library
          </p>

          <h1 className="text-4xl font-bold text-white">Hadith Collections</h1>

          <p className="mt-4 max-w-2xl text-white/60">
            Explore authentic Hadith collections with Arabic text, English
            translation, Urdu translation where available, reference and search.
          </p>
        </div>

        <HadithClient />
      </section>
    </main>
  );
}