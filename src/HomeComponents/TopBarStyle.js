import styled from "styled-components";

export const DashboardHeader = styled.header`
  display: flex;
  flex-direction: column;
  font-family: Avenir Next, sans-serif;
`;

export const TopBarContainer = styled.div`
  background-color: rgb(48, 114, 120);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box; /* 包括内边距和边框 */
`;

export const WelcomeSection = styled.section`
  display: flex;
  gap: 40px;
  color: #fff;
  flex-wrap: wrap;
`;

export const GreetingContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const WelcomeHeading = styled.h1`
  font-size: 28px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.2px;

   @media (max-width: 768px) {
    font-size: 24px; /* 中屏幕字体大小 */
  }

  @media (max-width: 480px) {
    font-size: 20px; /* 小屏幕字体大小 */
  }
`;

export const WelcomeSubheading = styled.p`
  font-size: 20px;
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0.17px;
  margin-top: 10px;

   @media (max-width: 768px) {
    font-size: 16px; /* 中屏幕字体大小 */
  }

  @media (max-width: 480px) {
    font-size: 13px; /* 小屏幕字体大小 */
  }
`;

export const UploadSection = styled.section`
  display: flex;
  justify-content: center; /* 使按钮在容器内水平分布 */
  flex: 1; /* 使按钮占据剩余空间 */
  align-items: center; /* 垂直居中对齐 */
  gap: 20%;
`;

export const UploadLabel = styled.label`
  display: flex;
  flex-direction: column; /* 垂直排列图标和文字 */
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
  font-weight: bold;
  color: #fff;
  text-align: center;

 img {
    width: 40px; /* 默认图标大小 */
    height: 40px;
    margin-bottom: 5px; /* 图标与文字之间的间距 */

    /* 中屏幕适配 */
    @media (max-width: 768px) {
      width: 30px;
      height: 30px;
    }

    /* 小屏幕适配 */
    @media (max-width: 480px) {
      width: 24px;
      height: 24px;
    }
  }
`;

export const LogoutContainer = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  background-color: transparent; /* 确保背景透明 */
  border: none; /* 移除边框 */
  cursor: pointer;
  margin-left: 20px; /* 左侧间距 */
 

  img {
    width: 40px; /* 调整图标的宽度 */
    height: 40px; /* 调整图标的高度 */
    margin-bottom: 10px; /* 图标与文字的间距 */


    /* 中屏幕适配 */
    @media (max-width: 768px) {
      width: 30px;
      height: 30px;
    }

    /* 小屏幕适配 */
    @media (max-width: 480px) {
      width: 24px;
      height: 24px;
    }
  }

  &:hover {
    opacity: 0.8; /* 添加悬停效果 */
  }
`;

export const LogoutText = styled.span`
  font-size: 16px;
  color: #fff;
`;