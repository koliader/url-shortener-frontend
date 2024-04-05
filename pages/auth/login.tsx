import Login from "@/app/components/screens/Auth/Login/Login";
import { TokenManager } from "@/app/helpers/classes/TokenManager";
import { NextPage } from "next";
import { NextRouter } from "next/router";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const login: NextPage = () => {
  const [isAuth, setIsAuth] = useState<boolean>();
  const router: NextRouter = useRouter();
  const tokenDto = new TokenManager().getTokenData();
  useEffect(() => {
    setIsAuth(!!tokenDto.token);
    if (tokenDto.token) {
      router.push("/");
    }
  }, []);
  return <>{!isAuth && <Login />}</>;
};
export default login;
