import React, { useState, useEffect, useContext } from "react";
import heartIcon from "../../Assets/heart.png";
import heartPlusIcon from "../../Assets/heart_plus.png";
import Parse from "parse";
import { LikeContainer, LikeButton, IconImage, LikeCount } from "./LikeStyle";
import { UserContext } from "../../Context/UserContext"; 

function Like({ objectId }) {
  const { user } = useContext(UserContext); 
  const userId = user?.id; 
  const [likes, setLikes] = useState([]); // 存储点赞用户 ID 的数组
  const [liked, setLiked] = useState(false); // 当前用户是否已点赞

  const fetchInitialLikes = async () => {
    if (!objectId) return; // 如果没有帖子 ID，直接返回

    try {
      const result = await Parse.Cloud.run("fetchInitialLikes", { postId: objectId });
      const currentLikes = result.likes || [];
      setLikes(currentLikes); // 更新点赞用户数组
      setLiked(currentLikes.includes(userId)); // 检查当前用户是否已点赞
    } catch (error) {
      console.error("Error fetching likes:", error.message);
    }
  };

  useEffect(() => {
    fetchInitialLikes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [objectId, userId]); // 当 objectId 或 userId 变化时重新获取点赞数据

  const handleLike = async () => {
    if (!user) {
      alert("Please log in to like posts!");
      return;
    }

    try {
      const result = await Parse.Cloud.run("updateLikes", { postId: objectId, userId });
      setLikes(result.likes); // 更新最新点赞数据
      setLiked(result.likes.includes(userId)); // 更新点赞状态
    } catch (error) {
      console.error("Error updating likes:", error.message);
    }
  };

  return (
    <LikeContainer>
      <LikeButton onClick={handleLike}>
        <IconImage src={liked ? heartPlusIcon : heartIcon} alt="Like" />
        {liked ? "Unlike" : "Like"}
      </LikeButton>
      <LikeCount>{likes.length}</LikeCount> 
    </LikeContainer>
  );
}

export default Like;