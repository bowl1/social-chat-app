"use client";

import React, { useState } from "react";
import Footer from "./components/Footer";
import LeftBar from "./components/LeftBar";
import TopBar from "./components/TopBar";
import Post from "./components/Post";
import useUpload from "@hooks/useUpload";
import {
  HomeContainer,
  TopBarContainer,
  ContentContainer,
  LeftBarContainer,
  PostContainer,
  FooterContainer,
} from "./homeStyles";

function HomeScreen() {
  const { uploadedImage, uploadedVideo, handlePhotoUpload, handleVideoUpload, clearUploads } =
    useUpload();

  const [isLeftBarVisible, setIsLeftBarVisible] = useState(false);

  const toggleLeftBar = () => {
    setIsLeftBarVisible((prev) => !prev);
  };

  return (
    <HomeContainer>
      <TopBarContainer>
        <TopBar onPhotoUpload={handlePhotoUpload} onVideoUpload={handleVideoUpload} />
      </TopBarContainer>
      <ContentContainer>
        <LeftBarContainer $isLeftBarExpanded={isLeftBarVisible}>
          <LeftBar />
        </LeftBarContainer>
        <PostContainer $isLeftBarExpanded={isLeftBarVisible}>
          <Post
            uploadedImage={uploadedImage}
            uploadedVideo={uploadedVideo}
            clearUploads={clearUploads}
          />
        </PostContainer>
      </ContentContainer>
      <FooterContainer>
        <Footer toggleLeftBar={toggleLeftBar} />
      </FooterContainer>
    </HomeContainer>
  );
}

export default HomeScreen;
