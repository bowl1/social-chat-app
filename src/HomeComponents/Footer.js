import React from 'react';
import './Footer.css';
import logoIcon from '../Assets/logo.png';


function Footer() {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
      <footer className="footer-section">
        <img 
          loading="lazy" 
          src={logoIcon}
          className="logo" 
          alt="Ghost company logo"
        />
        <div className="brand-container">
          <h2 className="brand-name">GHOST</h2>
          <p className="copyright">Copyright © GHOST 2024</p>
        </div>
        <button 
          className="back-to-top"
          onClick={handleBackToTop}
          aria-label="Scroll back to top"
        >
          Back to Top
        </button>
      </footer>
  
  );
}

export default Footer;