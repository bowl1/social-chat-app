import React, { useState } from "react";
import { IconButton } from "@chakra-ui/react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import Parse from "parse";

function Like({ initialLikes = 0, objectId }) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    if (!objectId) {
      console.error("Post Object ID is undefined.");
      return;
    }
    console.log("Liking post with ID: ", objectId); // 这里添加日志

    // 更新本地状态
    const newLikesCount = liked ? likes - 1 : likes + 1;
    setLikes(newLikesCount);
    setLiked(!liked);

    // 更新数据库中的 likes
    const PostObject = Parse.Object.extend("Post");
    const postQuery = new Parse.Query(PostObject);
    try {
      const post = await postQuery.get(objectId); // 使用 objectId
      if (post) {
        post.set("likes", newLikesCount); // 更新 likes 数量
        await post.save(); // 保存更新
        console.log(`Successfully updated likes for postId: ${objectId}, new likes count: ${newLikesCount}`);
      }
    } catch (error) {
      console.error("Error updating likes: ", error);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <IconButton
        icon={liked ? <FaHeart /> : <FaRegHeart />}
        aria-label="Like post"
        onClick={handleLike}
        variant="ghost"
      />
      <span style={{ marginLeft: '8px' }}>{likes}</span>
    </div>
  );
}

export default Like;