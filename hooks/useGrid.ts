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

    for (const tuple of coordinates) {
      newGrid[tuple[1]][tuple[0]] = true;
      console.log(newGrid);
    }

    setGrid(newGrid);
  };

  const clearGrid = () => setGrid(emptyGrid);

  return [grid, updateLayout, clearGrid];
}
