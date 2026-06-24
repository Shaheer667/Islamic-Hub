import Link from "next/link";

const features = [
  {
    title: "Read Quran",
    desc: "Browse all Surahs with Arabic text, translations and recitation.",
    href: "/quran",
  },
  {
    title: "Hadith Library",
    desc: "Explore authentic Hadith collections with references.",
    href: "/hadith",
  },
  {
    title: "Prayer Times",
    desc: "Check daily Namaz timings according to your city.",
    href: "/prayer-times",
  },
  {
    title: "Islamic Calendar",
    desc: "View Hijri dates, Islamic months and important days.",
    href: "/islamic-calendar",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#123b2d,#071812_55%)]">
      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
            Islamic Digital Platform
          </p>

          <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl">
            Read, Listen & Understand the Quran Online
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
            A clean Islamic website where users can read Quran, explore Hadith,
            check Namaz timings, follow the Islamic calendar and learn more
            about Islam in one place.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/quran"
              className="rounded-full bg-amber-400 px-7 py-3 font-semibold text-[#071812] transition hover:bg-amber-300"
            >
              Start Reading Quran
            </Link>

            <Link
              href="#features"
              className="rounded-full border border-white/15 px-7 py-3 font-semibold text-white transition hover:border-amber-400 hover:text-amber-300"
            >
              Explore Features
            </Link>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-5 pb-20">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {features.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-amber-400/60 hover:bg-white/[0.07]"
            >
              <h3 className="text-xl font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-white/60">
                {item.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}