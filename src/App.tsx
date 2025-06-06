import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Profile from './components/Profile';
import Connections from './components/Connections';
import RequestReceived from './components/RequestReceived';
import Messages from './components/Messages';
import Body from './components/Body';
import Feed from './components/Feed';
import { AuthProvider } from './context/AuthContext';
import LandingPage from './components/auth/LandingPage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { AuthPage } from './components/auth/AuthPage';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';

function App() {
  const user = useSelector((store: RootState) => store.user);
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes - only accessible when not authenticated */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />

          {/* Protected routes - only accessible when authenticated */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Body />}>
              <Route path="/feed" element={<Feed />} index />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<RequestReceived />} />
              <Route path="/message/:targetUserId" element={<Messages />} />
            </Route>
          </Route>

          {/* Redirect all unmatched routes */}
          <Route
            path="*"
            element={<Navigate to={user ? '/feed' : '/'} replace />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
