"use client";

import { useState } from "react";

interface BlockGridProps {
  size: number;
  color?: string;
  grid?: boolean[][];
  onGridChange?: (grid: boolean[][]) => void;
  readOnly?: boolean;
  className?: string;
}

export default function BlockGrid({
  size,
  color = "purple",
  grid: externalGrid,
  onGridChange,
  readOnly = false,
  className = "",
}: BlockGridProps) {
  // Use external grid if provided, otherwise create a new one
  const [internalGrid, setInternalGrid] = useState<boolean[][]>(
    Array(size)
      .fill(null)
      .map(() => Array(size).fill(false))
  );

  const grid = externalGrid || internalGrid;
  const [isMouseDown, setIsMouseDown] = useState(false);

  // Toggle the state of a block
  const toggleBlock = (row: number, col: number) => {
    if (readOnly) return;

    const newGrid = [...grid];
    newGrid[row] = [...newGrid[row]];
    newGrid[row][col] = !newGrid[row][col];

    if (onGridChange) {
      onGridChange(newGrid);
    } else {
      setInternalGrid(newGrid);
    }
  };

  // Fill a block (used for drag operations)
  const fillBlock = (row: number, col: number) => {
    if (readOnly) return;

    const newGrid = [...grid];
    newGrid[row] = [...newGrid[row]];
    newGrid[row][col] = true;

    if (onGridChange) {
      onGridChange(newGrid);
    } else {
      setInternalGrid(newGrid);
    }
  };

  // Get the color class based on the state and color prop
  const getColorClass = (isActive: boolean) => {
    if (!isActive) return "bg-blue-100";

    switch (color) {
      case "orange":
        return "bg-orange-500";
      case "purple":
      default:
        return "bg-purple-600";
    }
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
      {grid.map((row, rowIndex) =>
        row.map((isActive, colIndex) => (
          <button
            key={`${rowIndex}-${colIndex}`}
            className={`aspect-square rounded-sm transition-colors cursor-pointer ${getColorClass(
              isActive
            )}`}
            onClick={() => toggleBlock(rowIndex, colIndex)}
            onMouseEnter={() => isMouseDown && fillBlock(rowIndex, colIndex)}
            onMouseDown={() => setIsMouseDown(true)}
            aria-label={isActive ? "Filled block" : "Empty block"}
            disabled={readOnly}
          />
        ))
      )}
    </div>
  );
}
