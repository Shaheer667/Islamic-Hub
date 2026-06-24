import Link from "next/link";
import { notFound } from "next/navigation";
import { getHadithByNumber, HADITH_BOOKS } from "@/lib/hadith";
import HadithDetailActions from "@/components/HadithDetailActions";

type PageProps = {
  params: Promise<{
    book: string;
    number: string;
  }>;
};

export default async function HadithDetailPage({ params }: PageProps) {
  const { book, number } = await params;

  const bookInfo = HADITH_BOOKS.find((item) => item.slug === book);

  if (!bookInfo) {
    notFound();
  }

  const hadith = await getHadithByNumber(book, number);

  if (!hadith) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#071812]">
      <section className="mx-auto max-w-5xl px-5 py-10">
        <Link
          href="/hadith"
          className="mb-8 inline-flex rounded-full border border-white/10 px-5 py-2 text-sm text-white/70 transition hover:border-amber-400 hover:text-amber-300"
        >
          ← Back to Hadith Library
        </Link>

        <div className="mb-8 rounded-3xl border border-white/10 bg-white/[0.04] p-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
            Hadith Detail
          </p>

          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <h1 className="text-4xl font-bold text-white">
                {hadith.bookName}
              </h1>

              <p
                className="font-arabic-ui mt-3 text-4xl text-amber-300"
                dir="rtl"
              >
                {hadith.arabicBookName}
              </p>

              <p className="mt-4 text-white/60">
                Hadith {hadith.hadithNumber} • {hadith.reference}
              </p>
            </div>

            <HadithDetailActions hadith={hadith} />
          </div>
        </div>

        <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
          {hadith.arabicText && (
            <p
              className="font-arabic arabic-text text-right text-3xl text-white md:text-5xl"
              dir="rtl"
            >
              {hadith.arabicText}
            </p>
          )}

          {hadith.englishText && (
            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">
                English Translation
              </p>

              <p className="text-base leading-8 text-white/75">
                {hadith.englishText}
              </p>
            </div>
          )}

          {hadith.urduText && (
            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">
                Urdu Translation
              </p>

              <p
                className="font-urdu urdu-text text-right text-xl text-white/75 md:text-2xl"
                dir="rtl"
              >
                {hadith.urduText}
              </p>
            </div>
          )}

          <div className="mt-8 border-t border-white/10 pt-6">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">
              Reference
            </p>

            <p className="text-white/60">{hadith.reference}</p>
          </div>

          {hadith.grades.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {hadith.grades.map((grade) => (
                <span
                  key={grade}
                  className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200"
                >
                  {grade}
                </span>
              ))}
            </div>
          )}
        </article>
      </section>
    </main>
  );
}