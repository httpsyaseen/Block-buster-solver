"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ImageIcon, Grid2X2 } from "lucide-react";
import {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
} from "@google/genai";
import GridDisplay from "@/components/display-grid";

const PROMPT = `There is a game in which I will give you an image like this. In the image:

1. The top section contains a grid of 8x8 cells, which is the playground.
2. The cells are either empty (0) or filled (1).
3. The filled cells are already placed in the playground.

Below it, there are 3 input blocks that can be placed into the playground.

Your task is to place these blocks into the playground grid in such a way that:

1. A row or a column is completed, or
2. If that is not possible, then place them in the best position so that a row or column is as close to completion as possible.

You should return:
1. The final playground grid as a 2D array (8x8) for every input grid, where:
2. 0 represents empty cells,
3. 1 represents the already filled cells in the playground,
4. 2 represents the new placements from the input blocks.

Only return the 2d arrays each for every input. No Code,No explanation.`;

const ai = new GoogleGenAI({
  apiKey: "AIzaSyA9uIX5FYtHeVPnaJNC5CIBHw9EMPSuih0",
});

function extractArrayBlocks(text) {
  const regex = /```([\s\S]*?)```/g;
  const matches = [];
  let match;

  while ((match = regex.exec(text)) !== null) {
    try {
      // Try to parse the content as JSON-like
      const parsed = eval(match[1].trim());
      matches.push(parsed);
    } catch (e) {
      console.error("Failed to parse block:", match[1].trim());
    }
  }

  return matches;
}

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null); // New state for image URL
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [solutionGrid, setSolutionGrid] = useState([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isError, setIsError] = useState(false);

  // Handle file change and create temporary URL
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Create a temporary URL for the image
      const url = URL.createObjectURL(selectedFile);
      setImageUrl(url);
    }
  };

  // Clean up the temporary URL when component unmounts or file changes
  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const getResults = async () => {
    if (!file) {
      alert("Please select an image first");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const myfile = await ai.files.upload({
        file: file,
        config: { mimeType: "image/jpeg" },
      });

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: createUserContent([
          createPartFromUri(myfile.uri, myfile.mimeType),
          PROMPT,
        ]),
      });
      const sol = extractArrayBlocks(response.text);

      setSolutionGrid(sol);
      setResult(response.text);
    } catch (error) {
      setIsError(true);
      console.error("Error processing image:", error);
      setResult("Error processing image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-600 mb-4">
            Block Blast Solver Online
          </h1>
          <p className="text-xl text-gray-700">
            Get Block Blast high score solution by taking screenshots
          </p>
        </div>

        {/* Main Content Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
          <h2 className="text-3xl font-bold text-center mb-3">
            Screenshot Solver
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Select Block Blast / Block Puzzle Screenshot
          </p>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Upload Area */}
            <div className="flex-1">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center h-[400px]">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Uploaded screenshot"
                    className="max-h-full max-w-full object-contain rounded-lg"
                  />
                ) : (
                  <div className="text-gray-500 mb-4">
                    <ImageIcon size={48} className="mx-auto mb-4" />
                    <p className="text-center">
                      Click to test or drag and drop
                      <br />
                      PNG, JPG, GIF, WEBP...
                    </p>
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  onClick={handleUploadClick}
                  className="mt-4 bg-gray-900 text-white px-4 py-2 rounded-md flex items-center gap-2"
                >
                  <ImageIcon size={18} />
                  Select Screenshot
                </button>
              </div>
              {file && (
                <button
                  onClick={getResults}
                  disabled={loading}
                  className={`mt-4 mx-auto bg-purple-600 cursor-pointer text-white px-4 py-2 rounded-md flex items-center gap-2 ${
                    loading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-purple-700"
                  }`}
                >
                  {loading ? "Processing..." : "Analyze Screenshot"}
                </button>
              )}
            </div>

            {/* Example and Alternative */}
            <div className="flex-1 flex flex-col">
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold mb-4 text-center">
                  Example Image
                </h3>
                <div className="flex justify-center mb-4">
                  <Image
                    src="/example.png"
                    alt="Block Blast Game Example"
                    width={150}
                    height={300}
                    className="rounded-lg border border-gray-200"
                  />
                </div>
                <div className="text-center">
                  <Link href="#" className="text-purple-600 hover:underline">
                    Show example
                  </Link>
                </div>
              </div>

              <div className="text-center my-4 text-gray-600 font-medium">
                OR
              </div>

              <button className="bg-purple-600 text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-purple-700 transition-colors">
                <Grid2X2 size={20} />
                Fill Manually
              </button>
            </div>
          </div>
        </div>
      </main>
      <section className="container mx-auto px-4 py-12 flex flex-row items-center justify-center gap-8">
        {!loading &&
          solutionGrid.length > 0 &&
          solutionGrid.map((grid, index) => (
            <div
              key={index}
              className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 flex flex-col items-center"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Solution {index + 1}
              </h3>
              <GridDisplay
                grid={grid}
                size={8}
                readOnly={true}
                className="w-full aspect-square"
              />
            </div>
          ))}
        {isError && (
          <section
            className={`container mx-auto px-4 py-12 flex justify-center items-center `}
          >
            <div className="bg-white border-4 border-red-400 rounded-xl shadow-2xl p-8 max-w-sm w-full text-center">
              <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
                You are cooked 💀
              </h1>
              <p className="text-lg text-gray-600">Better luck next time!</p>
            </div>
          </section>
        )}
      </section>
    </div>
  );
}
