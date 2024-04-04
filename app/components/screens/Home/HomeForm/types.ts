import { IUser } from "@/app/assets/types/user";

export interface IHomeFormValues {
  url: string;
}

export interface IUrlRes {
  url: string;
  code: string;
  user: IUser | null;
}
