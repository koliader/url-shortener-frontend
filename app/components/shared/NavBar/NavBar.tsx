import { FC, useEffect } from "react";
import style from "./style.module.scss";
import { FaLink } from "react-icons/fa";
import AuthButtons from "./AuthButtons/AuthButtons";
import { TokenManager } from "@/app/helpers/classes/TokenManager";
import { notification } from "antd";
import { useRouter } from "next/router";
import { NextRouter } from "next/router";
import { Informer } from "@/app/helpers/classes/Informer";

const NavBar: FC = () => {
  const router: NextRouter = useRouter();
  const tokenManager: TokenManager = new TokenManager();
  const tokenDto = tokenManager.getTokenData();
  const informer = new Informer();
  useEffect(() => {
    if (tokenDto.token) {
      const tokenIsExpired: boolean = tokenManager.checkTokenIsExpired();
      if (tokenIsExpired) {
        informer.informTokenIsExpired();
        router.push("/auth/login");
      }
    }
  }, []);
  const logoClick = () => {
    if (router.asPath === "/") {
      router.reload();
    } else {
      router.push("/");
    }
  };
  return (
    <nav className={style.main}>
      <div className={style.logo} onClick={logoClick}>
        <FaLink size={"1.8rem"} />
        <span className={style.logoText}>Url shortener</span>
      </div>
      <AuthButtons />
    </nav>
  );
};

export default NavBar;
