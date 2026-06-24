export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#071812] px-5 py-8 text-center text-sm text-white/60">
      <p>
        © {new Date().getFullYear()} IslamicHub. Read, listen and learn with
        authentic Islamic resources.
      </p>
    </footer>
  );
}