import React, { createContext, useState, useEffect, useCallback } from "react";
import Parse from "parse";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [avatar, setAvatar] = useState(null); // 存储用户头像 URL
  const [selectedGroup, setSelectedGroup] = useState(null); // 添加 selectedGroup 状态
  const [email, setEmail] = useState(""); 

  // 将 updateAvatar 放在 logInDefaultUser 定义之前
  const updateAvatar = useCallback(async (currentUser) => {
    const avatarFile = currentUser.get("avatar");
    if (avatarFile && avatarFile instanceof Parse.File) {
      setAvatar(avatarFile.url() + "?" + new Date().getTime()); // 添加时间戳避免缓存
    } else {
      setAvatar("https://via.placeholder.com/50"); // 默认头像
    }
  }, []);

  const logInDefaultUser = useCallback(async () => {
    const email = "John@gmail.com"; // 硬编码的用户电子邮件
    const password = "1234"; // 硬编码的用户密码

    let currentUser = Parse.User.current();

    if (!currentUser) {
      try {
        currentUser = await Parse.User.logIn(email, password);
        setUser(currentUser);
      } catch (error) {
        console.error("Error logging in:", error);
        return; // 登录失败，直接返回
      }
    } else {
      setUser(currentUser);
    }

    // 验证 session token
    try {
      await currentUser.fetch();
      console.log("Session token is valid");
    } catch (error) {
      if (error.code === Parse.Error.INVALID_SESSION_TOKEN) {
        console.error("Session token is invalid. Re-logging in...");
        try {
          const reLoggedUser = await Parse.User.logIn(email, password);
          setUser(reLoggedUser);
          console.log("User re-logged in successfully");
        } catch (reLogError) {
          console.error("Error re-logging in:", reLogError);
        }
      } else {
        console.error("Error validating session:", error);
      }
    }

    // 获取用户 email 和头像
    setEmail(currentUser.get("email"));
    updateAvatar(currentUser);

    // 获取默认组
    const Group = Parse.Object.extend("Group");
    const groupQuery = new Parse.Query(Group);
    groupQuery.equalTo("isDefault", true);
    const defaultGroup = await groupQuery.first();

    if (defaultGroup) {
      setCurrentGroup({
        name: defaultGroup.get("name"),
        objectId: defaultGroup.id
      });
      setSelectedGroup({
        name: defaultGroup.get("name"),
        objectId: defaultGroup.id
      });
    } else {
      console.error("Default group not found.");
    }
  }, [updateAvatar]); // updateAvatar 现在是一个稳定的依赖项

  useEffect(() => {
    logInDefaultUser(); // 登录硬编码用户
  }, [logInDefaultUser]);

  useEffect(() => {
    const checkAndConvertAvatar = async () => {
      if (!user) return;

      const avatarFile = user.get("avatar");
      if (typeof avatarFile === "string") {
        console.log("avatarFile is a string. Converting to Parse.File...");
        const fileData = await fetch(avatarFile).then(res => res.blob());
        const newAvatarFile = new Parse.File("avatar.jpg", fileData);
        user.set("avatar", newAvatarFile);
        await user.save();

        updateAvatar(user);
        console.log("Avatar successfully converted to Parse.File");
      } else if (avatarFile instanceof Parse.File) {
        updateAvatar(user);
        console.log("Avatar is already a Parse.File");
      } else {
        console.error("Avatar file is not in a recognized format.");
      }
    };

    checkAndConvertAvatar();
  }, [user, updateAvatar]); // 添加 updateAvatar 作为依赖项

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
        setSelectedGroup, // 提供更新 selectedGroup 的方法
      }}
    >
      {children}
    </UserContext.Provider>
  );
};