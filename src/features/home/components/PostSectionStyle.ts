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
  padding: 18px 20px;
  border: 1px solid #e8eef1;
  margin: 12px;
  border-radius: 20px;
  box-sizing: border-box;
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.07);
  gap: 14px;
`;

export const InputWrapper = styled.div`
  align-self: flex-start;
  display: flex;
  gap: 9px;
  width: 100%;
  background: #f5f9fb;
  border: 1px solid #e4edef;
  border-radius: 16px;
  padding: 12px 14px;
`;

export const InputField = styled.textarea`
  width: 100%;
  padding: 10px 2px;
  font-size: 17px;
  line-height: 1.5;
  resize: none;
  border: none;
  border-radius: 12px;
  background: transparent;

  &::placeholder {
    color: #7c8b90;
    font-weight: 500;
  }

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

export const PostTimestamp = styled.div`
  font-size: 13px;
  color: #4f666b;
  margin-top: 2px;

  ${media("md")`
    font-size: 12px;
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
  flex-wrap: wrap;
`;

export const ActionButton = styled.button`
  border: none;
  display: flex;
  align-items: center;
  background-color: transparent;
  font-size: 14px;
  font-weight: 700;
  color: #2f7c84;
  gap: 6px;
  padding: 8px 10px;
  border-radius: 10px;
  transition:
    background-color 0.2s ease,
    transform 0.1s ease;

  ${media("md")`
    font-size: 14px;
  `}

  &:hover {
    background-color: rgba(47, 124, 132, 0.08);
    transform: translateY(-1px);
  }
`;

export const PreviewContainer = styled.div`
  width: 100%;
  background: #f5f9fb;
  border: 1px solid #e4edef;
  border-radius: 14px;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const PreviewHeader = styled.div`
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #5a6b70;
`;

export const PreviewBody = styled.div`
  font-size: 15px;
  color: #1f2f32;
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  gap: 10px;

  p {
    margin: 0;
    white-space: pre-wrap;
  }
`;

export const PreviewActions = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  flex-wrap: wrap;
`;

export const PreviewButton = styled.button<{ variant?: "ghost" }>`
  padding: 9px 14px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  border: ${(props) => (props.variant === "ghost" ? "1px solid #cfd8db" : "none")};
  color: ${(props) => (props.variant === "ghost" ? "#39555c" : "#fff")};
  background: ${(props) =>
    props.variant === "ghost" ? "transparent" : "linear-gradient(135deg, #2f7c84, #3ea7b0)"};
  box-shadow: ${(props) =>
    props.variant === "ghost" ? "none" : "0 10px 24px rgba(47, 124, 132, 0.2)"};
  transition:
    transform 0.1s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${(props) =>
      props.variant === "ghost"
        ? "0 6px 18px rgba(0,0,0,0.08)"
        : "0 12px 28px rgba(47, 124, 132, 0.3)"};
  }
  &:active {
    transform: translateY(0);
  }
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
