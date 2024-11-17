import React from 'react';
import logoIcon from '../Assets/logo.png';
import { FooterSection, Logo, BrandContainer, BrandName, Copyright, BackToTopButton } from "./FooterStyle";


function Footer() {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <FooterSection>
      <Logo
        loading="lazy"
        src={logoIcon}
        alt="Ghost company logo"
      />
      <BrandContainer>
        <BrandName>GHOST</BrandName>
        <Copyright>Copyright © GHOST 2024</Copyright>
      </BrandContainer>
      <BackToTopButton
        onClick={handleBackToTop}
        aria-label="Scroll back to top"
      >
        Back to Top
      </BackToTopButton>
    </FooterSection>
  );
}

export default Footer;