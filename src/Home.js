import React, { useState,useEffect,useContext} from "react";
import Footer from "./HomeComponents/Footer";
import LeftBar from "./HomeComponents/LeftBar";
import TopBar from "./HomeComponents/TopBar";
import Post from "./HomeComponents/Post";
import useUpload from "./HomeComponents/Posts/upload";
import {fetchGroupData} from "./HomeComponents/Service/backend";
import {UserContext} from "./hooks/UserContext";

function Home() {
  const {
    uploadedImage,
    uploadedVideo,
    handlePhotoUpload,
    handleVideoUpload,
    clearUploads,
  } = useUpload();

  const { setSelectedGroup } = useContext(UserContext);
  const [groupData, setGroupData] = useState([]); 


  // 获取分组数据
  useEffect(() => {
    const fetchData = async () => {
      try {
        const groups = await fetchGroupData(); // 从后端获取分组数据
        setGroupData(groups); // 更新分组状态

        // 查找第一个默认组
        const defaultGroup = groups.find(group => group.isDefault);
        if (defaultGroup) {
          setSelectedGroup(defaultGroup); // 设置选定分组为默认组的 objectId
        }
      } catch (error) {
        console.error("Error fetching group data:", error);
      }
    };

    fetchData();
  }, [setSelectedGroup]);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* 确保 TopBar 始终在页面顶部 */}
      <div style={{ flexShrink: 0 }}>
        <TopBar
          onPhotoUpload={handlePhotoUpload}
          onVideoUpload={handleVideoUpload}
        />
      </div>
      <div style={{ display: "flex", flex: 1, padding: "10px" }}>
        <LeftBar 
        groupData={groupData}  
        />
        <div style={{ flex: 4}}>
          <Post
            uploadedImage={uploadedImage}
            uploadedVideo={uploadedVideo}
            clearUploads={clearUploads}
            
          />
        </div>
      </div>
      <Footer style={{ marginTop: "auto" }} />
    </div>
  );
}

export default Home;
