import { FC, useEffect, useState } from "react";
import { IUrlRes, IHomeFormValues } from "./types";
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

const HomeForm: FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IHomeFormValues>({
    mode: "onBlur",
  });
  const [url, setUrl] = useState<string>();
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const tokenDto = new TokenManager().getTokenData();
  const informer = new Informer();
  const router: NextRouter = useRouter();
  const mutation = useMutation(
    "createGuestUrl",
    async (values: IHomeFormValues) =>
      await axios.post<IUrlRes>("/urls/guest", { url: values.url }),
    {
      onSuccess: (data) => {
        setUrl(`http://localhost:3000${router.pathname}${data.data.code}`);
      },
    }
  );

  const submit: SubmitHandler<IHomeFormValues> = async (
    values: IHomeFormValues
  ) => {
    console.log(values.url);
    try {
      if (tokenDto.token) {
        await mutation.mutateAsync(values);
        setIsDisabled(true);
      }
    } catch (error) {
      informer.informsError(error.response?.data?.error);
    } finally {
      setIsDisabled(false);
    }
  };
  const copyUrl = () => {
    navigator.clipboard.writeText(url!);
    informer.informAfterCopy();
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
          <FaRegCopy
            size={"1.5rem"}
            className={style.copyIcon}
            onClick={copyUrl}
          />
        </div>
      )}
    </form>
  );
};

export default HomeForm;
