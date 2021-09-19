import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { articelsSelector, getArticles } from "../reducer/articlesReducer";
import { REQUEST_STATES, Article, GetArticlesBody } from "../types";
import GridCard from "./GridCard";

const Grid = (): JSX.Element => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [articlesBody, setArticlesBody] = useState<GetArticlesBody>({ limit: 12, offset: 0 });
  const [throttleWaiting, setThrottleWaiting] = useState<boolean>(false);

  const dispatch = useDispatch();
  const articleData = useSelector(articelsSelector);

  const throttle = useCallback(
    (callback: () => void, delay: number) => {
      if (throttleWaiting) return;
      if (!throttleWaiting) {
        setThrottleWaiting(true);

        setTimeout(() => {
          callback();
          setThrottleWaiting(false);
        }, delay);
      }
    },
    [throttleWaiting]
  );

  const onScroll = useCallback((): void => {
    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    const { scrollTop } = document.documentElement;

    if (Math.round(scrollTop + innerHeight) >= scrollHeight) {
      throttle(() => {
        setArticlesBody((body) => {
          return { ...body, offset: body.offset + 12 };
        });
      }, 300);
    }
  }, [throttle]);

  useEffect(() => {
    if (articlesBody.offset > 24) return;

    dispatch(getArticles(articlesBody));
  }, [dispatch, articlesBody]);

  useEffect(() => {
    console.log(articleData, "grid");
    if (articleData.state === REQUEST_STATES.SUCCESS) setArticles((articles) => [...articles, ...articleData.articles]);
    if (articleData.state === REQUEST_STATES.FAILED) console.error(articleData.error);
  }, [articleData]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => window.addEventListener("scroll", onScroll);
  }, [onScroll, throttle]);

  return (
    <GridContainer>
      {articles.map((article, index) => (
        <GridCard key={index} article={article} />
      ))}
    </GridContainer>
  );
};

const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 1100px;
  margin-top: 40px;
`;

export default Grid;
