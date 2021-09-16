import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootStateOrAny } from "react-redux";
import { SignUpBody, SignUpReducerState } from "../types";

export const axiosUserSignUp = createAsyncThunk("users/signup", async (body: SignUpBody) => {
  const response = await axios.post("https://test.fivespot.space/api/users", body);
  return response.data;
});

const initialState: SignUpReducerState = {
  state: "pending",
  error: "",
};

export const signUpReducer = createSlice({
  name: "sign up",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(axiosUserSignUp.pending, (state, action) => {
        state.state = "pending";
      })
      .addCase(axiosUserSignUp.fulfilled, (state, action) => {
        state.state = "success";
        localStorage.setItem("token", action.payload.user.token);
      })
      .addCase(axiosUserSignUp.rejected, (state, action) => {
        state.state = "failed";
        if (action.error.stack) state.error = action.error.stack;
      });
  },
});

export const signUpSelector = (state: RootStateOrAny): SignUpReducerState => state.signUpReducer;
