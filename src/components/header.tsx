export default function Header() {
  return (
    <header className="flex justify-center py-4">
      <div className="flex items-center">
        <div className="w-16 h-16 relative mr-3">
          <div className="absolute top-0 left-0 w-10 h-10 bg-purple-600 rounded-lg transform rotate-12"></div>
          <div className="absolute bottom-0 right-0 w-10 h-10 bg-orange-500 rounded-lg transform -rotate-12"></div>
        </div>
        <h1 className="text-2xl font-bold uppercase">
          <span className="block">Block Blast</span>
          <span className="block">Solver</span>
        </h1>
      </div>
    </header>
  );
}
