import { useEffect } from "react";
import { useGrid } from "../hooks/useGrid";
import Cell from "./Cell";

const GRID_W = 12;
const GRID_H = 20;

function Grid() {
  const [gridMap, setGridMap, clearGrid] = useGrid(GRID_W, GRID_H);

  const square = () => {
    setGridMap([
      [2, 2],
      [2, 3],
      [3, 2],
      [3, 3],
    ]);
  };

  return (
    <>
      <button
        className="border-2 border-slate-900 w-fit h-fit m-3"
        onClick={square}
      >
        fill
      </button>
      <button
        className="border-2 border-slate-900 w-fit h-fit m-3"
        onClick={() => clearGrid()}
      >
        clear
      </button>

      <div
        className={`grid grid-cols-12 bg-slate-400 border-2 border-red-500 h-fit`}
      >
        {gridMap.map((row, i) =>
          row.map((cell, j) => {
            return <Cell key={`${i}-${j}`} status={cell} coord={`${i}-${j}`} />;
          })
        )}
      </div>
    </>
  );
}

export default Grid;
