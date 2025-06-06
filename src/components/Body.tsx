import { Outlet } from 'react-router-dom';

import FooterSet from './FooterSet';
import NavBar from './NavBar';
import { useUserProfile } from '../hooks/useUserProfile';

const Body = () => {
  const { isLoading } = useUserProfile();

  if (isLoading) return <p>Loading user profile...</p>;

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 mt-18">
        <Outlet />
      </main>
      <FooterSet />
    </div>
  );
};

export default Body;
