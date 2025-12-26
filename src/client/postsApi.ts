import { request } from "./httpClient";
import type { Comment, Post } from "../types/models";
import { extractAuthorInfo } from "./utils/mappers";

export const sendPost = async (postContent: any, selectedGroupId: string) => {
  const res = await request("/posts", {
    method: "POST",
    body: { content: postContent, groupId: selectedGroupId },
  });
  return res.post;
};

export const deletePost = async (postId: string) => {
  await request(`/posts/${postId}`, { method: "DELETE" });
};

export const fetchLikes = async (postId: string) => {
  const res = await request(`/posts/${postId}/likes`);
  return res.likes || [];
};

export const toggleLike = async (postId: string) => {
  const res = await request(`/posts/${postId}/like`, { method: "POST" });
  return res.likes || [];
};

export const fetchPosts = async (groupId: string): Promise<Post[]> => {
  const res = await request(`/posts?groupId=${groupId}`);
  return (res.posts || []).map((post: any) => ({
    objectId: post.objectId || post.id,
    userName: post.userName,
    userAvatar: post.userAvatar,
    content: post.content || {},
    group: post.group || groupId,
    likes: post.likes || [],
    createdAt: post.createdAt,
  }));
};

export const fetchComments = async (postId: string): Promise<Comment[]> => {
  const res = await request(`/posts/${postId}/comments`);

  const comments = (res.comments || []).map((comment: any) => {
    const { username, avatarUrl } = extractAuthorInfo({
      username: comment.author,
      avatar: comment.avatar,
    });

    return {
      id: comment.id,
      author: username,
      avatar: avatarUrl,
      content: comment.content,
      parentId: comment.parentId || null,
      replies: [],
    };
  });

  const commentMap: Record<string, Comment> = {};
  comments.forEach((comment) => {
    commentMap[comment.id] = comment;
  });

  const nestedComments: Comment[] = [];
  comments.forEach((comment) => {
    if (comment.parentId) {
      if (commentMap[comment.parentId]) {
        commentMap[comment.parentId].replies.push(comment);
      }
    } else {
      nestedComments.push(comment);
    }
  });

  return nestedComments;
};
