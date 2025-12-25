"use client";

import React from "react";
const backIcon = "/assets/arrow.png";
const logout = "/assets/logout.png";
import { useRouter } from "next/navigation";
import { useUserStore } from "store/useUserStore";
import {
  HeaderContainer,
  BackButtonContainer,
  Icon,
  BackButton,
  RightSection,
  LogoutIcon,
  LogoutButton,
} from "./HeaderStyle";

function Header() {
  const router = useRouter();
  const logoutUser = useUserStore((s) => s.logoutUser);

  const handleLogout = async () => {
    try {
      await logoutUser();
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <HeaderContainer>
      <BackButtonContainer onClick={() => router.push("/")}>
        <Icon src={backIcon} alt="Back Icon" />
        <BackButton>Back</BackButton>
      </BackButtonContainer>

      <RightSection onClick={handleLogout}>
        <LogoutIcon src={logout} alt="Logout Icon" />
        <LogoutButton>Log out</LogoutButton>
      </RightSection>
    </HeaderContainer>
  );
}

export default Header;
