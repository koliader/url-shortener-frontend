import { IErrorField } from "@/app/assets/types/error";
import { notification } from "antd";
import { AxiosError } from "axios";

export class Informer {
  informsError(err: AxiosError<IErrorField>) {
    console.log(err);
    notification.error({
      message: err.response?.data?.error,
      duration: 4,
    });
  }
  informTokenIsExpired() {
    notification.info({
      message: "Token is expired!",
      description: "Login again",
      duration: 4,
    });
  }
  informAfterCopy() {
    notification.success({
      message: "Url successfully copied",
      duration: 4,
    });
  }
}
