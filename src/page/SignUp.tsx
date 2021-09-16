import React, { FormEvent, FormEventHandler, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { axiosSignUp, signUpSelector } from "../reducer/signUpReducer";
import * as H from "history";
import { REQUEST_STATES, SignUpBody } from "../types";
import useInput from "../hooks/useInput";

const SignUp = ({ history }: { history: H.History }): JSX.Element => {
  const [email, onEmail] = useInput<string>("");
  const [password, onPassword] = useInput<string>("");
  const [username, onUsername] = useInput<string>("");

  const dispatch = useDispatch();
  const signUpState = useSelector(signUpSelector);

  const onSignUp: FormEventHandler<HTMLFormElement> = useCallback(
    async (e: FormEvent): Promise<void> => {
      e.preventDefault();

      const user: SignUpBody = {
        user: {
          email,
          password,
          username,
        },
      };

      dispatch(axiosSignUp(user));
    },
    [email, password, username, dispatch]
  );

  useEffect(() => {
    if (signUpState.state === REQUEST_STATES.SUCCESS) history.push("/");
    if (signUpState.state === REQUEST_STATES.FAILED) {
      alert("이미 존재하는 계정입니다.");
      console.error(signUpState.error);
    }
  }, [signUpState, history]);

  return (
    <>
      <form onSubmit={onSignUp}>
        <div>
          <span>이메일 : </span>
          <input type="email" value={email} onChange={onEmail} />
        </div>
        <div>
          <span>닉네임 : </span>
          <input type="text" value={username} onChange={onUsername} />
        </div>
        <div>
          <span>패스워드 : </span>
          <input type="password" value={password} onChange={onPassword} />
        </div>
        <button type="submit">회원가입</button>
      </form>
    </>
  );
};

export default SignUp;
