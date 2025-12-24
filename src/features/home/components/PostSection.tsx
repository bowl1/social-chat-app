import React from "react";
import cursor from "assets/cursor.png";
import Like from "./Posts/Like";
import CommentSection from "./Posts/CommentSection";
import trashIcon from "assets/delete.png";
import commentIcon from "assets/comment.png";
import {
  PostArea,
  PostContainer,
  InputWrapper,
  InputField,
  ActionIcon,
  PostsList,
  PostItem,
  PostHeader,
  PostAvatar,
  ContentContainer,
  PostUsername,
  PostContent,
  UploadedMedia,
  PostActions,
  IconImage,
  ActionButton,
} from "./PostSectionStyle";
import type { Post as PostType } from "@types/models";

type PostSectionProps = {
  postContent: string;
  setPostContent: (v: string) => void;
  sendPost: () => void;
  currentGroupPosts: PostType[];
  showCommentSection: Record<string, boolean>;
  toggleCommentSection: (id: string) => void;
  handleDeletePost: (id: string) => void;
  groupId: string;
  userName?: string;
  userAvatar?: string | null;
};

function PostSection({
  postContent,
  setPostContent,
  sendPost,
  currentGroupPosts,
  showCommentSection,
  toggleCommentSection,
  handleDeletePost,
  groupId,
  userName,
  userAvatar,
}: PostSectionProps) {
  const renderPostContent = (content) => {
    const { text, imageUrl, videoUrl } = content || {};
    return (
      <div>
        {text && <p>{text} </p>}
        {imageUrl && !videoUrl && <UploadedMedia as="img" src={imageUrl} alt="" />}
        {videoUrl && !imageUrl && <UploadedMedia as="video" controls src={videoUrl} />}
      </div>
    );
  };

  return (
    <PostArea>
      <PostContainer>
        <InputWrapper>
          <InputField
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="What's on your mind?"
            rows={4}
          />
        </InputWrapper>
        <ActionIcon src={cursor.src} alt="send post" onClick={sendPost} />
      </PostContainer>

      <PostsList>
        {currentGroupPosts.map((post) => {
          return (
            <PostItem key={post.objectId}>
              <PostHeader>
                <PostAvatar src={post.userAvatar || ""} alt={`${post.userName}'s avatar`} />
                <PostUsername>{post.userName}</PostUsername>
              </PostHeader>
              <ContentContainer>
                <PostContent>{renderPostContent(post.content)}</PostContent>
              </ContentContainer>
              <PostActions>
                <Like objectId={post.objectId} />
                <ActionButton onClick={() => toggleCommentSection(post.objectId)}>
                  <IconImage src={commentIcon.src} alt="Comment" />
                  Comment
                </ActionButton>
                <ActionButton onClick={() => handleDeletePost(post.objectId)}>
                  <IconImage src={trashIcon.src} alt="Delete" />
                  Delete
                </ActionButton>
              </PostActions>
              {showCommentSection[post.objectId] && (
                <CommentSection
                  postId={post.objectId}
                  groupId={groupId}
                  authorName={userName}
                  authorAvatar={userAvatar}
                />
              )}
            </PostItem>
          );
        })}
      </PostsList>
    </PostArea>
  );
}

export default PostSection;
