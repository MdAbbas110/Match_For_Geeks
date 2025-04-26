import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";

import FooterSet from "./FooterSet";
import { NavBar } from "./NavBar";
import { useUserProfile } from "../hooks/useUserProfile";

const Body = () => {
  const { data: user, isLoading, error } = useUserProfile();
  const userData = useSelector((store: any) => store.user);

  if (isLoading) return <p>Loading user profile...</p>;

  return (
    <>
      <NavBar />
      {JSON.stringify(user)}
      <Outlet />
      <FooterSet />
    </>
  );
};

export default Body;
