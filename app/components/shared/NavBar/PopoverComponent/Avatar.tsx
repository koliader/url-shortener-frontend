import { IUserField } from "@/app/assets/types/user";
import { Avatar } from "antd";
import style from "./style.module.scss";
import { FC } from "react";

const UserAvatar: FC<IUserField> = ({ user }) => {
  const getContrastColor = (hexColor: string) => {
    if (hexColor.indexOf("#") === 0) {
      hexColor = hexColor.slice(1);
    }

    var r = parseInt(hexColor.substring(0, 2), 16);
    var g = parseInt(hexColor.substring(2, 4), 16);
    var b = parseInt(hexColor.substring(4, 6), 16);

    var yiq = (r * 299 + g * 587 + b * 114) / 1000;

    return yiq >= 150 ? "black" : "white";
  };
  return (
    <>
      <Avatar
        style={{
          backgroundColor: user.color,
          color: user.color ? getContrastColor(user.color) : "white",
        }}
        className={style.avatar}
      >
        {user.username.slice(0, 1)}
      </Avatar>
    </>
  );
};

export default UserAvatar;
