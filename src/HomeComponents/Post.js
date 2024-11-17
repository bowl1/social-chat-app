import React, { useState, useContext, useEffect} from "react";
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


  useEffect(() => {
    if (!selectedGroup?.objectId) {
      console.log("No selected group. Skipping fetch.");
      return; // 如果没有选中的分组，直接跳过
    }
  
    const fetchPostsForGroup = async () => {
      try {
        console.log("Fetching posts for group:", selectedGroup.objectId);
  
        // 加载当前分组的帖子
        const groupPosts = await loadPostsFromDatabase(selectedGroup.objectId);
        console.log("Loaded posts:", groupPosts);
  
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
        const newCommentsByPost = resolvedComments.reduce((acc, { postId, comments }) => {
          acc[postId] = comments;
          return acc;
        }, {});
  
        // 更新评论数据到 state
        setCommentsByPost(newCommentsByPost);
        console.log("Updated commentsByPost:", newCommentsByPost);
      } catch (error) {
        console.error("Error loading posts or comments:", error);
      }
    };
  
    fetchPostsForGroup(); // 调用加载函数
  }, [selectedGroup?.objectId]); // 仅在分组 ID 发生变化时重新加载帖子和评论


  const sendPost = async () => {
    if (postContent.trim() || uploadedImage || uploadedVideo) {
      const newPostContent = {
        text: postContent || "",
        imageUrl: uploadedImage || null,
        videoUrl: uploadedVideo || null,
      };
  
      try {
        const savedPost = await sendPostToDatabase(newPostContent, selectedGroup.objectId);

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