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
          avatar: avatar
        },
        commentData.id,
      );
      setReplyContent("");
      setShowReplyInput(false);
    }
  };

  function renderCommentContent(content) {
    // 如果是数字或布尔值，直接转为字符串
    if (typeof content === "number" || typeof content === "boolean") {
      return content.toString();
    }
  
    // 如果是字符串，尝试解析为 JSON
    if (typeof content === "string") {
      try {
        const parsedContent = JSON.parse(content);
        // 如果解析后的结果是对象且包含 content 字段
        return parsedContent?.content || parsedContent;
      } catch {
        // 如果解析失败，返回原始字符串
        return content;
      }
    }
  
    // 如果是对象且不为 null，返回其 content 字段或默认值
    if (content && typeof content === "object") {
      return content.content || "no content";
    }
  
    // 默认返回值
    return "no content";
  }

  return (
    <CommentContainer>
      <CommentContent>
          <CommentHeader>
          <CommentAvatar src={commentData.avatar} alt="User avatar"/>
            <CommentAuthor>
              {commentData.author}
              {commentData.parentAuthor && <ReplyTo> reply to {commentData.parentAuthor}</ReplyTo>}
            </CommentAuthor>
          </CommentHeader>

          <CommentText>
          <CommentBody>{renderCommentContent(commentData.content)}</CommentBody>
          <ButtonsInReply>
            <ActionButton onClick={() => setShowReplyInput(!showReplyInput)}>
              <IconImage src={commentIcon} alt="Reply to comment" />
              Reply
            </ActionButton>
            <ActionButton onClick={() => onDelete(commentData.id, commentData.parentId)}>
              <IconImage src={trashIcon} alt="Delete comment" />
              Delete
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
              <ReplyButton onClick={handleReplySubmit}>Reply</ReplyButton>
            </ReplyInputContainer>
          )}
        </CommentText>
      </CommentContent>
      <ReplyList>
        {(commentData.replies || []).map((reply) => (
          <Comment
            key={reply.id} //React 使用 key 来高效地更新 DOM，而不是重新渲染整个列表。如果没有 key 或 key 不唯一，React 无法判断哪些列表项需要更新，哪些可以复用，会导致性能下降。
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