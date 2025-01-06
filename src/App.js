import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import { UserProvider} from './Context/UserContext';
import { GlobalStyles } from "./AppStyle";
import Auth from "./Auth";


function App() {
  return (
    <UserProvider>
        <GlobalStyles /> 
      <Router>
        <Routes>
          <Route path="/" element={<Auth path="/" />} />
          <Route path="/signup" element={<Auth path="/signup" />} />
          <Route path="/home" element={<Home />} /> 
          <Route path="/profile" element={<Profile />} /> 
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App; 
