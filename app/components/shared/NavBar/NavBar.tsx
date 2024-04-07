import { FC, useEffect } from "react";
import style from "./style.module.scss";
import { FaLink } from "react-icons/fa";
import AuthButtons from "./AuthButtons/AuthButtons";
import { TokenManager } from "@/app/helpers/classes/TokenManager";
import { useRouter } from "next/router";
import { NextRouter } from "next/router";
import { Informer } from "@/app/helpers/classes/Informer";
import PopoverComponent from "./PopoverComponent/PopoverComponent";

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
  return (
    <nav className={style.main}>
      <div className={style.logo} onClick={() => router.push("/")}>
        <FaLink className={style.icon} />
        <span className={style.logoText}>Url shortener</span>
      </div>
      {tokenDto.token ? <PopoverComponent /> : <AuthButtons />}
    </nav>
  );
};

export default NavBar;
