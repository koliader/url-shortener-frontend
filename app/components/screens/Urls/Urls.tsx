import { FC } from "react";
import NavBar from "../../shared/NavBar/NavBar";
import style from "./style.module.scss";
import { useQuery } from "react-query";
import axios from "@/app/helpers/axios";
import { ITokenDto } from "@/app/assets/types/token";
import { TokenManager } from "@/app/helpers/classes/TokenManager";
import { IUrl } from "@/app/assets/types/url";
import UrlCard from "../../ui/Cards/UrlCard/UrlCard";

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
        <h2 className={style.heading}>My URLs</h2>
        <div className={style.urls}>
          {isLoading ? (
            "Loading..."
          ) : data?.data?.length ? (
            <table className={style.roundedTable}>
              <thead>
                <tr>
                  <th className={style.tableHead}>URL</th>
                  <th className={style.tableHead}>Shorted URL</th>
                  <th className={style.tableHead}>Clicks</th>
                </tr>
              </thead>
              <tbody>
                {data.data.map((url: IUrl) => (
                  <UrlCard key={url.code} url={url} />
                ))}
              </tbody>
            </table>
          ) : (
            <span>You have no active urls</span>
          )}
        </div>
      </div>
    </>
  );
};

export default Urls;
