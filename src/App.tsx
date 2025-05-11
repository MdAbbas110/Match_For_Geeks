import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./components/auth/AuthPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Profile from "./components/Profile";
import Connections from "./components/Connections";
import RequestReceived from "./components/RequestReceived";
import Messages from "./components/Messages";
import Body from "./components/Body";
import Feed from "./components/Feed";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public route - Marketing + Auth */}
          <Route path="/" element={<AuthPage />} />

          {/* Protected routes - All under Body layout */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Body />}>
              <Route path="/feed" element={<Feed />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<RequestReceived />} />
              <Route path="/message/:targetUserId" element={<Messages />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
