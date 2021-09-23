import { Pagination } from "@mui/material";
import axios from "axios";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import ListItem from "./ListItem";
import { GetArticlesBody, REQUEST_STATES } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { articelsSelector, getArticles } from "../reducer/articlesReducer";

// total로 페이지 수 계산
// 페이지별로 offset 증가

const Lists = (): JSX.Element => {
  const [totalArticle, setTotalArticle] = useState<number>(0);
  const [articlesBody, setArticlesBody] = useState<GetArticlesBody>({ limit: 5, offset: 0 });

  const dispatch = useDispatch();
  const articleData = useSelector(articelsSelector);

  const getTotalArticle = useCallback(async (): Promise<void> => {
    // 페이지네이션을 위한 게시글 총 갯수를 구하는 함수
    // 게시글 총 갯수를 얻을 수 있는 수단이 없어 임의로 사용합니다.
    const response = await axios.get(`https://test.fivespot.space/api/articles?limit=10000&offset=0`);

    setTotalArticle(response.data.articlesCount);
  }, []);

  useEffect(() => {
    getTotalArticle();
  }, [getTotalArticle]);

  useEffect(() => {
    dispatch(getArticles(articlesBody));
  }, [articlesBody]);

  const onPageChange = useCallback(
    (event: ChangeEvent<unknown>, page: number) =>
      setArticlesBody((body) => {
        return { ...body, offset: 5 * (page - 1) };
      }),
    []
  );

  return (
    <ListContainer>
      <ArticlesContainer>
        {articleData.state === REQUEST_STATES.SUCCESS && articleData.articles.map((article, index) => <ListItem key={index} article={article} />)}
      </ArticlesContainer>
      <Pagination count={Math.ceil(totalArticle / 5)} onChange={onPageChange} />
    </ListContainer>
  );
};

const ListContainer = styled.div`
  width: 1100px;
  margin-top: 40px;
  padding: 0 10px;
`;

const ArticlesContainer = styled.div`
  width: 100%;
  height: 550px;
`;

export default Lists;
