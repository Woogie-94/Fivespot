import React, { FormEvent, FormEventHandler, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../hooks/useInput";
import { axiosLogin, loginSelector } from "../reducer/loginReducer";
import { REQUEST_STATES } from "../types";
import * as H from "history";

const Login = ({ history }: { history: H.History }): JSX.Element => {
  const [email, onEmail] = useInput<string>("");
  const [password, onPassword] = useInput<string>("");

  const dispatch = useDispatch();
  const loginState = useSelector(loginSelector);

  const onLogin: FormEventHandler<HTMLFormElement> = useCallback(
    async (e: FormEvent): Promise<void> => {
      e.preventDefault();

      const user = {
        user: {
          email,
          password,
        },
      };

      dispatch(axiosLogin(user));
    },
    [email, password, dispatch]
  );

  useEffect(() => {
    if (loginState.state === REQUEST_STATES.SUCCESS) history.push("/");
    if (loginState.state === REQUEST_STATES.FAILED) {
      alert("존재하지 않은 계정입니다.");
      console.error(loginState.error);
    }
  }, [loginState, history]);

  return (
    <>
      <form onSubmit={onLogin}>
        <div>
          <input type="email" value={email} onChange={onEmail}></input>
        </div>
        <div>
          <input type="password" value={password} onChange={onPassword}></input>
        </div>
        <button type="submit">로그인</button>
      </form>
    </>
  );
};

export default Login;
