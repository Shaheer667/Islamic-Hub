export type HadithBook = {
  slug: string;
  title: string;
  arabicTitle: string;
  englishEdition: string;
  arabicEdition: string;
  urduEdition?: string;
};

export type HadithItem = {
  id: string;
  hadithNumber: string;
  arabicNumber: string;
  bookSlug: string;
  bookName: string;
  arabicBookName: string;
  englishText: string;
  arabicText: string;
  urduText: string;
  reference: string;
  grades: string[];
};

export const HADITH_BOOKS: HadithBook[] = [
  {
    slug: "bukhari",
    title: "Sahih al-Bukhari",
    arabicTitle: "صحيح البخاري",
    englishEdition: "eng-bukhari",
    arabicEdition: "ara-bukhari",
    urduEdition: "urd-bukhari",
  },
  {
    slug: "muslim",
    title: "Sahih Muslim",
    arabicTitle: "صحيح مسلم",
    englishEdition: "eng-muslim",
    arabicEdition: "ara-muslim",
    urduEdition: "urd-muslim",
  },
  {
    slug: "abudawud",
    title: "Sunan Abu Dawud",
    arabicTitle: "سنن أبي داود",
    englishEdition: "eng-abudawud",
    arabicEdition: "ara-abudawud",
    urduEdition: "urd-abudawud",
  },
  {
    slug: "tirmidhi",
    title: "Jami at-Tirmidhi",
    arabicTitle: "جامع الترمذي",
    englishEdition: "eng-tirmidhi",
    arabicEdition: "ara-tirmidhi",
    urduEdition: "urd-tirmidhi",
  },
  {
    slug: "nasai",
    title: "Sunan an-Nasa’i",
    arabicTitle: "سنن النسائي",
    englishEdition: "eng-nasai",
    arabicEdition: "ara-nasai",
    urduEdition: "urd-nasai",
  },
  {
    slug: "ibnmajah",
    title: "Sunan Ibn Majah",
    arabicTitle: "سنن ابن ماجه",
    englishEdition: "eng-ibnmajah",
    arabicEdition: "ara-ibnmajah",
    urduEdition: "urd-ibnmajah",
  },
];

const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions";

async function fetchEdition(edition: string) {
  const urls = [
    `${BASE_URL}/${edition}.min.json`,
    `${BASE_URL}/${edition}.json`,
  ];

  for (const url of urls) {
    try {
      const res = await fetch(url, {
        next: { revalidate: 86400 },
      });

      if (!res.ok) {
        continue;
      }

      const data = await res.json();

      return data.hadiths || data.data?.hadiths || [];
    } catch {
      continue;
    }
  }

  return [];
}

function getHadithNumber(item: any, index: number) {
  return String(
    item.hadithnumber ||
      item.hadithNumber ||
      item.number ||
      item.id ||
      item.reference?.hadith ||
      index + 1
  );
}

function getArabicNumber(item: any) {
  return String(item.arabicnumber || item.arabicNumber || "");
}

function getText(item: any) {
  return String(item.text || item.hadith || item.body || "").trim();
}

function getReference(item: any, fallbackBook: string, fallbackNumber: string) {
  if (typeof item.reference === "string") {
    return item.reference;
  }

  if (item.reference?.book && item.reference?.hadith) {
    return `Book ${item.reference.book}, Hadith ${item.reference.hadith}`;
  }

  return `${fallbackBook}, Hadith ${fallbackNumber}`;
}

function getGrades(item: any) {
  if (!Array.isArray(item.grades)) {
    return [];
  }

  return item.grades
    .map((grade: any) => {
      if (typeof grade === "string") return grade;
      return grade.grade || grade.name || "";
    })
    .filter(Boolean);
}

export async function getHadithsByBook(bookSlug: string): Promise<HadithItem[]> {
  const book = HADITH_BOOKS.find((item) => item.slug === bookSlug);

  if (!book) {
    throw new Error("Hadith book not found");
  }

  const [englishHadiths, arabicHadiths, urduHadiths] = await Promise.all([
    fetchEdition(book.englishEdition),
    fetchEdition(book.arabicEdition),
    book.urduEdition ? fetchEdition(book.urduEdition) : Promise.resolve([]),
  ]);

  const arabicMap = new Map<string, any>();
  const urduMap = new Map<string, any>();

  arabicHadiths.forEach((item: any, index: number) => {
    arabicMap.set(getHadithNumber(item, index), item);
  });

  urduHadiths.forEach((item: any, index: number) => {
    urduMap.set(getHadithNumber(item, index), item);
  });

  return englishHadiths.map((englishItem: any, index: number) => {
    const hadithNumber = getHadithNumber(englishItem, index);
    const arabicItem = arabicMap.get(hadithNumber) || arabicHadiths[index];
    const urduItem = urduMap.get(hadithNumber) || urduHadiths[index];

    return {
      id: `${book.slug}-${hadithNumber}`,
      hadithNumber,
      arabicNumber: getArabicNumber(arabicItem || englishItem),
      bookSlug: book.slug,
      bookName: book.title,
      arabicBookName: book.arabicTitle,
      englishText: getText(englishItem),
      arabicText: arabicItem ? getText(arabicItem) : "",
      urduText: urduItem ? getText(urduItem) : "",
      reference: getReference(englishItem, book.title, hadithNumber),
      grades: getGrades(englishItem),
    };
  });
}

export async function getHadithByNumber(
  bookSlug: string,
  hadithNumber: string
): Promise<HadithItem | null> {
  const hadiths = await getHadithsByBook(bookSlug);

  const hadith = hadiths.find(
    (item) => item.hadithNumber === hadithNumber
  );

  return hadith || null;
}