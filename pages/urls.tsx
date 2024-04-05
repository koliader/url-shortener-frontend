import Urls from "@/app/components/screens/Urls/Urls";
import { TokenManager } from "@/app/helpers/classes/TokenManager";
import { NextPage } from "next";
import { NextRouter, useRouter } from "next/router";
import { useEffect, useState } from "react";

const url: NextPage = () => {
  const [isClient, setIsClient] = useState<boolean>(false);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const router: NextRouter = useRouter();
  useEffect(() => {
    const tokenDto = new TokenManager().getTokenData();
    if (!!tokenDto.token) {
      setIsAuth(true);
    } else {
      router.push("/");
    }
    setIsClient(true);
  }, []);
  return <>{isClient && isAuth && <Urls />}</>;
};
export default url;
