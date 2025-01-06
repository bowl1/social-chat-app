import React, { useState } from "react";
import Comment from "./Comment";
import {
  CommentSectionContainer,
  AddCommentContainer,
  CommentInput,
  AddCommentButton,
  CommentsList,
} from "./CommentSectionStyle";

function CommentSection({
  comments = [],
  onAddComment,
  onReplySubmit,
  onDelete,
}) {
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment.trim());
      setNewComment(""); // 清空输入框
    }
  };
  
  return (
    <CommentSectionContainer>
      <AddCommentContainer>
        <CommentInput
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write here..."
        />
        <AddCommentButton onClick={handleAddComment}>
          Add Comment
        </AddCommentButton>
      </AddCommentContainer>
      <CommentsList>
        {comments.map((comment) => (
          <Comment
            key={comment.id} //key 是 React 内部使用的，与组件 props 无关。它是 React 高效渲染列表的关键，帮助 React 正确地对比虚拟 DOM
            commentData={comment}
            onReplySubmit={onReplySubmit}
            onDelete={onDelete}
          />
        ))}
      </CommentsList>
    </CommentSectionContainer>
  );
}

export default CommentSection;
