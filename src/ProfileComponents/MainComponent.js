import React, { useState, useContext, useEffect, useRef } from "react";
import { UserContext } from "../hooks/UserContext";
import Parse from "parse";

function MainContent() {
  const { user, setUser,avatar, setAvatar,email } = useContext(UserContext); 
  const [isEditing, setIsEditing] = useState(false);
  const avatarPlaceholder = "https://via.placeholder.com/50";
  const [formData, setFormData] = useState({
    fullName: user?.get("username") || "",
    gender: "",
    language: "",
    email: user?.get("email") || "",
    country: "",
    avatar: avatar || avatarPlaceholder,
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.get("username") || "",
        gender: "",
        language: "",
        email: user.get("email") || "",
        country:  "",
        avatar: avatar || avatarPlaceholder,
      });
    }
  }, [user,avatar]);

  const toggleEditMode = async (e) => {
    if (isEditing) {
      await handleSubmit(e);
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const newAvatarUrl = URL.createObjectURL(file);
      setFormData((prevData) => ({
        ...prevData,
        avatar: newAvatarUrl,
      }));
      setAvatar(newAvatarUrl); // 更新 UserContext 中的 avatar URL

      // 自动触发头像上传
      await handleAvatarUpdate(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleAvatarUpdate = async (file) => {
    if (file && user) { // 确保 file 存在
      const avatar = new Parse.File(file.name, file);
      user.set("avatar", avatar);

      try {
        await user.save();
        // 更新 UserContext 中的 avatar URL 和 user，避免缓存问题
        const updatedAvatarUrl = avatar.url() + "?" + new Date().getTime();
        setAvatar(updatedAvatarUrl); 
        setUser(user); // 更新 UserContext 中的 user 对象
        console.log("Avatar updated successfully");
        alert("Avatar updated successfully!");
      } catch (error) {
        console.error("Error updating avatar: ", error);
        alert("Failed to update avatar. Please try again.");
      }
    } else {
      alert("Please select an image before updating.");
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      user.set("gender", formData.gender);
      user.set("language", formData.language);
      user.set("country", formData.country);
      user.set("username", formData.fullName);

      try {
        await user.save();
        setUser(user); // 更新 UserContext 中的 user
        setIsEditing(false);
        console.log("Profile updated successfully");
        alert("Profile updated successfully!"); // 显示资料更新成功的提示
      } catch (error) {
        console.error("Error updating profile: ", error);
        alert("Failed to update profile. Please try again.");
      }
    }
  };

  return (
    <div style={styles.container}> 
      <main style={styles.main}>
        <div style={styles.profileContainer}>
           {/* 新的头像容器 */}
           <div style={styles.avatarContainer}>
            <img
              src={formData.avatar}
              alt="Profile"
              style={styles.profileImage}
            />
            <button style={styles.changeButton} onClick={triggerFileInput}>
              Change
            </button>
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleAvatarChange}
          />
          
          <div style={styles.userInfo}>
            <h2 style={styles.userName}>{formData.fullName}</h2>
            <p style={styles.userEmail}>{email}</p>
          </div>

          <button style={styles.editButton} onClick={toggleEditMode}>
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>

        <div style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Name</label>
            <input
              style={styles.input}
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Gender</label>
            <input
              style={styles.input}
              type="text"
              name="gender"
              value={formData.gender || ""}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Language</label>
            <input
              style={styles.input}
              type="text"
              name="language"
              value={formData.language || ""}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              style={styles.input}
              type="text"
              name="email"
              value={formData.email || ""}
              readOnly
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Country</label>
            <input
              style={styles.input}
              type="text"
              name="country"
              value={formData.country || ""}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh", 
    width: "100vw", 
  },
  
  main: {
    display: "flex",
    flexDirection: "column", // 让内容垂直排列
    width: "80%", 
    maxWidth: "800px", // 控制表单最大宽度，使其不占满大屏幕
    backgroundColor: "#D1E8E4", 
    padding: "20px",
    borderRadius: "20px",
    maxHeight: "80vh",
    overflowY: "auto", // 垂直滚动
  },
 
  profileContainer: {
    display: "flex",
    alignItems: "center",
    gap: "60px",
    marginBottom: "10%",
    width: "100%",
    marginTop: "5%",
  },

  avatarContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center", 
    gap: "10px",
  },

  profileImage: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover",
  },

  changeButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "20px",
    padding: "5px 10px",
    cursor: "pointer",
    fontSize: "14px",
    marginTop: "10px", 
  },

  userInfo: {
    flexGrow: 1,
  },
  userName: {
    fontSize: "30px",
    fontWeight: "bold",
    margin: 0,
  },
  userEmail: {
    fontSize: "20px",
    color: "#555555",
    margin: 0,
  },
  editButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "20px",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "25px",
  },
  form: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "20px",
    width: "100%",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center", 
    gap: "20px",
  },
  label: {
    marginBottom: "5px",
    fontWeight: "normal",
    color: "#333",
    fontSize: "25px",
  },
  input: {
    padding: "10px",
    borderRadius: "20px",
    border: "1px solid #ccc",
    fontSize: "20px",
  },
};

export default MainContent;