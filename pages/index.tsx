import type { NextPage } from "next";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import Grid from "../components/Grid";
import Button from "../components/shared/Button";
import { LeftL, Tetromino } from "../models/Tetromino";

const GRID_W = 12;
const GRID_H = 10;

const Home: NextPage = () => {
  const pageRef = useRef<HTMLDivElement | null>(null);

  const [interval, setIntervalDuration] = useState(1000);
  const [isPlaying, setIsPlaying] = useState(false);

  const [item, setItem] = useState<Tetromino | undefined>();
  const [_, startTransition] = useTransition();

  const keyupListener = (e: KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isPlaying && item) {
      switch (e.key) {
        case "a":
        case "ArrowLeft":
          item.slide(-1, GRID_W);
          break;
        case "d":
        case "ArrowRight":
          item.slide(1, GRID_W);
          break;
        case " ":
          item.rotate();
          break;
        default: 
        console.error(`event not handled: ${e.key}`)
      }
    }
  };

  const gridBottomListener = (e: Event) => {
    e.preventDefault();
    // call a new Tetromino
    pause();
  };
  const gridLeftListener = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    item?.setCanSlide({ left: false });
  };
  const gridRightListener = (e: Event) => {
    e.preventDefault();
    item?.setCanSlide({ right: false });
  };

  useEffect(() => {
    pageRef.current?.addEventListener("GRID_BOTTOM", gridBottomListener);
    pageRef.current?.addEventListener("GRID_LEFT", gridLeftListener);
    pageRef.current?.addEventListener("GRID_RIGHT", gridRightListener);
    pageRef.current?.addEventListener("keyup", keyupListener);

    return () => {
      pageRef.current?.removeEventListener("GRID_BOTTOM", gridBottomListener);
      pageRef.current?.removeEventListener("GRID_LEFT", gridLeftListener);
      pageRef.current?.removeEventListener("GRID_RIGHT", gridRightListener);
      pageRef.current?.removeEventListener("keyup", keyupListener);
    };
  }, [item]);

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
    pageRef.current = null;
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
