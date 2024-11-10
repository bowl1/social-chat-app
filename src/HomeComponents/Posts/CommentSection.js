import React, { useState, useEffect } from 'react';
import Comment from './Comment';
import './CommentSection.css';

function CommentSection({ comments = [], onAddComment, onReplySubmit, onDelete }) {
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment.trim());
      setNewComment('');
    }
  };

  useEffect(() => {
    console.log("CommentSection received comments:", comments);
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
          <div className="replies">
            {renderComments(comment.replies)}
          </div>
        )}
      </Comment>
    ));
  };

  return (
    <div className="comment-section">
      <div className="add-comment">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your comment..."
        />
        <button onClick={handleAddComment}>Add Comment</button>
      </div>

      <div className="comments-list">
        {renderComments(comments)}
      </div>
    </div>
  );
}

export default CommentSection;