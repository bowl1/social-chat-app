import React, { useState, useEffect, useContext } from "react";
import heartIcon from "../../Assets/heart.png";
import heartPlusIcon from "../../Assets/heart_plus.png";
import Parse from "parse";
import { LikeContainer, LikeButton, IconImage, LikeCount } from "./LikeStyle";
import { UserContext } from "../../Context/UserContext"; // 导入 UserContext

function Like({ objectId }) {
  const {user } = useContext(UserContext); // 获取当前用户信息
  const userId = user?.id; // 获取当前用户的唯一标识符
  const [likes, setLikes] = useState([]); // 初始为空数组
  const [liked, setLiked] = useState(false); // 初始状态是否已点赞

  // 获取帖子初始点赞状态
  const fetchInitialLikes = async () => {
    if (!objectId) return; // 如果没有帖子 ID，直接返回
  
    const PostObject = Parse.Object.extend("Post");
    const postQuery = new Parse.Query(PostObject);
  
    try {
      const post = await postQuery.get(objectId);
      const currentLikes = post.get("likes") || [];
      setLikes(currentLikes); // 直接使用组件的状态更新函数
  
      const userAlreadyLiked = currentLikes.includes(userId);
      setLiked(userAlreadyLiked); // 直接更新状态
    } catch (error) {
      console.error("Error fetching likes:", error);
    }
  };
  
  useEffect(() => {
    fetchInitialLikes();
  }, [objectId, userId]); // 每次 objectId 或 userId 改变时重新加载点赞数据

  const handleLike = async () => {
    try {
      const response = await Parse.Cloud.run("updateLikes", {
        postId: objectId,
        userId: user.id,
      });
  
      if (response.success) {
        setLikes(response.likesCount); // 更新点赞数
        setLiked(!liked); // 切换点赞状态
      }
    } catch (error) {
      console.error("Failed to toggle like:", error);
      alert(`Failed to toggle like: ${error.message}`);
    }
  };

  return (
    <LikeContainer>
      <LikeButton onClick={handleLike}>
        <IconImage src={liked ? heartPlusIcon : heartIcon} alt="Like" />
        Likes
      </LikeButton>
      <LikeCount>{likes}</LikeCount>
    </LikeContainer>
  );
}

export default Like;
