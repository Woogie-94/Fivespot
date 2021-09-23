import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootStateOrAny } from "react-redux";
import { SignUpBody, SignUpReducerState } from "../types";

export const axiosSignUp = createAsyncThunk("users/signup", async (body: SignUpBody) => {
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
  reducers: {
    signupStateReset: (state) => {
      state.state = "pending";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(axiosSignUp.pending, (state, action) => {
        state.state = "pending";
      })
      .addCase(axiosSignUp.fulfilled, (state, action) => {
        state.state = "success";
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(axiosSignUp.rejected, (state, action) => {
        state.state = "failed";
        if (action.error.stack) state.error = action.error.stack;
      });
  },
});

export const { signupStateReset } = signUpReducer.actions;
export const signUpSelector = (state: RootStateOrAny): SignUpReducerState => state.signUpReducer;
