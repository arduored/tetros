import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
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
  const [playingTime, setPlayingTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [item, setItem] = useState<Tetromino | undefined>();

  pageRef.current?.addEventListener("GRID_BOTTOM", (e) => {
    e.preventDefault();
    setItem(undefined);
  });

  pageRef.current?.addEventListener("GRID_SIDE", (e) => {
    e.preventDefault();
    console.log("GRID_SIDE");
  });

  pageRef.current?.addEventListener("keyup", (e) => {
    e.preventDefault();
    setTimeout(() => {
      switch (e.key) {
        case "q":
        case "ArrowLeft":
          slide(-1);
          break;
        case "d":
        case "ArrowRight":
          slide(1);
          break;
        case " ":
          rotate();
          break;
      }
    }, 100);
  });

  useEffect(() => {
    let ticker: NodeJS.Timer | null = null;
    if (item && isPlaying) {
      ticker = setInterval(() => {
        setPlayingTime((prev) => prev++);
        fall();
      }, 1000);
    }

    return () => {
      if (ticker) {
        clearInterval(ticker);
      }
    };
  }, [item, isPlaying, playingTime]);

  const startGame = () => {
    console.log("Started");
    if (!item) {
      setItem(leftL);
    }
    setIsPlaying(true);
  };

  const slide = (dir: number) => {
    const newItem = item?.map(([x, y]) => {
      if (x + dir >= 0 && x + dir < GRID_W) {
        return [x + dir, y];
      }
      return [x, y];
    });
    setItem(newItem);
  };

  const rotate = () => {
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
      setItem(rotatedItem);
    }
  };

  const fall = () => {
    const newItem = item?.map(([x, y]) => {
      let newY = y;
      const tmpY = y + 1;

      // Check if the next cell is already taken
      if (tmpY < GRID_H) {
        newY = tmpY;
      }

      return [x, newY];
    });
    setItem(newItem);
  };

  const stopGame = () => {
    console.log("Stopped");
    setItem(undefined);
    setIsPlaying(false);
    setPlayingTime(0);
  };

  return (
    <div className="flex flex-col justify-center w-full py-5" ref={pageRef}>
      <div className=" flex justify-center mb-5 h-fit">
        <Button onClick={startGame} text="play" />
        <Button onClick={stopGame} text="stop" />
        <div className="flex items-center border border-slate-500-500 my-2 rounded-sm text-slate-500">
          <p className="px-2">Time played: {playingTime}sec</p>
        </div>
      </div>
      <div className="flex justify-center">
        <Grid width={GRID_W} height={GRID_H} tetromino={item} />
      </div>
    </div>
  );
};

export default Home;
