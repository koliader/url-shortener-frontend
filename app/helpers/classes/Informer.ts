import { notification } from "antd";

export class Informer {
  informsError(error: string) {
    notification.error({
      message: error,
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
