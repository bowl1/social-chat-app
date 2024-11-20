import React from "react";
import { Link, useLocation } from "react-router-dom";
import Login from "./AuthComponents/Login";
import Signup from "./AuthComponents/Signup";
import LogoImage from "./Assets/logo-white.png";
import {
  FormContainer,
  AuthContainer,
  NavBar,
  Logo,
} from "./AuthComponents/AuthStyle";

const Navigation = () => {
  const location = useLocation(); // Detect current route

  return (
    <NavBar>
      <Link to="/" className={location.pathname === "/" ? "active" : ""}>
        Login
      </Link>
      <Link
        to="/signup"
        className={location.pathname === "/signup" ? "active" : ""}
      >
        Signup
      </Link>
    </NavBar>
  );
};

function Auth({ path }) {
  return (
    <AuthContainer>
      <Logo src={LogoImage} alt="Logo" />
      <FormContainer>
        <Navigation />
        {path === "/" ? <Login /> : <Signup />}
      </FormContainer>
    </AuthContainer>
  );
}

export default Auth;