"use client";

import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="flex flex-col md:flex-row gap-3 items-center py-4 px-6 max-w-6xl mx-auto w-full">
      {/* Logo on the left */}
      <div className="flex items-center">
        <div className="w-16 h-16 relative mr-3">
          <div className="absolute top-0 left-0 w-10 h-10 bg-purple-600 rounded-lg transform rotate-12"></div>
          <div className="absolute bottom-0 right-0 w-10 h-10 bg-orange-500 rounded-lg transform -rotate-12"></div>
        </div>
        <h1 className="text-xl font-bold uppercase">
          <span className="block">Block Blast</span>
          <span className="block">Solver</span>
        </h1>
      </div>

      {/* Navigation links in the center */}
      <nav className="flex-1 flex justify-center">
        <ul className="flex space-x-8">
          <li>
            <a
              href="/"
              className={`text-xl font-medium py-2 ${
                pathname === "/" ? "border-b-4 border-purple-600" : ""
              }`}
            >
              Fill Manually
            </a>
          </li>
          <li>
            <a
              href="/screenshot"
              className={`text-xl font-medium py-2 ${
                pathname === "/screenshot" ? "border-b-4 border-purple-600" : ""
              }`}
            >
              Screenshot
            </a>
          </li>
          <li>
            <a
              href="/game"
              className={`text-xl font-medium py-2 ${
                pathname === "/game" ? "border-b-4 border-purple-600" : ""
              }`}
            >
              Play Game
            </a>
          </li>
        </ul>
      </nav>

      {/* Empty div to balance the layout */}
      <div className="hidden md:block w-[180px]"></div>
    </header>
  );
}
