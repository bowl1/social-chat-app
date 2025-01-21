import React, { useState } from "react";
import Footer from "./HomeComponents/Footer";
import LeftBar from "./HomeComponents/LeftBar";
import TopBar from "./HomeComponents/TopBar";
import Post from "./HomeComponents/Post";
import useUpload from "./HomeComponents/Posts/useUpload";
import {
  HomeContainer,
  TopBarContainer,
  ContentContainer,
  LeftBarContainer,
  PostContainer,
  FooterContainer,
} from "./HomeStyle";

function Home() {
  const {
    uploadedImage,
    uploadedVideo,
    handlePhotoUpload,
    handleVideoUpload,
    clearUploads,
  } = useUpload();

  const [isLeftBarVisible, setIsLeftBarVisible] = useState(false);
  
  const toggleLeftBar = () => {
    setIsLeftBarVisible((prev) => !prev);
  };

  return (
    <HomeContainer>
      <TopBarContainer>
        <TopBar
          onPhotoUpload={handlePhotoUpload}
          onVideoUpload={handleVideoUpload}
        />
      </TopBarContainer>
      <ContentContainer>
        <LeftBarContainer $isLeftBarExpanded={isLeftBarVisible}>
          <LeftBar/>
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

export default Home;
