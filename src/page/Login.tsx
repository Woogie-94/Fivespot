import React, { FormEvent, MouseEvent, MouseEventHandler, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../hooks/useInput";
import { axiosLogin, loginSelector } from "../reducer/loginReducer";
import { REQUEST_STATES } from "../types";
import * as H from "history";
import { Button, TextField } from "@mui/material";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Login = ({ history }: { history: H.History }): JSX.Element => {
  const [email, onEmail] = useInput<string>("");
  const [password, onPassword] = useInput<string>("");

  const dispatch = useDispatch();
  const loginState = useSelector(loginSelector);

  const onLogin: MouseEventHandler<HTMLElement> = useCallback(
    async (e: MouseEvent): Promise<void> => {
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
    <LoginContainer>
      <Div>
        <TextField label="ID" variant="standard" type="email" value={email} onChange={onEmail} />
      </Div>
      <Div>
        <TextField label="PASSWORD" variant="standard" type="password" value={password} onChange={onPassword} />
      </Div>
      <Div>
        <Button variant="contained" sx={{ width: `100%` }} onClick={onLogin}>
          로그인
        </Button>
      </Div>
      <Link to="/signup">
        <Button variant="contained" sx={{ width: `100%` }}>
          회원가입
        </Button>
      </Link>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
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

export default Login;
