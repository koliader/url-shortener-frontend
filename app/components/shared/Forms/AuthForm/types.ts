export interface ILoginFormValues {
  password: string;
  username?: string;
}

export interface IAuthFormProps {
  typeOfForm: "login" | "register";
}
