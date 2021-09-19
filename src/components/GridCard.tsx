import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import basicImg from "../images/basic_img_1.jpg";
import { Article } from "../types";

const GridCard = ({ article }: { article: Article }): JSX.Element => {
  return (
    <CardContainer to={`/articles/${article.slug}`}>
      <CardImgContainer>
        <CardImg src={basicImg} alt="Card Img" />
      </CardImgContainer>
      <CardInfoContainer>
        <CardTitle>{article.title}</CardTitle>
        <CardDesc>{article.description}</CardDesc>
        <CardAuthor>{article.author.username}</CardAuthor>
      </CardInfoContainer>
    </CardContainer>
  );
};

const CardContainer = styled(Link)`
  cursor: pointer;
  transition: all 0.3s;
  width: calc((100% - 80px) / 4);
  margin: 0 10px 20px;
  color: #000;
  background-color: #fff;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-10px);
  }

  @media screen and (max-width: 1099px) {
    width: calc((100% - 80px) / 3);
  }

  @media screen and (max-width: 799px) {
    width: calc((100% - 80px) / 2);
  }
`;

const CardImgContainer = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 150px;
`;
const CardImg = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
`;

const CardInfoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 150px;
  padding: 10px;
`;
const CardTitle = styled.p`
  width: 100%;
  font-family: "NanumSquareEB";
`;
const CardDesc = styled.p`
  width: 100%;
  margin-top: 10px;
  font-family: "NanumSquareR";
  font-size: 14px;
`;
const CardAuthor = styled.p`
  position: absolute;
  bottom: 10px;
  width: 100%;
  margin-top: 10px;
  font-family: "NanumSquareR";
  color: #aaa;
  font-size: 14px;
`;

export default GridCard;
