import React from "react";
import logo from "../Assets/logo.png"; // Import the ghost logo image

function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.footerContent}>
        {/* Display the imported ghost logo image */}
        <img src={logo} alt="Ghost Logo" style={styles.profileImage} />

        {/* Container for footer text (title and copyright) */}
        <div style={styles.footerTextContainer}>
          <p style={styles.footerText}>GHOST</p> {/* Footer title */}
          <p style={styles.footerCopyright}>Copyright © GHOST 2024</p>{" "}
          {/* Copyright text */}
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: "#306C71", // Background color of the footer
    padding: "20px 0", // Padding at the top and bottom
    display: "flex", // Layout footer with flexbox
    justifyContent: "center", // Center footer content
    alignItems: "center", // Center align items vertically
    width: "100%", // Full width for the footer
    height: "60px",
    position: "fixed", 
    bottom: 0, // Stick to the bottom of the container
  },
  footerContent: {
    display: "flex", // Layout content inside footerContent with flexbox
    alignItems: "center", // Center align items vertically within footerContent
    justifyContent: "space-between", // Space between logo and text
    width: "90%", // Limit content width to 90% of the footer for centered layout
    maxWidth: "1200px", // Maximum width for larger screens
  },
  profileImage: {
    width: "80px", // Width for the ghost icon
    height: "70px", // Height for the ghost icon
    alignItems: "center", // Center align the icon vertically
    marginLeft: "20px", // Left margin for spacing from the edge of the footer
    filter: "drop-shadow(0px 0px 8px rgba(255, 255, 255, 0.5))", // Glow effect for the icon
  },
  footerTextContainer: {
    display: "flex", // Layout footer text vertically
    flexDirection: "column", // Stack text vertically
    alignItems: "center", // Center align text horizontally
    flex: 1, // Allow the text container to grow and fill available space
  },
  footerText: {
    fontSize: "18px", // Size of footer title
    fontWeight: "bold", // Make footer title bold
    color: "#FFFFFF", // White text color for footer title
    margin: 0, // Remove margin for footer title
  },
  footerCopyright: {
    fontSize: "12px", // Smaller font size for copyright text
    color: "#FFFFFF", // White text color for copyright
    margin: 0, // Remove margin for copyright text
  },
};

export default Footer;
