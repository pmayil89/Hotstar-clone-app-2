import styled from "styled-components";
import ImageSlider from "./ImageSlider";
import NewDisney from "./NewDisney";
import Originals from "./Originals";
import Recomments from "./Recomments";
import Trending from "./Trending";
import Viewers from "./Viewers";
import { Link } from "react-router-dom";
import { disneyData } from "../Data/DisneyRawContents";
import { useSelector } from "react-redux";
import { selectUserName } from "../feature/user/userSlice";
import { useEffect } from "react";
import { useState } from "react";

function Home(props) {
  const { recommendss, originalss, newDisneyss, trendings } = props;

  return (
    <>
      <Container>
        <Link to={`/fromAWS/`}>
          <span> FROM AWS</span>
        </Link>

        <ImageSlider />
        <Viewers />
        <Recomments recommendss={recommendss} />
        <Originals originals={originalss} />
        <NewDisney newDisney={newDisneyss} />
        <Trending trending={trendings} />
      </Container>
    </>
  );
}

const Container = styled.div`
  display: block;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  position: relative;
  top: 72px;
  padding: 0 3.5vh;

  &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;
export default Home;
