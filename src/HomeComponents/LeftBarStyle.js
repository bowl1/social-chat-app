import styled from "styled-components";

export const Sidebar = styled.aside`
  position: relative;
  background-color: #fff;
  box-shadow: -3px 0 50px rgba(169, 222, 249, 0.25);
  color: #0f191a;
  font-size: 18px;
  height: 100%;
  display: flex;
  justify-content: center;
`;

export const Sidecontainer = styled.div`
 display: flex;
 padding-top: 100px;
 flex-direction: column;
 box-sizing: border-box; 
  `;

export const ProfileImage = styled.img`
  width: 120px;
  border-radius: 32px;
  align-self: center;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 70px; 
  }
`;

export const Username = styled.h2`
  font-size: 30px;
  align-self: center;
  margin-top: 15px;
`;

export const GroupTitle = styled.h1`
  display: flex;
  color: #307278;
  font-size: 30px;
  font-weight: 600;
  margin-top: 68px;
  word-wrap: break-word;
  word-break: break-word;
  white-space: normal;
  justify-content: center; 
  text-align: center;
`;

export const GroupSwitcher = styled.button`
  display: flex;
  margin-top: 20px;
  gap: 12px;
  font-size: 25px;
  align-items: center;
  border: transparent;
  justify-content: flex-start;
  padding: 10px 12px;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
  background: none;
  flex-direction: column;

`;

export const GroupIcon = styled.img`
  width: 50px;
  border-radius: 30%;
`;

export const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  padding: 10px;
  border-radius: 5px;
  visibility: ${({ hasItems }) => (hasItems ? "visible" : "hidden")}; 
`;

export const DropdownItem = styled.div`
  padding: 10px 15px;
  font-size: 25px;
  cursor: pointer;
  white-space: wrap;

  &:hover {
    background-color: #f0f0f0;
  }

`;

