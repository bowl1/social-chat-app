import React, { createContext, useState, useEffect, useCallback } from "react";
import Parse from "parse";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [avatar, setAvatar] = useState("https://via.placeholder.com/50"); // 默认头像
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [email, setEmail] = useState("");

  // 更新头像逻辑
  const updateAvatar = useCallback(async (currentUser) => {
    const avatarFile = currentUser.get("avatar");
    if (avatarFile instanceof Parse.File) {
      // 如果有头像文件，则使用头像文件 URL
      setAvatar(`${avatarFile.url()}?${new Date().getTime()}`);
    } else {
      // 如果没有头像，则使用占位符
      setAvatar("https://via.placeholder.com/50");
    }
  }, []);


  const signupUser = async (username, email, password) => {
    try {
      const newUser = new Parse.User();
      newUser.set("username", username);
      newUser.set("email", email);
      newUser.set("password", password);

      // 保存用户
      const savedUser = await newUser.signUp();
      console.log("User signed up successfully:", savedUser);

       // 配置默认 ACL
      const acl = new Parse.ACL();
      acl.setPublicReadAccess(true); // 允许所有人读取
      acl.setWriteAccess(newUser, true); // 仅允许用户自己写入
      newUser.setACL(acl);

      // 保存带 ACL 的用户对象
      await savedUser.save();
  
      // 更新全局状态
      setUser(savedUser);
      setEmail(savedUser.get("email"));
  
      // 设置默认分组
      const Group = Parse.Object.extend("Group");
      const groupQuery = new Parse.Query(Group);
      groupQuery.equalTo("isDefault", true);
      const defaultGroup = await groupQuery.first();
  
      if (defaultGroup) {
        const groupData = {
          name: defaultGroup.get("name"),
          objectId: defaultGroup.id,
        };
        setCurrentGroup(groupData);
        setSelectedGroup(groupData);
        localStorage.setItem("selectedGroup", JSON.stringify(groupData));
      } else {
        console.error("Default group not found.");
      }
  
      return savedUser; // 返回注册成功的用户
    } catch (error) {
      console.error("Error signing up:", error.message);
      throw error; // 抛出错误以便调用者处理
    }
  };

  // 登录用户
  const loginUser = async (email, password) => {
    try {
      const currentUser = await Parse.User.logIn(email, password);
      setUser(currentUser);
      setEmail(currentUser.get("email"));
      await updateAvatar(currentUser);

      // 设置默认分组（仅在首次登录时）
      const Group = Parse.Object.extend("Group");
      const groupQuery = new Parse.Query(Group);
      groupQuery.equalTo("isDefault", true);
      const defaultGroup = await groupQuery.first();

      if (defaultGroup) {
        const groupData = {
          name: defaultGroup.get("name"),
          objectId: defaultGroup.id,
        };
        setCurrentGroup(groupData);
        setSelectedGroup(groupData);
        localStorage.setItem("selectedGroup", JSON.stringify(groupData));
      } else {
        console.error("Default group not found.");
      }
    } catch (error) {
      console.error("Error logging in:", error.message);
      throw error;
    }
  };

  // 退出用户
  const logoutUser = async () => {
    try {
      await Parse.User.logOut();
      setUser(null);
      setEmail("");
      setAvatar("https://via.placeholder.com/50");
      setCurrentGroup(null);
      setSelectedGroup(null);
      localStorage.removeItem("selectedGroup");
      localStorage.clear();
      console.log("User logged out successfully.");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  // 注册新用户
  
 // 状态初始化时重置头像
useEffect(() => {
  const initUser = async () => {
    const currentUser = Parse.User.current();
    if (currentUser) {
      setUser(currentUser);
      setEmail(currentUser.get("email"));
      await updateAvatar(currentUser);

      // 恢复用户选择的分组
      const savedGroup = localStorage.getItem("selectedGroup");
      if (savedGroup) {
        const groupData = JSON.parse(savedGroup);
        setCurrentGroup(groupData);
        setSelectedGroup(groupData);
      }
    } else {
      // 如果没有登录用户，重置头像为默认值
      setAvatar("https://via.placeholder.com/50");
    }
  };

  initUser();
}, [updateAvatar]);



  useEffect(() => {
    if (selectedGroup) {
      localStorage.setItem("selectedGroup", JSON.stringify(selectedGroup));
    }
  }, [selectedGroup]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        email,
        currentGroup,
        setCurrentGroup,
        avatar,
        setAvatar,
        selectedGroup,
        setSelectedGroup,
        loginUser,
        logoutUser,
        signupUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};