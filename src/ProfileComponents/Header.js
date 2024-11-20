import React, { useContext } from "react";
import backIcon from "../Assets/arrow.png";
import logout from "../Assets/logout.png";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../hooks/UserContext";
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
  const { logoutUser } = useContext(UserContext); // 使用 UserContext 中的 logout 方法

  const handleLogout = async () => {
    try {
      await logoutUser(); // 调用上下文中的登出方法
      navigate("/"); // 登出后导航到登录页面
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