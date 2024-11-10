import Parse from "parse";

export const fetchGroupData = async () => {
  const Group = Parse.Object.extend("Group"); 
  const query = new Parse.Query(Group);

  try {
    const groups = await query.find();
    return groups.map(group => ({
      objectId: group.id,
      name: group.get("name"),
      isDefault: group.get("isDefault")
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
    text: postContent.text || "",         // 如果没有文字内容，则为空字符串
    imageUrl: postContent.imageUrl || null, // 图片 URL
    videoUrl: postContent.videoUrl || null  // 视频 URL
  };
  post.set("content", content);

  // 设置 author 和 avatar 为当前用户的指针
  const currentUser = Parse.User.current();
  post.set("author", currentUser);
  post.set("avatar", currentUser); // 设置为指向 _User 表的指针

  post.set("likes", 0); // 初始化点赞数

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

export const addCommentToDatabase = async (content, postId, selectedGroup, parentId = null) => {
  const CommentObject = Parse.Object.extend("Comment"); 
  const comment = new CommentObject();

  comment.set("content", typeof content === 'string' ? content : JSON.stringify(content));
  comment.set("author", Parse.User.current());
  comment.set("avatar", Parse.User.current());

  if (parentId) {
    const parentComment = new CommentObject();
    parentComment.id = parentId; // 设置 parentComment 的 ID，使其成为指向父评论的 Pointer
    comment.set("parentId", parentComment); // 设置 parentId 为指向父评论的 Pointer
  } else {
    comment.set("parentId", null);
  }

  // 获取 Post 对象的指针
  const PostObject = Parse.Object.extend("Post");
  const postQuery = new Parse.Query(PostObject);

  try {
    const post = await postQuery.get(postId);
    comment.set("postId", post); 
    console.log("Post found and set in comment:", post.id);

    // 获取 Group 对象的指针
    const Group = Parse.Object.extend("Group");
    const groupQuery = new Parse.Query(Group);
    const group = await groupQuery.get(selectedGroup); // 使用 get 获取 Group 对象

    comment.set("group", group);
    console.log("Group found and set in comment:", group.id);

    return await comment.save(); // 返回保存的评论
  } catch (error) {
    console.error("Error saving comment: ", error);
    throw new Error("Error adding comment: " + error.message);
  }
};

export const deletePostFromDatabase = async (postId) => {
  const PostObject = Parse.Object.extend("Post");
  const query = new Parse.Query(PostObject);

  try {
    const post = await query.get(postId); // 获取要删除的帖子对象
    await post.destroy(); // 删除帖子对象
    console.log("Post deleted successfully from database:", postId);
  } catch (error) {
    console.error("Error deleting post:", error);
    throw new Error("Error deleting post: " + error.message);
  }
};

export const deleteCommentFromDatabase = async (commentId) => {
  const Comment = Parse.Object.extend("Comment");
  const query = new Parse.Query(Comment);

  try {
    const comment = await query.get(commentId);
    await comment.destroy();
    console.log(`Comment ${commentId} deleted from database.`);
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error; // 抛出错误以便前端捕获
  }
};