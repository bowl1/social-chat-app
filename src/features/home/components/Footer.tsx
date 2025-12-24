import React from "react";
import logoIcon from "assets/logo-white.png";
import menuIcon from "assets/menu.png";
import {
  FooterSection,
  Logo,
  BrandContainer,
  BrandName,
  Copyright,
  BackToTopButton,
  MenuIcon,
  MenuContainer,
  LogoContainer,
} from "./FooterStyle";

function Footer({ toggleLeftBar }) {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <FooterSection>
      <MenuContainer onClick={toggleLeftBar} aria-label="Toggle LeftBar">
        <MenuIcon src={menuIcon.src} alt="Menu Icon" />
        <span>Menu</span>
      </MenuContainer>
      <LogoContainer>
        <Logo src={logoIcon.src} alt="Ghost company logo" />
      </LogoContainer>
      <BrandContainer>
        <BrandName>GHOST</BrandName>
        <Copyright>Copyright © GHOST 2024</Copyright>
      </BrandContainer>

      <BackToTopButton onClick={handleBackToTop} aria-label="Scroll back to top">
        Back to Top
      </BackToTopButton>
    </FooterSection>
  );
}

export default Footer;
