import { Navigate } from 'react-router-dom';
import FooterSet from '../FooterSet';
import NavBar from '../NavBar';
import MarketingPage from './MarketingPage';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const LandingPage = () => {
  const user = useSelector((state: RootState) => state.user);

  if (user) {
    return <Navigate to="/feed" replace />;
  }
  return (
    <div>
      <NavBar />
      <MarketingPage />
      <FooterSet />
    </div>
  );
};

export default LandingPage;
