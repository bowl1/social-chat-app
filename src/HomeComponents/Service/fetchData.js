import Parse from "parse";

// 加载指定分组的帖子数据
export const loadPostsFromDatabase = async (groupId) => {
  const Post = Parse.Object.extend("Post");
  const query = new Parse.Query(Post);

  // 创建指向 Group 表的指针
  const Group = Parse.Object.extend("Group");
  const groupPointer = new Group();
  groupPointer.id = groupId;

  // 加载关联的 author、avatar 和 group 数据
  query.equalTo("group", groupPointer); // 使用指针进行查询
  query.include("author"); // 包含 author 字段
  query.include("avatar"); // 包含 avatar 字段
  query.descending("createdAt");

  try {
    const results = await query.find();
    console.log("Loaded posts for group:", groupId, results);

    return results.map((post) => {
      // 获取 author 对象
      const author = post.get("author");

      // 获取 avatar 对象（假设它是指向 User 表的一个文件对象）
      const avatarUser = post.get("avatar"); // 从 post 中获取 avatar 字段
      let avatarUrl = "default-avatar-url"; // 设置默认头像 URL

      if (avatarUser && typeof avatarUser.get === 'function') {
        const avatarFile = avatarUser.get("avatar"); // 获取 User 表中 avatar 文件字段
        if (avatarFile && typeof avatarFile.url === "function") {
          avatarUrl = avatarFile.url(); // 获取头像 URL
        }
      }

      return {
        objectId: post.id,
        userName: author.get("username"), // 从 author 中获取用户名
        userAvatar: avatarUrl, // 使用获取到的 avatar URL
        content: post.get("content"),
        likes: post.get("likes"),
        group: groupId, // 使用传入的 group ID
      };
    });
  } catch (error) {
    console.error("Error loading posts:", error);
    throw error;
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