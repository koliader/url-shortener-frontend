import { FC, useEffect } from "react";
import style from "./style.module.scss";
import NavBar from "../../shared/NavBar/NavBar";
import HomeForm from "./HomeForm/HomeForm";
import { NextRouter, useRouter } from "next/router";

const Home: FC = () => {
  const router: NextRouter = useRouter();
  useEffect(() => {
    if (router.isReady) {
      console.log(router.query.code);
    }
  }, [router.isReady]);
  return (
    <>
      <NavBar />
      <div className={style.main}>
        <h1 className={style.title}>
          It&apos;s the most modern url shortener!
        </h1>
        <p className="text-lg">Type url to short it!</p>
        <HomeForm />
      </div>
    </>
  );
};

export default Home;
