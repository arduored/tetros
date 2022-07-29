import type { NextPage } from "next";
import Grid from "../components/Grid";

const Home: NextPage = () => {
  return (
    <div className="flex justify-center bg-slate-700 w-full h-screen">
      <Grid />
    </div>
  );
};

export default Home;
