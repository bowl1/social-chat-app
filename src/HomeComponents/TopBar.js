import React from "react";
import "./TopBar.css";
import { useState,useContext} from "react";
import uploadPhotos from "../Assets/uploadPhotos.png";
import uploadVideos from "../Assets/uploadVideos.png";
import { UserContext } from '../hooks/UserContext'; 


function TopBar({ onPhotoUpload, onVideoUpload}) {
  const { user } = useContext(UserContext); 
  const [photoInputKey, setPhotoInputKey] = useState(Date.now()); // 单独为图片使用的 inputKey
  const [videoInputKey, setVideoInputKey] = useState(Date.now()); // 单独为视频使用的 inputKey

  const handlePhotoChange = (e) => {
    console.log("Photo selected:", e.target.files[0]);
    onPhotoUpload(e.target.files[0]);
    setPhotoInputKey(Date.now()); // 上传完成后重置 photoInputKey
  };

  const handleVideoChange = (e) => {
    console.log("Video selected:", e.target.files[0]);
    onVideoUpload(e.target.files[0]);
    setVideoInputKey(Date.now()); // 上传完成后重置 videoInputKey
  };

  return (
    <header className="dashboard-header">
      <div className="top-bar">
        <section className="welcome-section">
          <div className="greeting-container">
            <h1 className="welcome-heading">Welcome back, {user ? user.get("username") : "Guest"} !</h1>
            <p className="welcome-subheading">Here is what you've missed</p>
          </div>
        </section>

        <section className="upload-section">
          <input
           key={`photo-${photoInputKey}`} // 单独使用 photoInputKey // 使用 key 属性强制重新渲染
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            style={{ display: "none" }}
            id="upload-photo"
          />
          <label htmlFor="upload-photo">
            <img src={uploadPhotos} alt="" />
            <span>Upload Photo</span>
          </label>

          <input
            key={`video-${videoInputKey}`}// 使用 key 属性强制重新渲染
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
            style={{ display: "none" }}
            id="upload-video"
          />
          <label htmlFor="upload-video">
            <img src={uploadVideos} alt="Upload Video" />
            <span>Upload Video</span>
          </label>
        </section>
      </div>
    </header>
  );
}
export default TopBar;
