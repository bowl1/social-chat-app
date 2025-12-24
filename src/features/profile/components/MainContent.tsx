"use client";

import React, { useState, useEffect, useRef } from "react";
import { useUserStore } from "store/useUserStore";
import { request } from "@client/httpClient";
import {
  Container,
  Main,
  ProfileContainer,
  AvatarContainer,
  ProfileImage,
  ChangeButton,
  UserInfo,
  UserName,
  UserEmail,
  EditButton,
  SecondaryButton,
  Form,
  InputGroup,
  Label,
  Input,
  HiddenInput,
  ReadonlyField,
} from "./MainContentStyle";

function MainContent() {
  const { user, setUser, avatar, setAvatar } = useUserStore();
  const [isEditing, setIsEditing] = useState(false);
  const avatarPlaceholder = "https://via.placeholder.com/50";
  const [formData, setFormData] = useState({
    fullName: user?.username || "",
    gender: "",
    language: "",
    email: user?.email || "",
    country: "",
    avatar: avatar || avatarPlaceholder,
  });
  const fileInputRef = useRef(null);

  const initFormData = () => {
    if (user && !isEditing) {
      setFormData({
        fullName: user.username || "",
        gender: user.gender || "",
        language: user.language || "",
        email: user.email || "",
        country: user.country || "",
        avatar: avatar || avatarPlaceholder,
      });
    }
  };

  useEffect(() => {
    initFormData();
    // eslint-disable-next-line
  }, [user, avatar, isEditing]);

  const toggleEditMode = async (e) => {
    if (isEditing) {
      await handleSubmit(e);
    }
    setIsEditing(!isEditing);
  };
  const cancelEdit = () => {
    setIsEditing(false);
    initFormData();
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
      const newAvatarUrl = URL.createObjectURL(file); //虽然头像会在选择后立即上传，但上传过程需要时间。如果直接等待上传完成后再显示头像，该 URL 可以用于在页面中预览文件，而无需先上传到服务器
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
      try {
        const formData = new FormData();
        formData.append("file", file);
        const uploadRes = await request("/upload", {
          method: "POST",
          body: formData,
        });
        const updatedUser = await request("/users/me", {
          method: "PATCH",
          body: { avatar: uploadRes.url },
        });
        setAvatar(uploadRes.url);
        setUser(updatedUser.user);
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
      try {
        const updated = await request("/users/me", {
          method: "PATCH",
          body: {
            gender: formData.gender,
            language: formData.language,
            country: formData.country,
            username: formData.fullName,
          },
        });
        setUser(updated.user);
        setIsEditing(false);
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
            <ProfileImage src={avatar || avatarPlaceholder} alt="Profile" />
            <ChangeButton onClick={triggerFileInput}>Change</ChangeButton>
          </AvatarContainer>
          <HiddenInput
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleAvatarChange}
          />
          <UserInfo>
            <UserName>{formData.fullName}</UserName>
            <UserEmail>{user ? user.email : "No Email Available"}</UserEmail>
          </UserInfo>
          <EditButton data-edit-mode={isEditing} onClick={toggleEditMode}>
            {isEditing ? "Save" : "Edit"}
          </EditButton>
          {isEditing && (
            <SecondaryButton type="button" onClick={cancelEdit}>
              Cancel
            </SecondaryButton>
          )}
        </ProfileContainer>

        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label>Name</Label>
            {isEditing ? (
              <Input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            ) : (
              <ReadonlyField>{formData.fullName}</ReadonlyField>
            )}
          </InputGroup>
          <InputGroup>
            <Label>Gender</Label>
            {isEditing ? (
              <Input
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            ) : (
              <ReadonlyField>{formData.gender}</ReadonlyField>
            )}
          </InputGroup>
          <InputGroup>
            <Label>Language</Label>
            {isEditing ? (
              <Input
                type="text"
                name="language"
                value={formData.language}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            ) : (
              <ReadonlyField>{formData.language}</ReadonlyField>
            )}
          </InputGroup>
          <InputGroup>
            <Label>Email Address</Label>
            <ReadonlyField>{formData.email}</ReadonlyField>
          </InputGroup>
          <InputGroup>
            <Label>Country</Label>
            {isEditing ? (
              <Input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            ) : (
              <ReadonlyField>{formData.country}</ReadonlyField>
            )}
          </InputGroup>
        </Form>
      </Main>
    </Container>
  );
}

export default MainContent;
