import { configureStore } from "@reduxjs/toolkit";
import { signUpReducer } from "../reducer/signUpReducer";

export default configureStore({
  reducer: {
    signUpReducer: signUpReducer.reducer,
  },
});
