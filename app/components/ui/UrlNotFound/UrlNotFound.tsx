import { FC } from "react";
import style from "./style.module.scss";
import { FaLinkSlash } from "react-icons/fa6";
import Link from "next/link";

const UrlNotFound: FC = () => {
  return (
    <div className={style.main}>
      <div className="flex gap-3">
        <FaLinkSlash size={40} />
        <h1 className="text-4xl font-bold">Url not found</h1>
      </div>
      <Link
        href={"/"}
        className="text-2xl hover:text-primary  transition-colors duration-300 hover:underline"
      >
        Home page
      </Link>
    </div>
  );
};

export default UrlNotFound;
