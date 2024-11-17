import React, { useState,useEffect,useContext} from "react";
import Footer from "./HomeComponents/Footer";
import LeftBar from "./HomeComponents/LeftBar";
import TopBar from "./HomeComponents/TopBar";
import Post from "./HomeComponents/Post";
import useUpload from "./HomeComponents/Posts/upload";
import {fetchGroupData} from "./HomeComponents/Service/backend";
import {UserContext} from "./hooks/UserContext";
import {HomeContainer,ContentContainer,LeftBarContainer,PostContainer} from "./HomeStyles"; 

function Home() {
  const {
    uploadedImage,
    uploadedVideo,
    handlePhotoUpload,
    handleVideoUpload,
    clearUploads,
  } = useUpload();

  const { setSelectedGroup,selectedGroup } = useContext(UserContext);
  const [groupData, setGroupData] = useState([]); 


  // 获取分组数据
  useEffect(() => {
    const fetchData = async () => {
      try {
        const groups = await fetchGroupData(); // 从后端获取分组数据
        setGroupData(groups);

        // 如果 localStorage 有保存的分组，优先加载保存的分组
        const savedGroup = localStorage.getItem("selectedGroup");
        if (savedGroup) {
          const parsedGroup = JSON.parse(savedGroup);
          setSelectedGroup(parsedGroup);
        } else if (!selectedGroup) {
          // 如果没有保存的分组且未选择分组，选择默认分组
          const defaultGroup = groups.find((group) => group.isDefault);
          if (defaultGroup) {
            setSelectedGroup(defaultGroup);
          }
        }
      } catch (error) {
        console.error("Error fetching group data:", error);
      }
    };

    fetchData();
  }, [setSelectedGroup, selectedGroup]);

  return (
    <HomeContainer>
        <TopBar
          onPhotoUpload={handlePhotoUpload}
          onVideoUpload={handleVideoUpload}
        />
      <ContentContainer>
        <LeftBarContainer>
          <LeftBar groupData={groupData} />
        </LeftBarContainer>
        <PostContainer>
          <Post
            uploadedImage={uploadedImage}
            uploadedVideo={uploadedVideo}
            clearUploads={clearUploads}
          />
        </PostContainer>
      </ContentContainer>
      <Footer />
    </HomeContainer>
  );
}

export default Home;
