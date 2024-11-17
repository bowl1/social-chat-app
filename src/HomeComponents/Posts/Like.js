import React, { useState } from "react";
import heartIcon from "../../Assets/heart.png";
import heartPlusIcon from "../../Assets/heart_plus.png";
import Parse from "parse";
import { LikeContainer, LikeButton, IconImage, LikeCount } from "./LikeStyle";

function Like({ initialLikes = 0, objectId }) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false); // 防止重复点击

  const handleLike = async () => {
    if (!objectId) {
      console.error("Post Object ID is undefined.");
      alert("Post does not exist.");
      return;
    }

    if (loading) return; // 防止重复点击
    setLoading(true);

    const newLikesCount = liked ? likes - 1 : likes + 1;

    // 乐观更新前端状态
    setLikes(newLikesCount);
    setLiked(!liked);

    const PostObject = Parse.Object.extend("Post");
    const postQuery = new Parse.Query(PostObject);

    try {
      const post = await postQuery.get(objectId);
      if (!post) {
        throw new Error("Post not found.");
      }

      // 更新 likes 字段
      post.increment(liked ? "likes" : "likes", liked ? -1 : 1); // 原子递增
      await post.save();
      console.log("Likes updated successfully for post:", objectId);
    } catch (error) {
      console.error("Error updating likes:", error.message);

      // 如果更新失败，回滚前端状态
      setLikes(liked ? likes + 1 : likes - 1);
      setLiked(!liked);
      alert(`Failed to update likes: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LikeContainer>
      <LikeButton onClick={handleLike} disabled={loading}>
        <IconImage
          src={liked ? heartPlusIcon : heartIcon}
          alt="Like button"
        />
      </LikeButton>
      <LikeCount>{likes}</LikeCount>
    </LikeContainer>
  );
}

// 确保正确导出
export default Like;