import React, { useState, useContext, useEffect } from "react";
import PostSection from "./PostSection";
import {
  sendPostToDatabase,
  addCommentToDatabase,
  deletePostFromDatabase,
  deleteCommentFromDatabase,
} from "../Service/Backend";
import { UserContext } from "../Context/UserContext";
import {
  loadPostsFromDatabase,
  loadCommentsFromDatabase,
} from "../Service/FetchData";

function Post({ uploadedImage, uploadedVideo, clearUploads }) {
  const { user, selectedGroup } = useContext(UserContext);
  const [postContent, setPostContent] = useState("");
  const [postsByGroup, setPostsByGroup] = useState({});
  const [showCommentSection, setShowCommentSection] = useState({});
  const [commentsByPost, setCommentsByPost] = useState({});

  const currentGroupPosts = selectedGroup
    ? postsByGroup[selectedGroup.objectId] || []
    : [];

  const fetchPostsForGroup = async (
    selectedGroup,
    setPostsByGroup,
    setCommentsByPost
  ) => {
    if (!selectedGroup?.objectId) {
      return; // 如果没有选中的分组，直接返回
    }

    try {
      // 加载当前分组的帖子
      const groupPosts = await loadPostsFromDatabase(selectedGroup.objectId);

      // 更新帖子数据到 state
      setPostsByGroup((prev) => ({
        ...prev,
        [selectedGroup.objectId]: groupPosts,
      }));

      // 使用 Promise.all 并行加载每个帖子的评论
      const commentsPromises = groupPosts.map((post) =>
        loadCommentsFromDatabase(post.objectId).then((nestedComments) => ({
          postId: post.objectId,
          comments: nestedComments,
        }))
      );

      // 等待所有评论加载完成
      const resolvedComments = await Promise.all(commentsPromises);

      // 格式化评论数据为 { postId: comments[] } 的结构
      const newCommentsByPost = resolvedComments.reduce(
        (acc, { postId, comments }) => {
          acc[postId] = comments;
          return acc;
        },
        {}
      );

      // 更新评论数据到 state
      setCommentsByPost(newCommentsByPost);
    } catch (error) {
      console.error("Error loading posts or comments:", error);
    }
  };

  useEffect(() => {
    fetchPostsForGroup(selectedGroup, setPostsByGroup, setCommentsByPost);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGroup?.objectId]); // 仅在分组 ID 发生变化时重新加载帖子和评论

  const sendPost = async () => {
    if (postContent.trim() || uploadedImage || uploadedVideo) {
      const newPostContent = {
        text: postContent || "",
        imageUrl: uploadedImage || null,
        videoUrl: uploadedVideo || null,
      };

      try {
        const savedPost = await sendPostToDatabase(
          newPostContent,
          selectedGroup.objectId
        );

        const newPost = {
          objectId: savedPost.id,
          userName: user.get("username"),
          userAvatar: user.get("avatar")
            ? user.get("avatar").url() + "?" + Date.now()
            : null, //	+ "?" + Date.now() 的作用是在 URL 后追加一个独特的查询字符串（基于当前时间的时间戳），使得每次 URL 都是唯一的，从而强制浏览器重新加载最新的图片，而不是从缓存中取旧图片。
          content: newPostContent,
          likes: savedPost.likes,
          group: selectedGroup.objectId,
        };

        setPostsByGroup((prev) => ({
          ...prev,
          [selectedGroup.objectId]: [
            newPost,
            ...(prev[selectedGroup.objectId] || []),
          ],
        }));

        setPostContent("");
        clearUploads();
      } catch (error) {
        alert("Error saving post: " + error.message);
      }
    } else {
      alert("Please enter some content or upload media!");
    }
  };

  const handleDeletePost = async (postId) => {
    if (!user) {
      alert("please log in to delete!");
      return;
    }
    try {
      await deletePostFromDatabase(postId);

      setPostsByGroup((prevPostsByGroup) => {
        const updatedPosts = { ...prevPostsByGroup };
        if (
          selectedGroup?.objectId &&
          Array.isArray(updatedPosts[selectedGroup.objectId])
        ) {
          updatedPosts[selectedGroup.objectId] = updatedPosts[
            selectedGroup.objectId
          ].filter((post) => post.objectId !== postId);
        }
        return updatedPosts;
      });
    } catch (error) {
      console.error("Error deleting post from database:", error);
      alert(error.message);
    }
  };

  const addCommentOrReply = async (postId, content, parentId = null) => {
    try {
      const savedComment = await addCommentToDatabase(
        content,
        postId,
        selectedGroup.objectId,
        parentId
      );
      const newComment = {
        id: savedComment.id,
        author: user.get("username"),
        avatar: user.get("avatar")
          ? `${user.get("avatar").url()}?${Date.now()}`
          : null, 
        content: content,
        replies: [],
      };

      setCommentsByPost((prevCommentsByPost) => {
        const postComments = prevCommentsByPost[postId] || [];
        const updatedPostComments = parentId
          ? addNestedReply(postComments, parentId, newComment)
          : [...postComments, newComment];

        return {
          ...prevCommentsByPost,
          [postId]: updatedPostComments,
        };
      });
    } catch (error) {
      console.error("Error adding comment to database:", error);
    }
  };

  const addNestedReply = (comments, parentId, reply) => {
    return comments.map((comment) => {
      if (comment.id === parentId) {
        return { ...comment, replies: [...(comment.replies || []), reply] };
      } else if (comment.replies) {
        return {
          ...comment,
          replies: addNestedReply(comment.replies, parentId, reply),
        };
      }
      return comment;
    });
  };

  const deleteCommentOrReply = async (postId, commentId) => {
    try {
      await deleteCommentFromDatabase(commentId);

      // 如果成功，从前端状态中删除评论
      setCommentsByPost((prevCommentsByPost) => ({
        ...prevCommentsByPost,
        [postId]: deleteNestedComment(
          prevCommentsByPost[postId] || [],
          commentId
        ),
      }));
    } catch (error) {
      alert("Failed to delete comment.");
    }
  };

  const deleteNestedComment = (comments, commentId) => {
    return comments
      .map((comment) => {
        if (comment.id === commentId) return null; // 找到要删除的评论，返回 null
        return {
          ...comment,
          replies: deleteNestedComment(comment.replies || [], commentId),
        }; // 递归删除子评论
      })
      .filter((comment) => comment !== null); // 过滤掉被标记为 null 的评论
  };

  const toggleCommentSection = (postId) => {
    setShowCommentSection((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  return (
    <PostSection
      postContent={postContent}
      setPostContent={setPostContent}
      sendPost={sendPost}
      handleDeletePost={handleDeletePost}
      currentGroupPosts={currentGroupPosts}
      commentsByPost={commentsByPost}
      addCommentOrReply={addCommentOrReply}
      deleteCommentOrReply={deleteCommentOrReply}
      showCommentSection={showCommentSection}
      toggleCommentSection={toggleCommentSection}
    />
  );
}

export default Post;
