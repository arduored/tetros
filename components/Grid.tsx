import { FC, useEffect, useRef, useState } from "react";
import { GRID_BOTTOM, GRID_LEFT, GRID_RIGHT } from "../events/gridEvents";
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

  let eventToDispatch: Event | undefined = undefined;

  useEffect(() => {
    if (tetromino) {
      const newGrid = [...createEmptyGrid(width, height)];

      for (const [x, y] of tetromino) {
        if (willTouchBottom(y)) {
          eventToDispatch = GRID_BOTTOM;
        }

        if (willTouchLeft(x)) {
          eventToDispatch = GRID_LEFT;
        }

        if (willTouchRight(x)) {
          eventToDispatch = GRID_RIGHT;
        }

        if (isInGrid(x, y)) {
          // mandatory to avoid out of bounds access in newGrid
          newGrid[y][x] = prepareGrid(x, y);
        }
      }

      if (eventToDispatch) {
        gridRef.current?.dispatchEvent(eventToDispatch);
      }

      updateGrid(newGrid);
    }

    return resetGrid;
  }, [tetromino]);

  function willTouchBottom(y: number) {
    return y === height - 1;
  }

  function willTouchLeft(x: number) {
    return x - 1 === 0;
  }

  function willTouchRight(x: number) {
    return x + 1 === width - 1;
  }

  function isInGrid(x: number, y: number) {
    return x >= 0 && y >= 0 && x < width && y < height;
  }

  function prepareGrid(x: number, y: number) {
    const isUsed = isInGrid(x, y);
    return <Cell key={`${y}-${x}`} isUsed={isUsed} />;
  }

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
