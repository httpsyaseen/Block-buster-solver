// Convert boolean grid to 'X' and '.' format for the algorithm
export function convertGridForSolver(grid: boolean[][]): string[][] {
  return grid.map((row) => row.map((cell) => (cell ? "X" : ".")));
}

// Convert 'X' and '.' format back to boolean grid
export function convertGridFromSolver(grid: string[][]): boolean[][] {
  return grid.map((row) => row.map((cell) => cell === "X"));
}

// Convert figure grid to block format for the algorithm
export function convertFigureToBlock(grid: boolean[][]): number[][] {
  // Trim the grid to only include the filled cells
  let minRow = grid.length;
  let maxRow = 0;
  let minCol = grid[0].length;
  let maxCol = 0;

  // Find the boundaries of the figure
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j]) {
        minRow = Math.min(minRow, i);
        maxRow = Math.max(maxRow, i);
        minCol = Math.min(minCol, j);
        maxCol = Math.max(maxCol, j);
      }
    }
  }

  // If no cells are filled, return a 1x1 block
  if (minRow > maxRow) {
    return [[1]];
  }

  // Create the block
  const block: number[][] = [];
  for (let i = minRow; i <= maxRow; i++) {
    const row: number[] = [];
    for (let j = minCol; j <= maxCol; j++) {
      row.push(grid[i][j] ? 1 : 0);
    }
    block.push(row);
  }

  return block;
}

// Find the best position for a block on the grid
export function findBestPosition(grid: string[][], block: number[][]) {
  const rows = grid.length;
  const cols = grid[0].length;
  const blockHeight = block.length;
  const blockWidth = block[0].length;
  let bestScore = -1;
  let bestPositions: { row: number; col: number }[] = [];
  let completesRowOrColumn = false;

  // Iterate over all possible positions for the block
  for (let row = 0; row <= rows - blockHeight; row++) {
    for (let col = 0; col <= cols - blockWidth; col++) {
      // Simulate placement and calculate score
      const simulated = simulatePlacement(grid, block, row, col);

      // Skip invalid placements
      if (simulated.score < 0) continue;

      // Check if this placement completes any rows or columns
      const completesAny =
        simulated.completedRows.length > 0 ||
        simulated.completedCols.length > 0;

      // If we find a placement that completes a row/column and we didn't have one before
      if (completesAny && !completesRowOrColumn) {
        completesRowOrColumn = true;
        bestScore = simulated.score;
        bestPositions = [{ row, col }];
      }
      // If both current best and this placement complete rows/columns, or neither do
      else if (completesAny === completesRowOrColumn) {
        if (simulated.score > bestScore) {
          bestScore = simulated.score;
          bestPositions = [{ row, col }];
        } else if (simulated.score === bestScore) {
          bestPositions.push({ row, col });
        }
      }
      // If current best completes rows/columns but this one doesn't, skip it
    }
  }

  return { bestPositions, bestScore, canBePlaced: bestScore >= 0 };
}

// Helper function to simulate placement
function simulatePlacement(
  grid: string[][],
  block: number[][],
  row: number,
  col: number
) {
  const tempGrid = grid.map((r) => [...r]);
  const rows = tempGrid.length;
  const cols = tempGrid[0].length;
  const blockHeight = block.length;
  const blockWidth = block[0].length;

  // Check if placement is valid
  for (let i = 0; i < blockHeight; i++) {
    for (let j = 0; j < blockWidth; j++) {
      if (block[i][j] && tempGrid[row + i]?.[col + j] === "X") {
        return {
          score: -1,
          completedRows: [],
          completedCols: [],
          grid: tempGrid,
        }; // Invalid placement
      }
    }
  }

  // Place the block
  for (let i = 0; i < blockHeight; i++) {
    for (let j = 0; j < blockWidth; j++) {
      if (block[i][j]) {
        tempGrid[row + i][col + j] = "X";
      }
    }
  }

  // Check completed rows
  const completedRows = tempGrid.reduce((acc, curr, idx) => {
    if (curr.every((cell) => cell === "X")) acc.push(idx);
    return acc;
  }, [] as number[]);

  // Check completed columns
  const completedCols: number[] = [];
  for (let j = 0; j < cols; j++) {
    let isFull = true;
    for (let i = 0; i < rows; i++) {
      if (tempGrid[i][j] !== "X") {
        isFull = false;
        break;
      }
    }
    if (isFull) completedCols.push(j);
  }

  // Score is weighted to prioritize completing rows/columns
  const completionScore = (completedRows.length + completedCols.length) * 100;

  // Additional score for number of cells filled
  const filledCellsScore = tempGrid
    .flat()
    .filter((cell) => cell === "X").length;

  return {
    score: completionScore + filledCellsScore,
    completedRows,
    completedCols,
    grid: tempGrid,
  };
}

// Apply the best position of a block to a grid
export function applyBlockToGrid(
  grid: string[][],
  block: number[][],
  position: { row: number; col: number }
): string[][] {
  const newGrid = grid.map((row) => [...row]);
  const { row, col } = position;

  for (let i = 0; i < block.length; i++) {
    for (let j = 0; j < block[0].length; j++) {
      if (block[i][j]) {
        newGrid[row + i][col + j] = "X";
      }
    }
  }

  return newGrid;
}
