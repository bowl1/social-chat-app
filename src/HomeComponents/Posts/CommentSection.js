import React, { useState, useEffect } from 'react';
import Comment from './Comment';
import {
  CommentSectionContainer,
  AddCommentContainer,
  CommentInput,
  AddCommentButton,
  CommentsList,
  RepliesContainer,
} from './CommentSectionStyle';

function CommentSection({ comments = [], onAddComment, onReplySubmit, onDelete }) {
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment.trim());
      setNewComment('');
    }
  };

  useEffect(() => {
  }, [comments]);

  const renderComments = (commentsList) => {
    return commentsList.map((comment) => (
      <Comment
        key={comment.id}
        commentData={comment}
        onReplySubmit={onReplySubmit}
        onDelete={onDelete}
      >
        {comment.replies && comment.replies.length > 0 && (
          <RepliesContainer>{renderComments(comment.replies)}</RepliesContainer>
        )}
      </Comment>
    ));
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
        <AddCommentButton onClick={handleAddComment}>Add Comment</AddCommentButton>
      </AddCommentContainer>
      <CommentsList>{renderComments(comments)}</CommentsList>
    </CommentSectionContainer>
  );
}

export default CommentSection;