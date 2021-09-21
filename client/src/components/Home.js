import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectTheme } from "../features/appSlice";
function Home() {
  let theme = useSelector(selectTheme);

  return (
    <div>
      <Container theme={theme}>
        <LeftSide>
          <Title theme={theme}> All Your Home Needs In One Place </Title>
          <Description theme={theme}>
            we are The greatest market in sudan, with cheap prices, high quality
            and large stock, and fast services
          </Description>
          <Button theme={theme}> Get Offers </Button>
        </LeftSide>
        <RightSide>
          <img src="\images\LandingPageVector.jpg" alt="suda mart Logo" />
        </RightSide>
      </Container>
    </div>
  );
}

export default Home;

// const Background = styled.div`
//   position: fixed;
//   top: 70px;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   z-index: -2;
//   img {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//   }
// `;

// const Wraper = styled.div`
//   position: absolute;
//   height: calc(100vh - 70px);
//   background: rgba(0, 0, 0, 0.25);
//   width: 100vw;
//   z-index: -1;
// `;

const Container = styled.div`
  @media screen and (max-width: 960px) and(min-width: 500px) {
    padding: 3rem 10px;
  }

  @media screen and (max-width: 500px) {
    padding: 10px;
    flex-direction: column;
  }
  width: 100vw;
  padding: 3rem;
  min-height: calc(100vh - 70px);
  display: flex;
  position: relative;
  top: 70px;
  background: ${({ theme }) => theme.primary};
`;

const Title = styled.h1`
  width: 50%;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.secondary};
  margin: 0;
  position: relative;
  left: 150px;
`;

const Description = styled.div`
  color: ${({ theme }) => theme.contrast};
  width: 50%;
  left: 150px;
  position: relative;
  margin: 2rem 0;
`;

const Button = styled.a`
  position: relative;
  left: 150px;
  width: 120px;
  color: ${({ theme }) => theme.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  border-radius: 20px;
  background: ${({ theme }) => theme.secondary};
  cursor: pointer;
  transition: 0.25s;
  &:hover {
    background: ${({ theme }) => theme.action};
    color: black;
  }
`;

const LeftSide = styled.div`
  @media screen and (max-width: 960px) and (min-width: 500px) {
    padding: 0 1rem;

    & > * {
      left: 8vw;
    }
  }

  @media screen and (max-width: 500px) {
    padding: 0;
    align-items: center;
    & > h1,
    & > div {
      width: 80%;
      text-align: center;
    }

    & > * {
      left: 0;
    }
  }
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex: 1;
`;

const RightSide = styled.div`
  @media screen and (max-width: 500px) {
    display: flex;
    align-items: center;
    justify-content: center;
    & > img {
      width: 40vw !important;
      height: 40vh !important;
    }
  }
  @media screen and (max-width: 960px) and (min-width: 500px) {
    & > img {
      width: 30vw !important;
      height: 40vh !important;
    }
    width: 20vw;
    flex: 0.5;
  }

  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;

  img {
    width: 35vw;
    height: 70vh;
  }
`;
