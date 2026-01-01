"use client";

import React, { useState } from "react";
const switchGroup = "/assets/switch-group.png";
import { useRouter } from "next/navigation";
import { useUserStore } from "store/useUserStore";
import {
  Sidebar,
  AvatarWrapper,
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
        <AvatarWrapper onClick={handleAvatarClick}>
          <ProfileImage src={avatar} alt="User profile" />
        </AvatarWrapper>
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
        <GroupTitle>
          <span className="label">Current Group</span>
          <span className="name">{groupToDisplay}</span>
        </GroupTitle>
        <GroupSwitcher onClick={toggleDropdown}>
          <GroupIcon src={switchGroup} alt="Change group icon" />
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
