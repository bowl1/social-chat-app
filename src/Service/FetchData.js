import Parse from "parse";

// 工具函数：提取用户信息
const extractAuthorInfo = (author) => {
  if (!author) return { username: "Guest", avatarUrl: "https://avatar.iran.liara.run/public"};
  
  const username = author.get("username") || "Guest";
  const avatarFile = author.get("avatar");
  const avatarUrl = avatarFile?.url() ||"https://avatar.iran.liara.run/public";;
  
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

    const commentMap = {}; //通过 commentMap 映射所有评论，便于快速访问。
    comments.forEach((comment) => {
      commentMap[comment.id] = comment;
    });

    const nestedComments = [];
    comments.forEach((comment) => {
      if (comment.parentId) {
        // 子评论：将其添加到父评论的 replies 数组中
        if (commentMap[comment.parentId]) {
          commentMap[comment.parentId].replies.push(comment);
        }
      } else {
        // 顶级评论：直接添加到 nestedComments 数组
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
