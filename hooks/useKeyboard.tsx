import { MutableRefObject, useState } from "react";

export function useKeyboard(elmt: MutableRefObject<HTMLElement | null>) {
  const [direction, setDirection] = useState([0, 0]);

  elmt.current?.addEventListener("keydown", (ev) => {
    switch (ev.key) {
      case "q":
      case "ArrowLeft":
        setDirection([-1, 0]);
        resetDirection();
        break;
      case "d":
      case "ArrowRight":
        setDirection([1, 0]);
        resetDirection();
        break;
      default:
        setDirection([0, 0]);
        break;
    }
  });

  const resetDirection = () => setTimeout(() => setDirection([0, 0]), 1000);

  return direction;
}
