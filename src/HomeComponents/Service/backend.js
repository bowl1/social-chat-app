import Parse from "parse";


export const fetchGroupData = async () => {
  const Group = Parse.Object.extend("Group");
  const query = new Parse.Query(Group);

  try {
    const groups = await query.find();
    return groups.map((group) => ({
      objectId: group.id,
      name: group.get("name"),
      isDefault: group.get("isDefault"),
    }));
  } catch (error) {
    console.error("Error fetching groups: ", error);
    throw error; // 继续抛出错误，便于调用者处理
  }
};

export const sendPostToDatabase = async (postContent, selectedGroup) => {
  const PostObject = Parse.Object.extend("Post");
  const post = new PostObject();

  // 设置内容对象，包括文本、图片和视频 URL
  const content = {
    text: postContent.text || "", // 如果没有文字内容，则为空字符串
    imageUrl: postContent.imageUrl || null, // 图片 URL
    videoUrl: postContent.videoUrl || null, // 视频 URL
  };
  post.set("content", content);

  // 设置 author 和 avatar 为当前用户的指针
  const currentUser = Parse.User.current();
  post.set("author", currentUser);
  post.set("avatar", currentUser); // 设置为指向 _User 表的指针
  post.set("likes", 0); // 初始化点赞数

  // 配置 ACL
  const acl = new Parse.ACL(currentUser);
  acl.setPublicReadAccess(true); // 所有人可以读取
  acl.setPublicWriteAccess(true); // 允许所有人评论
  post.setACL(acl);

  // 验证和设置 group
  if (!selectedGroup) {
    console.error("selectedGroup is undefined or null");
    throw new Error("Invalid selectedGroup");
  }

  const Group = Parse.Object.extend("Group");
  const groupPointer = new Group();
  groupPointer.id = selectedGroup; // 使用传入的 group ID 设置 group 指针
  post.set("group", groupPointer);

  try {
    // 保存 post 对象
    const savedPost = await post.save();
    console.log("Post saved successfully:", savedPost);
    return savedPost; // 返回保存的帖子对象
  } catch (error) {
    console.error("Error saving post:", error);
    throw new Error("Error saving post: " + error.message);
  }
};

export const addCommentToDatabase = async (content, postId, groupId, parentId = null) => {
  const CommentObject = Parse.Object.extend("Comment");
  const comment = new CommentObject();
  const currentUser = Parse.User.current();

  if (!currentUser) {
    throw new Error("User is not logged in.");
  }

  try {
    const PostObject = Parse.Object.extend("Post");
    const postQuery = new Parse.Query(PostObject);
    const post = await postQuery.get(postId);

    const GroupObject = Parse.Object.extend("Group");
    const groupQuery = new Parse.Query(GroupObject);
    const group = await groupQuery.get(groupId);

    comment.set("postId", post);
    comment.set("group", group);
    
    // 转换内容为 String
    comment.set("content", typeof content === "string" ? content : JSON.stringify(content));
    comment.set("author", currentUser);

    if (parentId) {
      const parentQuery = new Parse.Query(CommentObject);
      const parentComment = await parentQuery.get(parentId);
      comment.set("parentId", parentComment);
    }

    const acl = new Parse.ACL(currentUser);
    acl.setPublicReadAccess(true);
    acl.setPublicWriteAccess(true); // 允许所有人评论
    comment.setACL(acl);

    const savedComment = await comment.save();
    console.log("Comment saved successfully.");
    return savedComment;
  } catch (error) {
    console.error("Error saving comment:", error);
    throw new Error(`Error adding comment: ${error.message}`);
  }
};

export const deletePostFromDatabase = async (postId) => {
  const PostObject = Parse.Object.extend("Post");
  const query = new Parse.Query(PostObject);

  try {
    const post = await query.get(postId); // 获取要删除的帖子对象
    const currentUser = Parse.User.current(); // 获取当前登录用户

    // 检查是否有权限删除
    if (post.get("author").id !== currentUser.id) {
      alert("Please delete your own post！");
      throw new Error("Unauthorized to delete this post.");
    }

    await post.destroy(); // 删除帖子对象
  } catch (error) {
    throw new Error("Error deleting post: " + error.message);
  }
};

export const deleteCommentFromDatabase = async (commentId) => {
  const Comment = Parse.Object.extend("Comment");
  const query = new Parse.Query(Comment);

  try {
    const comment = await query.get(commentId);
    const currentUser = Parse.User.current(); // 获取当前登录用户

    // 检查是否有权限删除
    if (comment.get("author").id !== currentUser.id) {
      alert("Please delete your own comment！");
      throw new Error("Unauthorized to delete this comment.");
    }

    await comment.destroy();
  } catch (error) {
    throw error; // 抛出错误以便前端捕获
  }
};
