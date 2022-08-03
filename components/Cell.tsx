import classNames from "classnames";

export interface CellProps {
  isUsed?: boolean;
  usedColor?: string;
}

function Cell({ isUsed = false, usedColor = "bg-yellow-700" }: CellProps) {
  return <div className={cellClasses(isUsed, usedColor)}></div>;
}

export default Cell;

function cellClasses(used: boolean, color: string) {
  return classNames("w-[1.5vw] h-[1.5vw] border border-slate-700 text-center", {
    [color]: used,
    "bg-slate-500": !used,
  });
}
