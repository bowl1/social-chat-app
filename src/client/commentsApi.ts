import { request } from "./httpClient";

export const addComment = async (
  content: any,
  postId: string,
  groupId: string,
  parentId: string | null = null,
) => {
  const res = await request(`/posts/${postId}/comments`, {
    method: "POST",
    body: { content, groupId, parentId },
  });
  return res.comment;
};

export const deleteComment = async (postId: string, commentId: string) => {
  await request(`/posts/${postId}/comments/${commentId}`, { method: "DELETE" });
};
