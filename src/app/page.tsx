"use client";

import { useState } from "react";
import BlockGrid from "@/components/block-grid";
import SolutionGrid from "@/components/solution-grid";

export default function Home() {
  const [initialGrid, setInitialGrid] = useState<boolean[][]>(
    Array(8)
      .fill(null)
      .map(() => Array(8).fill(false))
  );

  const [figure1, setFigure1] = useState<boolean[][]>(
    Array(5)
      .fill(null)
      .map(() => Array(5).fill(false))
  );
  const [figure2, setFigure2] = useState<boolean[][]>(
    Array(5)
      .fill(null)
      .map(() => Array(5).fill(false))
  );
  const [figure3, setFigure3] = useState<boolean[][]>(
    Array(5)
      .fill(null)
      .map(() => Array(5).fill(false))
  );

  const [solutions, setSolutions] = useState<
    {
      figure: boolean[][];
      solution: boolean[][] | null;
      position: { row: number; col: number } | null;
      canBePlaced: boolean;
    }[]
  >([]);

  const [showSolution, setShowSolution] = useState(false);

  const trimBlock = (block: boolean[][]): boolean[][] => {
    let minRow = block.length;
    let maxRow = -1;
    let minCol = block[0].length;
    let maxCol = -1;

    for (let i = 0; i < block.length; i++) {
      for (let j = 0; j < block[0].length; j++) {
        if (block[i][j]) {
          minRow = Math.min(minRow, i);
          maxRow = Math.max(maxRow, i);
          minCol = Math.min(minCol, j);
          maxCol = Math.max(maxCol, j);
        }
      }
    }

    if (maxRow === -1) return [[]];

    const trimmedRows = maxRow - minRow + 1;
    const trimmedCols = maxCol - minCol + 1;
    const trimmedBlock: boolean[][] = Array(trimmedRows)
      .fill(null)
      .map(() => Array(trimmedCols).fill(false));

    for (let i = minRow; i <= maxRow; i++) {
      for (let j = minCol; j <= maxCol; j++) {
        trimmedBlock[i - minRow][j - minCol] = block[i][j];
      }
    }

    return trimmedBlock;
  };

  const findBestPosition = (grid: boolean[][], block: boolean[][]) => {
    const trimmedBlock = trimBlock(block);
    const blockRows = trimmedBlock.length;
    const blockCols = trimmedBlock[0]?.length || 0;

    if (blockRows === 0 || blockCols === 0) {
      return { bestScore: -1, bestPositions: [] };
    }

    let bestScore = -1;
    let bestPositions: { row: number; col: number }[] = [];

    const rowCounts = Array(8).fill(0);
    const colCounts = Array(8).fill(0);
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (grid[i][j]) {
          rowCounts[i]++;
          colCounts[j]++;
        }
      }
    }

    let blockFilledCells = 0;
    for (let i = 0; i < blockRows; i++) {
      for (let j = 0; j < blockCols; j++) {
        if (trimmedBlock[i][j]) blockFilledCells++;
      }
    }

    for (let r = 0; r <= 8 - blockRows; r++) {
      for (let c = 0; c <= 8 - blockCols; c++) {
        if (canPlaceBlock(grid, trimmedBlock, r, c)) {
          const tempGrid = applyBlockToGrid(grid, trimmedBlock, {
            row: r,
            col: c,
          });
          const { completedRows, completedCols } = calculateScore(tempGrid);

          let score = completedRows + completedCols;

          let potentialScore = 0;
          const newRowCounts = Array(8).fill(0);
          const newColCounts = Array(8).fill(0);
          for (let i = 0; i < blockRows; i++) {
            for (let j = 0; j < blockCols; j++) {
              if (trimmedBlock[i][j]) {
                newRowCounts[r + i]++;
                newColCounts[c + j]++;
              }
            }
          }

          for (let i = 0; i < 8; i++) {
            const rowPotential = rowCounts[i] + newRowCounts[i];
            const colPotential = colCounts[i] + newColCounts[i];
            if (rowPotential < 8) potentialScore += rowPotential;
            if (colPotential < 8) potentialScore += colPotential;
          }

          const totalScore = score * 100 + potentialScore;

          if (totalScore > bestScore) {
            bestScore = totalScore;
            bestPositions = [{ row: r, col: c }];
          } else if (totalScore === bestScore) {
            bestPositions.push({ row: r, col: c });
          }
        }
      }
    }

    return { bestScore, bestPositions };
  };

  const canPlaceBlock = (
    grid: boolean[][],
    block: boolean[][],
    row: number,
    col: number
  ) => {
    for (let i = 0; i < block.length; i++) {
      for (let j = 0; j < block[0].length; j++) {
        if (block[i][j] && grid[row + i][col + j]) return false;
      }
    }
    return true;
  };

  const applyBlockToGrid = (
    grid: boolean[][],
    block: boolean[][],
    position: { row: number; col: number }
  ) => {
    const newGrid = grid.map((row) => [...row]);
    for (let i = 0; i < block.length; i++) {
      for (let j = 0; j < block[0].length; j++) {
        if (block[i][j]) newGrid[position.row + i][position.col + j] = true;
      }
    }
    return newGrid;
  };

  const calculateScore = (grid: boolean[][]) => {
    let completedRows = 0;
    let completedCols = 0;

    for (let i = 0; i < 8; i++) {
      if (grid[i].every((cell) => cell)) completedRows++;
    }

    for (let j = 0; j < 8; j++) {
      let colComplete = true;
      for (let i = 0; i < 8; i++) {
        if (!grid[i][j]) {
          colComplete = false;
          break;
        }
      }
      if (colComplete) completedCols++;
    }

    return { completedRows, completedCols };
  };

  const handleSolve = () => {
    const newSolutions = [];
    const blocks = [figure1, figure2, figure3];
    let currentGrid = initialGrid.map((row) => [...row]);

    blocks.forEach((figure, index) => {
      const result = findBestPosition(currentGrid, figure);
      if (result.bestPositions.length > 0 && result.bestScore >= 0) {
        const position = result.bestPositions[0];
        const trimmedFigure = trimBlock(figure);
        const solutionGrid = applyBlockToGrid(
          currentGrid,
          trimmedFigure,
          position
        );
        newSolutions.push({
          figure,
          solution: solutionGrid,
          position,
          canBePlaced: true,
        });
        currentGrid = solutionGrid;
      } else {
        newSolutions.push({
          figure,
          solution: null,
          position: null,
          canBePlaced: false,
        });
      }
    });

    console.log("Solutions:", newSolutions);
    setSolutions(newSolutions);
    setShowSolution(true);
  };

  const handleClear = () => {
    setInitialGrid(
      Array(8)
        .fill(null)
        .map(() => Array(8).fill(false))
    );
    setFigure1(
      Array(5)
        .fill(null)
        .map(() => Array(5).fill(false))
    );
    setFigure2(
      Array(5)
        .fill(null)
        .map(() => Array(5).fill(false))
    );
    setFigure3(
      Array(5)
        .fill(null)
        .map(() => Array(5).fill(false))
    );
    setSolutions([]);
    setShowSolution(false);
  };

  // ... (keep all the imports and previous code up to the return statement the same)

  return (
    <main className="min-h-screen bg-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Block Buster</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-center mb-6">Game Grid</h2>
            <BlockGrid
              size={8}
              grid={initialGrid}
              onGridChange={setInitialGrid}
              className="w-48 h-48 md:w-96 md:h-96"
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-center mb-6">
              Place Your Blocks
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="text-lg font-medium text-center mb-4">
                  Block 1
                </h3>
                <BlockGrid
                  size={5}
                  color="orange"
                  grid={figure1}
                  onGridChange={setFigure1}
                  className="w-32 h-32 md:w-40 md:h-40"
                />
              </div>
              <div>
                <h3 className="text-lg font-medium text-center mb-4">
                  Block 2
                </h3>
                <BlockGrid
                  size={5}
                  color="orange"
                  grid={figure2}
                  onGridChange={setFigure2}
                  className="w-32 h-32 md:w-40 md:h-40"
                />
              </div>
              <div>
                <h3 className="text-lg font-medium text-center mb-4">
                  Block 3
                </h3>
                <BlockGrid
                  size={5}
                  color="orange"
                  grid={figure3}
                  onGridChange={setFigure3}
                  className="w-32 h-32 md:w-40 md:h-40"
                />
              </div>
            </div>
          </div>
        </div>

        {showSolution && solutions && solutions.length > 0 ? (
          <div className="mt-8">
            <h2 className="text-3xl font-bold text-center mb-8">Solutions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {solutions.map((solution, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg p-4 border border-gray-200"
                >
                  <h3 className="text-xl font-semibold text-center mb-6">
                    Block {index + 1} Solution
                  </h3>
                  <div className="flex flex-col items-center">
                    {solution.canBePlaced && solution.solution ? (
                      <SolutionGrid
                        size={8}
                        initialGrid={initialGrid}
                        solutionGrid={solution.solution}
                        readOnly={true}
                        className="w-48 h-48 md:w-76 p-2 md:h-76 rounded-lg "
                        color="orange"
                      />
                    ) : (
                      <p className="text-center text-red-500 font-medium">
                        Cannot be placed
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : showSolution ? (
          <p className="text-center mt-8 text-gray-600">
            No solutions available
          </p>
        ) : null}

        <div className="flex justify-center gap-4 mt-8">
          <button
            className="px-8 py-3 bg-white text-gray-700 font-medium rounded-full shadow-md hover:bg-gray-100 transition-colors"
            onClick={handleClear}
          >
            Clear
          </button>
          <button
            className="px-8 py-3 bg-purple-600 text-white font-medium rounded-full shadow-md hover:bg-purple-700 transition-colors"
            onClick={showSolution ? () => setShowSolution(false) : handleSolve}
          >
            {showSolution ? "Back" : "Solve"}
          </button>
        </div>
      </div>
    </main>
  );
}
