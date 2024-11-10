import React, { useState,useContext } from 'react';
import './LeftBar.css';
import switchGroup from "../Assets/switch-group.png";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../hooks/UserContext'; 


function LeftBar({ groupData}) {
  const { user,selectedGroup, setSelectedGroup,currentGroup,avatar } = useContext(UserContext); 
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  
  const handleGroupSelect = (group) => {
    setShowDropdown(false);
    setSelectedGroup(group);
  };

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  // 判断 selectedGroup 或 currentGroup 来显示
const groupToDisplay = selectedGroup?.name || currentGroup?.name || "No group selected";

  const handleAvatarClick = () => {
    navigate('/profile'); 
  };

  return (
    <aside className="sidebar">
      <img src={avatar} alt="User profile" className="profile-image" loading="lazy" 
       onClick={handleAvatarClick} 
       style={{ cursor: 'pointer' }}
       />
      <h2 className="username">{user ? user.get("username") : "Guest"}</h2>
      <h1 className="group-title"> {groupToDisplay}</h1>
      <button className="group-switcher" onClick={toggleDropdown} tabIndex="0">
        <img src={switchGroup} alt="Change group icon" className="group-icon" loading="lazy" />
        <span className="group-text">Change Group</span>
        {showDropdown && (
        <div className="dropdown">
          {groupData.map((group) => (
            <div 
              key={group.objectId} 
              className="dropdown-item" 
              onClick={() => handleGroupSelect(group)}
            >
              {group.name}
            </div>
          ))}
        </div>
      )}
      </button>

    
    </aside>
  );
}

export default LeftBar;