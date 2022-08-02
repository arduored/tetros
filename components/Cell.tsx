import classNames from "classnames";

export interface CellProps {
  isUsed?: boolean;
  usedColor?: string;
}

function Cell({ isUsed=false, usedColor = "bg-yellow-700" }: CellProps) {
  return <div className={cellClasses(isUsed, usedColor)}></div>;
}

export default Cell;

function cellClasses(used: boolean, color: string) {
  return classNames("w-[2.5em] h-[2.5em] border border-slate-700 text-center", {
    [color]: used,
    "bg-slate-500": !used
  });
}
