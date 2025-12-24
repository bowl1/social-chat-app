import styled from "styled-components";
import { media } from "@styles/responsive";

export const PostArea = styled.article`
  display: flex;
  max-width: 100%;
  flex-direction: column;
  color: rgba(15, 25, 26, 0.8);
  align-items: center;
  justify-content: flex-start;
  padding: 8px 0 24px;
`;

export const PostContainer = styled.div`
  background-color: #fff;
  display: flex;
  width: 90%;
  max-width: 760px;
  flex-direction: column;
  padding: 16px;
  border: 1px solid #eef2f5;
  margin: 8px;
  border-radius: 18px;
  box-sizing: border-box;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
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
  font-size: 16px;
  line-height: 1.4;
  resize: none;
  border: none;
  border-radius: 18px;
  background: #f5f8fa;

  ${media("md")`
    font-size: 15px;
  `}
`;

export const ActionIcon = styled.img`
  width: 20px;
  align-self: flex-end;
  margin-top: 32px;
  cursor: pointer;
`;

export const PostsList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const PostItem = styled.div`
  background-color: #f8fafc;
  padding: 16px;
  margin-top: 20px;
  border-radius: 18px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #eef2f5;
`;

export const PostHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const PostAvatar = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  margin-right: 10px;
`;

export const PostUsername = styled.span`
  font-weight: bold;
  font-size: 18px;

  ${media("md")`
    font-size: 16px;
  `}
`;

export const ContentContainer = styled.div`
  margin-left: 64px;
`;

export const PostContent = styled.div`
  font-size: 16px;
  color: #333;

  ${media("md")`
    font-size: 14px;
  `}
`;

export const UploadedMedia = styled.div`
  border-radius: 8px;
  margin-top: 10px;

  ${(props) =>
    props.as === "img" &&
    `
    width: 100%;
    max-width: 480px; 
    max-height: 280px; 
    height: auto; 
    object-fit: contain; /* 保证图片不会被拉伸或压缩 */
  `}

  ${(props) =>
    props.as === "video" &&
    `
    width: 100%;
    max-width: 480px; 
    max-height: 280px; 
    height: auto; 
  `}

  ${media("md")`
    width: 80%;
    height: auto;
  `}
`;

export const PostActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 10px;
`;

export const ActionButton = styled.button`
  border: none;
  display: flex;
  align-items: center;
  background-color: transparent;
  font-size: 16px;

  ${media("md")`
    font-size: 14px;
  `}
`;

export const IconImage = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;

  ${media("md")`
    width: 16px;
    height: 16px;
  `}
`;
