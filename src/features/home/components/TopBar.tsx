"use client";

import React, { useState } from "react";
import {
  TopBarContainer,
  WelcomeSection,
  WelcomeHeading,
  UploadSection,
  UploadLabel,
  LogoutContainer,
  SignInContainer,
} from "./TopBarStyle";
import uploadPhotos from "assets/uploadPhotos.png";
import uploadVideos from "assets/uploadVideos.png";
import logoutIcon from "assets/logout.png";
import { useUserStore } from "store/useUserStore";
import { useRouter } from "next/navigation";
import signInIcon from "assets/signin.png";

function TopBar({ onPhotoUpload, onVideoUpload }) {
  const { user, logoutUser } = useUserStore();
  const [photoInputKey, setPhotoInputKey] = useState(Date.now());
  const [videoInputKey, setVideoInputKey] = useState(Date.now());
  const router = useRouter();

  const handlePhotoChange = (e) => {
    if (!user) {
      alert("Please sign in to upload photos.");
      setPhotoInputKey(Date.now());
      return;
    }
    onPhotoUpload(e.target.files[0]);
    setPhotoInputKey(Date.now());
  };

  const handleVideoChange = (e) => {
    if (!user) {
      alert("Please sign in to upload videos.");
      setVideoInputKey(Date.now());
      return;
    }
    onVideoUpload(e.target.files[0]);
    setVideoInputKey(Date.now());
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  const handleSignIn = () => {
    router.push("/login");
  };

  return (
    <TopBarContainer>
      <WelcomeSection>
        <WelcomeHeading>
          <span className="desktop">
            Welcome back Little Ghost {user ? user.username : "Guest"}!
            <br />
            You’re not alone &#10084;
          </span>
          <span className="mobile">
            <p>Welcome</p>
            <p>{user ? user.username : "Guest"}!</p>
          </span>
        </WelcomeHeading>
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
          <img src={uploadPhotos.src} alt="Upload" />
          <span>Photo</span>
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
          <img src={uploadVideos.src} alt="Upload Video" />
          <span>Video</span>
        </UploadLabel>
      </UploadSection>

      {user ? (
        <LogoutContainer onClick={handleLogout}>
          <img src={logoutIcon.src} alt="Log out" />
          <span>Log out</span>
        </LogoutContainer>
      ) : (
        <SignInContainer onClick={handleSignIn}>
          <img src={signInIcon.src} alt="Sign In" />
          <span>Sign In</span>
        </SignInContainer>
      )}
    </TopBarContainer>
  );
}

export default TopBar;
