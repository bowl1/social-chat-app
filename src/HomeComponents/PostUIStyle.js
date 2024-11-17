import styled from "styled-components";

export const PostArea = styled.article`
  display: flex;
  max-width: 100%;
  flex-direction: column;
  color: rgba(15, 25, 26, 0.5);
  font: 400 13px Avenir Next, -apple-system, Roboto, Helvetica, sans-serif;
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
   box-sizing: border-box;  /* 包括边框和内边距 */
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
  line-height: 1.5;
  resize: none;
  border: none;
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
  padding: 10px;
  margin-top: 10px;
  border-radius: 20px;
  width: 100%;
  box-sizing: border-box;
`;

export const PostHeader = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
`;

export const PostAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const PostUsername = styled.span`
  font-weight: bold;
  font-size: 16px;
`;

export const PostContent = styled.div`
  font-size: 14px;
  color: #333;
  margin-top: 30px;
`;

export const UploadedMedia = styled.img`
  max-width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 8px;
  margin-top: 10px;
`;

export const PostActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: 10px;
`;

export const ActionButton = styled.button`
  all: unset;
`;

export const IconImage = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 5px;
`;

