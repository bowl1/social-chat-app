import Parse from "parse";

// 工具函数：提取用户信息
const extractAuthorInfo = (author) => {
  if (!author) return { username: "Guest", avatarUrl: "https://via.placeholder.com/50" };
  
  const username = author.get("username") || "Guest";
  const avatarFile = author.get("avatar");
  const avatarUrl = avatarFile?.url() || "https://via.placeholder.com/50";
  
  return { username, avatarUrl };
};

export const loadPostsFromDatabase = async (groupId) => {
  const Post = Parse.Object.extend("Post");
  const query = new Parse.Query(Post);

  const Group = Parse.Object.extend("Group");
  const groupPointer = new Group();
  groupPointer.id = groupId;

  query.equalTo("group", groupPointer);
  query.include("author");
  query.descending("createdAt");

  try {
    const results = await query.find();
    console.log("Loaded posts for group:", groupId, results);

    return results.map((post) => {
      const author = post.get("author");
      const { username, avatarUrl } = extractAuthorInfo(author);

      return {
        objectId: post.id,
        userName: username,
        userAvatar: avatarUrl,
        content: post.get("content") || {},
        likes: post.get("likes") || 0,
        group: groupId,
      };
    });
  } catch (error) {
    console.error("Error loading posts:", error);
    throw new Error("Failed to load posts from the database.");
  }
};

export const loadCommentsFromDatabase = async (postId) => {
  const Comment = Parse.Object.extend("Comment");
  const query = new Parse.Query(Comment);

  const postPointer = new Parse.Object("Post");
  postPointer.id = postId;
  query.equalTo("postId", postPointer);
  query.include("author");
  query.ascending("createdAt");

  try {
    const results = await query.find();
    console.log("Comments found for postId:", postId, results);

    const comments = results.map((comment) => {
      const author = comment.get("author");
      const { username, avatarUrl } = extractAuthorInfo(author);

      return {
        id: comment.id,
        author: username,
        avatar: avatarUrl,
        content: comment.get("content"),
        parentId: comment.get("parentId") ? comment.get("parentId").id : null,
        replies: [],
      };
    });

    const commentMap = {};
    comments.forEach((comment) => {
      commentMap[comment.id] = comment;
    });

    const nestedComments = [];
    comments.forEach((comment) => {
      if (comment.parentId) {
        if (commentMap[comment.parentId]) {
          commentMap[comment.parentId].replies.push(comment);
        }
      } else {
        nestedComments.push(comment);
      }
    });

    console.log("Final nested comments structure:", nestedComments);
    return nestedComments;
  } catch (error) {
    console.error("Error loading comments:", error);
    throw error;
  }
};
