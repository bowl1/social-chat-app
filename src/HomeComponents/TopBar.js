import React, { useState, useContext } from "react";
import {DashboardHeader,TopBarContainer,WelcomeSection,GreetingContainer,WelcomeHeading,WelcomeSubheading,
  UploadSection,UploadLabel,LogoutContainer,} from "./TopBarStyle"; 
import uploadPhotos from "../Assets/uploadPhotos.png";
import uploadVideos from "../Assets/uploadVideos.png";
import logoutIcon from "../Assets/logout.png";
import { UserContext } from "../hooks/UserContext";
import { useNavigate } from "react-router-dom";

function TopBar({ onPhotoUpload, onVideoUpload }) {
  const { user, logoutUser } = useContext(UserContext);
  const [photoInputKey, setPhotoInputKey] = useState(Date.now());
  const [videoInputKey, setVideoInputKey] = useState(Date.now());
  const navigate = useNavigate();

  const handlePhotoChange = (e) => {
    console.log("Photo selected:", e.target.files[0]);
    onPhotoUpload(e.target.files[0]);
    setPhotoInputKey(Date.now());
  };

  const handleVideoChange = (e) => {
    console.log("Video selected:", e.target.files[0]);
    onVideoUpload(e.target.files[0]);
    setVideoInputKey(Date.now());
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <DashboardHeader>
      <TopBarContainer>
        <WelcomeSection>
          <GreetingContainer>
            <WelcomeHeading>
              Welcome back, {user ? user.get("username") : "Guest"}!
            </WelcomeHeading>
            <WelcomeSubheading>Here is what you've missed</WelcomeSubheading>
          </GreetingContainer>
        </WelcomeSection>

        <UploadSection>
          <input
            key={`photo-${photoInputKey}`}
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            style={{ display: "none" }}
            id="upload-photo"
          />
          <UploadLabel htmlFor="upload-photo">
            <img src={uploadPhotos} alt="Upload" />
            <span>Upload Photo</span>
          </UploadLabel>

          <input
            key={`video-${videoInputKey}`}
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
            style={{ display: "none" }}
            id="upload-video"
          />
          <UploadLabel htmlFor="upload-video">
            <img src={uploadVideos} alt="Upload Video" />
            <span>Upload Video</span>
          </UploadLabel>
        </UploadSection>

        <LogoutContainer onClick={handleLogout}>
          <img src={logoutIcon} alt="Log out" />
          <span>Log out</span>
        </LogoutContainer>
      </TopBarContainer>
    </DashboardHeader>
  );
}

export default TopBar;