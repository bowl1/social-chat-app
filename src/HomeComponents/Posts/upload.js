import { useState } from 'react';

function useUpload() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedVideo, setUploadedVideo] = useState(null);

  const handlePhotoUpload = (file) => {
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);
  
  };

  const handleVideoUpload = (file) => {
    const videoUrl = URL.createObjectURL(file);
    setUploadedVideo(videoUrl);
  
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