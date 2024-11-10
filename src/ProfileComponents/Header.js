import React from "react";
import backIcon from "../Assets/arrow.png";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate(); 

  return (
    <header style={styles.header}>
      <div style={styles.backButtonContainer} onClick={()=> navigate("/")}>
        <img src={backIcon} alt="Back Icon" style={styles.icon} />{" "}
        <button style={styles.backButton}>Back</button> 
      </div>
      
    </header>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#306C71",
    color: "#fff",
    height: "70px",
  },
  backButtonContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px", // Space between the icon and the back text
  },
  icon: {
    width: "16px", // Size of the back icon
    height: "16px",
    marginLeft: "150px",
  },
  backButton: {
    background: "none",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    fontSize: "25px",
    fontWeight: "bold",
    // Left margin for spacing from the edge of the footer
  },
  rightSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px", // Space between the icon and the text
  },
  logoutIcon: {
    width: "40px", // Size of the logout icon
    height: "40px",
    marginRight: "150px",
  },
  logoutButton: {
    backgroundColor: "transparent",
    border: "none",
    color: "white", // Matching color for "Log out" text
    cursor: "pointer",
    fontSize: "16px", // Smaller font size for "Log out"
    marginRight: "150px",
  },
};

export default Header;
