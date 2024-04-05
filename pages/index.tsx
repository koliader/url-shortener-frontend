import Home from "@/app/components/screens/Home/Home";
import { NextPage } from "next";
import { useEffect, useState } from "react";

const index: NextPage = () => {
  const [isClient, setIsClient] = useState<boolean>(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return <>{isClient && <Home />}</>;
};
export default index;
