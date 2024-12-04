import React, { useState, useContext } from "react";
import switchGroup from "../Assets/switch-group.png";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../hooks/UserContext";
import {Sidebar,ProfileImage,Username,GroupTitle,GroupSwitcher,GroupIcon,Dropdown,DropdownItem} from "./LeftBarStyle";

function LeftBar({ groupData }) {
  const { user, selectedGroup, setSelectedGroup, avatar } = useContext(UserContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleGroupSelect = (group) => {
    setShowDropdown(false);
    setSelectedGroup(group);
  };

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const groupToDisplay =
    selectedGroup?.name ||  "No group selected";

  const handleAvatarClick = () => {
    navigate("/profile");
  };

  return (
    <Sidebar>
      <ProfileImage
        src={avatar}
        alt="User profile"
        onClick={handleAvatarClick}
      />
      <Username>{user ? user.get("username") : "Guest"}</Username>
      <GroupTitle>{groupToDisplay}</GroupTitle>
      <GroupSwitcher onClick={toggleDropdown}>
        <GroupIcon src={switchGroup} alt="Change group icon" />
        <span>Change Group</span>
        {showDropdown && (
          <Dropdown>
            {groupData.map((group) => (
              <DropdownItem
                key={group.objectId}
                onClick={() => handleGroupSelect(group)}
              >
                {group.name}
              </DropdownItem>
            ))}
          </Dropdown>
        )}
      </GroupSwitcher>
    </Sidebar>
  );
}

export default LeftBar;