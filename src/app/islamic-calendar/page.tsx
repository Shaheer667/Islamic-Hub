import IslamicCalendarClient from "@/components/IslamicCalendarClient";

export default function IslamicCalendarPage() {
  return (
    <main className="min-h-screen bg-[#071812]">
      <section className="mx-auto max-w-7xl px-5 py-14">
        <div className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
            Hijri Calendar
          </p>

          <h1 className="text-4xl font-bold text-white">Islamic Calendar</h1>

          <p className="mt-4 max-w-2xl text-white/60">
            View today&apos;s Hijri date and monthly Islamic calendar with
            Gregorian dates.
          </p>
        </div>

        <IslamicCalendarClient />
      </section>
    </main>
  );
}