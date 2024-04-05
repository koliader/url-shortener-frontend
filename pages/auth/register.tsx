import Register from "@/app/components/screens/Auth/Register/Register";
import { TokenManager } from "@/app/helpers/classes/TokenManager";
import { NextPage } from "next";
import { NextRouter, useRouter } from "next/router";
import { useEffect, useState } from "react";

const register: NextPage = () => {
  const [isAuth, setIsAuth] = useState<boolean>();
  const router: NextRouter = useRouter();
  const tokenDto = new TokenManager().getTokenData();
  useEffect(() => {
    setIsAuth(!!tokenDto.token);
    if (tokenDto.token) {
      router.push("/");
    }
  }, []);
  return <>{!isAuth && <Register />}</>;
};
export default register;
