import React from "react";
import cursor from "../Assets/cursor.png";
import Like from "./Posts/Like";
import CommentSection from "./Posts/CommentSection";
import trashIcon from "../Assets/delete.png";
import commentIcon from "../Assets/comment.png";
import {PostArea,PostContainer,InputWrapper,InputField,ActionIcon,PostsList,PostItem,PostHeader,PostAvatar,ContentContainer,
  PostUsername,PostContent,UploadedMedia,PostActions, IconImage,ActionButton,} from "./PostUIStyle";

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
  function renderPostContent(content) {
    const { text, imageUrl, videoUrl } = content || {};
    return (
      <div>
        {text && <p>{text}</p>}
        {imageUrl && <UploadedMedia src={imageUrl} alt="" />}
        {videoUrl && <UploadedMedia as="video" controls src={videoUrl} />}
      </div>
    );
  }

  return (
    <PostArea>
      <PostContainer>
        <InputWrapper>
          <InputField
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="Write something here..."
            rows={4}
          />
        </InputWrapper>
        <ActionIcon src={cursor} alt="send post" onClick={sendPost} />
      </PostContainer>

      <PostsList>
        {currentGroupPosts.map((post) => (
          <PostItem key={post.objectId}>
            <PostHeader>
              <PostAvatar src={post.userAvatar} alt={`${post.userName}'s avatar`} />
              <ContentContainer>
                <PostUsername>{post.userName}</PostUsername>
                <PostContent>{renderPostContent(post.content)}</PostContent>
              </ContentContainer>
            </PostHeader>
            <PostActions>
              <Like initialLikes={post.likes} objectId={post.objectId} />
              <ActionButton onClick={() => toggleCommentSection(post.objectId)}>
                <IconImage src={commentIcon} alt="Comment" />
              </ActionButton>
              <ActionButton onClick={() => handleDeletePost(post.objectId)}>
                <IconImage src={trashIcon} alt="Delete" />
              </ActionButton>
            </PostActions>
            {showCommentSection[post.objectId] && (
              <CommentSection
                comments={commentsByPost[post.objectId] || []}
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
          </PostItem>
        ))}
      </PostsList>
    </PostArea>
  );
}

export default PostUI;