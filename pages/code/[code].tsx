import axios from "@/app/helpers/axios";
import { GetServerSideProps, NextPage } from "next";
import { NextRouter } from "next/router";
import { useRouter } from "next/router";
import { useEffect } from "react";
import ErrorPage from "next/error";
import { IUrl } from "@/app/assets/types/url";
import UrlNotFound from "@/app/components/ui/UrlNotFound/UrlNotFound";

export interface IUrlPageServerSideProps {
  url: string | null;
  notFound: boolean;
}

const UrlPage: NextPage<IUrlPageServerSideProps> = ({ url, notFound }) => {
  const router: NextRouter = useRouter();
  useEffect(() => {
    if (!notFound) {
      router.push(url!);
    }
  }, [router.isReady]);
  return <>{notFound && <UrlNotFound />}</>;
};
export default UrlPage;
export const getServerSideProps: GetServerSideProps<
  IUrlPageServerSideProps
> = async (ctx) => {
  try {
    const url = await axios.get<IUrl>(`/urls/${ctx.params!.code}`);
    await axios.put(`/urls/${ctx.params!.code}`);
    return { props: { url: url.data.url, notFound: false } };
  } catch (error: any) {
    console.log(error.response.status);
    if (error.response.status === 404) {
      return { props: { url: null, notFound: true } };
    }
    return { props: { url: null, notFound: false } };
  }
};
