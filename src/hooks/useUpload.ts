import { useState } from "react";
import { request } from "@client/httpClient";

function useUpload() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedVideo, setUploadedVideo] = useState<string | null>(null);

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await request("/upload", {
      method: "POST",
      body: formData,
    });
    return res.url as string;
  };

  const handlePhotoUpload = async (file: File) => {
    try {
      const imageUrl = await uploadFile(file);
      setUploadedImage(imageUrl);
      alert("Photo upload successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    }
  };

  const handleVideoUpload = async (file: File) => {
    try {
      const videoUrl = await uploadFile(file);
      setUploadedVideo(videoUrl);
      alert("Video upload successfully!");
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
