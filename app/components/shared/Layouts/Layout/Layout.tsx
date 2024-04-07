import { FC, PropsWithChildren } from "react";
import NavBar from "../../NavBar/NavBar";
import Footer from "@/app/components/ui/Footer/Footer";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow overflow-auto mt-3 mb-16">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
