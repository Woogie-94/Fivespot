import { configureStore } from "@reduxjs/toolkit";
import { signUpReducer } from "../reducer/signUpReducer";
import { articlesReducer } from "./articlesReducer";
import { loginReducer } from "./loginReducer";

export default configureStore({
  reducer: {
    signUpReducer: signUpReducer.reducer,
    loginReducer: loginReducer.reducer,
    articlesReducer: articlesReducer.reducer,
  },
});
