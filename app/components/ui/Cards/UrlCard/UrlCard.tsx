import { FC } from "react";
import { IUrl } from "@/app/assets/types/url";
import Link from "next/link";
import style from "./style.module.scss";

const UrlCard: FC<{ url: IUrl }> = ({ url }) => {
  return (
    <tr>
      <td className={style.wrapped} title={url.url}>
        <Link
          href={url.url}
          className="text-primary hover:underline"
          target="_blank"
        >
          {url.url}
        </Link>
      </td>
      <td className={style.wrapped}>
        <Link
          href={`${window.location.href}code/${url.code}`}
          className="text-primary hover:underline"
          target="_blank"
        >
          {`${window.location.href}code/${url.code}`}{" "}
        </Link>
      </td>
      <td className={style.clicks}>{url.clicks}</td>
    </tr>
  );
};

export default UrlCard;
