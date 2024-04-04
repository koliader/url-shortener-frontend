import { FC } from "react";
import style from "./style.module.scss";
import NavBar from "../../shared/NavBar/NavBar";
import HomeForm from "./HomeForm/HomeForm";

const Home: FC = () => {
  return (
    <>
      <NavBar />
      <div className={style.main}>
        <h1 className={style.title}>It&apos;s the most moder url shortener!</h1>
        <p className="text-lg">Type any url to short it!</p>
        <HomeForm />
      </div>
    </>
  );
};

export default Home;
