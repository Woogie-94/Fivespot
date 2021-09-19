import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import styled from "styled-components";
import Comment from "../components/Comment";
import Header from "../components/Header";
import basicImg from "../images/basic_img_1.jpg";
import { Article } from "../types";

const ArticleDetail = ({ match }: RouteComponentProps<{ slug: string }>): JSX.Element => {
  const [detailData, setDetailData] = useState<Article | null>();

  const getArticleDetail = useCallback(async (): Promise<void> => {
    const response = await axios.get(`https://test.fivespot.space/api/articles/${match.params.slug}`);

    setDetailData(response.data.article);
  }, [match.params.slug]);

  useEffect(() => {
    getArticleDetail();
  }, [getArticleDetail]);

  return (
    <>
      <Header />
      <DetailContainer>
        <DetailImgContainer>
          <DetailImg src={basicImg} />
        </DetailImgContainer>
        <DetailTitle>{detailData && detailData.title}</DetailTitle>
        <DetailAuthor>작성자 - {detailData && detailData.author.username}</DetailAuthor>
        <DetailBody>{detailData && detailData.body}</DetailBody>
        <Comment slug={match.params.slug} />
      </DetailContainer>
    </>
  );
};

const DetailContainer = styled.div`
  width: 700px;
  margin: 70px auto;
`;

const DetailImgContainer = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 300px;
  background-color: #000;
`;

const DetailImg = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
`;

const DetailTitle = styled.p`
  margin-top: 30px;
  font-family: "NanumSquareEB";
  font-size: 35px;
`;

const DetailAuthor = styled.p`
  margin: 10px 0 30px;
  font-family: "NanumSquareR";
  color: #aaa;
`;

const DetailBody = styled.p`
  width: 100%;
  height: 100px;
  max-height: 300px;
  font-family: "NanumSquareR";
  font-size: 24px;
`;

export default ArticleDetail;
