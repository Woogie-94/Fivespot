import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ArticlesController from "../components/ArticlesController";
import Grid from "../components/Grid";
import Header from "../components/Header";
import Lists from "../components/Lists";

const Articles = (): JSX.Element => {
  const [toggle, setToggle] = useState<string>("list");

  return (
    <>
      <Header />
      <ArticlesContainer>
        <ArticlesController toggle={toggle} setToggle={setToggle} />
        {toggle === "list" ? <Lists /> : <Grid />}
      </ArticlesContainer>
    </>
  );
};

const ArticlesContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  min-height: calc(100vh - 80px);
  background-color: #f6f6f8;
`;

export default Articles;
