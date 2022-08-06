import { useEffect, useMemo, useRef, useState } from "react";
import { GRID_BOTTOM, GRID_SIDE } from "../events/gridEvents";
import { Grid, Tetromino } from "../types";
import Cell from "./Cell";

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
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (tetromino) {
      const newGrid = [...initGrid(width, height)];

      for (const [x, y] of tetromino) {
        if (y === height - 1) {
          gridRef.current?.dispatchEvent(GRID_BOTTOM);
        }

        // if (x === 0 || x === width - 1) {
        //   const t = setTimeout(() => gridRef.current?.dispatchEvent(GRID_SIDE), 500);
        //   clearTimeout(t);
        // }

        if (x >= 0 && y >= 0 && x < width && y < height) {
          newGrid[y][x] = <Cell key={`${y}-${x}`} isUsed={true} />;
        }
      }
      updateGrid(newGrid);
    }
  }, [tetromino]);

  return (
    <div className="grid grid-cols-12 border-4 border-slate-900" ref={gridRef}>
      {grid.map((col) => col.map((cell) => cell))}
    </div>
  );
}

export default Grid;
