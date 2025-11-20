import Link from "next/link";

export default function Home() {
  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 p-4 text-right">
        <a href="./flyer/en.pdf" target="_blank" className="text-gray-600 hover:text-gray-900 font-serif">English</a>
      </header>
      <main className="h-screen w-full flex flex-col md:flex-row">
        <div className="flex-1 h-1/2 md:h-full relative overflow-hidden group">
          <picture>
            <source type="image/webp" srcSet="/img/left.webp" />
            <img src="/img/left.jpg" alt="Left Image" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </picture>
        </div>
        <div className="flex-1 h-1/2 md:h-full relative overflow-hidden group">
          <picture>
            <source type="image/webp" srcSet="/img/right.webp" />
            <img src="/img/right.jpg" alt="Right Image" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </picture>
        </div>
      </main>
      <footer className="fixed bottom-0 w-full text-center py-4 bg-white/80 backdrop-blur-sm">
        <h2 className="text-xs text-gray-500 font-serif">© 2020 日本商店株式会社</h2>
      </footer>
    </>
  );
}
