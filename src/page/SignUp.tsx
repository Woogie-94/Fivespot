import React, { MouseEvent, MouseEventHandler, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { axiosSignUp, signUpSelector } from "../reducer/signUpReducer";
import * as H from "history";
import { REQUEST_STATES, SignUpBody } from "../types";
import useInput from "../hooks/useInput";
import { Button, TextField } from "@mui/material";
import styled from "styled-components";

const SignUp = ({ history }: { history: H.History }): JSX.Element => {
  const [email, onEmail] = useInput<string>("");
  const [password, onPassword] = useInput<string>("");
  const [username, onUsername] = useInput<string>("");

  const dispatch = useDispatch();
  const signUpState = useSelector(signUpSelector);

  const onSignUp: MouseEventHandler<HTMLElement> = useCallback(
    async (e: MouseEvent): Promise<void> => {
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
    <SignUpContainer>
      <Div>
        <TextField type="email" variant="standard" label="Email" value={email} onChange={onEmail} />
      </Div>
      <Div>
        <TextField type="text" variant="standard" label="User Name" value={username} onChange={onUsername} />
      </Div>
      <Div>
        <TextField type="password" variant="standard" label="Password" value={password} onChange={onPassword} />
      </Div>
      <Div>
        <Button variant="contained" onClick={onSignUp} sx={{ width: `100%` }}>
          회원가입
        </Button>
      </Div>
    </SignUpContainer>
  );
};

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Div = styled.div`
  width: 100%;
  margin-bottom: 10px;
`;

export default SignUp;
