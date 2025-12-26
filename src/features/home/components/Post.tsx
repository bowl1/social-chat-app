"use client";

import React, { useState } from "react";
import PostSection from "./PostSection";
import { useUserStore } from "store/useUserStore";
import { useCreatePostMutation, useDeletePostMutation, usePostsQuery } from "@hooks/usePostQueries";

type PostProps = {
  uploadedImage: string | null;
  uploadedVideo: string | null;
  clearUploads: () => void;
};

function Post({ uploadedImage, uploadedVideo, clearUploads }: PostProps) {
  const { user, selectedGroup, avatar } = useUserStore();
  const [postContent, setPostContent] = useState("");
  const [showCommentSection, setShowCommentSection] = useState<Record<string, boolean>>({});

  const groupId = selectedGroup?.objectId;
  const postsQuery = usePostsQuery(groupId);

  const createPost = useCreatePostMutation(groupId, user?.username, avatar);
  const deletePost = useDeletePostMutation(groupId);

  const sendPost = async () => {
    if (!user) {
      alert("Please log in to post.");
      return;
    }

    if (!groupId) {
      alert("Please choose a group first.");
      return;
    }

    if (postContent.trim() || uploadedImage || uploadedVideo) {
      const newPostContent = {
        text: postContent || "",
        imageUrl: uploadedImage || null,
        videoUrl: uploadedVideo || null,
      };

      try {
        await createPost.mutateAsync(newPostContent);
        setPostContent("");
        clearUploads();
      } catch (error: any) {
        alert("Error saving post: " + error.message);
      }
    } else {
      alert("Please enter some content or upload media!");
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!user) {
      alert("please log in to delete!");
      return;
    }
    try {
      await deletePost.mutateAsync(postId);
    } catch (error: any) {
      console.error("Error deleting post from database:", error);
      alert(error.message);
    }
  };

  const toggleCommentSection = (postId: string) => {
    setShowCommentSection((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  return (
    <PostSection
      postContent={postContent}
      setPostContent={setPostContent}
      sendPost={sendPost}
      uploadedImage={uploadedImage}
      uploadedVideo={uploadedVideo}
      clearUploads={clearUploads}
      handleDeletePost={handleDeletePost}
      currentGroupPosts={postsQuery.data || []}
      showCommentSection={showCommentSection}
      toggleCommentSection={toggleCommentSection}
      groupId={groupId || ""}
      userName={user?.username}
      userAvatar={avatar}
    />
  );
}

export default Post;
