import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import { UserProvider} from './hooks/UserContext';
import Signup from "./AuthComponents/Signup";
import Login from "./AuthComponents/Login";
import { GlobalStyles } from "./AppStyle";


function App() {
  return (
    <UserProvider>
        <GlobalStyles /> {/* 应用全局样式 */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} /> 
          <Route path="/signup" element={<Signup />} /> 
          <Route path="/home" element={<Home />} /> 
          <Route path="/profile" element={<Profile />} /> 
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App; 
