import { useGrid } from "../hooks/useGrid";
import Button from "./shared/Button";
import Cell from "./Cell";

const GRID_W = 12;
const GRID_H = 20;

function Grid() {
  const [gridMap, updateGridMap, clearGrid] = useGrid(GRID_W, GRID_H);

  const square = () => {
    updateGridMap([
      [6, 5],
      [6, 6],
      [7, 5],
      [7, 6],
    ]);
  };

  const leftL = () => {
    updateGridMap([
      [5, 2],
      [6, 2],
      [6, 3],
      [6, 4],
    ]);
  };

  return (
    <>
      <Button onClick={square} text="Draw square" />
      <Button onClick={leftL} text="Draw L" />
      <Button onClick={() => clearGrid()} text="clear" />

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
