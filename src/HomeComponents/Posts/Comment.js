import React, { useState, useContext } from "react";
import "./Comment.css";
import { IconButton } from "@chakra-ui/react";
import { FaTrash, FaRegComment } from "react-icons/fa";
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

  // 检查和渲染评论内容，确保是字符串
  function renderCommentContent(content) {
    console.log("Original content:", content, "Type:", typeof content); // 调试日志
    
    // 直接处理数字和布尔值
    if (typeof content === 'number' || typeof content === 'boolean') {
      console.log("Content is a number or boolean:", content);
      return content.toString(); // 将数字或布尔值转换为字符串返回
    }
  
    // 处理字符串类型
    if (typeof content === 'string') {
      try {
        const parsedContent = JSON.parse(content);
        console.log("Parsed content:", parsedContent); // 打印解析后的内容
  
        // 如果解析后的内容是对象并且有 'content' 字段，返回该字段
        if (typeof parsedContent === 'object' && parsedContent !== null && parsedContent.content) {
          return parsedContent.content;
        }
        // 如果解析后的内容是字符串或数字，直接返回
        if (typeof parsedContent === 'string' || typeof parsedContent === 'number') {
          return parsedContent;
        }
      } catch (error) {
        console.warn("Failed to parse content as JSON. Returning original string content."); // 解析失败，返回原始字符串
        return content;
      }
    } 
  
    // 如果内容是对象且不为空
    if (typeof content === 'object' && content !== null) {
      console.log("Content is an object:", content); // 打印对象内容
      return content.content || "无内容";
    }
  
    console.warn("Content is of an unexpected type. Returning default text."); // 类型不匹配
    return "无内容"; 
  }

  return (
    <div className="comment">
      <div className="comment-content">
        <img
          src={commentData.avatar}
          alt="User avatar"
          className="comment-avatar"
        />
        <div className="comment-text">
          <div className="comment-header">
            <span className="comment-author">
              {commentData.author}
              {commentData.parentAuthor && (
                <span className="reply-to">
                  {" "}
                  reply to {commentData.parentAuthor}
                </span>
              )}
            </span>
            <p className="comment-body">
              {/* 使用 renderCommentContent 解析和渲染内容 */}
              {renderCommentContent(commentData.content)}
            </p>
          </div>

          <div className="buttonsInReply">
            <IconButton
              onClick={() => setShowReplyInput(!showReplyInput)}
              aria-label="Reply to comment"
              variant="ghost"
              size="sm"
              leftIcon={<FaRegComment />}
            />
            <IconButton
              icon={<FaTrash />}
              aria-label="Delete comment"
              variant="ghost"
              onClick={() => onDelete(commentData.id, commentData.parentId)}
            />
          </div>

          {showReplyInput && (
            <div className="reply-input">
              <input
                type="text"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="writing here..."
              />
              <button onClick={handleReplySubmit}>Comment</button>
            </div>
          )}
        </div>
      </div>

      <div className="reply-list">
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
      </div>
    </div>
  );
}

export default Comment;