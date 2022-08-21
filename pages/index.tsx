import type { NextPage } from "next";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import Grid from "../components/Grid";
import Button from "../components/shared/Button";
import { LeftL, Tetromino } from "../models/Tetromino";

const GRID_W = 12;
const GRID_H = 20;

const Home: NextPage = () => {
  const pageRef = useRef<HTMLDivElement | null>(null);

  const [interval, setIntervalDuration] = useState(1000);
  const [isPlaying, setIsPlaying] = useState(false);

  const [item, setItem] = useState<Tetromino | undefined>();
  const [_, startTransition] = useTransition();

  pageRef.current?.addEventListener("GRID_BOTTOM", (e) => {
    e.preventDefault();
    // call a new Tetromino
    pause();
  });

  pageRef.current?.addEventListener("GRID_LEFT", (e) => {
    e.preventDefault();
    e.stopPropagation();
    debounce(item?.setCanSlide({ left: false }));
  });

  pageRef.current?.addEventListener("GRID_RIGHT", (e) => {
    e.preventDefault();
    debounce(item?.setCanSlide({ right: false }));
  });

  pageRef.current?.addEventListener("keyup", (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isPlaying && item) {
      switch (e.key) {
        case "a":
        case "ArrowLeft":
          if (item.canSlideLeft()) {
            console.count("LEFT");

            debounce(item.slide(-1, GRID_W));
          }
          break;
        case "d":
        case "ArrowRight":
          if (item.canSlideRight()) {
            console.count("RIGHT");

            debounce(item.slide(1, GRID_W));
          }
          break;
        case " ":
          item.rotate();
          break;
      }
    }
  });

  useEffect(() => {
    const ticker = setInterval(() => {
      if (isPlaying && item) {
        startTransition(() => item.fall(GRID_H));
      }
    }, interval);

    return () => {
      clearInterval(ticker);
    };
  }, [interval, isPlaying, item]);

  const start = useCallback(() => {
    if (!item) {
      setItem(LeftL);
    }
    setIsPlaying(true);
  }, [item]);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const resume = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const reset = useCallback(() => {
    pause();
    setItem(undefined);
  }, []);

  return (
    <div className="flex flex-col justify-center w-full py-5" ref={pageRef}>
      <div className=" flex justify-center mb-5 h-fit">
        <Button onClick={start} text="play" />
        <Button onClick={pause} text="stop" />
        <Button onClick={resume} text="resume" />
        <Button onClick={reset} text="reset" />
      </div>
      <div className="flex justify-center">
        <Grid
          width={GRID_W}
          height={GRID_H}
          itemCoordinates={item?.coordinates}
        />
      </div>
    </div>
  );
};

export default Home;

export function debounce(func: any, timeout = 1000) {
  let timer: NodeJS.Timeout;
  console.count("INSIDE DEBOUNCE");
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(func.apply(args), timeout);
  };
}
