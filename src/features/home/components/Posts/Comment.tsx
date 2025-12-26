"use client";

import React, { useState } from "react";
const commentIcon = "/assets/comment.png";
const trashIcon = "/assets/delete.png";
import {
  CommentContainer,
  CommentContent,
  CommentAvatar,
  CommentText,
  CommentHeader,
  CommentAuthor,
  ReplyTo,
  CommentBody,
  ButtonsInReply,
  ReplyInputContainer,
  ReplyInputField,
  ReplyButton,
  ReplyList,
  ActionButton,
  IconImage,
} from "./CommentStyle";
import { useUserStore } from "store/useUserStore";

type CommentProps = {
  commentData: any;
  onReplySubmit: (content: any, parentId?: string) => Promise<void> | void;
  onDelete: (commentId: string, parentId?: string | null) => Promise<void> | void;
  depth?: number;
  maxDepth?: number;
};

function Comment({ commentData, onReplySubmit, onDelete, depth = 1, maxDepth = 2 }: CommentProps) {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const { user, avatar } = useUserStore();
  const canReply = depth <= maxDepth; //control reply depth, if depth exceeds maxDepth, flatten replies

  const handleReplySubmit = () => {
    if (!user) {
      alert("Please log in to reply!");
      return;
    }
    if (replyContent.trim()) {
      onReplySubmit(
        {
          content: replyContent,
          author: user.username,
          avatar: avatar,
        },
        commentData.id,
      );
      setReplyContent("");
      setShowReplyInput(false);
    }
  };

  const renderCommentContent = (content) => {
    // If it is a number or Boolean value, convert it directly to a string
    if (typeof content === "number" || typeof content === "boolean") {
      return content.toString();
    }

    // If it's a string, try parsing it as JSON
    if (typeof content === "string") {
      try {
        const parsedContent = JSON.parse(content);
        // If the parsed result is an object and contains the content field, in case of {"content": "actual comment"}
        return parsedContent?.content || parsedContent;
      } catch {
        // If parsing fails, return the original string
        return content;
      }
    }

    // If it is an object and not null, return its content field or default value, in case [object object]
    if (content && typeof content === "object") {
      return content.content || "no content";
    }

    return "no content";
  };

  return (
    <CommentContainer>
      <CommentContent>
        <CommentHeader>
          <CommentAvatar src={commentData.avatar} alt="User avatar" />
          <CommentAuthor>
            {commentData.author}
            {commentData.parentAuthor && <ReplyTo> reply to {commentData.parentAuthor}</ReplyTo>}
          </CommentAuthor>
        </CommentHeader>

        <CommentText>
          <CommentBody>{renderCommentContent(commentData.content)}</CommentBody>
          <ButtonsInReply>
            {canReply && (
              <ActionButton onClick={() => setShowReplyInput(!showReplyInput)}>
                <IconImage src={commentIcon} alt="Reply to comment" />
                Reply
              </ActionButton>
            )}
            <ActionButton onClick={() => onDelete(commentData.id, commentData.parentId)}>
              <IconImage src={trashIcon} alt="Delete comment" />
              Delete
            </ActionButton>
          </ButtonsInReply>

          {canReply && showReplyInput && (
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
        {(depth < maxDepth
          ? commentData.replies || []
          : flattenReplies(commentData.replies || [], commentData.author)
        ).map((reply) => (
          <Comment
            key={reply.id}
            commentData={{
              ...reply,
              parentAuthor: reply.parentAuthor || commentData.author,
              replies: depth < maxDepth ? reply.replies : [],
            }}
            onReplySubmit={onReplySubmit}
            onDelete={onDelete}
            depth={Math.min(depth + 1, maxDepth)}
            maxDepth={maxDepth}
          />
        ))}
      </ReplyList>
    </CommentContainer>
  );
}

// Helper function to flatten replies beyond max depth
function flattenReplies(replies: any[], parentAuthor?: string): any[] {
  const result: any[] = [];
  replies.forEach((reply) => {
    result.push({ ...reply, parentAuthor: reply.parentAuthor || parentAuthor, replies: [] });
    if (reply.replies && reply.replies.length) {
      result.push(...flattenReplies(reply.replies, reply.author || parentAuthor));
    }
  });
  return result;
}

export default Comment;
