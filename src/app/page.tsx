import Link from "next/link";

const mainFeatures = [
  {
    title: "Read Quran",
    description:
      "Browse all 114 Surahs with Arabic text, English/Urdu translation, audio recitation, copy and bookmarks.",
    href: "/quran",
    tag: "Quran Reader",
    icon: "01",
  },
  {
    title: "Hadith Library",
    description:
      "Explore Hadith collections with Arabic, English, Urdu, search, save, copy and detail pages.",
    href: "/hadith",
    tag: "Hadith Collections",
    icon: "02",
  },
  {
    title: "Prayer Times",
    description:
      "Check daily Namaz timings by city with current prayer, next prayer and remaining time.",
    href: "/prayer-times",
    tag: "Namaz Timings",
    icon: "03",
  },
  {
    title: "Islamic Calendar",
    description:
      "View today’s Hijri date, monthly Islamic calendar, Gregorian dates and important days.",
    href: "/islamic-calendar",
    tag: "Hijri Calendar",
    icon: "04",
  },
];

const quickLinks = [
  {
    label: "Saved Quran Ayahs",
    href: "/bookmarks",
  },
  {
    label: "Browse Surahs",
    href: "/quran",
  },
  {
    label: "Search Hadith",
    href: "/hadith",
  },
  {
    label: "Check Prayer Times",
    href: "/prayer-times",
  },
];

const highlights = [
  "Arabic, English and Urdu support",
  "Audio recitation with fallback sources",
  "Quran and Hadith bookmarks",
  "Modern responsive Islamic UI",
  "Prayer status and Hijri calendar",
  "Clean reading experience",
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#071812] text-white">
      <section className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#1b5b43_0%,transparent_35%),radial-gradient(circle_at_top_right,#7c5b16_0%,transparent_28%),linear-gradient(180deg,#071812_0%,#06120e_100%)]" />
        <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-400/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-medium text-amber-300">
              Quran • Hadith • Prayer Times • Islamic Calendar
            </div>

            <h1 className="max-w-4xl text-5xl font-bold leading-tight text-white md:text-7xl">
              Your Complete Islamic Digital Platform
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
              Read the Quran, listen to recitation, save your favorite Ayahs,
              explore Hadith collections, check Namaz timings and follow the
              Islamic calendar — all in one clean and modern website.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/quran"
                className="rounded-full bg-amber-400 px-8 py-4 font-semibold text-[#071812] transition hover:bg-amber-300"
              >
                Start Reading Quran
              </Link>

              <Link
                href="/prayer-times"
                className="rounded-full border border-white/15 px-8 py-4 font-semibold text-white transition hover:border-amber-400 hover:text-amber-300"
              >
                Check Prayer Times
              </Link>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-3xl font-bold text-amber-300">114</p>
                <p className="mt-1 text-sm text-white/50">Surahs</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-3xl font-bold text-amber-300">6+</p>
                <p className="mt-1 text-sm text-white/50">Hadith Books</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-3xl font-bold text-amber-300">5</p>
                <p className="mt-1 text-sm text-white/50">Daily Prayers</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-5 shadow-2xl backdrop-blur">
              <div className="rounded-[1.5rem] border border-amber-400/20 bg-[#071812] p-7">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.25em] text-amber-400">
                      Daily Reminder
                    </p>
                    <h2 className="mt-2 text-2xl font-bold text-white">
                      Stay Connected
                    </h2>
                  </div>

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400/10 text-xl font-bold text-amber-300">
                    ☾
                  </div>
                </div>

                <div className="space-y-4">
                  {quickLinks.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 transition hover:border-amber-400/60 hover:bg-white/[0.07]"
                    >
                      <span className="font-medium text-white/80">
                        {item.label}
                      </span>
                      <span className="text-amber-300">→</span>
                    </Link>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-5">
                  <p className="text-sm text-emerald-200">
                    “A focused Islamic app experience built for reading,
                    learning and daily practice.”
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 -right-5 hidden rounded-3xl border border-white/10 bg-amber-400 p-5 text-[#071812] shadow-xl md:block">
              <p className="text-sm font-semibold">Now Ready</p>
              <p className="mt-1 text-2xl font-bold">Core Modules</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
              Explore Features
            </p>

            <h2 className="text-4xl font-bold text-white">
              Everything in One Place
            </h2>
          </div>

          <p className="max-w-xl text-white/55">
            Each section is designed with a clean reading layout, responsive
            cards and useful actions like search, copy and save.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {mainFeatures.map((feature) => (
            <Link
              key={feature.title}
              href={feature.href}
              className="group rounded-3xl border border-white/10 bg-white/[0.04] p-7 transition hover:border-amber-400/60 hover:bg-white/[0.07]"
            >
              <div className="mb-6 flex items-start justify-between gap-5">
                <div>
                  <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">
                    {feature.tag}
                  </p>

                  <h3 className="text-3xl font-bold text-white group-hover:text-amber-300">
                    {feature.title}
                  </h3>
                </div>

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-400/10 text-lg font-bold text-amber-300">
                  {feature.icon}
                </div>
              </div>

              <p className="max-w-xl leading-7 text-white/60">
                {feature.description}
              </p>

              <div className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-amber-300">
                Open Section <span>→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 md:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
                Project Highlights
              </p>

              <h2 className="text-4xl font-bold text-white">
                Built for a Smooth Islamic Learning Experience
              </h2>

              <p className="mt-5 leading-8 text-white/60">
                The website is ready with core Islamic features and can be
                expanded later with Duas, Qibla direction, Tasbeeh counter,
                user accounts, daily reminders and admin management.
              </p>

              <Link
                href="/hadith"
                className="mt-8 inline-flex rounded-full bg-amber-400 px-7 py-3 font-semibold text-[#071812] transition hover:bg-amber-300"
              >
                Explore Hadith Library
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-[#071812]/60 p-5"
                >
                  <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300">
                    ✓
                  </div>

                  <p className="font-medium leading-7 text-white/75">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20">
        <div className="rounded-[2rem] border border-amber-400/20 bg-[radial-gradient(circle_at_top,#2a5a43,#0a1b14_60%)] p-8 text-center md:p-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
            Ready to Use
          </p>

          <h2 className="mx-auto max-w-3xl text-4xl font-bold leading-tight text-white md:text-5xl">
            Continue building this into a complete Islamic web app
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-white/65">
            Next modules can include Duas, Qibla direction, Tasbeeh counter,
            daily Ayah, daily Hadith, user login and saved progress.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/quran"
              className="rounded-full bg-amber-400 px-8 py-4 font-semibold text-[#071812] transition hover:bg-amber-300"
            >
              Go to Quran
            </Link>

            <Link
              href="/islamic-calendar"
              className="rounded-full border border-white/15 px-8 py-4 font-semibold text-white transition hover:border-amber-400 hover:text-amber-300"
            >
              View Calendar
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}