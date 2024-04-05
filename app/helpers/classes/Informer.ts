import { IErrorField } from "@/app/assets/types/error";
import { notification } from "antd";
import { AxiosError } from "axios";

export class Informer {
  informsError(err: AxiosError<IErrorField>) {
    console.log(err);
    notification.error({
      message: "Error",
      description: err.response?.data?.error,
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
  informSuccess(description: string) {
    notification.success({
      message: "Success!",
      description,
      duration: 4,
    });
  }
}
