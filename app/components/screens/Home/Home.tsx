import { FC } from "react";
import style from "./style.module.scss";
import NavBar from "../../shared/NavBar/NavBar";
import HomeForm from "./HomeForm/HomeForm";
import Layout from "../../shared/Layouts/Layout/Layout";

const Home: FC = () => {
  return (
    <>
      <Layout>
        <div className={style.main}>
          <h1 className={style.title}>
            It&apos;s the most modern url shortener!
          </h1>
          <p className={style.sub}>Type url to short it!</p>
          <HomeForm />
        </div>
      </Layout>
    </>
  );
};

export default Home;
