import { FC, useEffect, useState, useRef } from "react";
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
import style from "./style.module.scss";
import Link from "next/link";
import { destroyCookie } from "nookies";
import { NextRouter, useRouter } from "next/router";

const PopoverComponent: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router: NextRouter = useRouter();
  const tokenManager = new TokenManager();
  const tokenDto: ITokenDto = tokenManager.getTokenData();
  const informer = new Informer();
  const { data, isLoading } = useQuery(
    "get user for navbar",
    async () =>
      await axios.get<IUser>(`/users/${tokenDto.decodedToken?.username}`, {
        headers: { Authorization: `Bearer ${tokenDto.token}` },
      }),
    {
      onError(err: AxiosError<IErrorField>) {
        informer.informsError(err);
      },
    }
  );

  const popoverRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        toggleRef.current &&
        !toggleRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const logOut = () => {
    destroyCookie(null, "token", { path: "/" });

    if ((router.asPath = "/")) {
      router.reload();
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex justify-center">
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <div
            ref={toggleRef}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            {data?.data && <UserAvatar user={data?.data} />}

            <div className="flex items-center hover:text-primary text-opacity-95 transition-colors duration-300">
              <p className={style.popoverOpen}>{data?.data.username}</p>
              <IoMdArrowDropdown size={20} />
            </div>
          </div>
          <div
            ref={popoverRef}
            className={`${style.popover} ${!isOpen && style.popoverHidden}`}
          >
            <Link href={"/urls"} className={style.link}>
              My URLs
            </Link>
            <button className={style.logOutButton} onClick={logOut}>
              Log out
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PopoverComponent;
