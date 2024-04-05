import { FC } from "react";
import NavBar from "../../shared/NavBar/NavBar";
import style from "./style.module.scss";
import { useQuery } from "react-query";
import axios from "@/app/helpers/axios";
import { ITokenDto } from "@/app/assets/types/token";
import { TokenManager } from "@/app/helpers/classes/TokenManager";
import { IUrl } from "@/app/assets/types/url";
import UrlCard from "../../shared/Cards/UrlCard/UrlCard";

const Urls: FC = () => {
  const tokenDto: ITokenDto = new TokenManager().getTokenData();
  const { data, isLoading } = useQuery(
    "getUserURLs",
    async () =>
      await axios.get<IUrl[]>("/urls/myUrls", {
        headers: { Authorization: `Bearer ${tokenDto.token}` },
      })
  );

  return (
    <>
      <NavBar />
      <div className={style.main}>
        <h2 className="text-2xl font-semibold mb-4">My URLs</h2>
        <div className={style.urls}>
          {isLoading ? (
            "Loading..."
          ) : data?.data?.length ? (
            <div className="border rounded-sm">
              <table className={style.roundedTable}>
                <thead>
                  <tr>
                    <th className="border-b-1 px-4 py-2 text-left">URL</th>
                    <th className="border-b-1 px-4 py-2 text-left">
                      Shorted URL
                    </th>
                    <th className="border-b-1 px-4 py-2 text-left">User</th>
                    <th className="border-b-1 px-4 py-2 text-left">Clicks</th>
                  </tr>
                </thead>
                <tbody>
                  {data.data.map((url: IUrl) => (
                    <UrlCard key={url.code} url={url} />
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <span>You have no active urls</span>
          )}
        </div>
      </div>
    </>
  );
};

export default Urls;
