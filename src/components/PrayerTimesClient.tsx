"use client";

import { useEffect, useMemo, useState } from "react";
import { getPrayerTimes, type PrayerTimingData } from "@/lib/prayer";

const methods = [
  { label: "Karachi / Pakistan", value: "1" },
  { label: "ISNA", value: "2" },
  { label: "Muslim World League", value: "3" },
  { label: "Umm Al-Qura, Makkah", value: "4" },
  { label: "Egyptian General Authority", value: "5" },
];

const prayerOrder = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"] as const;

const displayOrder = [
  "Fajr",
  "Sunrise",
  "Dhuhr",
  "Asr",
  "Maghrib",
  "Isha",
] as const;

type PrayerName = (typeof prayerOrder)[number];

function cleanTime(time: string) {
  return time.split(" ")[0];
}

function timeToMinutes(time: string) {
  const clean = cleanTime(time);
  const [hours, minutes] = clean.split(":").map(Number);
  return hours * 60 + minutes;
}

function minutesToTimeText(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) {
    return `${minutes} min`;
  }

  return `${hours}h ${minutes}m`;
}

function getCurrentTimeInTimezone(timezone: string) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());

  const hour = Number(parts.find((part) => part.type === "hour")?.value || 0);
  const minute = Number(
    parts.find((part) => part.type === "minute")?.value || 0
  );

  return {
    label: `${String(hour).padStart(2, "0")}:${String(minute).padStart(
      2,
      "0"
    )}`,
    minutes: hour * 60 + minute,
  };
}

function getPrayerStatus(data: PrayerTimingData) {
  const currentTime = getCurrentTimeInTimezone(data.meta.timezone);

  const prayers = prayerOrder.map((prayer) => ({
    name: prayer,
    time: cleanTime(data.timings[prayer]),
    minutes: timeToMinutes(data.timings[prayer]),
  }));

  const nextPrayer = prayers.find(
    (prayer) => prayer.minutes > currentTime.minutes
  );

  if (nextPrayer) {
    const currentPrayerIndex = prayers.findIndex(
      (prayer) => prayer.name === nextPrayer.name
    );

    const currentPrayer =
      currentPrayerIndex > 0 ? prayers[currentPrayerIndex - 1] : null;

    return {
      currentTime,
      currentPrayer: currentPrayer?.name || "Before Fajr",
      nextPrayer: nextPrayer.name,
      nextPrayerTime: nextPrayer.time,
      remainingTime: minutesToTimeText(nextPrayer.minutes - currentTime.minutes),
      isTomorrow: false,
    };
  }

  const tomorrowFajr = prayers[0];
  const remainingToTomorrowFajr =
    24 * 60 - currentTime.minutes + tomorrowFajr.minutes;

  return {
    currentTime,
    currentPrayer: "After Isha",
    nextPrayer: tomorrowFajr.name,
    nextPrayerTime: tomorrowFajr.time,
    remainingTime: minutesToTimeText(remainingToTomorrowFajr),
    isTomorrow: true,
  };
}

export default function PrayerTimesClient() {
  const [city, setCity] = useState("Karachi");
  const [country, setCountry] = useState("Pakistan");
  const [method, setMethod] = useState("1");
  const [data, setData] = useState<PrayerTimingData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [clockTick, setClockTick] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setClockTick((prev) => prev + 1);
    }, 30000);

    return () => clearInterval(timer);
  }, []);

  const prayerStatus = useMemo(() => {
    if (!data) return null;
    clockTick;
    return getPrayerStatus(data);
  }, [data, clockTick]);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const prayerData = await getPrayerTimes(city, country, method);
      setData(prayerData);
    } catch {
      setError("Prayer times not found. Please check city and country name.");
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form
        onSubmit={handleSearch}
        className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
      >
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm text-white/60">City</label>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Karachi"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-amber-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-white/60">Country</label>
            <input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Pakistan"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-amber-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-white/60">
              Calculation Method
            </label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-[#0d241b] px-4 py-3 text-white outline-none focus:border-amber-400"
            >
              {methods.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-5 rounded-full bg-amber-400 px-7 py-3 font-semibold text-[#071812] transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Loading..." : "Get Prayer Times"}
        </button>

        {error && (
          <p className="mt-4 rounded-2xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
            {error}
          </p>
        )}
      </form>

      {data && prayerStatus && (
        <div className="mt-8">
          <div className="mb-6 rounded-3xl border border-amber-400/30 bg-amber-400/10 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">
              Current Prayer Status
            </p>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-[#071812]/60 p-5">
                <p className="text-sm text-white/50">Current Time</p>
                <h3 className="mt-2 text-3xl font-bold text-white">
                  {prayerStatus.currentTime.label}
                </h3>
                <p className="mt-1 text-xs text-white/40">
                  {data.meta.timezone}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#071812]/60 p-5">
                <p className="text-sm text-white/50">Current Status</p>
                <h3 className="mt-2 text-3xl font-bold text-amber-300">
                  {prayerStatus.currentPrayer}
                </h3>
              </div>

              <div className="rounded-2xl border border-amber-400/40 bg-amber-400/10 p-5">
                <p className="text-sm text-white/50">Next Prayer</p>
                <h3 className="mt-2 text-3xl font-bold text-amber-300">
                  {prayerStatus.nextPrayer}
                </h3>
                <p className="mt-2 text-white/70">
                  {prayerStatus.nextPrayerTime}
                  {prayerStatus.isTomorrow ? " Tomorrow" : ""}
                </p>
                <p className="mt-1 text-sm text-white/50">
                  Remaining: {prayerStatus.remainingTime}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-6 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">
              Today&apos;s Prayer Times
            </p>

            <h2 className="mt-3 text-3xl font-bold text-white">
              {city}, {country}
            </h2>

            <div className="mt-4 grid gap-2 text-sm text-white/60 md:grid-cols-2">
              <p>Gregorian: {data.date.readable}</p>
              <p>
                Hijri: {data.date.hijri.date} {data.date.hijri.month.en}{" "}
                {data.date.hijri.year}
              </p>
              <p>Timezone: {data.meta.timezone}</p>
              <p>Method: {data.meta.method.name}</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {displayOrder.map((prayer) => {
              const isNextPrayer = prayer === prayerStatus.nextPrayer;
              const isCurrentPrayer = prayer === prayerStatus.currentPrayer;

              return (
                <div
                  key={prayer}
                  className={`rounded-3xl border p-6 transition ${
                    isNextPrayer
                      ? "border-amber-400 bg-amber-400/10"
                      : isCurrentPrayer
                      ? "border-emerald-400/50 bg-emerald-400/10"
                      : "border-white/10 bg-white/[0.04] hover:border-amber-400/50"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm uppercase tracking-[0.25em] text-white/40">
                      {prayer}
                    </p>

                    {isNextPrayer && (
                      <span className="rounded-full bg-amber-400 px-3 py-1 text-xs font-semibold text-[#071812]">
                        Next
                      </span>
                    )}

                    {isCurrentPrayer && !isNextPrayer && (
                      <span className="rounded-full bg-emerald-400 px-3 py-1 text-xs font-semibold text-[#071812]">
                        Current
                      </span>
                    )}
                  </div>

                  <h3 className="mt-3 text-4xl font-bold text-amber-300">
                    {data.timings[prayer]}
                  </h3>
                </div>
              );
            })}
          </div>

          <p className="mt-5 text-sm leading-6 text-white/40">
            Note: Timings calculation method ke hisaab se local mosque ya
            official government timings se thora difference ho sakta hai.
          </p>
        </div>
      )}
    </div>
  );
}