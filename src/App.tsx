import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import React from "react";
import Login from "./page/Login";
import SignUp from "./page/SignUp";
import Profile from "./page/Profile";
import Articles from "./page/Articles";
import ArticleDetail from "./page/ArticleDetail";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
  ${reset}
`;

const App = (): JSX.Element => {
  return (
    <>
      <BrowserRouter>
        <GlobalStyles />
        <Switch>
          <Redirect exact path="/" to="/articles" />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/profile" component={Profile} />
          <Route exact path="/articles" component={Articles} />
          <Route path="/articles/:slug" component={ArticleDetail} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
