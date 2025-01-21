import React, { createContext, useState, useEffect } from "react";
import Parse from "parse";
import { fetchGroupData } from "../Service/Backend";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groupData, setGroupData] = useState([]); 
  const defaultAvatar = "https://avatar.iran.liara.run/public";
  const [avatar, setAvatar] = useState(defaultAvatar); 

  const initUser = async () => {
    const currentUser = Parse.User.current();
    if (currentUser) {
      setUser(currentUser);

      // 更新头像逻辑
      const avatarFile = currentUser.get("avatar");
      if (avatarFile instanceof Parse.File) {
        setAvatar(`${avatarFile.url()}?${Date.now()}`); // 强制刷新缓存
      } else {
        setAvatar(defaultAvatar);
      }

      // 恢复或设置默认分组
      await restoreOrFetchDefaultGroup();
    } else {
      setAvatar(defaultAvatar);

      // 未登录用户直接加载默认分组
      await fetchDefaultGroup();
    }
  };


  const logoutUser = async () => {
    try {
        // 备份当前分组信息
    const savedGroup = localStorage.getItem("selectedGroup");
      await Parse.User.logOut();
      setUser(null);
      setAvatar(defaultAvatar);
      setSelectedGroup(null);

      localStorage.clear();

    // 恢复备份的分组信息
    if (savedGroup) {
      localStorage.setItem("selectedGroup", savedGroup);
    }
      
      // 加载默认分组数据
      await fetchDefaultGroup();

      // 清空分组数据（仅显示默认分组）
      setGroupData([]);
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  const fetchDefaultGroup = async () => {
    try {
      const groups = await fetchGroupData(false); // 未登录用户只获取默认小组
      setGroupData(groups);

      // 找到默认分组并设置为当前分组
      const defaultGroup = groups.find((group) => group.isDefault);
      if (defaultGroup) {
        setSelectedGroup(defaultGroup);
      }
    } catch (error) {
      console.error("Error fetching default group:", error);
    }
  };

  // 加载分组数据并恢复或设置默认分组
  const restoreOrFetchDefaultGroup = async () => {
    try {
      const groups = await fetchGroupData(true); // 登录用户获取所有分组
      setGroupData(groups);

      // 检查本地存储中是否有已保存的分组
      const savedGroup = localStorage.getItem("selectedGroup");
      if (savedGroup) {
        setSelectedGroup(JSON.parse(savedGroup)); // 恢复用户之前选中的分组
      } else {
        // 如果没有保存的分组，设置默认分组
        const defaultGroup = groupData.find((group) => group.isDefault);
        if (defaultGroup) {
          setSelectedGroup(defaultGroup); 
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
