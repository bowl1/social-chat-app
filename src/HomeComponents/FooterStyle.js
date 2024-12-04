import styled from "styled-components";

export const FooterSection = styled.footer`
  background-color: rgba(48, 114, 120, 1);
  display: flex;
  font-family: Avenir Next;
  flex-wrap: wrap;
  padding: 1px 40px;
  justify-content: space-between;
  bottom: 0;
  max-height: 8vh;
  min-height: fit-content;
  align-items: center;
  box-sizing: border-box; //如果未设置 box-sizing: border-box，元素宽度会加上 padding 和 border，导致宽度超出父容器。

  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;

export const Logo = styled.img`
  object-fit: contain;
  width: 60px;
  align-self: center;
`;

export const BrandContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const BrandName = styled.h2`
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  line-height: 1;
  text-align: center;
`;

export const Copyright = styled.p`
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  opacity: 0.5;
  margin-top: 0px;
`;

export const BackToTopButton = styled.button`
  align-self: center;
  border-radius: 25px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  background: linear-gradient(
    100deg,
    rgba(255, 255, 255, 0.5) 16.09%,
    rgba(255, 255, 255, 0.1) 105.27%
  );
  max-height: 4vmax;
  font-size: 14px;
  color: #fff;
  font-weight: 400;
  padding: 10px 10px;
  cursor: pointer;
`;
