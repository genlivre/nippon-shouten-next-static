import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed top-0 left-0 w-full z-50 p-4 text-right bg-white/80 backdrop-blur-sm">
        <a href="/assets/company_flyer_en.pdf" target="_blank" className="text-gray-600 hover:text-gray-900 font-serif">English</a>
      </header>
      <main className="flex-1 w-full flex flex-col md:flex-row pt-16">
        <div className="flex-1 h-auto md:h-auto relative flex items-center justify-center bg-gray-50">
          <picture className="w-full h-auto">
            <source type="image/webp" srcSet="/img/left.webp" />
            <img src="/img/left.jpg" alt="Left Image" className="w-full h-auto" />
          </picture>
        </div>
        <div className="flex-1 h-auto md:h-auto relative flex items-center justify-center bg-gray-50">
          <picture className="w-full h-auto">
            <source type="image/webp" srcSet="/img/right.webp" />
            <img src="/img/right.jpg" alt="Right Image" className="w-full h-auto" />
          </picture>
        </div>
      </main>
      <footer className="w-full text-center py-4 bg-white/80 backdrop-blur-sm">
        <h2 className="text-xs text-gray-500 font-serif">© 2025 日本商店株式会社</h2>
      </footer>
    </div>
  );
}
