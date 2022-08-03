import { useEffect, useMemo, useState } from "react";
import { Grid, Tetromino } from "../types";
import Cell, { CellProps } from "./Cell";

interface IGrid {
  width: number;
  height: number;
  tetromino?: Tetromino;
}

function initGrid(w: number, h: number): Grid {
  const layout: unknown[][] = Array(h).fill(Array(w).fill(undefined));
  return layout.map((col, i) => col.map((_, j) => <Cell key={`${i}-${j}`} />));
}

function Grid({ width, height, tetromino }: IGrid) {
  const [grid, updateGrid] = useState(initGrid(width, height));

  useEffect(() => {
    if (tetromino) {
      const newGrid = [...initGrid(width, height)];

      for (const [x, y] of tetromino) {
        if (x >= 0 && y >= 0 && x < width && y < height) {
          newGrid[y][x] = <Cell key={`${y}-${x}`} isUsed={true} />;
        }
      }
      updateGrid(newGrid);
    }
  }, [tetromino]);

  return (
    <div className="grid grid-cols-12 border border-orange-700">
      {grid.map((col) => col.map((cell) => cell))}
    </div>
  );
}

export default Grid;
