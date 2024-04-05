import { FC, useEffect, useState } from "react";
import style from "./style.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { IAuthFormProps, ILoginFormValues } from "./types";
import { Tooltip } from "antd";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Informer } from "@/app/helpers/classes/Informer";
import axios from "@/app/helpers/axios";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import { NextRouter } from "next/router";
import { setCookie } from "nookies";
import Link from "next/link";
import { SiGithub } from "react-icons/si";

const AuthForm: FC<IAuthFormProps> = ({ typeOfForm }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ILoginFormValues>({
    mode: "onBlur",
  });
  const [isShowing, setIsShowing] = useState<boolean>();
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const informer = new Informer();
  const router: NextRouter = useRouter();

  const submit: SubmitHandler<ILoginFormValues> = async (
    values: ILoginFormValues
  ) => {
    try {
      const { data } = await axios.post(`/auth/${typeOfForm}`, {
        email: values.email,
        password: values.password,
        username: typeOfForm === "login" ? "" : values.username,
      });
      setIsDisabled(true);
      setCookie(null, "token", data.token, {
        path: "/",
      });
      router.reload();
    } catch (error: any) {
      informer.informsError(error);
    } finally {
      setIsDisabled(false);
    }
  };
  const githubSubmit = () => {
    router.push(
      `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLINT_ID}`
    );
  };
  return (
    <div className={style.main}>
      <form className={style.form} onSubmit={handleSubmit(submit)}>
        <div className="flex justify-between  items-end">
          <label>
            {typeOfForm.slice(0, 1).toUpperCase() +
              typeOfForm.slice(1, typeOfForm.length)}
          </label>
          <span className="text-sm text-zinc-300 hover:text-primary transition-colors duration-300 text-opacity-90">
            <Link
              href={`/auth/${typeOfForm === "login" ? "register" : "login"}`}
            >
              {typeOfForm === "login" ? "Register" : "Login"}
            </Link>
          </span>
        </div>
        <div>
          <input
            type="text"
            className={style.input}
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                message: "Please enter valid email!",
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              },
            })}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>
        {typeOfForm === "register" && (
          <div>
            <div className="flex">
              <input
                type="text"
                className={style.input}
                placeholder="Username"
                {...register("username", {
                  required: "Username is required",
                })}
              />
            </div>
            {errors.username && (
              <span className="text-red-500">{errors.username.message}</span>
            )}
          </div>
        )}
        <div>
          <div className="flex">
            <input
              type={isShowing ? "text" : "password"}
              className={style.input}
              placeholder="Password"
              style={{
                borderTopRightRadius: "0px",
                borderBottomRightRadius: "0px",
                width: "90%",
              }}
              {...register("password", {
                required: "Password is required",
              })}
            />
            <Tooltip title={isShowing ? "Hide password" : "Show password"}>
              <div
                style={{ borderWidth: "1px", borderLeftWidth: "0px" }}
                className={style.eye}
                onClick={() => setIsShowing(!isShowing)}
              >
                {isShowing ? (
                  <IoEyeOffOutline size={"1.5rem"} />
                ) : (
                  <IoEyeOutline size={"1.5rem"} />
                )}
              </div>
            </Tooltip>
          </div>
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>

        <button className={style.button} disabled={isDisabled}>
          {isDisabled ? (
            <div className="flex items-center justify-center gap-2">
              {typeOfForm.slice(0, 1).toUpperCase() +
                typeOfForm.slice(1, typeOfForm.length)}
              ...
              <CircularProgress
                size={"1.5rem"}
                style={{ color: "#6f42c180" }}
              />
            </div>
          ) : (
            <>
              {typeOfForm.slice(0, 1).toUpperCase() +
                typeOfForm.slice(1, typeOfForm.length)}
            </>
          )}
        </button>
      </form>
      <hr className="my-2" />
      <button className={style.githubButton} onClick={githubSubmit}>
        <SiGithub size={20} />
        Login with GitHub
      </button>
    </div>
  );
};

export default AuthForm;
