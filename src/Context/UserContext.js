import React, { createContext, useState, useEffect } from "react";
import Parse from "parse";
import { fetchGroupData } from "../Service/Backend"; 

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groupData, setGroupData] = useState([]); // 存储分组数据
  const [avatar, setAvatar] = useState("https://via.placeholder.com/50"); // 默认头像

  // 初始化用户
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
      setAvatar("https://via.placeholder.com/50");
    }
  };

  // 用户退出逻辑
  const logoutUser = async () => {
    try {
      const savedGroup = localStorage.getItem("selectedGroup"); // 备份分组信息
      await Parse.User.logOut();
      setUser(null);
      setAvatar("https://via.placeholder.com/50");
      setSelectedGroup(null);
      localStorage.clear();
      if (savedGroup) {
        localStorage.setItem("selectedGroup", savedGroup);
      }
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

    // 加载分组数据并恢复或设置默认分组
    const restoreOrFetchDefaultGroup = async () => {
      try {
        // 如果 groupData 为空，从后端加载分组数据
        if (groupData.length === 0) {
          const groups = await fetchGroupData();
          setGroupData(groups); // 更新全局分组数据
        }
  
        // 检查本地存储中是否有已保存的分组
        const savedGroup = localStorage.getItem("selectedGroup");
        if (savedGroup) {
          setSelectedGroup(JSON.parse(savedGroup)); // 恢复用户之前选中的分组
        } else {
          // 如果没有保存的分组，设置默认分组
          const defaultGroup = groupData.find((group) => group.isDefault);
          if (defaultGroup) {
            setSelectedGroup(defaultGroup); // 设置默认分组
          }
        }
      } catch (error) {
        console.error("Error fetching or restoring group data:", error);
      }
    };

  // 监听分组变化并保存到 localStorage
  useEffect(() => {
    if (selectedGroup) {
      localStorage.setItem("selectedGroup", JSON.stringify(selectedGroup));
    }
  }, [selectedGroup]);

  // 初始化用户和分组数据
  useEffect(() => {
    initUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        selectedGroup,
        setSelectedGroup,
        groupData,
        avatar,
        setAvatar,
        restoreOrFetchDefaultGroup,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;