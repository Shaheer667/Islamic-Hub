import Link from "next/link";

export default function Navbar() {
    return (
        <header className="border-b border-white/10 bg-[#071812]/90 backdrop-blur">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
                <Link href="/" className="text-xl font-bold text-white">
                    Islamic<span className="text-amber-400">Hub</span>
                </Link>

                <div className="hidden items-center gap-6 text-sm text-white/80 md:flex">
                    <Link href="/" className="hover:text-amber-400">
                        Home
                    </Link>
                    <Link href="/quran" className="hover:text-amber-400">
                        Quran
                    </Link>
                    <Link href="/bookmarks" className="hover:text-amber-400">
                        Bookmarks
                    </Link>
                    <Link href="/hadith" className="hover:text-amber-400">
                        Hadith
                    </Link>
                    <Link href="/prayer-times" className="hover:text-amber-400">
                        Prayer Times
                    </Link>
                    <Link href="/islamic-calendar" className="hover:text-amber-400">
                        Calendar
                    </Link>
                </div>
            </nav>
        </header>
    );
}