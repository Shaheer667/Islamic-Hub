import BookmarkList from "@/components/BookmarkList";

export default function BookmarksPage() {
  return (
    <main className="min-h-screen bg-[#071812]">
      <section className="mx-auto max-w-5xl px-5 py-14">
        <div className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
            Saved Ayahs
          </p>

          <h1 className="text-4xl font-bold text-white">Bookmarks</h1>

          <p className="mt-4 max-w-2xl text-white/60">
            All your saved Quran Ayahs will appear here. These bookmarks are
            saved in your browser.
          </p>
        </div>

        <BookmarkList />
      </section>
    </main>
  );
}