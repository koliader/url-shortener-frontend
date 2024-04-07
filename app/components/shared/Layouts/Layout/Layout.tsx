import { FC, PropsWithChildren } from "react";
import NavBar from "../../NavBar/NavBar";
import Footer from "@/app/components/ui/Footer/Footer";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <NavBar />
      <main className="mt-3">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
