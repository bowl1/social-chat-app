import Parse from "parse";

// 加载指定分组的帖子数据
export const loadPostsFromDatabase = async (groupId) => {
  const Post = Parse.Object.extend("Post");
  const query = new Parse.Query(Post);

  // 创建指向 Group 表的指针
  const Group = Parse.Object.extend("Group");
  const groupPointer = new Group();
  groupPointer.id = groupId;

  // 加载关联的 author 和 avatar 数据
  query.equalTo("group", groupPointer); // 使用指针进行查询
  query.include("author"); // 包含 author 字段
  query.include("avatar"); // 包含 avatar 字段
  query.descending("createdAt");

  try {
    const results = await query.find();
    console.log("Loaded posts for group:", groupId, results);

    // 检查结果并映射
    return results
      .filter((post) => post) // 过滤掉无效的 post 对象
      .map((post) => {
        // 获取 author 对象并检查
        const author = post.get("author");
        if (!author || typeof author.get !== "function") {
          console.warn(`Post ${post.id} has no valid author.`);
          return null; // 跳过没有有效作者的帖子
        }

        // 获取 avatar 对象并检查
        const avatarUser = post.get("avatar");
        let avatarUrl = "default-avatar-url"; // 默认头像 URL
        if (avatarUser && typeof avatarUser.get === "function") {
          const avatarFile = avatarUser.get("avatar"); // 获取 User 表中 avatar 文件字段
          if (avatarFile && typeof avatarFile.url === "function") {
            avatarUrl = avatarFile.url(); // 获取头像 URL
          }
        }

        // 返回有效帖子数据
        return {
          objectId: post.id,
          userName: author.get("username") || "Anonymous", // 从 author 中获取用户名，提供默认值
          userAvatar: avatarUrl, // 使用获取到的 avatar URL
          content: post.get("content") || {}, // 默认空内容
          likes: post.get("likes") || 0, // 默认点赞数为 0
          group: groupId, // 使用传入的 group ID
        };
      })
      .filter((post) => post !== null); // 过滤掉无效的帖子
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
      const authorName = author ? author.get("username") : "Anonymous";
      const avatarFile = author ? author.get("avatar") : null;
      const avatarUrl = avatarFile && typeof avatarFile.url === "function" ? avatarFile.url() : "default-avatar-url";

      return {
        id: comment.id,
        author: authorName,
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