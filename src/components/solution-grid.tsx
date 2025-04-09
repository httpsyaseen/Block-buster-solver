"use client";

import { useState, useEffect } from "react";

interface BlockGridProps {
  size: number;
  initialGrid: boolean[][];
  solutionGrid?: boolean[][] | null;
  onGridChange?: (grid: boolean[][]) => void;
  readOnly?: boolean;
  className?: string;
  color?: string; // Add color prop to match BlockGrid
}

export default function SolutionGrid({
  size,
  initialGrid = Array(8)
    .fill(null)
    .map(() => Array(8).fill(false)),
  solutionGrid,
  onGridChange,
  readOnly = false,
  className = "",
  color = "orange", // Default to orange to match BlockGrid
}: BlockGridProps) {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [completedRows, setCompletedRows] = useState<number[]>([]);
  const [completedCols, setCompletedCols] = useState<number[]>([]);

  useEffect(() => {
    if (solutionGrid) {
      const rows: number[] = [];
      for (let i = 0; i < size; i++) {
        const isRowComplete = solutionGrid[i]?.every((cell) => cell) || false;
        if (isRowComplete) rows.push(i);
      }
      setCompletedRows(rows);

      const cols: number[] = [];
      for (let j = 0; j < size; j++) {
        let isColComplete = true;
        for (let i = 0; i < size; i++) {
          if (!solutionGrid[i]?.[j]) {
            isColComplete = false;
            break;
          }
        }
        if (isColComplete) cols.push(j);
      }
      setCompletedCols(cols);
    }
  }, [solutionGrid, size]);

  const toggleBlock = (row: number, col: number) => {
    if (readOnly) return;
    const newGrid = [...initialGrid];
    newGrid[row] = [...newGrid[row]];
    newGrid[row][col] = !newGrid[row][col];
    if (onGridChange) onGridChange(newGrid);
  };

  const fillBlock = (row: number, col: number) => {
    if (readOnly) return;
    const newGrid = [...initialGrid];
    newGrid[row] = [...newGrid[row]];
    newGrid[row][col] = true;
    if (onGridChange) onGridChange(newGrid);
  };

  const getCellStyles = (row: number, col: number) => {
    const isInitialActive = initialGrid[row]?.[col] || false;
    const isSolutionActive = solutionGrid
      ? solutionGrid[row]?.[col] || false
      : false;

    let baseClasses = "aspect-square rounded-sm transition-colors";
    if (!readOnly) baseClasses += " cursor-pointer";

    let bgColor = "bg-blue-100"; // Default empty cell
    if (isInitialActive) {
      bgColor = "bg-purple-600"; // Initial grid filled cell
    } else if (isSolutionActive) {
      bgColor = `bg-${color}-500`; // Newly placed block cell (not in initial grid)
    }

    let borderStyles = "";
    if (completedRows.includes(row)) borderStyles += " border-2 border-black";
    if (completedCols.includes(col)) borderStyles += " border-2 border-black";

    return `${baseClasses} ${bgColor} ${borderStyles}`;
  };

  return (
    <div
      className={`grid gap-1 mx-auto ${className}`}
      style={{
        gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${size}, minmax(0, 1fr))`,
      }}
      onMouseDown={() => setIsMouseDown(true)}
      onMouseUp={() => setIsMouseDown(false)}
      onMouseLeave={() => setIsMouseDown(false)}
    >
      {initialGrid.map((row, rowIndex) =>
        row.map((_, colIndex) => (
          <button
            key={`${rowIndex}-${colIndex}`}
            className={getCellStyles(rowIndex, colIndex)}
            onClick={() => toggleBlock(rowIndex, colIndex)}
            onMouseEnter={() => isMouseDown && fillBlock(rowIndex, colIndex)}
            onMouseDown={() => setIsMouseDown(true)}
            aria-label={
              initialGrid[rowIndex][colIndex] ? "Filled block" : "Empty block"
            }
            disabled={readOnly}
          />
        ))
      )}
    </div>
  );
}
