import React, { createContext, useState, useEffect } from "react";
import Parse from "parse";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [avatar, setAvatar] = useState("https://via.placeholder.com/50"); // 默认头像

    // 初始化用户
    useEffect(() => {
      const initUser = async () => {
        const currentUser = Parse.User.current();
        if (currentUser) {
          setUser(currentUser);
  
          // 更新头像逻辑
          const avatarFile = currentUser.get("avatar");
          if (avatarFile instanceof Parse.File) {
            setAvatar(`${avatarFile.url()}?${Date.now()}`); // 强制刷新缓存
          } else {
            setAvatar("https://via.placeholder.com/50");
          }
  
          // 恢复或设置默认分组
          await restoreOrFetchDefaultGroup();
        } else {
          // 如果没有登录用户，重置头像为默认值
          setAvatar("https://via.placeholder.com/50");
        }
      };
  
      initUser();
    }, []); // 空依赖数组表示只在组件首次渲染时运行
  
  // 退出用户
  const logoutUser = async () => {
    try {
      await Parse.User.logOut();
      setUser(null);
      setAvatar("https://via.placeholder.com/50");
      setSelectedGroup(null);
      localStorage.removeItem("selectedGroup");
      localStorage.clear();
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  // 恢复历史分组或设置默认分组
  const restoreOrFetchDefaultGroup = async () => {
    const savedGroup = localStorage.getItem("selectedGroup");
    if (savedGroup) {
      const groupData = JSON.parse(savedGroup);
      setSelectedGroup(groupData); // 恢复历史分组
    } else {
      try {
        const Group = Parse.Object.extend("Group");
        const groupQuery = new Parse.Query(Group);
        groupQuery.equalTo("isDefault", true);
        const defaultGroup = await groupQuery.first();
        if (defaultGroup) {
          const groupData = {
            name: defaultGroup.get("name"),
            objectId: defaultGroup.id,
          };
          setSelectedGroup(groupData); // 设置默认分组
          localStorage.setItem("selectedGroup", JSON.stringify(groupData)); // 保存到 localStorage
        }
      } catch (error) {
        console.error("Error fetching default group:", error);
      }
    }
  };

  // 监听分组变化并保存到 localStorage
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
        selectedGroup,
        setSelectedGroup,
        avatar,
        setAvatar,
        logoutUser,
        restoreOrFetchDefaultGroup 
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
