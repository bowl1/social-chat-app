import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import { UserProvider } from "./Context/UserContext";
import { GlobalStyles } from "./AppStyle";
import Auth from "./Auth";
import Parse from "parse";

function App() {
  const ProtectedRoute = ({ children }) => {
    const currentUser = Parse.User.current();
    return currentUser ? children : <Navigate to="/" />;
  };

  return (
    <UserProvider>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/login" element={<Auth path="/login" />} />
          <Route path="/signup" element={<Auth path="/signup" />} />

          <Route path="/" element={<Home />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;