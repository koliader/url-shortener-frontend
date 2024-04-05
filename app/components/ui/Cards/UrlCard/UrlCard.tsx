import { FC } from "react";
import { IUrl } from "@/app/assets/types/url";
import Link from "next/link";

const UrlCard: FC<{ url: IUrl }> = ({ url }) => {
  const redirectUrl = window.location.href.slice(
    0,
    window.location.href.length - 5
  );
  return (
    <tr>
      <td className=" px-4 py-2 text-wrap" title={url.url}>
        <Link
          href={url.url}
          className="text-primary hover:underline"
          target="_blank"
        >
          {url.url}
        </Link>
      </td>
      <td className=" px-4 py-2">
        <Link
          href={`${redirectUrl}/code/${url.code}`}
          className="text-primary hover:underline"
          target="_blank"
        >
          {`${redirectUrl}/code/${url.code}`}{" "}
        </Link>
      </td>
      <td className=" px-4 py-2">{url.user ? url.user.username : "No user"}</td>
      <td className="px-4 py-2">{url.clicks}</td>
    </tr>
  );
};

export default UrlCard;
