import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getArticles } from "../reducer/articlesReducer";
import { GetArticlesBody } from "../types";

export const useGetArticles = (params: GetArticlesBody): void => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArticles(params));
  }, []);
};
