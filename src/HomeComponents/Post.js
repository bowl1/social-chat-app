import React, { useState, useContext, useEffect, useCallback } from "react";
import PostUI from "./PostUI"; 
import { sendPostToDatabase, addCommentToDatabase, deletePostFromDatabase,deleteCommentFromDatabase } from './Service/backend'; 
import { UserContext } from '../hooks/UserContext'; 
import { loadPostsFromDatabase, loadCommentsFromDatabase } from './Service/fetchData'; 

function Post({ uploadedImage, uploadedVideo, clearUploads }) {
  const { user, avatar, selectedGroup } = useContext(UserContext); 
  const [postContent, setPostContent] = useState("");
  const [postsByGroup, setPostsByGroup] = useState({});
  const [showCommentSection, setShowCommentSection] = useState({});
  const [commentsByPost, setCommentsByPost] = useState({});


  const fetchPosts = useCallback(async () => {
    if (selectedGroup?.objectId) {
      try {
        console.log("Fetching posts for group:", selectedGroup.objectId);
        const groupPosts = await loadPostsFromDatabase(selectedGroup.objectId);
        console.log("Loaded posts:", groupPosts);
  
        setPostsByGroup((prev) => ({
          ...prev,
          [selectedGroup.objectId]: groupPosts,
        }));
  
        const newCommentsByPost = {};
        for (const post of groupPosts) {
          const nestedComments = await loadCommentsFromDatabase(post.objectId); // 获取嵌套评论结构
          newCommentsByPost[post.objectId] = nestedComments; // 直接使用格式化后的评论数据
        }
  
        setCommentsByPost(newCommentsByPost); // 更新 state 中的评论数据
        console.log("Updated commentsByPost:", newCommentsByPost);
      } catch (error) {
        console.error("Error loading posts or comments:", error);
      }
    }
  }, [selectedGroup]);
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts, selectedGroup]);

  const sendPost = async () => {
    if (postContent.trim() || uploadedImage || uploadedVideo) {
      const newPostContent = {
        text: postContent || "",
        imageUrl: uploadedImage || null,
        videoUrl: uploadedVideo || null,
      };
  
      try {
        const savedPost = await sendPostToDatabase(newPostContent, selectedGroup.objectId);
        console.log("Saved new post:", savedPost);
  
        const newPost = {
          objectId: savedPost.id,
          userName: user.get("username"),
          userAvatar: avatar,
          content: newPostContent,
          likes: savedPost.likes,
          group: selectedGroup.objectId,
        };
  
        setPostsByGroup((prev) => ({
          ...prev,
          [selectedGroup.objectId]: [newPost, ...(prev[selectedGroup.objectId] || [])],
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
    try {
      await deletePostFromDatabase(postId);
      console.log("Deleted post:", postId);

      setPostsByGroup((prevPostsByGroup) => {
        const updatedPosts = { ...prevPostsByGroup };
        if (selectedGroup?.objectId && Array.isArray(updatedPosts[selectedGroup.objectId])) {
          updatedPosts[selectedGroup.objectId] = updatedPosts[selectedGroup.objectId].filter(
            (post) => post.objectId !== postId
          );
        }
        return updatedPosts;
      });
    } catch (error) {
      console.error("Error deleting post from database:", error);
      alert("Error deleting post: " + error.message);
    }
  };

  const addCommentOrReply = async (postId, content, parentId = null) => {
    try {
      const savedComment = await addCommentToDatabase(content, postId, selectedGroup.objectId, parentId);
      console.log("Saved comment:", savedComment);
      const newComment = {
        id: savedComment.id,
        author: user.get("username"),
        avatar: avatar || "https://via.placeholder.com/50",
        content: content,
        replies: [],
      };

      setCommentsByPost((prevCommentsByPost) => {
        const postComments = prevCommentsByPost[postId] || [];
        const updatedPostComments = parentId
          ? addNestedReply(postComments, parentId, newComment)
          : [...postComments, newComment];

        console.log(`Updated comments for post ${postId}:`, updatedPostComments);

        return {
          ...prevCommentsByPost,
          [postId]: updatedPostComments,
        };
      });
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const addNestedReply = (comments, parentId, reply) => {
    return comments.map((comment) => {
      if (comment.id === parentId) {
        return { ...comment, replies: [...(comment.replies || []), reply] };
      } else if (comment.replies) {
        return { ...comment, replies: addNestedReply(comment.replies, parentId, reply) };
      }
      return comment;
    });
  };

  const deleteCommentOrReply = async (postId, commentId) => {
    console.log("Deleting comment:", commentId, "from post:", postId);
  
    try {
      // 调用数据库删除函数
      await deleteCommentFromDatabase(commentId);
  
      // 如果成功，从前端状态中删除评论
      setCommentsByPost((prevCommentsByPost) => ({
        ...prevCommentsByPost,
        [postId]: deleteNestedComment(prevCommentsByPost[postId] || [], commentId),
      }));
      console.log("Comment deleted successfully from both database and state.");
    } catch (error) {
      console.error("Error deleting comment from database:", error);
      alert("Failed to delete comment. Please try again.");
    }
  };

  const deleteNestedComment = (comments, commentId) => {
    return comments
      .map((comment) => {
        if (comment.id === commentId) return null; // 找到要删除的评论，返回 null
        return { ...comment, replies: deleteNestedComment(comment.replies || [], commentId) }; // 递归删除子评论
      })
      .filter((comment) => comment !== null); // 过滤掉被标记为 null 的评论
  };
  

  const toggleCommentSection = (postId) => {
    setShowCommentSection((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const currentGroupPosts = selectedGroup ? (postsByGroup[selectedGroup.objectId] || []) : [];

  return (
    <PostUI
      postContent={postContent}
      setPostContent={setPostContent}
      sendPost={sendPost}
      currentGroupPosts={currentGroupPosts}
      showCommentSection={showCommentSection}
      toggleCommentSection={toggleCommentSection}
      handleDeletePost={handleDeletePost}
      commentsByPost={commentsByPost}
      addCommentOrReply={addCommentOrReply}
      deleteCommentOrReply={deleteCommentOrReply}
      user={user}
      selectedGroup={selectedGroup}
    />
  );
}

export default Post;