import styled from "styled-components";

// Container for the main content
export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: felx-start;
  height: 100vh;
  width: 100vw;
  padding: 20px;
   box-sizing: border-box;
`;

// Main content wrapper
export const Main = styled.main`
  display: flex;
  flex-direction: column; // 让内容垂直排列
  width: 80%;
  max-width: 800px; // 控制表单最大宽度，使其不占满大屏幕
  height: fit-content; // 让内容高度适应内容
  background-color: #d1e8e4;
  padding: 20px;
  border-radius: 20px;
  overflow-y: auto; // 垂直滚动

   @media (max-width: 768px) {
    width: 100%;
    padding: 15px; // 减少小屏幕上的内边距
    border-radius: 15px; // 调整圆角以适应小屏幕
  }

`;

// Profile container
export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 60px;
  margin-bottom: 10%;
  width: 100%;

`;

// Avatar container
export const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

// Avatar image
export const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;

    @media (max-width: 768px) {
    width: 80px;
    height: 80px; // 在小屏幕上缩小头像
  }
`;

// Change avatar button
export const ChangeButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 10px;
`;

// User info
export const UserInfo = styled.div`
  flex-grow: 1;
`;

export const UserName = styled.h2`
  font-size: 30px;
  font-weight: bold;
  margin: 0;

   @media (max-width: 768px) {
    font-size: 24px; // 在小屏幕上字体更小
`;

export const UserEmail = styled.p`
  font-size: 20px;
  color: #555555;
  margin: 0;
  
 @media (max-width: 768px) {
    font-size: 16px; // 在小屏幕上字体更小
  }
`;

// Edit button
export const EditButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 25px;

   @media (max-width: 768px) {
    font-size: 18px; // 小屏幕字体更小
    padding: 8px 8px;
  }
`;

// Form wrapper
export const Form = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  width: 100%;

   @media (max-width: 768px) {
    gap: 8px; // 小屏幕上的间距更紧凑
  }
`;

// Input group
export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;

   @media (max-width: 768px) {
    gap: 8px; // 小屏幕上的间距更紧凑
  }
`;

// Input label
export const Label = styled.label`
  margin-bottom: 5px;
  font-weight: normal;
  color: #333;
  font-size: 25px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

// Input field
export const Input = styled.input`
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #ccc;
  font-size: 20px;

`;