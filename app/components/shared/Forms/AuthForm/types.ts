export interface ILoginFormValues {
  email: string;
  password: string;
  username?: string;
}

export interface IAuthFormProps {
  typeOfForm: "login" | "register";
}
