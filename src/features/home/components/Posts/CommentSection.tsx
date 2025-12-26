"use client";

import React, { useState } from "react";
import Comment from "./Comment";
import {
  CommentSectionContainer,
  AddCommentContainer,
  CommentInput,
  AddCommentButton,
  CommentsList,
} from "./CommentSectionStyle";
import {
  useAddCommentMutation,
  useCommentsQuery,
  useDeleteCommentMutation,
} from "@hooks/usePostQueries";

type CommentSectionProps = {
  postId: string;
  groupId: string;
  authorName?: string;
  authorAvatar?: string | null;
};

function CommentSection({ postId, groupId, authorName, authorAvatar }: CommentSectionProps) {
  const [newComment, setNewComment] = useState("");
  const commentsQuery = useCommentsQuery(postId, true);
  const addComment = useAddCommentMutation(postId, groupId, authorName, authorAvatar);
  const deleteComment = useDeleteCommentMutation(postId);

  const handleAddComment = async () => {
    if (newComment.trim()) {
      await addComment.mutateAsync({ content: newComment.trim(), parentId: null });
      setNewComment("");
    }
  };

  const handleReplySubmit = async (content: any, parentId?: string) => {
    await addComment.mutateAsync({ content, parentId });
  };

  const handleDelete = async (commentId: string) => {
    await deleteComment.mutateAsync(commentId);
  };

  const comments = commentsQuery.data || [];

  return (
    <CommentSectionContainer>
      <AddCommentContainer>
        <CommentInput
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write here..."
        />
        <AddCommentButton onClick={handleAddComment}>Add Comment</AddCommentButton>
      </AddCommentContainer>
      <CommentsList>
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            commentData={comment}
            onReplySubmit={handleReplySubmit}
            onDelete={handleDelete}
            depth={1}
            maxDepth={2}
          />
        ))}
      </CommentsList>
    </CommentSectionContainer>
  );
}

export default CommentSection;
