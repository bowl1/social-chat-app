import Parse from "parse";

// 通用工具函数
const createPointer = (className, objectId) => {
  const ObjectClass = Parse.Object.extend(className); // 动态生成类
  const pointer = new ObjectClass(); // 创建一个新对象
  pointer.id = objectId; // 设置 ID 以指向已有对象
  return pointer; // 返回指针
};

const createDefaultACL = (user) => {
  const acl = new Parse.ACL(user);
  acl.setPublicReadAccess(true);
  acl.setWriteAccess(user, true);
  return acl;
};

// 加载分组数据
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
    throw new Error(`Error fetch post: ${error.message}`);
  }
};

// 保存帖子
export const sendPostToDatabase = async (postContent, selectedGroup) => {
  if (!selectedGroup) {
    throw new Error("Invalid selectedGroup");
  }

  const PostObject = Parse.Object.extend("Post");
  const post = new PostObject();
  const currentUser = Parse.User.current();

  post.set("content", {
    text: postContent.text || "",
    imageUrl: postContent.imageUrl || null,
    videoUrl: postContent.videoUrl || null,
  });
  post.set("author", currentUser);
  post.set("likes", 0);
  post.set("group", createPointer("Group", selectedGroup));
  post.setACL(createDefaultACL(currentUser));

  try {
    return await post.save();
  } catch (error) {
    throw new Error(`Error saving post: ${error.message}`);
  }
};

// 保存评论
export const addCommentToDatabase = async (
  content,
  postId,
  groupId,
  parentId = null
) => {
  const CommentObject = Parse.Object.extend("Comment");
  const comment = new CommentObject();
  const currentUser = Parse.User.current();

  if (!currentUser) {
    throw new Error("User is not logged in.");
  }

  comment.set("postId", createPointer("Post", postId));
  comment.set("group", createPointer("Group", groupId));
  comment.set(
    "content",
    typeof content === "string" ? content : JSON.stringify(content)
  );
  comment.set("author", currentUser);

  if (parentId) {
    comment.set("parentId", createPointer("Comment", parentId));
  }

  comment.setACL(createDefaultACL(currentUser));

  try {
    return await comment.save();
  } catch (error) {
    throw new Error(`Error adding post: ${error.message}`);
  }
};

// 删除帖子
export const deletePostFromDatabase = async (postId) => {
  const PostObject = Parse.Object.extend("Post");
  const query = new Parse.Query(PostObject);

  try {
    const post = await query.get(postId);
    const currentUser = Parse.User.current();

    if (post.get("author").id !== currentUser.id) {
      throw new Error("Unauthorized to delete this post.");
    }

    await post.destroy();
  } catch (error) {
    throw new Error(`Error deleting post: ${error.message}`);
  }
};

// 删除评论
export const deleteCommentFromDatabase = async (commentId) => {
  const CommentObject = Parse.Object.extend("Comment");
  const query = new Parse.Query(CommentObject);

  try {
    const comment = await query.get(commentId);
    const currentUser = Parse.User.current();

    if (comment.get("author").id !== currentUser.id) {
      throw new Error("Unauthorized to delete this comment.");
    }

    await comment.destroy();
  } catch (error) {
    throw new Error(`Error deleting comment: ${error.message}`);
  }
};
