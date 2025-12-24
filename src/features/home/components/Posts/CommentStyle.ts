import styled from "styled-components";
import { media } from "@styles/responsive";

export const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-top: 10px;
  gap: 8px;
`;

export const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const CommentAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;

  ${media("md")`
    width: 32px;
    height: 32px;
  `}
`;

export const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const CommentAuthor = styled.span`
  font-weight: 700;
  font-size: 16px;

  ${media("md")`
    font-size: 14px;
  `}
`;

export const ReplyTo = styled.span`
  font-weight: 400;
  margin-left: 4px;
`;

export const CommentBody = styled.p`
  color: #111;
  font-size: 15px;
  margin: 0;

  ${media("md")`
    font-size: 14px;
  `}
`;

export const CommentText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-left: 40px;

  ${media("md")`
    margin-left: 32px;
  `}
`;

export const ButtonsInReply = styled.div`
  margin-top: 8px;
  display: flex;
  gap: 24px;
`;

export const ActionButton = styled.button`
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  background-color: transparent;
  font-size: 15px;

  ${media("md")`
    font-size: 13px;
  `}
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
  gap: 8px;

  ${media("md")`
    flex-direction: column;
    align-items: stretch;
  `}
`;

export const ReplyInputField = styled.input`
  flex: 1;
  min-width: 0;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 10px;
  outline: none;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
  font-size: 15px;

  &:focus {
    border-color: #007bff;
    box-shadow: 0px 4px 8px rgba(0, 123, 255, 0.2);
  }
`;

export const ReplyButton = styled.button`
  background-color: rgb(48, 114, 120);
  color: white;
  padding: 8px 12px;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  font-size: 14px;
  align-self: flex-start;

  ${media("md")`
    width: 100%;
    text-align: center;
  `}
`;

export const ReplyList = styled.div`
  margin-top: 20px;
  margin-left: 32px;

  ${media("md")`
    margin-left: 24px;
  `}
`;
