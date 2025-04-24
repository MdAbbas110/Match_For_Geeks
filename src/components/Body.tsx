import { Outlet } from "react-router-dom";
import FooterSet from "./FooterSet";
import { NavBar } from "./NavBar";

const Body = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <FooterSet />
    </>
  );
};

export default Body;
