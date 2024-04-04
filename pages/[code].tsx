import { IUrlRes } from "@/app/components/screens/Home/HomeForm/types";
import axios from "@/app/helpers/axios";
import { NextPage } from "next";
import { NextRouter } from "next/router";
import { useRouter } from "next/router";
import { useEffect } from "react";

const UrlPage: NextPage = () => {
  const router: NextRouter = useRouter();
  useEffect(() => {
    if (router.isReady) {
      const req = async () => {
        const url = await axios.get<IUrlRes>(`/urls/${router.query.code}`);
        router.push(url.data.url);
      };
      req();
    }
  }, [router.isReady]);
  return <></>;
};
export default UrlPage;
