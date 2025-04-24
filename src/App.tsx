import { BrowserRouter, Route, Routes } from "react-router-dom";

import Body from "./components/Body.js";
import Login from "./components/Login.js";
import Profile from "./components/Profile.js";
import Feed from "./components/Feed.js";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/" element={<Feed />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
