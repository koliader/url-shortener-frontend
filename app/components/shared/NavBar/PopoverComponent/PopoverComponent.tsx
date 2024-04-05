import { Popconfirm, Popover } from "antd";
import Link from "next/link";
import { FC } from "react";
import { IUser } from "@/app/assets/types/user";
import { Informer } from "@/app/helpers/classes/Informer";
import { TokenManager } from "@/app/helpers/classes/TokenManager";
import { BiSolidDownArrow } from "react-icons/bi";
import { useQuery } from "react-query";
import axios from "@/app/helpers/axios";
import { ITokenDto } from "@/app/assets/types/token";
import UserAvatar from "./Avatar";
import { AxiosError } from "axios";
import { IErrorField } from "@/app/assets/types/error";
import { IoMdArrowDropdown } from "react-icons/io";

const PopoverComponent: FC = () => {
  const tokenManager = new TokenManager();
  const tokenDto: ITokenDto = tokenManager.getTokenData();
  const informer = new Informer();
  const { data } = useQuery(
    "get user for navbar",
    async () =>
      await axios.get<IUser>(`/users/${tokenDto.decodedToken?.email}`, {
        headers: { Authorization: `Bearer ${tokenDto.token}` },
      }),
    {
      onError(err: AxiosError<IErrorField>) {
        informer.informsError(err);
      },
    }
  );
  return (
    <>
      <div className="flex items-center gap-2 cursor-pointer">
        {data?.data && <UserAvatar user={data?.data} />}

        <div className="flex items-center hover:text-primary text-opacity-95 transition-colors duration-300">
          <p className="font-bold text-lg">{data?.data.username}</p>
          <IoMdArrowDropdown size={20} />
        </div>
      </div>
    </>
  );
};

export default PopoverComponent;
