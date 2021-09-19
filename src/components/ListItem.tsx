import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import basicImg from "../images/basic_img_1.jpg";

import { Article } from "../types";

const ListItem = ({ article }: { article: Article }): JSX.Element => {
  return (
    <ItemContainer to={`/articles/${article.slug}`}>
      <ItemImgContainer>
        <ItemImg src={basicImg} />
      </ItemImgContainer>
      <ItemInfo>
        <ItemTitle>{article.title}</ItemTitle>
        <ItemDesc>{article.description}</ItemDesc>
      </ItemInfo>
    </ItemContainer>
  );
};

const ItemContainer = styled(Link)`
  display: flex;
  cursor: pointer;
  transition: all 0.3s;
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
  color: #000;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 3px;

  &:hover {
    transform: translateX(10px);
  }
`;

const ItemImgContainer = styled.div`
  overflow: hidden;
  position: relative;
  width: 150px;
`;

const ItemImg = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
`;

const ItemInfo = styled.div`
  width: 100%;
  padding: 10px;
`;

const ItemTitle = styled.p`
  font-family: "NotoSquearB";
  margin-bottom: 10px;
`;

const ItemDesc = styled.p`
  font-family: "NotoSquearR";
  max-width: 400px;
`;

export default ListItem;
