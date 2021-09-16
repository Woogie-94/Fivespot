import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import React from "react";
import Login from "./page/Login";
import SignUp from "./page/SignUp";
import Profile from "./page/Profile";
import ArticleList from "./page/ArticleList";
import ArticleDetail from "./page/ArticleDetail";

const App = (): JSX.Element => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Redirect exact path="/" to="/articles" />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/profile" component={Profile} />
          <Route exact path="/articles" component={ArticleList} />
          <Route path="/articles/:slug" component={ArticleDetail} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
