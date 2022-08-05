import { MutableRefObject, useState } from "react";

export function useKeyboard(elmt: MutableRefObject<HTMLElement | null>): [number[], () => void] {
  const [direction, setDirection] = useState([0, 0]);

  elmt.current?.addEventListener("keyup", (ev) => {
    ev.preventDefault();
    if (direction[0] === 0 && direction[1] === 0) {
      switch (ev.key) {
        case "q":
        case "ArrowLeft":
          setDirection([-1, 0]);
          break;
        case "d":
        case "ArrowRight":
          setDirection([1, 0]);
          break;
        default:
          setDirection([0, 0]);
          break;
      }
    }
  });

  const resetDirection = () => setDirection([0, 0]);

  return [direction, resetDirection];
}
