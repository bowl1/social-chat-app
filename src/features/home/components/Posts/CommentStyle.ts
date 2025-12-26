import styled from "styled-components";
import { media } from "@styles/responsive";

export const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-top: 10px;
  gap: 8px;
  background: #ffffff;
  border: 1px solid #eef2f3;
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
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
  font-weight: 800;
  font-size: 16px;
  color: #102326;

  ${media("md")`
    font-size: 14px;
  `}
`;

export const ReplyTo = styled.span`
  font-weight: 500;
  margin-left: 6px;
  color: #5b6b70;
`;

export const CommentBody = styled.p`
  color: #1f2f32;
  font-size: 15px;
  margin: 0;
  line-height: 1.6;

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
  gap: 16px;
  flex-wrap: wrap;
`;

export const ActionButton = styled.button`
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  background-color: transparent;
  font-size: 14px;
  font-weight: 600;
  color: #2f7c84;
  padding: 6px 10px;
  border-radius: 8px;
  transition:
    background-color 0.2s ease,
    transform 0.1s ease;

  ${media("md")`
    font-size: 13px;
  `}

  &:hover {
    background-color: rgba(47, 124, 132, 0.08);
    transform: translateY(-1px);
  }
`;

export const IconImage = styled.img`
  width: 14px;
  height: 14px;
  margin-right: 6px;
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
  border: 1px solid #e0e7ea;
  border-radius: 12px;
  outline: none;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  font-size: 15px;

  &:focus {
    border-color: #2f7c84;
    box-shadow: 0px 6px 14px rgba(47, 124, 132, 0.15);
  }
`;

export const ReplyButton = styled.button`
  background: linear-gradient(135deg, #2f7c84, #3ea7b0);
  color: white;
  padding: 9px 14px;
  border: none;
  cursor: pointer;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.2px;
  align-self: flex-start;
  box-shadow: 0 10px 24px rgba(47, 124, 132, 0.25);
  transition:
    transform 0.1s ease,
    box-shadow 0.2s ease;

  ${media("md")`
    width: 100%;
    text-align: center;
  `}

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 12px 28px rgba(47, 124, 132, 0.35);
  }
  &:active {
    transform: translateY(0);
  }
`;

export const ReplyList = styled.div`
  margin-top: 20px;
  margin-left: 32px;

  ${media("md")`
    margin-left: 24px;
  `}
`;
