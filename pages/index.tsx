import type { NextPage } from "next";
import {
  useCallback,
  useDeferredValue,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import Grid from "../components/Grid";
import Button from "../components/shared/Button";
import { Tetromino } from "../types";

const GRID_W = 12;
const GRID_H = 20;

const square: Tetromino = [
  [5, -2],
  [6, -2],
  [5, -1],
  [6, -1],
];

const leftL: Tetromino = [
  [6, -3],
  [6, -2],
  [6, -1],
  [5, -1],
];

const Home: NextPage = () => {
  const pageRef = useRef<HTMLDivElement | null>(null);

  const [interval, setIntervalDuration] = useState(1000);
  const [isPlaying, setIsPlaying] = useState(false);

  const [item, setItem] = useState<Tetromino | undefined>();

  const [isPending, startTransition] = useTransition();
  const [canSlide, setCanSlide] = useState({ left: true, right: true });

  pageRef.current?.addEventListener("GRID_BOTTOM", (e) => {
    e.preventDefault();
    setItem(undefined);
  });

  pageRef.current?.addEventListener("GRID_LEFT", (e) => {
    e.preventDefault();
    setCanSlide((prev) => ({ ...prev, left: false }));
  });

  pageRef.current?.addEventListener("GRID_RIGHT", (e) => {
    e.preventDefault();
    setCanSlide((prev) => ({ ...prev, right: false }));
  });

  pageRef.current?.addEventListener("keyup", (e) => {
    e.preventDefault();
    switch (e.key) {
      case "a":
      case "ArrowLeft":
        if (canSlide.left) {
          slide(-1);
        }
        break;
      case "d":
      case "ArrowRight":
        if (canSlide.right) {
          slide(1);
        }
        break;
      case " ":
        rotate();
        break;
    }
  });

  useEffect(() => {
    const ticker = setInterval(() => {
      if (isPlaying && item) {
        fall();
      }
    }, interval);

    return () => {
      clearInterval(ticker);
    };
  }, [interval, isPlaying, item]);

  const slide = useCallback(
    (dir: number) => {
      let isOnGridSide = { ...canSlide };
      const newItem = item?.map(([x, y]) => {
        if (x + dir >= 0 && x + dir < GRID_W) {
          isOnGridSide = {
            left: x + dir === 0,
            right: x + dir === GRID_W - 1,
          };
          return [x + dir, y];
        }
        return [x, y];
      });

      if ((!isOnGridSide.left || !isOnGridSide.right) && !canSlide) {
        setCanSlide((prev) => ({ ...prev, ...isOnGridSide }));
      }

      startTransition(() => setItem(newItem));
    },
    [item]
  );

  const rotate = useCallback(() => {
    if (item) {
      const sortedByX = [...item].sort((a, b) => b[0] - a[0]);
      const sortedByY = [...item].sort((a, b) => b[1] - a[1]);
      const offsetX = sortedByX[0][0];
      const offsetY = sortedByY[0][1];

      const rotatedItem = item?.map(([x, y]) => {
        const newX = y - offsetY;
        const newY = (x - offsetX) * -1;
        return [newX + offsetX, newY + offsetY];
      });

      startTransition(() => setItem(rotatedItem));
    }
  }, [item]);

  const fall = useCallback(() => {
    const newItem = item?.map(([x, y]) => {
      let newY = y;
      const tmpY = y + 1;

      if (tmpY < GRID_H) {
        newY = tmpY;
      }

      return [x, newY];
    });
    startTransition(() => setItem(newItem));
  }, [item]);

  const start = useCallback(() => {
    if (!item) {
      setItem(leftL);
    }
    setIsPlaying(true);
  }, [item]);

  const stop = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const resume = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const reset = useCallback(() => {
    stop();
    setItem(undefined);
  }, []);

  return (
    <div className="flex flex-col justify-center w-full py-5" ref={pageRef}>
      <div className=" flex justify-center mb-5 h-fit">
        <Button onClick={start} text="play" />
        <Button onClick={stop} text="stop" />
        <Button onClick={resume} text="resume" />
        <Button onClick={reset} text="reset" />
      </div>
      <div className="flex justify-center">
        <Grid width={GRID_W} height={GRID_H} tetromino={item} />
      </div>
    </div>
  );
};

export default Home;
