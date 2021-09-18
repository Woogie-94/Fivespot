import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootStateOrAny } from "react-redux";
import { LoginBody, LoginReducerState } from "../types";

export const axiosLogin = createAsyncThunk("users/signup", async (body: LoginBody) => {
  const response = await axios.post("https://test.fivespot.space/api/users/login", body);
  return response.data;
});

const initialState: LoginReducerState = {
  state: "pending",
  error: "",
};

export const loginReducer = createSlice({
  name: "login",
  initialState,
  reducers: {
    logOut: (state) => {
      state.state = "pending";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(axiosLogin.pending, (state, action) => {
        state.state = "pending";
      })
      .addCase(axiosLogin.fulfilled, (state, action) => {
        state.state = "success";
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(axiosLogin.rejected, (state, action) => {
        state.state = "failed";
        if (action.error.stack) state.error = action.error.stack;
      });
  },
});

export const { logOut } = loginReducer.actions;
export const loginSelector = (state: RootStateOrAny): LoginReducerState => state.loginReducer;
