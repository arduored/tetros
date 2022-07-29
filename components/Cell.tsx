import classNames from "classnames";
import { useEffect, useState } from "react";

interface CellProps {
  status: boolean;
  coord: string;
}

function Cell({ status, coord }: CellProps) {
  const [used, setUsed] = useState(status);

  useEffect(() => {
    setUsed(status);
  }, [status]);

  return <div className={cellClasses(used, "bg-yellow-700")}>{coord}</div>;
}

export default Cell;

function cellClasses(used: boolean, color: string) {
  return classNames("w-[50px] h-[50px] border border-slate-700 text-center", {
    [color]: used,
  });
}
