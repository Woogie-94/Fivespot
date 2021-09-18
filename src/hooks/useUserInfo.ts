import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../reducer/loginReducer";
import { UserInfo } from "../types";

export const useUserInfo = (): [UserInfo, () => void] => {
  const [userInfo, setUserInfo] = useState<UserInfo>({ state: false, email: "", username: "", token: "" });
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const { email, username, token } = JSON.parse(localStorage.getItem("user")!);
      setUserInfo({ state: true, email, username, token });
    }
  }, []);

  const onLogOut = useCallback((): void => {
    localStorage.removeItem("user");
    setUserInfo({ ...userInfo, state: false });
    dispatch(logOut());
  }, [userInfo, dispatch]);

  return [userInfo, onLogOut];
};
