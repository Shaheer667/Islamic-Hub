export type PrayerTimingData = {
  timings: {
    Fajr: string;
    Sunrise: string;
    Dhuhr: string;
    Asr: string;
    Maghrib: string;
    Isha: string;
  };
  date: {
    readable: string;
    hijri: {
      date: string;
      month: {
        en: string;
        ar: string;
      };
      year: string;
      weekday: {
        en: string;
        ar: string;
      };
    };
    gregorian: {
      date: string;
      weekday: {
        en: string;
      };
    };
  };
  meta: {
    timezone: string;
    method: {
      name: string;
    };
  };
};

export async function getPrayerTimes(
  city: string,
  country: string,
  method: string
): Promise<PrayerTimingData> {
  const params = new URLSearchParams({
    city,
    country,
    method,
  });

  const res = await fetch(
    `https://api.aladhan.com/v1/timingsByCity?${params.toString()}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch prayer times");
  }

  const data = await res.json();

  if (data.code !== 200) {
    throw new Error("Prayer times not found");
  }

  return data.data;
}