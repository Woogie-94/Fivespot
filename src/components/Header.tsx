import { Avatar } from "@material-ui/core";
import { Person } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useUserInfo } from "../hooks/useUserInfo";
import logo from "../images/logo_fivespot.png";

const Header = (): JSX.Element => {
  const [userInfo, onLogOut] = useUserInfo();

  return (
    <HeaderContainer>
      <Link to="/">
        <Logo src={logo} alt="Fivespot Logo" />
      </Link>
      <RightContainer>
        {userInfo.state ? (
          <Logging>
            <Link to="/porfile">프로필</Link>
            <button onClick={onLogOut}>로그아웃</button>
            <Avatar alt={userInfo.username.toUpperCase()} style={{ width: `50px`, height: `50px` }}>
              <Person style={{ width: `30px`, height: `30px` }} />
            </Avatar>
          </Logging>
        ) : (
          <LoginBtn to="/login">로그인/회원가입</LoginBtn>
        )}
      </RightContainer>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  padding: 0 400px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
`;

const Logo = styled.img`
  width: 7rem;
`;

const RightContainer = styled.div``;

const Logging = styled.div`
  display: flex;
  align-items: center;

  & > a,
  & > button {
    position: relative;
    margin-right: 20px;
    font-family: "NanumSquareR";
    text-decoration: none;
    color: #000;

    &:nth-child(1)::after {
      position: absolute;
      top: 0;
      right: -10px;
      content: "";
      display: block;
      width: 1px;
      height: 15px;
      background-color: #000;
    }
  }
`;

const LoginBtn = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 50px;
  font-family: "NanumSquareB";
  text-decoration: none;
  font-size: 15px;
  color: #fff;
  background-color: #ff7921;
  border-radius: 25px;
`;
