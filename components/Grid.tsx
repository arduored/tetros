import { useEffect, useMemo, useState } from "react";
import Cell, { CellProps } from "./Cell";

interface IGrid {
  width: number,
  height: number
  currentItem: number[][]
}

function initGrid(w: number, h: number): JSX.Element[][] {
  const layout: unknown[][]= Array(h).fill(Array(w).fill(undefined))
  return layout.map((col, i) => col.map((_, j) => <Cell key={`${i}-${j}`} isUsed={false}/>))
}

function Grid({width, height, currentItem}: IGrid) {
  const emptyGrid = useMemo(() => initGrid(width, height), [width, height])
  const [grid, updateGrid] = useState(emptyGrid)

  useEffect(() => {
    const newGrid = [...emptyGrid]
    
    for(const [x, y] of currentItem) {
      newGrid[y][x] = <Cell key={`${y}-${x}`} isUsed={true}/>
    }
  
    updateGrid(newGrid)
  }, [currentItem])

  return (
    <div className="grid grid-cols-12 border border-orange-700">
      {grid.map((col) => col.map((cell) => cell))}
    </div>
  );
}

export default Grid;
