
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import { UserProvider} from './hooks/UserContext';


function App() {
  
  return (
    <UserProvider>
     
    <Router>
      <Routes>
        <Route path="/" element={<Home  />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
    
    </UserProvider>
  );
}

export default App; 
