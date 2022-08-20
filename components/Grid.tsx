import { FC, useEffect, useMemo, useRef, useState } from "react";
import { GRID_BOTTOM, GRID_SIDE } from "../events/gridEvents";
import { Grid, Tetromino } from "../types";
import Cell from "./Cell";

interface IGrid {
  width: number;
  height: number;
  tetromino?: Tetromino;
}

function createEmptyGrid(w: number, h: number): Grid {
  const layout: unknown[][] = Array(h).fill(Array(w).fill(undefined));
  return layout.map((col, i) => col.map((_, j) => <Cell key={`${i}-${j}`} />));
}

const Grid: FC<IGrid> = ({ width, height, tetromino }) => {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [grid, updateGrid] = useState(createEmptyGrid(width, height));
  const [isOnEdge, setIsOnEdge] = useState(false);

  useEffect(() => {
    if (tetromino) {
      const newGrid = [...createEmptyGrid(width, height)];

      for (const [x, y] of tetromino) {
        if (y === height - 1 && !isOnEdge) {
          gridRef.current?.dispatchEvent(GRID_BOTTOM);
        }

        if ((x === 0 || x === width - 1) && !isOnEdge) {
          gridRef.current?.dispatchEvent(GRID_SIDE);
        }

        if (x >= 0 && y >= 0 && x < width && y < height) {
          newGrid[y][x] = <Cell key={`${y}-${x}`} isUsed={true} />;
        }
      }
      updateGrid(() => newGrid);
    }

    return resetGrid;
  }, [tetromino]);

  function resetGrid() {
    updateGrid(createEmptyGrid(width, height));
  }

  return (
    <div className="grid grid-cols-12 border-4 border-slate-900" ref={gridRef}>
      {grid.map((col) => col.map((cell) => cell))}
    </div>
  );
};

export default Grid;
