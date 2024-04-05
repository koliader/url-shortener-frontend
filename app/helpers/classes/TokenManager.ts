import { destroyCookie, parseCookies } from "nookies";
import { IDecodedToken, ITokenDto } from "@/app/assets/types/token";
import jwt from "jsonwebtoken";

export class TokenManager {
  private token: string;
  private decodedToken: IDecodedToken;
  constructor() {
    this.token = parseCookies().token;
    this.decodedToken = jwt.decode(this.token) as IDecodedToken;
  }
  getTokenData(): ITokenDto {
    return { decodedToken: this.decodedToken, token: this.token };
  }
  checkTokenIsExpired(): boolean {
    const currentTime = Math.floor(Date.now() / 1000);
    console.log(this.decodedToken);
    const parsedDate = new Date(this.decodedToken.expiredAt);
    const date = parsedDate.getTime();
    if (this.decodedToken && date < currentTime) {
      destroyCookie(null, "token", { path: "/" });
      alert("Token is expired");
      return true;
    }
    return false;
  }
}
