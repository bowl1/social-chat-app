import React from "react";
import cursor from "../Assets/cursor.png";
import "./PostUI.css";
import { IconButton, Flex } from "@chakra-ui/react";
import { FaRegComment, FaTrash } from "react-icons/fa";
import Like from "./Posts/Like";
import CommentSection from "./Posts/CommentSection";

function PostUI({
  postContent,
  setPostContent,
  sendPost,
  currentGroupPosts,
  showCommentSection,
  toggleCommentSection,
  handleDeletePost,
  addCommentOrReply,
  deleteCommentOrReply,
  commentsByPost,
}) {
  // 解析和渲染 post 内容
  function renderPostContent(content) {
    const { text, imageUrl, videoUrl } = content || {};
    
    return (
      <div>
        {text && <p>{text}</p>}
        {imageUrl && <img src={imageUrl} alt="" className="uploaded-media" />}
        {videoUrl && <video controls src={videoUrl} className="uploaded-media" />}
      </div>
    );
  }

  return (
    <article className="post-area">
      <div className="post-container">
        <div className="input-wrapper">
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="Write something here..."
            className="input-field"
            rows={4}
          />
        </div>
        <img
          src={cursor}
          alt="send post"
          className="action-icon"
          onClick={sendPost}
        />
      </div>

      <div className="posts-list">
        {currentGroupPosts.map((post) => (
          <div key={post.objectId} className="post-item">
            <div className="post-header">
              <img
               src={post.userAvatar} alt={`${post.userName}'s avatar`} className="post-avatar" />
              <div className="content-container">
                <span className="post-username">{post.userName}</span>
                <div className="post-content">
                  {renderPostContent(post.content)}
                </div>
              </div>
            </div>
            <Flex justify="space-between" mt="10px">
              <Like initialLikes={post.likes} objectId={post.objectId} />
              <IconButton
                icon={<FaRegComment />}
                aria-label="Comment on post"
                variant="ghost"
                onClick={() => toggleCommentSection(post.objectId)}
              />
              <IconButton
                icon={<FaTrash />}
                aria-label="Delete post"
                variant="ghost"
                onClick={() => handleDeletePost(post.objectId)}
              />
            </Flex>
            {showCommentSection[post.objectId] && (
              <CommentSection
                comments={commentsByPost[post.objectId] || []} // 确保评论传递正确
                onAddComment={(content) =>
                  addCommentOrReply(post.objectId, content)
                }
                onReplySubmit={(content, parentId) =>
                  addCommentOrReply(post.objectId, content, parentId)
                }
                onDelete={(commentId) =>
                  deleteCommentOrReply(post.objectId, commentId)
                }
              />
            )}
          </div>
        ))}
      </div>
    </article>
  );
}

export default PostUI;