import React, { useContext } from "react";
import backIcon from "../Assets/arrow.png";
import logout from "../Assets/logout.png";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
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
  const navigate = useNavigate();
  const { logoutUser } = useContext(UserContext); 

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/"); 
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <HeaderContainer>
      <BackButtonContainer onClick={() => navigate("/home")}>
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