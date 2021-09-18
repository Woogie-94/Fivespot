import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootStateOrAny } from "react-redux";
import { ArticlesReducerState, GetArticlesBody } from "../types";

export const getArticles = createAsyncThunk("articels", async (body: GetArticlesBody) => {
  const response = await axios.get(`https://test.fivespot.space/api/articles`, { params: body });

  return response.data;
});

const initialState: ArticlesReducerState = {
  state: "pending",
  error: "",
  articles: [],
};

export const articlesReducer = createSlice({
  name: "articles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getArticles.pending, (state, action) => {
        state.state = "pending";
      })
      .addCase(getArticles.fulfilled, (state, action) => {
        state.state = "success";
        state.articles = action.payload.articles;
      })
      .addCase(getArticles.rejected, (state, action) => {
        state.state = "failed";
        if (action.error.stack) state.error = action.error.stack;
      });
  },
});

export const articelsSelector = (state: RootStateOrAny): ArticlesReducerState => state.articlesReducer;
