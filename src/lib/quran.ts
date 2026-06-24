export type Surah = {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
};

export type Ayah = {
  number: number;
  numberInSurah: number;
  juz: number;
  page: number;
  arabicText: string;
  englishTranslation: string;
  urduTranslation: string;
  audioSources: string[];
};

export type SurahDetails = {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  numberOfAyahs: number;
  ayahs: Ayah[];
};

const BASE_URL = "https://api.alquran.cloud/v1";

async function fetchEdition(endpoint: string, label: string) {
  const url = `${BASE_URL}${endpoint}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      console.error(`${label} API failed:`, res.status, res.statusText, url);
      return null;
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error(`${label} API error:`, error);
    return null;
  }
}

async function getUrduSurah(surahNumber: string) {
  const urduEditions = [
    "ur.jalandhry",
    "ur.ahmedali",
    "ur.junagarhi",
    "ur.maududi",
  ];

  for (const edition of urduEditions) {
    const data = await fetchEdition(
      `/surah/${surahNumber}/${edition}`,
      `Urdu ${edition}`
    );

    if (data) return data;
  }

  return null;
}

export async function getSurahs(): Promise<Surah[]> {
  const surahs = await fetchEdition("/surah", "Surah List");

  if (!surahs) {
    throw new Error("Failed to fetch surahs");
  }

  return surahs;
}

export async function getSurahDetails(
  surahNumber: string
): Promise<SurahDetails> {
  const [arabicSurah, englishSurah, audioSurah, urduSurah] = await Promise.all([
    fetchEdition(`/surah/${surahNumber}/quran-uthmani`, "Arabic Quran"),
    fetchEdition(`/surah/${surahNumber}/en.asad`, "English Translation"),
    fetchEdition(`/surah/${surahNumber}/ar.alafasy`, "Audio Recitation"),
    getUrduSurah(surahNumber),
  ]);

  if (!arabicSurah || !englishSurah) {
    throw new Error("Failed to fetch required surah details");
  }

  return {
    number: arabicSurah.number,
    name: arabicSurah.name,
    englishName: arabicSurah.englishName,
    englishNameTranslation: arabicSurah.englishNameTranslation,
    revelationType: arabicSurah.revelationType,
    numberOfAyahs: arabicSurah.numberOfAyahs,
    ayahs: arabicSurah.ayahs.map((ayah: any, index: number) => {
  const audioAyah = audioSurah?.ayahs[index];

  const audioSources = [
    audioAyah?.audio,
    ...(Array.isArray(audioAyah?.audioSecondary)
      ? audioAyah.audioSecondary
      : []),
    `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${ayah.number}.mp3`,
    `https://cdn.islamic.network/quran/audio/64/ar.alafasy/${ayah.number}.mp3`,
  ].filter(Boolean);

  return {
    number: ayah.number,
    numberInSurah: ayah.numberInSurah,
    juz: ayah.juz,
    page: ayah.page,
    arabicText: ayah.text,
    englishTranslation: englishSurah.ayahs[index]?.text || "",
    urduTranslation:
      urduSurah?.ayahs[index]?.text ||
      "Urdu translation temporarily unavailable.",
    audioSources: [...new Set(audioSources)],
  };
}),
  };
}