import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Login from './Login';
import Signup from './Signup';
import { useState } from 'react';
import FooterSet from '../FooterSet';
import NavBar from '../NavBar';

export const AuthPage = () => {
  const { user } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const location = useLocation();
  const from = location.state?.from?.pathname || '/feed';

  if (user) {
    return <Navigate to={from} replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <div className="text-center mb-8">
                <div className="tabs tabs-boxed justify-center">
                  <button
                    className={`tab ${!isLogin ? 'tab-active' : ''}`}
                    onClick={() => setIsLogin(false)}
                  >
                    Sign Up
                  </button>
                  <button
                    className={`tab ${isLogin ? 'tab-active' : ''}`}
                    onClick={() => setIsLogin(true)}
                  >
                    Login
                  </button>
                </div>
              </div>
              {isLogin ? (
                <Login onToggle={() => setIsLogin(false)} />
              ) : (
                <Signup onToggle={() => setIsLogin(true)} />
              )}
            </div>
          </div>
        </div>
      </main>
      <FooterSet />
    </div>
  );
};
