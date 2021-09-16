import axios from "axios";
import React, { FormEvent, FormEventHandler, useCallback, useState } from "react";
import useInput from "../hooks/useInput";

const Login = (): JSX.Element => {
  const [email, onEmail] = useInput<string>("");
  const [password, onPassword] = useInput<string>("");

  const onLogin: FormEventHandler<HTMLFormElement> = useCallback(
    async (e: FormEvent): Promise<void> => {
      e.preventDefault();

      const user = {
        user: {
          email,
          password,
        },
      };

      try {
        const a = await axios.post(`https://test.fivespot.space/api/users/login`, user);
        console.log(a.data);
      } catch (e) {
        console.log(e);
      }
    },
    [email, password]
  );

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
