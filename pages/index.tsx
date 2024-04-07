import Home from "@/app/components/screens/Home/Home";
import axios from "@/app/helpers/axios";
import { TokenManager } from "@/app/helpers/classes/TokenManager";
import { GetServerSideProps, NextPage } from "next";
import { NextRouter, useRouter } from "next/router";
import { setCookie } from "nookies";
import { useEffect, useState } from "react";

const index: NextPage<IToken> = ({ token }) => {
  const [isClient, setIsClient] = useState<boolean>(false);
  const router: NextRouter = useRouter();
  useEffect(() => {
    if (token) {
      setCookie(null, "token", token, {
        path: "/",
      });
      router.push("/");
    }
    setIsClient(true);
  }, []);
  return <> {isClient && <Home />} </>;
};
export default index;
export interface IToken {
  token: string | null;
}

export const getServerSideProps: GetServerSideProps<IToken> = async (ctx) => {
  try {
    const fullURL = ctx.req.headers.host! + ctx.req.url;
    const tokenDto = new TokenManager().getTokenData();
    if (ctx.query.code && !tokenDto.token) {
      const res = await axios.get(`/auth/github/${ctx.query.code}`);
      return {
        props: { token: res.data.token },
      };
    } else {
      return { props: { token: null } };
    }
  } catch (error: any) {
    return {
      props: { token: null },
      redirect: { destination: "/", permanent: false },
    };
  }
};
