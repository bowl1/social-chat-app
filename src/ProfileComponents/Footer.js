import React from "react";
import logo from "../Assets/logo.png"; 
import {
  FooterContainer,
  FooterContent,
  ProfileImage,
  FooterTextContainer,
  FooterText,
  FooterCopyright,
} from "./FooterStyle";

function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <ProfileImage src={logo} alt="Ghost Logo" />
        <FooterTextContainer>
          <FooterText>GHOST</FooterText>
          <FooterCopyright>Copyright © GHOST 2024</FooterCopyright>
        </FooterTextContainer>
      </FooterContent>
    </FooterContainer>
  );
}

export default Footer;