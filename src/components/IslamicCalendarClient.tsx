"use client";

import { useEffect, useMemo, useState } from "react";
import {
  getIslamicCalendar,
  getTodayHijriDate,
  type IslamicCalendarDay,
} from "@/lib/islamicCalendar";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getInitialMonthYear() {
  const today = new Date();

  return {
    month: today.getMonth() + 1,
    year: today.getFullYear(),
  };
}

function parseGregorianDate(date: string) {
  const [day, month, year] = date.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export default function IslamicCalendarClient() {
  const initial = getInitialMonthYear();

  const [month, setMonth] = useState(initial.month);
  const [year, setYear] = useState(initial.year);
  const [days, setDays] = useState<IslamicCalendarDay[]>([]);
  const [todayHijri, setTodayHijri] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const today = new Date();

  useEffect(() => {
    loadCalendar(month, year);
  }, [month, year]);

  useEffect(() => {
    async function loadToday() {
      try {
        const data = await getTodayHijriDate();
        setTodayHijri(data);
      } catch {
        setTodayHijri(null);
      }
    }

    loadToday();
  }, []);

  async function loadCalendar(selectedMonth: number, selectedYear: number) {
    try {
      setLoading(true);
      setError("");

      const data = await getIslamicCalendar(selectedMonth, selectedYear);
      setDays(data);
    } catch {
      setError("Islamic calendar load nahi ho saka. Please dobara try karo.");
      setDays([]);
    } finally {
      setLoading(false);
    }
  }

  function goToPreviousMonth() {
    if (month === 1) {
      setMonth(12);
      setYear((prev) => prev - 1);
    } else {
      setMonth((prev) => prev - 1);
    }
  }

  function goToNextMonth() {
    if (month === 12) {
      setMonth(1);
      setYear((prev) => prev + 1);
    } else {
      setMonth((prev) => prev + 1);
    }
  }

  function goToCurrentMonth() {
    const current = getInitialMonthYear();

    setMonth(current.month);
    setYear(current.year);
  }

  const calendarGrid = useMemo(() => {
    if (days.length === 0) return [];

    const firstDate = parseGregorianDate(days[0].gregorian.date);
    const firstDayIndex = firstDate.getDay();

    const emptyCells = Array.from({ length: firstDayIndex }, () => null);

    return [...emptyCells, ...days];
  }, [days]);

  const monthTitle =
    days.length > 0
      ? `${days[0].gregorian.month.en} ${days[0].gregorian.year}`
      : `${month}/${year}`;

  return (
    <div>
      {todayHijri && (
        <div className="mb-8 rounded-3xl border border-amber-400/30 bg-amber-400/10 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">
            Today&apos;s Hijri Date
          </p>

          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-4xl font-bold text-white">
                {todayHijri.hijri.day} {todayHijri.hijri.month.en}{" "}
                {todayHijri.hijri.year}
              </h2>

              <p
                className="font-arabic-ui mt-3 text-4xl text-amber-300"
                dir="rtl"
              >
                {todayHijri.hijri.weekday.ar}، {todayHijri.hijri.month.ar}
              </p>
            </div>

            <div className="text-sm text-white/60">
              <p>Gregorian: {todayHijri.gregorian.date}</p>
              <p>Day: {todayHijri.gregorian.weekday.en}</p>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">
              Monthly Calendar
            </p>

            <h2 className="mt-2 text-3xl font-bold text-white">
              {monthTitle}
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={goToPreviousMonth}
              className="rounded-full border border-white/10 px-5 py-2 text-sm text-white/70 transition hover:border-amber-400 hover:text-amber-300"
            >
              Previous
            </button>

            <button
              onClick={goToCurrentMonth}
              className="rounded-full bg-amber-400 px-5 py-2 text-sm font-semibold text-[#071812] transition hover:bg-amber-300"
            >
              Today
            </button>

            <button
              onClick={goToNextMonth}
              className="rounded-full border border-white/10 px-5 py-2 text-sm text-white/70 transition hover:border-amber-400 hover:text-amber-300"
            >
              Next
            </button>
          </div>
        </div>

        {error && (
          <p className="mt-5 rounded-2xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
            {error}
          </p>
        )}

        {loading && (
          <div className="mt-8 rounded-2xl border border-white/10 bg-[#071812]/60 p-10 text-center">
            <p className="text-white/60">Loading calendar...</p>
          </div>
        )}

        {!loading && days.length > 0 && (
          <div className="mt-8">
            <div className="grid grid-cols-7 gap-2">
              {weekDays.map((day) => (
                <div
                  key={day}
                  className="rounded-2xl border border-white/10 bg-[#071812]/60 p-3 text-center text-xs font-semibold uppercase tracking-wider text-white/50"
                >
                  {day}
                </div>
              ))}

              {calendarGrid.map((day, index) => {
                if (!day) {
                  return <div key={`empty-${index}`} />;
                }

                const date = parseGregorianDate(day.gregorian.date);

                const isToday =
                  date.getDate() === today.getDate() &&
                  date.getMonth() === today.getMonth() &&
                  date.getFullYear() === today.getFullYear();

                const hasHoliday =
                  Array.isArray(day.hijri.holidays) &&
                  day.hijri.holidays.length > 0;

                return (
                  <div
                    key={day.gregorian.date}
                    className={`min-h-32 rounded-2xl border p-4 transition ${
                      isToday
                        ? "border-amber-400 bg-amber-400/10"
                        : hasHoliday
                        ? "border-emerald-400/40 bg-emerald-400/10"
                        : "border-white/10 bg-[#071812]/60 hover:border-amber-400/40"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-2xl font-bold text-white">
                        {day.gregorian.day}
                      </p>

                      {isToday && (
                        <span className="rounded-full bg-amber-400 px-2 py-1 text-[10px] font-bold text-[#071812]">
                          Today
                        </span>
                      )}
                    </div>

                    <p className="mt-3 text-sm text-white/50">
                      Hijri: {day.hijri.day} {day.hijri.month.en}
                    </p>

                    <p
                      className="font-arabic-ui mt-2 text-xl text-amber-300"
                      dir="rtl"
                    >
                      {day.hijri.day} {day.hijri.month.ar}
                    </p>

                    {hasHoliday && (
                      <div className="mt-3 space-y-1">
                        {day.hijri.holidays?.map((holiday) => (
                          <p
                            key={holiday}
                            className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-2 py-1 text-xs text-emerald-200"
                          >
                            {holiday}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}