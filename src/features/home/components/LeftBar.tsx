"use client";

import React, { useState } from "react";
import switchGroup from "assets/switch-group.png";
import { useRouter } from "next/navigation";
import { useUserStore } from "store/useUserStore";
import {
  Sidebar,
  ProfileImage,
  Username,
  GroupTitle,
  GroupSwitcher,
  GroupIcon,
  Dropdown,
  DropdownItem,
  Sidecontainer,
} from "./LeftBarStyle";

function LeftBar() {
  const { user, selectedGroup, setSelectedGroup, avatar, groupData } = useUserStore();
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  const handleGroupSelect = (group) => {
    setShowDropdown(false);
    setSelectedGroup(group);
  };

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const groupToDisplay = selectedGroup?.name || "No group selected";

  const handleAvatarClick = () => {
    router.push("/profile");
  };

  return (
    <Sidebar>
      <Sidecontainer>
        <ProfileImage src={avatar} alt="User profile" onClick={handleAvatarClick} />
        <Username>
          {user ? (
            user.username
          ) : (
            <>
              <p>Guest</p>
              <small>please sign in</small>
            </>
          )}
        </Username>
        <GroupTitle>{groupToDisplay}</GroupTitle>
        <GroupSwitcher onClick={toggleDropdown}>
          <GroupIcon src={switchGroup.src} alt="Change group icon" />
          <span>Change Group</span>
          {showDropdown && (
            <Dropdown>
              {groupData.map((group) => (
                <DropdownItem key={group.objectId} onClick={() => handleGroupSelect(group)}>
                  {group.name}
                </DropdownItem>
              ))}
            </Dropdown>
          )}
        </GroupSwitcher>
      </Sidecontainer>
    </Sidebar>
  );
}

export default LeftBar;
