"use client";

import { useEffect, useMemo, useState } from "react";
import {
    HADITH_BOOKS,
    getHadithsByBook,
    type HadithItem,
} from "@/lib/hadith";
import Link from "next/link";

type TranslationMode = "english" | "urdu" | "both" | "arabic";
type ViewMode = "all" | "saved";

const translationOptions: { label: string; value: TranslationMode }[] = [
    { label: "English", value: "english" },
    { label: "Urdu", value: "urdu" },
    { label: "Both", value: "both" },
    { label: "Arabic Only", value: "arabic" },
];

const viewOptions: { label: string; value: ViewMode }[] = [
    { label: "All Hadiths", value: "all" },
    { label: "Saved", value: "saved" },
];

export default function HadithClient() {
    const [selectedBook, setSelectedBook] = useState("bukhari");
    const [hadiths, setHadiths] = useState<HadithItem[]>([]);
    const [bookmarkedHadiths, setBookmarkedHadiths] = useState<HadithItem[]>([]);
    const [search, setSearch] = useState("");
    const [visibleCount, setVisibleCount] = useState(20);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [translationMode, setTranslationMode] =
        useState<TranslationMode>("english");
    const [viewMode, setViewMode] = useState<ViewMode>("all");

    const selectedBookInfo = HADITH_BOOKS.find(
        (book) => book.slug === selectedBook
    );

    useEffect(() => {
        loadHadiths(selectedBook);
    }, [selectedBook]);

    useEffect(() => {
        const saved = localStorage.getItem("hadith-bookmarks");

        if (saved) {
            try {
                setBookmarkedHadiths(JSON.parse(saved));
            } catch {
                setBookmarkedHadiths([]);
            }
        }
    }, []);

    async function loadHadiths(bookSlug: string) {
        try {
            setLoading(true);
            setError("");
            setSearch("");
            setVisibleCount(20);

            const data = await getHadithsByBook(bookSlug);
            setHadiths(data);
        } catch {
            setError("Hadith data load nahi ho saka. Please dobara try karo.");
            setHadiths([]);
        } finally {
            setLoading(false);
        }
    }

    function saveHadithBookmarks(updatedBookmarks: HadithItem[]) {
        setBookmarkedHadiths(updatedBookmarks);
        localStorage.setItem("hadith-bookmarks", JSON.stringify(updatedBookmarks));
    }

    function isBookmarked(hadithId: string) {
        return bookmarkedHadiths.some((item) => item.id === hadithId);
    }

    function toggleBookmark(hadith: HadithItem) {
        const alreadySaved = isBookmarked(hadith.id);

        if (alreadySaved) {
            const updatedBookmarks = bookmarkedHadiths.filter(
                (item) => item.id !== hadith.id
            );

            saveHadithBookmarks(updatedBookmarks);
        } else {
            saveHadithBookmarks([...bookmarkedHadiths, hadith]);
        }
    }

    const sourceHadiths = useMemo(() => {
        if (viewMode === "saved") {
            return bookmarkedHadiths.filter(
                (hadith) => hadith.bookSlug === selectedBook
            );
        }

        return hadiths;
    }, [viewMode, bookmarkedHadiths, selectedBook, hadiths]);

    const filteredHadiths = useMemo(() => {
        const query = search.toLowerCase().trim();

        if (!query) return sourceHadiths;

        return sourceHadiths.filter((hadith) => {
            return (
                hadith.hadithNumber.includes(query) ||
                hadith.reference.toLowerCase().includes(query) ||
                hadith.englishText.toLowerCase().includes(query) ||
                hadith.arabicText.includes(search) ||
                hadith.urduText.includes(search)
            );
        });
    }, [sourceHadiths, search]);

    const visibleHadiths = filteredHadiths.slice(0, visibleCount);

    async function copyHadith(hadith: HadithItem) {
        const text = `${hadith.arabicText ? `${hadith.arabicText}\n\n` : ""}${hadith.englishText
            }${hadith.urduText ? `\n\n${hadith.urduText}` : ""}\n\nReference: ${hadith.reference
            }`;

        await navigator.clipboard.writeText(text);
        setCopiedId(hadith.id);

        setTimeout(() => {
            setCopiedId(null);
        }, 1500);
    }

    function shouldShowEnglish() {
        return translationMode === "english" || translationMode === "both";
    }

    function shouldShowUrdu() {
        return translationMode === "urdu" || translationMode === "both";
    }

    return (
        <div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <div className="grid gap-4 lg:grid-cols-[260px_1fr]">
                    <div>
                        <label className="mb-2 block text-sm text-white/60">
                            Hadith Collection
                        </label>

                        <select
                            value={selectedBook}
                            onChange={(e) => {
                                setSelectedBook(e.target.value);
                                setViewMode("all");
                            }}
                            className="w-full rounded-2xl border border-white/10 bg-[#0d241b] px-4 py-3 text-white outline-none focus:border-amber-400"
                        >
                            {HADITH_BOOKS.map((book) => (
                                <option key={book.slug} value={book.slug}>
                                    {book.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-white/60">
                            Search Hadith
                        </label>

                        <input
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setVisibleCount(20);
                            }}
                            placeholder="Search e.g. prayer, intention, mercy, 1..."
                            className="w-full rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-amber-400"
                        />
                    </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                    {translationOptions.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => setTranslationMode(option.value)}
                            className={`rounded-full px-5 py-2 text-sm font-medium transition ${translationMode === option.value
                                    ? "bg-amber-400 text-[#071812]"
                                    : "border border-white/10 text-white/70 hover:border-amber-400 hover:text-amber-300"
                                }`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                    {viewOptions.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => {
                                setViewMode(option.value);
                                setVisibleCount(20);
                            }}
                            className={`rounded-full px-5 py-2 text-sm font-medium transition ${viewMode === option.value
                                    ? "bg-emerald-400 text-[#071812]"
                                    : "border border-white/10 text-white/70 hover:border-emerald-400 hover:text-emerald-300"
                                }`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>

                {selectedBookInfo && (
                    <div className="mt-5 rounded-2xl border border-white/10 bg-[#071812]/60 p-5">
                        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">
                            Selected Collection
                        </p>

                        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <h2 className="text-2xl font-bold text-white">
                                    {selectedBookInfo.title}
                                </h2>

                                <p
                                    className="font-arabic-ui mt-2 text-3xl text-amber-300"
                                    dir="rtl"
                                >
                                    {selectedBookInfo.arabicTitle}
                                </p>
                            </div>

                            <div className="text-sm text-white/50">
                                <p>
                                    Showing {visibleHadiths.length} of {filteredHadiths.length}
                                </p>
                                <p className="mt-1">
                                    Saved in this book:{" "}
                                    {
                                        bookmarkedHadiths.filter(
                                            (hadith) => hadith.bookSlug === selectedBook
                                        ).length
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {error && (
                    <p className="mt-4 rounded-2xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                        {error}
                    </p>
                )}
            </div>

            {loading && (
                <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-10 text-center">
                    <p className="text-white/60">Loading hadiths...</p>
                </div>
            )}

            {!loading && visibleHadiths.length === 0 && (
                <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-10 text-center">
                    <h3 className="text-2xl font-semibold text-white">
                        {viewMode === "saved" ? "No saved hadiths yet" : "No hadith found"}
                    </h3>

                    <p className="mt-3 text-white/60">
                        {viewMode === "saved"
                            ? "Is collection mein abhi koi Hadith save nahi ki."
                            : "Search word change karo ya collection change karke try karo."}
                    </p>

                    {viewMode === "saved" && (
                        <button
                            onClick={() => setViewMode("all")}
                            className="mt-6 rounded-full bg-amber-400 px-7 py-3 font-semibold text-[#071812] transition hover:bg-amber-300"
                        >
                            Browse All Hadiths
                        </button>
                    )}
                </div>
            )}

            {!loading && visibleHadiths.length > 0 && (
                <div className="mt-8 space-y-5">
                    {visibleHadiths.map((hadith) => (
                        <div
                            key={hadith.id}
                            className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-amber-400/40"
                        >
                            <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">
                                        Hadith {hadith.hadithNumber}
                                    </p>

                                    <p className="mt-2 text-sm text-white/45">
                                        {hadith.reference}
                                    </p>

                                    <p className="font-arabic-ui mt-2 text-2xl text-amber-300" dir="rtl">
                                        {hadith.arabicBookName}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    <Link
                                        href={`/hadith/${hadith.bookSlug}/${hadith.hadithNumber}`}
                                        className="rounded-full border border-white/10 px-4 py-2 text-xs text-white/60 transition hover:border-amber-400 hover:text-amber-300"
                                    >
                                        Open
                                    </Link>
                                    <button
                                        onClick={() => copyHadith(hadith)}
                                        className="rounded-full border border-white/10 px-4 py-2 text-xs text-white/60 transition hover:border-amber-400 hover:text-amber-300"
                                    >
                                        {copiedId === hadith.id ? "Copied" : "Copy"}
                                    </button>

                                    <button
                                        onClick={() => toggleBookmark(hadith)}
                                        className={`rounded-full px-4 py-2 text-xs transition ${isBookmarked(hadith.id)
                                                ? "bg-amber-400 text-[#071812]"
                                                : "border border-white/10 text-white/60 hover:border-amber-400 hover:text-amber-300"
                                            }`}
                                    >
                                        {isBookmarked(hadith.id) ? "Saved" : "Save"}
                                    </button>
                                </div>
                            </div>

                            {hadith.arabicText && (
                                <p
                                    className="font-arabic arabic-text text-right text-3xl text-white md:text-4xl"
                                    dir="rtl"
                                >
                                    {hadith.arabicText}
                                </p>
                            )}

                            {translationMode !== "arabic" && (
                                <div className="mt-6 border-t border-white/10 pt-5">
                                    {shouldShowEnglish() && hadith.englishText && (
                                        <p className="text-base leading-8 text-white/70">
                                            {hadith.englishText}
                                        </p>
                                    )}

                                    {shouldShowUrdu() && (
                                        <>
                                            {hadith.urduText ? (
                                                <p
                                                    className="font-urdu urdu-text mt-5 text-right text-xl text-white/75 md:text-2xl"
                                                    dir="rtl"
                                                >
                                                    {hadith.urduText}
                                                </p>
                                            ) : (
                                                <p className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/45">
                                                    Urdu translation is not available for this Hadith.
                                                </p>
                                            )}
                                        </>
                                    )}
                                </div>
                            )}

                            {hadith.grades.length > 0 && (
                                <div className="mt-5 flex flex-wrap gap-2">
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
                        </div>
                    ))}

                    {visibleCount < filteredHadiths.length && (
                        <div className="text-center">
                            <button
                                onClick={() => setVisibleCount((prev) => prev + 20)}
                                className="rounded-full bg-amber-400 px-7 py-3 font-semibold text-[#071812] transition hover:bg-amber-300"
                            >
                                Load More
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}