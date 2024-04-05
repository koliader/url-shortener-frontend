import AuthForm from "@/app/components/shared/Forms/AuthForm/AuthForm";
import { FC } from "react";

const Register: FC = () => {
  return (
    <>
      <AuthForm typeOfForm="register" />
    </>
  );
};

export default Register;
