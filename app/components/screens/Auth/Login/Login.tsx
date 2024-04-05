import AuthForm from "@/app/components/shared/Forms/AuthForm/AuthForm";
import { FC } from "react";

const Login: FC = () => {
  return (
    <>
      <AuthForm typeOfForm="login" />
    </>
  );
};

export default Login;
