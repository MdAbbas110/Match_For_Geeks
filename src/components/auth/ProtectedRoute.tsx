import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const ProtectedRoute = () => {
  const user = useSelector((store: RootState) => store.user);

  // If user is not logged in, redirect to root
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Render child routes
  return <Outlet />;
};

export default ProtectedRoute;
