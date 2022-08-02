import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Grid from "../components/Grid";
import Button from "../components/shared/Button";

const GRID_W = 12;
const GRID_H = 20;

const Home: NextPage = () => {
  const [score, setScore] = useState(0)
  const [item, setItem] = useState([[2,2], [2,3], [3,2], [3, 3]])

  const updateItem = () => {
    const newItem = item.map(([x, y]) => [x, y+1])
    setItem(newItem)
  }

  return (
    <div className="flex justify-center bg-slate-700 w-full">
      <p>score: {score}</p>
      <Button onClick={updateItem} text="update"/>
      <Grid width={GRID_W} height={GRID_H} currentItem={item}/>
    </div>
  );
};

export default Home;
