import React from "react";
import heartIcon from "assets/heart.png";
import heartPlusIcon from "assets/heart_plus.png";
import { LikeContainer, LikeButton, IconImage, LikeCount } from "./LikeStyle";
import { useUserStore } from "store/useUserStore";
import { useLikesQuery, useToggleLikeMutation } from "@hooks/usePostQueries";

type LikeProps = {
  objectId: string;
};

function Like({ objectId }: LikeProps) {
  const user = useUserStore((s) => s.user);
  const userId = user?.id;
  const likesQuery = useLikesQuery(objectId, !!objectId);
  const toggleLike = useToggleLikeMutation(objectId);

  const likes = likesQuery.data || [];
  const liked = userId ? likes.includes(userId) : false;

  const handleLike = async () => {
    if (!user) {
      alert("Please log in to like posts!");
      return;
    }

    try {
      await toggleLike.mutateAsync();
      await likesQuery.refetch();
    } catch (error) {
      console.error("Error updating likes:", (error as any)?.message);
    }
  };

  return (
    <LikeContainer>
      <LikeButton onClick={handleLike}>
        <IconImage src={liked ? heartPlusIcon.src : heartIcon.src} alt="Like" />
        {liked ? "Unlike" : "Like"}
      </LikeButton>
      <LikeCount>{likes.length}</LikeCount>
    </LikeContainer>
  );
}

export default Like;
