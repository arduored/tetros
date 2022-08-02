import { useState } from "react";
import { CellProps } from "../components/Cell";
import { Coordinates } from "../types";

export function useGrid(
  width: number,
  height: number
): [CellProps[][], (data: Coordinates[]) => void, () => void] {
  const emptyGrid: CellProps[][] = Array(height).fill(Array(width).fill({status: false}));
  const [grid, setGrid] = useState(emptyGrid);

  const updateLayout = (coordinates: Coordinates[]) => {
    const newGrid = [...grid];

    for (const [x, y] of coordinates) {
      newGrid[x][y].isUsed = true;
    }
    setGrid(newGrid);
  };

  const clearGrid = () => setGrid(emptyGrid);

  return [grid, updateLayout, clearGrid];
}
