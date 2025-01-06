import React, { useState, useContext } from "react";
import switchGroup from "../Assets/switch-group.png";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
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
  const {user, selectedGroup, setSelectedGroup, avatar, groupData } = useContext(UserContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleGroupSelect = (group) => {
    setShowDropdown(false);
    setSelectedGroup(group);
  };

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const groupToDisplay = selectedGroup?.name || "No group selected";

  const handleAvatarClick = () => {
    navigate("/profile");
  };

  return (
    <Sidebar>
      <Sidecontainer>
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
      </Sidecontainer>
    </Sidebar>
  );
}

export default LeftBar;
