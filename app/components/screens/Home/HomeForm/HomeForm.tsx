import { FC, useEffect, useState } from "react";
import { IHomeFormValues } from "./types";
import { SubmitHandler, useForm } from "react-hook-form";
import style from "./style.module.scss";
import { TokenManager } from "@/app/helpers/classes/TokenManager";
import axios from "@/app/helpers/axios";
import { CircularProgress } from "@mui/material";
import { Informer } from "@/app/helpers/classes/Informer";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { NextRouter } from "next/router";
import { FaRegCopy } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { IUrl } from "@/app/assets/types/url";
import { urlBase } from "@/app/helpers/variables";

const HomeForm: FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IHomeFormValues>({
    mode: "onBlur",
  });
  const [url, setUrl] = useState<string | null>(null);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const tokenDto = new TokenManager().getTokenData();
  const informer = new Informer();

  const guestMutation = useMutation(
    "createGuestUrl",
    async (values: IHomeFormValues) =>
      await axios.post<IUrl>("/urls/guest", { url: values.url }),
    {
      onSuccess: (data) => {
        setUrl(`${urlBase}${data.data.code}`);
      },
    }
  );
  const mutation = useMutation(
    "createUrl",
    async (values: IHomeFormValues) =>
      await axios.post<IUrl>(
        "/urls",
        { url: values.url },
        {
          headers: { Authorization: `Bearer ${tokenDto.token}` },
        }
      ),
    {
      onSuccess: (data) => {
        setUrl(`${urlBase}${data.data.code}`);
      },
    }
  );

  const submit: SubmitHandler<IHomeFormValues> = async (
    values: IHomeFormValues
  ) => {
    try {
      if (tokenDto.token) {
        await mutation.mutateAsync(values);
      } else {
        await guestMutation.mutateAsync(values);
      }
      setIsDisabled(true);
    } catch (error: any) {
      informer.informsError(error);
    } finally {
      setIsDisabled(false);
    }
  };
  const copyUrl = () => {
    navigator.clipboard.writeText(url!);
    informer.informSuccess("Url successfully copied");
  };
  const clear = () => {
    setUrl(null);
    reset();
    informer.informSuccess("Url cleared!");
  };
  return (
    <form className={style.form} onSubmit={handleSubmit(submit)}>
      <div className="flex flex-col">
        <input
          className={style.input}
          placeholder="Url"
          {...register("url", {
            required: "Url is required!",
            pattern: {
              message: "It should be an HTTP URL!",
              value: /^(http|https):\/\/[^ "]+$/,
            },
          })}
        />
        {errors.url && (
          <span className="text-red-500">{errors.url.message}</span>
        )}
      </div>
      <button className={style.submitButton} disabled={isDisabled}>
        {isDisabled ? (
          <div className="flex items-center justify-center gap-2">
            Shortening the URL
            <CircularProgress size={"1.5rem"} style={{ color: "#6f42c180" }} />
          </div>
        ) : (
          <> Shorten URL</>
        )}
      </button>
      {url && (
        <div className=" flex items-center justify-between">
          <span>{url}</span>
          <div className="flex gap-1">
            <FaRegCopy
              size={"1.5rem"}
              className={style.copyIcon}
              onClick={copyUrl}
            />
            <MdOutlineCancel
              size={"1.5em"}
              className={style.copyIcon}
              onClick={clear}
            />
          </div>
        </div>
      )}
    </form>
  );
};

export default HomeForm;
