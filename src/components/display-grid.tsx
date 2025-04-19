"use client";

import { useState, useEffect } from "react";

interface GridDisplayProps {
  grid: number[][]; // 8x8 grid with 0 (empty), 1 (existing block), 2 (new block)
  size?: number; // Optional size prop, defaults to 8
  readOnly?: boolean;
  className?: string;
}

export default function GridDisplay({
  grid,
  size = 8,
  readOnly = true,
  className = "",
}: GridDisplayProps) {
  const [completedRows, setCompletedRows] = useState<number[]>([]);
  const [completedCols, setCompletedCols] = useState<number[]>([]);
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    const rows: number[] = [];
    const cols: number[] = [];

    // Check for completed rows
    for (let i = 0; i < size; i++) {
      const isRowComplete = grid[i]?.every((cell) => cell === 1 || cell === 2);
      if (isRowComplete) rows.push(i);
    }

    // Check for completed columns
    for (let j = 0; j < size; j++) {
      let isColComplete = true;
      for (let i = 0; i < size; i++) {
        if (grid[i]?.[j] === 0) {
          isColComplete = false;
          break;
        }
      }
      if (isColComplete) cols.push(j);
    }

    setCompletedRows(rows);
    setCompletedCols(cols);
  }, [grid, size]);

  const getCellStyles = (row: number, col: number) => {
    const cellValue = grid[row]?.[col] ?? 0;
    let baseClasses = "aspect-square rounded-sm transition-colors";
    if (!readOnly) baseClasses += " cursor-pointer";

    let bgColor = "";
    switch (cellValue) {
      case 0:
        bgColor = "bg-blue-100"; // Empty cell
        break;
      case 1:
        bgColor = "bg-purple-600"; // Existing block
        break;
      case 2:
        bgColor = "bg-orange-500"; // New block
        break;
      default:
        bgColor = "bg-blue-100"; // Fallback
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
      onMouseDown={() => !readOnly && setIsMouseDown(true)}
      onMouseUp={() => setIsMouseDown(false)}
      onMouseLeave={() => setIsMouseDown(false)}
    >
      {grid.map((row, rowIndex) =>
        row.map((_, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={getCellStyles(rowIndex, colIndex)}
            aria-label={
              grid[rowIndex][colIndex] === 0
                ? "Empty block"
                : grid[rowIndex][colIndex] === 1
                ? "Existing block"
                : "New block"
            }
          />
        ))
      )}
    </div>
  );
}
