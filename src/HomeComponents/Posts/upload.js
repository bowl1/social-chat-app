import { useState } from "react";
import Parse from "parse";

function useUpload() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedVideo, setUploadedVideo] = useState(null);

  // 上传图片到后端并返回 URL
  const handlePhotoUpload = async (file) => {
    const parseFile = new Parse.File(file.name, file);

    try {
      await parseFile.save();
      const imageUrl = parseFile.url(); // 从后端获取文件 URL
      setUploadedImage(imageUrl);
      console.log("Image uploaded successfully:", imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    }
  };

  // 上传视频到后端并返回 URL
  const handleVideoUpload = async (file) => {
    const parseFile = new Parse.File(file.name, file);

    try {
      await parseFile.save();
      const videoUrl = parseFile.url(); // 从后端获取文件 URL
      setUploadedVideo(videoUrl);
      console.log("Video uploaded successfully:", videoUrl);
    } catch (error) {
      console.error("Error uploading video:", error);
      alert("Failed to upload video. Please try again.");

    }
  };

  const clearUploads = () => {
    setUploadedImage(null);
    setUploadedVideo(null);
  };

  return {
    uploadedImage,
    uploadedVideo,
    handlePhotoUpload,
    handleVideoUpload,
    clearUploads,
  };
}

export default useUpload;