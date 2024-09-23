import { Outlet } from "react-router";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto py-20 px-5 max-w-screen-xl">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
