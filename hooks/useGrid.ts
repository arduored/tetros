import { useState } from "react";
import { Coordinates } from "../types";

export function useGrid(
  width: number,
  height: number
): [boolean[][], (data: Coordinates[]) => void, () => void] {
  const emptyGrid: boolean[][] = Array(height).fill(Array(width).fill(false));
  const [grid, setGrid] = useState(emptyGrid);

  const updateLayout = (coordinates: Coordinates[]) => {
    const newGrid = [...grid];

    for (const [x, y] of coordinates) {
      newGrid[x][y] = true;
    }
    setGrid(newGrid);
  };

  const clearGrid = () => setGrid(emptyGrid);

  return [grid, updateLayout, clearGrid];
}
