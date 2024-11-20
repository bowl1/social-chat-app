import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #306c71;
  color: #fff;
  height: 100px;
  
  @media (max-width: 768px) {
    padding: 10px 20px; /* 减少小屏幕上的左右内边距 */
    height: 80px; /* 调整小屏幕上的高度 */
  }
`;

export const BackButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Icon = styled.img`
  width: 16px;
  height: 16px;
  margin-left: 150px;

   @media (max-width: 768px) {
    margin-left: 20px; /* 减少小屏幕上的左边距 */
    width: 14px; /* 缩小图标尺寸 */
    height: 14px;
  }
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 25px;
  font-weight: bold;


  @media (max-width: 768px) {
    font-size: 20px; /* 缩小字体 */
  }
`;

export const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

export const LogoutIcon = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 150px;
  margin-top: 5px;

   @media (max-width: 768px) {
    width: 30px; /* 缩小图标尺寸 */
    height: 30px;
    margin-right: 20px; /* 减少小屏幕上的右边距 */
  }
`;

export const LogoutButton = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 16px;
  margin-right: 150px;

   @media (max-width: 768px) {
    font-size: 14px; /* 缩小字体 */
    margin-right: 20px; /* 减少小屏幕上的右边距 */
  }
`;