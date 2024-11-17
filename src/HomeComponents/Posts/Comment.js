import React, { useState, useContext } from "react";
import commentIcon from "../../Assets/comment.png"; // 评论图标
import trashIcon from "../../Assets/delete.png"; // 删除图标
import { CommentContainer, CommentContent, CommentAvatar, CommentText, CommentHeader, CommentAuthor, ReplyTo, CommentBody, 
  ButtonsInReply, ReplyInputContainer, ReplyInputField, ReplyButton, ReplyList, ActionButton, IconImage, } from "./CommentStyle";
import { UserContext } from "../../hooks/UserContext";

function Comment({ commentData, onReplySubmit, onDelete }) {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const { user, avatar } = useContext(UserContext);

  const handleReplySubmit = () => {
    if (replyContent.trim()) {
      onReplySubmit(
        {
          content: replyContent,
          author: user.username,
          avatar: avatar,
        },
        commentData.id,
        commentData.author
      );
      setReplyContent("");
      setShowReplyInput(false);
    }
  };

  function renderCommentContent(content) {
    if (typeof content === "number" || typeof content === "boolean") {
      return content.toString();
    }
    if (typeof content === "string") {
      try {
        const parsedContent = JSON.parse(content);
        if (typeof parsedContent === "object" && parsedContent?.content) {
          return parsedContent.content;
        }
        return parsedContent;
      } catch (error) {
        return content;
      }
    }
    if (typeof content === "object" && content !== null) {
      return content.content || "no content";
    }
    return "no content";
  }

  return (
    <CommentContainer>
      <CommentContent>
        <CommentAvatar src={commentData.avatar} alt="User avatar" />
        <CommentText>
          <CommentHeader>
            <CommentAuthor>
              {commentData.author}
              {commentData.parentAuthor && <ReplyTo> reply to {commentData.parentAuthor}</ReplyTo>}
            </CommentAuthor>
            <CommentBody>{renderCommentContent(commentData.content)}</CommentBody>
          </CommentHeader>
          <ButtonsInReply>
            <ActionButton onClick={() => setShowReplyInput(!showReplyInput)}>
              <IconImage src={commentIcon} alt="Reply to comment" />
            </ActionButton>
            <ActionButton onClick={() => onDelete(commentData.id, commentData.parentId)}>
              <IconImage src={trashIcon} alt="Delete comment" />
            </ActionButton>
          </ButtonsInReply>
          {showReplyInput && (
            <ReplyInputContainer>
              <ReplyInputField
                type="text"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write here..."
              />
              <ReplyButton onClick={handleReplySubmit}>reply</ReplyButton>
            </ReplyInputContainer>
          )}
        </CommentText>
      </CommentContent>
      <ReplyList>
        {(commentData.replies || []).map((reply) => (
          <Comment
            key={reply.id}
            commentData={{
              ...reply,
              isReply: true,
              parentAuthor: commentData.author,
            }}
            onReplySubmit={onReplySubmit}
            onDelete={onDelete}
          />
        ))}
      </ReplyList>
    </CommentContainer>
  );
}

export default Comment;