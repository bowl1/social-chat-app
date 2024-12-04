import React, { useState, useContext, useEffect, useRef } from "react";
import { UserContext } from "../hooks/UserContext";
import Parse from "parse";
import {
  Container, Main, ProfileContainer, AvatarContainer, ProfileImage, ChangeButton, UserInfo, UserName, UserEmail, EditButton, Form, InputGroup, Label, Input,
} from "./MainComponentStyle";

// 提取通用表单字段组件
function FormField({ label, type, name, value, onChange, readOnly }) {
  return (
    <InputGroup>
      <Label>{label}</Label>
      <Input
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        readOnly={readOnly}
      />
    </InputGroup>
  );
}

function MainContent() {
  const { user, setUser, avatar, setAvatar} = useContext(UserContext);
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
        country: "",
        avatar: avatar || avatarPlaceholder,
      });
    }
  }, [user, avatar]);

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

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const newAvatarUrl = URL.createObjectURL(file); //虽然头像会在选择后立即上传，但上传过程需要时间。如果直接等待上传完成后再显示头像，
      setFormData((prevData) => ({
        ...prevData,
        avatar: newAvatarUrl,
      }));
      setAvatar(newAvatarUrl);

      await handleAvatarUpdate(file);
    }
  };

  const handleAvatarUpdate = async (file) => {
    if (file && user) {
      const avatar = new Parse.File(file.name, file);
      user.set("avatar", avatar);

      try {
        await user.save();
        const updatedAvatarUrl = avatar.url() + "?" + new Date().getTime();
        setAvatar(updatedAvatarUrl);
        setUser(user);
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
        setUser(user);
        setIsEditing(false);
        console.log("Profile updated successfully");
        alert("Profile updated successfully!");
      } catch (error) {
        console.error("Error updating profile: ", error);
        alert("Failed to update profile. Please try again.");
      }
    }
  };

  return (
    <Container>
      <Main>
        <ProfileContainer>
          <AvatarContainer>
            <ProfileImage src={formData.avatar} alt="Profile" />
            <ChangeButton onClick={triggerFileInput}>Change</ChangeButton>
          </AvatarContainer>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleAvatarChange}
          />
          <UserInfo>
            <UserName>{formData.fullName}</UserName>
            <UserEmail>{user ? user.get("email"): "No Email Available"}</UserEmail>
          </UserInfo>
          <EditButton data-edit-mode ={isEditing} onClick={toggleEditMode}>
            {isEditing ? "Save" : "Edit"}
          </EditButton>
        </ProfileContainer>

        <Form>
          <FormField
            label="Name"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            readOnly={!isEditing}
          />
          <FormField
            label="Gender"
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            readOnly={!isEditing}
          />
          <FormField
            label="Language"
            type="text"
            name="language"
            value={formData.language}
            onChange={handleInputChange}
            readOnly={!isEditing}
          />
          <FormField
            label="Email Address"
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            readOnly
          />
          <FormField
            label="Country"
            type="text"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            readOnly={!isEditing}
          />
        </Form>
      </Main>
    </Container>
  );
}

export default MainContent;