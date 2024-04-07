import { FC } from "react";
import style from "./style.module.scss";
import { SiGithub } from "react-icons/si";
import Link from "next/link";

const Footer: FC = () => {
  return (
    <footer className={style.footer}>
      <hr className="w-2/3 pt-3" />
      <Link href="https://github.com/koliadervyanko" target="_blank">
        <SiGithub className={style.icon} />
      </Link>
      <span className={style.footerText}>
        © 2024 koliadervyanko. All right reserved
      </span>
    </footer>
  );
};

export default Footer;
