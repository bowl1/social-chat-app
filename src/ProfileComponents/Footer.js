import React from "react";
import logo from "../Assets/logo-white.png"; 
import {
  FooterContainer,
  FooterContent,
  LogoImage,
  FooterTextContainer,
  FooterText,
  FooterCopyright,
  LogoContainer
} from "./FooterStyle";

function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <LogoContainer>
        <LogoImage src={logo} alt="Ghost Logo" />
        </LogoContainer>
        <FooterTextContainer>
          <FooterText>GHOST</FooterText>
          <FooterCopyright>Copyright © GHOST 2024</FooterCopyright>
        </FooterTextContainer>
      </FooterContent>
    </FooterContainer>
  );
}

export default Footer;