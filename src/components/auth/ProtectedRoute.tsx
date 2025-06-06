import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export const ProtectedRoute = () => {
  const user = useSelector((store: RootState) => store.user);
  const location = useLocation();

  if (!user) {
    // Redirect to auth page with the return url
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
