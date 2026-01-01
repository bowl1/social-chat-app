import styled from "styled-components";
import { media } from "@styles/responsive";

export const Sidebar = styled.aside`
  position: relative;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
  color: #0f191a;
  font-size: 16px;
  min-height: 100%;
  display: flex;
  justify-content: center;
`;

export const Sidecontainer = styled.div`
  display: flex;
  padding: 32px 20px;
  flex-direction: column;
  box-sizing: border-box;
  gap: 16px;
`;

export const AvatarWrapper = styled.div`
  position: relative;
  width: 96px;
  height: 96px;
  border-radius: 24px;
  align-self: center;
  cursor: pointer;
  overflow: hidden;
  isolation: isolate;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      120deg,
      rgba(255, 255, 255, 0) 25%,
      rgba(255, 255, 255, 0.7) 50%,
      rgba(255, 255, 255, 0) 75%
    );
    transform: translateX(-120%);
    pointer-events: none;
  }

  &:hover::after {
    animation: avatar-shine 0.9s ease;
  }

  &:hover {
    transform: scale(1.04) rotate(-1.5deg);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.16);
  }

  &:active {
    transform: scale(0.96);
  }

  @keyframes avatar-shine {
    0% {
      transform: translateX(-120%);
    }
    100% {
      transform: translateX(120%);
    }
  }

  ${media("md")`
    width: 70px;
    height: 70px;
  `}
`;

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
`;

export const Username = styled.h2`
  font-size: 18px;
  align-self: center;
  margin: 8px 0 0;
  font-weight: 700;
`;

export const GroupTitle = styled.h1`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: #0f191a;
  text-align: center;
  margin: 12px 0 0;

  .label {
    font-size: 12px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: rgba(15, 25, 26, 0.6);
  }

  .name {
    font-size: 20px;
    font-weight: 800;
    color: #2c6d74;
    line-height: 1.2;
    word-wrap: break-word;
    word-break: break-word;
  }
`;

export const GroupSwitcher = styled.button`
  display: flex;
  margin-top: 10px;
  gap: 10px;
  font-size: 16px;
  align-items: center;
  border: transparent;
  justify-content: flex-start;
  padding: 10px 12px;
  border-radius: 12px;
  cursor: pointer;
  position: relative;
  background: #f4fbfc;
  flex-direction: column;
  width: 100%;
`;

export const GroupIcon = styled.img`
  width: 40px;
  border-radius: 30%;
`;

export const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  background-color: #fff;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.12);
  padding: 10px;
  border-radius: 5px;
`;

export const DropdownItem = styled.div`
  padding: 8px 12px;
  font-size: 15px;
  cursor: pointer;
  white-space: wrap;

  &:hover {
    background-color: #f0f0f0;
  }
`;
