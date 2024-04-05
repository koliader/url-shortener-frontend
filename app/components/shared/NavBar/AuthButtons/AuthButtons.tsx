import { FC } from "react";
import style from "./style.module.scss";
import Link from "next/link";

const AuthButtons: FC = () => {
  return (
    <div className={style.auth}>
      <Link href={"/auth/login"} className="">
        <button className={style.login}>Login</button>
      </Link>
      <Link href={"/auth/register"} className="">
        <button className={style.register}>Register</button>
      </Link>
    </div>
  );
};

export default AuthButtons;
