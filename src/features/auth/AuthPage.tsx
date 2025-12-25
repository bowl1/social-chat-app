"use client";

import React from "react";
import Link from "next/link";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
const LogoImage = "/assets/logo-white.png";
import { FormContainer, AuthContainer, NavBar, Logo } from "./components/AuthStyle";

type AuthPageProps = {
  path: "/login" | "/signup";
};

function AuthPage({ path }: AuthPageProps) {
  const currentPath = path;

  return (
    <AuthContainer>
      <Logo src={LogoImage} alt="Logo" />
      <FormContainer>
        <NavBar>
          <Link href="/login" className={currentPath === "/login" ? "active" : ""}>
            Login
          </Link>
          <Link href="/signup" className={currentPath === "/signup" ? "active" : ""}>
            Signup
          </Link>
        </NavBar>
        {path === "/login" ? <LoginForm /> : <SignupForm />}
      </FormContainer>
    </AuthContainer>
  );
}

export default AuthPage;
