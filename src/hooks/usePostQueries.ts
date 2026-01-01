import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  sendPost,
  deletePost,
  fetchLikes,
  toggleLike,
  fetchPosts,
  fetchComments,
} from "@client/postsApi";
import { addComment, deleteComment } from "@client/commentsApi";
import type { Comment, Post } from "../types/models";

const buildNewPost = (
  savedPost: any,
  userName: string,
  userAvatar: string | null,
  content: any,
  groupId: string,
): Post => ({
  objectId: savedPost.objectId || savedPost.id,
  userName: userName || "You",
  userAvatar: userAvatar,
  content,
  likes: savedPost.likes || [],
  group: groupId,
  commentCount: savedPost.commentCount ?? 0,
});

const removeNestedComment = (comments: Comment[], targetId: string): Comment[] =>
  comments
    .map((c) => {
      if (c.id === targetId) return null;
      return {
        ...c,
        replies: removeNestedComment(c.replies || [], targetId),
      };
    })
    .filter(Boolean) as Comment[];

const addReplyNested = (
  comments: Comment[],
  parentId: string | null,
  reply: Comment,
): Comment[] => {
  if (!parentId) return [...comments, reply];
  return comments.map((c) => {
    if (c.id === parentId) {
      return { ...c, replies: [...(c.replies || []), reply] };
    }
    return { ...c, replies: addReplyNested(c.replies || [], parentId, reply) };
  });
};

// Query to fetch posts for a specific group
export const usePostsQuery = (groupId?: string | null) =>
  useQuery({
    queryKey: ["posts", groupId],
    queryFn: () => fetchPosts(groupId as string),
    enabled: !!groupId,
  });

// Mutation to create a new post
export const useCreatePostMutation = (
  groupId: string | undefined | null,
  userName: string | undefined,
  userAvatar: string | null | undefined,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (content: any) => sendPost(content, groupId as string),
    // if successful in the backend mutation, update the posts cache on the client side
    onSuccess: (savedPost, content) => {
      if (!groupId) return;
      const nextPost = buildNewPost(
        savedPost,
        userName || "You",
        userAvatar || null,
        content,
        groupId,
      );
      queryClient.setQueryData<Post[]>(["posts", groupId], (prev = []) => [nextPost, ...prev]);
    },
  });
};

export const useDeletePostMutation = (groupId?: string | null) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postId: string) => deletePost(postId),
    onSuccess: (_res, postId) => {
      if (!groupId) return;
      queryClient.setQueryData<Post[]>(["posts", groupId], (prev = []) =>
        prev.filter((p) => p.objectId !== postId),
      );
    },
  });
};

export const useCommentsQuery = (postId: string, enabled: boolean) =>
  useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId),
    enabled: enabled && !!postId,
  });

// Mutation to add a comment or reply to a post
export const useAddCommentMutation = (
  postId: string,
  groupId: string,
  author: string | undefined,
  avatar: string | null | undefined,
) => {
  const queryClient = useQueryClient();
  const bumpCommentCount = (delta: number) => {
    queryClient.setQueryData<Post[]>(["posts", groupId], (prev = []) =>
      prev.map((p) =>
        p.objectId === postId
          ? { ...p, commentCount: Math.max(0, (p.commentCount || 0) + delta) }
          : p,
      ),
    );
  };
  return useMutation({
    mutationFn: ({ content, parentId }: { content: any; parentId?: string | null }) => {
      const payload =
        typeof content === "object" && content !== null ? { ...content } : { content };
      if (author) payload.aliasName = author;
      if (avatar) payload.aliasAvatar = avatar;
      return addComment(payload, postId, groupId, parentId || null);
    },
    onSuccess: (savedComment, variables) => {
      const newComment: Comment = {
        id: savedComment.id,
        author: author || "You",
        avatar: avatar || null,
        content: variables.content,
        parentId: variables.parentId || null,
        replies: [],
      };
      queryClient.setQueryData<Comment[]>(["comments", postId], (prev = []) =>
        addReplyNested(prev, variables.parentId || null, newComment),
      );
      bumpCommentCount(1);
    },
  });
};

export const useDeleteCommentMutation = (postId: string, groupId?: string) => {
  const queryClient = useQueryClient();
  const bumpCommentCount = (delta: number) => {
    if (!groupId) return;
    queryClient.setQueryData<Post[]>(["posts", groupId], (prev = []) =>
      prev.map((p) =>
        p.objectId === postId
          ? { ...p, commentCount: Math.max(0, (p.commentCount || 0) + delta) }
          : p,
      ),
    );
  };
  return useMutation({
    mutationFn: (commentId: string) => deleteComment(postId, commentId),
    onSuccess: (_res, commentId) => {
      queryClient.setQueryData<Comment[]>(["comments", postId], (prev = []) =>
        removeNestedComment(prev, commentId),
      );
      bumpCommentCount(-1);
    },
  });
};

export const useLikesQuery = (postId: string, enabled: boolean) =>
  useQuery({
    queryKey: ["likes", postId],
    queryFn: () => fetchLikes(postId),
    enabled: enabled && !!postId,
  });

export const useToggleLikeMutation = (postId: string) =>
  useMutation({
    mutationFn: () => toggleLike(postId),
  });
