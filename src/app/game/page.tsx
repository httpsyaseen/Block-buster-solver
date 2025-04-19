"use client";

import { useState, useEffect } from "react";
import { Gamepad2, Loader2, Maximize2, Volume2, VolumeX } from "lucide-react";

export default function PlayGame() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Handle iframe load event
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    const gameContainer = document.getElementById("game-container");
    if (!gameContainer) return;

    if (!document.fullscreenElement) {
      gameContainer.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  // Update fullscreen state
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  return (
    <div className=" bg-gradient-to-b from-blue-50 to-blue-100">
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-600 mb-4">
            Play Game
          </h1>
          <p className="text-xl text-gray-700">
            Enjoy Block Blast directly in your browser
          </p>
        </div>

        {/* Game Container */}
        <div className="max-w-5xl mx-auto">
          <div className="relative bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Decorative header */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-4 flex justify-between items-center">
              <div className="flex items-center">
                <Gamepad2 className="text-white mr-2" size={24} />
                <h2 className="text-xl font-bold text-white">
                  Block Blast Game
                </h2>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <button
                  onClick={toggleFullscreen}
                  className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
                  aria-label="Toggle fullscreen"
                >
                  <Maximize2 size={20} />
                </button>
              </div>
            </div>

            {/* Game iframe container */}
            <div
              id="game-container"
              className="relative bg-gray-900 aspect-[4/3]  w-full flex items-center justify-center"
            >
              {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 z-10">
                  <Loader2
                    className="animate-spin text-purple-500 mb-4"
                    size={48}
                  />
                  <p className="text-white text-lg">Loading game...</p>
                </div>
              )}

              <iframe
                src={`https://block-blast.io/game/block-blast/`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onLoad={handleIframeLoad}
                title="Block Blast Game"
              ></iframe>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
