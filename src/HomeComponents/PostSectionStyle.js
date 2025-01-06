import styled from "styled-components";

export const PostArea = styled.article`
  display: flex;
  max-width: 100%;
  flex-direction: column;
  color: rgba(15, 25, 26, 0.5);
  align-items: center;
  justify-content: center;
`;

export const PostContainer = styled.div`
  background-color: #fff;
  display: flex;
  width: 80%;
  flex-direction: column;
  padding:20px;
  border: 5px solid #f0f2f5;
  margin: 10px;
  border-radius: 20px;
  box-sizing: border-box;
`;

export const InputWrapper = styled.div`
  align-self: flex-start;
  display: flex;
  gap: 9px;
  width: 100%;

`;

export const InputField = styled.textarea`
  width: 100%;
  padding: 10px;
  font-size: 20px;
  line-height: 1.5;
  resize: none;
  border: none;
  border-radius: 18px;

   @media (max-width: 768px) {
    font-size: 16px; 

`;

export const ActionIcon = styled.img`
  width: 22px;
  align-self: flex-end;
  margin-top: 42px;
  cursor: pointer;
`;

export const PostsList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
`;

export const PostItem = styled.div`
  background-color: #f0f2f5;
  padding: 20px;
  margin-top: 30px;
  border-radius: 40px;
  width: 100%;
  box-sizing: border-box;
`;

export const PostHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const PostAvatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 10px;
`;

export const PostUsername = styled.span`
  font-weight: bold;
  font-size: 25px;

  @media (max-width: 768px) {
    font-size: 18px; 

`;

export const ContentContainer = styled.div`
 margin-left: 70px;
`;

export const PostContent = styled.div`
  font-size: 20px;
  color: #333;
  
   @media (max-width: 768px) {
    font-size: 16px; 
`;

export const UploadedMedia = styled.div`
  border-radius: 8px;
  margin-top: 10px;

  /* 图片 */
  ${(props) => props.as === "img" && `
    width: 100%;
    max-width: 500px; 
    max-height: 300px; /* 限制最大高度 */
    height: auto; /* 保持图片的纵横比 */
    object-fit: contain; /* 保证图片不会被拉伸或压缩 */
  `}

  /* 视频 */
  ${(props) => props.as === "video" && `
    width: 100%;
    max-width: 500px; 
    max-height: 300px; /* 限制最大高度 */
    height: auto; /* 保持视频的纵横比 */
    max-height: 300px;  
  `}

  @media (max-width: 768px) {
    width: 80%; /* 小屏幕下的宽度 */
    height: auto;
  }
`;

export const PostActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: 10px;
`;

export const ActionButton = styled.button`
  border: none;
  display: flex;
  align-items: center;
  background-color: transparent;
  font-size: 20px;

   @media (max-width: 768px) {
    font-size: 14px; 
`;

export const IconImage = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 5px;

  @media (max-width: 768px) {
    width: 10px;
    height: 10px;
 }
`;



