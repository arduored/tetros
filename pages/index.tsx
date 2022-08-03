import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import Grid from "../components/Grid";
import Button from "../components/shared/Button";
import { useKeyboard } from "../hooks/useKeyboard";
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
  const pageRef = useRef(null);
  const [playingTime, setPlayingTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [item, setItem] = useState<Tetromino | undefined>();
  const direction = useKeyboard(pageRef);

  useEffect(() => {
    let ticker: NodeJS.Timer | null = null;
    if (isPlaying) {
      ticker = setInterval(() => {
        updateItem();
        setPlayingTime(playingTime + 1);
      }, 1000);
    }

    return () => {
      if (ticker) {
        clearInterval(ticker);
      }
    };
  }, [isPlaying, playingTime]);

  const startGame = () => {
    console.log("Started");
    if (!item) {
      setItem(leftL);
    }
    setIsPlaying(true);
  };

  const updateItem = () => {
    if (item && isPlaying) {
      const [pX, pY] = direction;
      const newItem = item.map(([x, y]) => {
        let newX = x;
        let newY = y;
        const tmpX = x + pX;
        const tmpY = y + 1 + pY;

        if (tmpX >= 0 && tmpX < GRID_W) {
          newX = tmpX;
        }

        if (tmpY < GRID_H) {
          newY = tmpY;
        }

        return [newX, newY];
      });
      setItem(newItem);
    }
  };

  const stopGame = () => {
    console.log("Stopped");
    setItem(undefined);
    setIsPlaying(false);
  };

  return (
    <div className="flex flex-col justify-center w-full py-5" ref={pageRef}>
      <div className=" flex justify-center mb-5">
        <Button onClick={startGame} text="play" />
        <Button onClick={stopGame} text="pause" />
      </div>
      <div className="flex justify-center">
        <Grid width={GRID_W} height={GRID_H} tetromino={item} />
      </div>
    </div>
  );
};

export default Home;
