import React, { useState, useEffect, useContext } from "react";
import heartIcon from "../../Assets/heart.png";
import heartPlusIcon from "../../Assets/heart_plus.png";
import Parse from "parse";
import { LikeContainer, LikeButton, IconImage, LikeCount } from "./LikeStyle";
import { UserContext } from "../../hooks/UserContext"; // 导入 UserContext

function Like({ objectId }) {
  const { user } = useContext(UserContext); // 获取当前用户信息
  const userId = user?.id; // 获取当前用户的唯一标识符
  const [likes, setLikes] = useState([]); // 初始为空数组
  const [liked, setLiked] = useState(false); // 初始状态是否已点赞
  const [loading, setLoading] = useState(false);

  // 获取帖子初始点赞状态
  useEffect(() => {
    if (!objectId) return; // 如果没有传递 objectId，跳过

    const fetchLikes = async () => {
      const PostObject = Parse.Object.extend("Post");
      const postQuery = new Parse.Query(PostObject);

      try {
        const post = await postQuery.get(objectId);
        const currentLikes = post.get("likes") || [];
        setLikes(currentLikes);

        // 检查当前用户是否已点赞
        const userAlreadyLiked = currentLikes.includes(userId);
        setLiked(userAlreadyLiked);
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };

    fetchLikes();
  }, [objectId, userId]); // 每次 objectId 或 userId 改变时重新加载点赞数据

  const handleLike = async () => {
    if (!userId || !objectId) {
      console.error("Post Object ID or User ID is undefined.");
      return;
    }

    if (loading) return; // 防止重复点击
    setLoading(true);

    const PostObject = Parse.Object.extend("Post");
    const postQuery = new Parse.Query(PostObject);

    try {
      const post = await postQuery.get(objectId);
      if (!post) {
        throw new Error("Post not found.");
      }

      let currentLikes = post.get("likes") || [];
      if (currentLikes.includes(userId)) {
        // 如果用户已经点赞，移除其ID
        currentLikes = currentLikes.filter((id) => id !== userId);
      } else {
        // 如果用户没有点赞，添加其ID
        currentLikes.push(userId);
      }

      post.set("likes", currentLikes); // 更新点赞数组
      await post.save(); // 保存更新后的帖子

      setLikes(currentLikes); // 更新前端的点赞状态
      setLiked(!liked); // 切换点赞状态
    } catch (error) {
      console.error("Error updating likes:", error);
      alert(`Failed to update likes: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LikeContainer>
      <LikeButton onClick={handleLike} disabled={loading}>
        <IconImage src={liked ? heartPlusIcon : heartIcon} alt="Like button" />
        Likes
      </LikeButton>
      <LikeCount>{likes.length}</LikeCount>
    </LikeContainer>
  );
}

export default Like;
