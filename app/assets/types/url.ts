import { IUser } from "./user";

export interface IUrl {
  url: string;
  code: string;
  user: IUser | null;
  clicks: number;
}
export interface IUrlField {
  url: IUrl;
}
