import React, { useContext } from "react";
import backIcon from "../Assets/arrow.png";
import logout from "../Assets/logout.png";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../hooks/UserContext";

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
    <header style={styles.header}>
      <div style={styles.backButtonContainer} onClick={() => navigate("/home")}>
        <img src={backIcon} alt="Back Icon" style={styles.icon} />
        <button style={styles.backButton}>Back</button>
      </div>

      <div style={styles.rightSection} onClick={handleLogout}>
        <img src={logout} alt="Logout Icon" style={styles.logoutIcon} />
        <button style={styles.logoutButton}>Log out</button>
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
    height: "100px",
  },
  backButtonContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px", 
  },
  icon: {
    width: "16px", 
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
  },
  rightSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px", 
  },
  logoutIcon: {
    width: "40px", 
    height: "40px",
    marginRight: "150px",
    marginTop: "5px",
  },
  logoutButton: {
    backgroundColor: "transparent",
    border: "none",
    color: "white", // Matching color for "Log out" text
    cursor: "pointer",
    fontSize: "16px", 
    marginRight: "150px",
  },
};

export default Header;