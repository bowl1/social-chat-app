import styled from "styled-components";

export const CommentContainer = styled.div`
  margin-bottom: 10px;
`;

export const CommentContent = styled.div`
  display: flex;
  align-items: flex-start;
  margin-left: 10px;
`;

export const CommentAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export const CommentText = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

export const CommentHeader = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CommentAuthor = styled.span`
  font-weight: bold;
  margin-bottom: 18px;
`;

export const ReplyTo = styled.span`
  font-weight: normal;
`;

export const CommentBody = styled.p`
  margin: 0;
`;

export const ButtonsInReply = styled.div`
  margin-top: 8px;
`;

export const ActionButton = styled.button`
  all: unset;
  cursor: pointer;
`;

export const IconImage = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 5px;
`;

export const ReplyInputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

export const ReplyInputField = styled.input`
  width: 50%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 10px;

  &:focus {
    border-color: #007bff;
    box-shadow: 0px 4px 8px rgba(0, 123, 255, 0.2);
  }
`;

export const ReplyButton = styled.button`
  background-color: rgb(48, 114, 120);
  color: white;
  padding: 6px 12px;
  margin-left: 8px;
  border: none;
  cursor: pointer;
  border-radius: 8px;
`;

export const ReplyList = styled.div`
  margin-left: 20px;
  margin-top: 5px;
`;