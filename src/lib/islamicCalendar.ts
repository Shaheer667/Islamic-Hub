export type IslamicCalendarDay = {
  gregorian: {
    date: string;
    day: string;
    month: {
      number: number;
      en: string;
    };
    year: string;
    weekday: {
      en: string;
    };
  };
  hijri: {
    date: string;
    day: string;
    month: {
      number: number;
      en: string;
      ar: string;
    };
    year: string;
    weekday: {
      en: string;
      ar: string;
    };
    holidays?: string[];
  };
};

export async function getIslamicCalendar(
  month: number,
  year: number
): Promise<IslamicCalendarDay[]> {
  const res = await fetch(
    `https://api.aladhan.com/v1/gToHCalendar/${month}/${year}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch Islamic calendar");
  }

  const data = await res.json();

  if (data.code !== 200) {
    throw new Error("Islamic calendar not found");
  }

  return data.data;
}

export async function getTodayHijriDate() {
  const today = new Date();

  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  const res = await fetch(`https://api.aladhan.com/v1/gToH/${day}-${month}-${year}`);

  if (!res.ok) {
    throw new Error("Failed to fetch today Hijri date");
  }

  const data = await res.json();

  if (data.code !== 200) {
    throw new Error("Hijri date not found");
  }

  return data.data;
}