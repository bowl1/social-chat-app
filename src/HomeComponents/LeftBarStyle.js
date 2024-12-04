import styled from "styled-components";

export const Sidebar = styled.aside`
  position: relative;
  background-color: #fff;
  box-shadow: -3px 0 50px rgba(169, 222, 249, 0.25);
  display: flex;
  flex-direction: column;
  font-family: Avenir Next;
  color: #0f191a;
  padding: 20px; 
  width: 200px;
  font-size: 18px;
  height: 100%;

  @media (max-width: 768px) {
    width: 50px; /* 折叠宽度 */
  }
`;

export const ProfileImage = styled.img`
  width: 93px;
  border-radius: 32px;
  align-self: center;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 70px; /* 调整小屏幕下的宽度 */
  }
`;

export const Username = styled.h2`
  font-size: 19px;
  align-self: center;
  margin-top: 15px;
`;

export const GroupTitle = styled.h1`
  display: flex;
  color: #307278;
  font-size: 24px;
  font-weight: 600;
  margin-top: 68px;
  word-wrap: break-word;
  word-break: break-word;
  white-space: normal;
  justify-content: center; /* 水平居中 */
  text-align: center; /* 确保文字内容居中 */

  /* 小屏幕适配 */
  @media (max-width: 768px) {
    font-size: 20px; /* 缩小字体大小 */
    margin-top: 40px; /* 减小顶部间距 */
  }

  /* 超小屏幕适配 */
  @media (max-width: 480px) {
    font-size: 14px; /* 更小的字体 */
    margin-top: 20px; /* 更小的顶部间距 */
  }
`;

export const GroupSwitcher = styled.button`
  display: flex;
  margin-top: 20px;
  gap: 12px;
  font-size: 18px;
  align-items: center;
  border: transparent;
  justify-content: flex-start;
  padding: 10px 12px;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
  background: none;
  flex-direction: column;

   @media (max-width: 480px) {
    font-size: 14px; /* 小屏幕字体大小 */
 
  }
`;

export const GroupIcon = styled.img`
  width: 32px;
`;

export const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  padding: 10px;
  border-radius: 5px;
  z-index: 100;
`;

export const DropdownItem = styled.div`
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
  white-space: wrap;

  &:hover {
    background-color: #f0f0f0;
  }
`;

