import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import StaticCard from "./StaticCard";
import Chart from "../Chart";
function GeneralView() {
  return (
    <>
      <TopPart>
        <h1> Dashboard </h1>
        <Link to="/">
          <svg
            aria-hidden="true"
            role="img"
            width="25"
            height="25"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 1024 1024"
          >
            <path
              d="M946.5 505L534.6 93.4a31.93 31.93 0 0 0-45.2 0L77.5 505c-12 12-18.8 28.3-18.8 45.3c0 35.3 28.7 64 64 64h43.4V908c0 17.7 14.3 32 32 32H448V716h112v224h265.9c17.7 0 32-14.3 32-32V614.3h43.4c17 0 33.3-6.7 45.3-18.8c24.9-25 24.9-65.5-.1-90.5z"
              fill="black"
            />
          </svg>
        </Link>
      </TopPart>
      <Cards>
        {[1, 1, 1, 1].map((item, index) => {
          return <StaticCard key={index} />;
        })}
      </Cards>
      <ChartContainer>
        <Chart />
      </ChartContainer>
    </>
  );
}

export default GeneralView;

const TopPart = styled.div`
  width: 100%;
  height: 120px;
  padding: 3rem;
  position: relative;

  svg {
    position: absolute;
    right: 1rem;
    top: 1rem;
  }

  h1 {
    font-weight: 200;
    font-size: 2.5rem;
  }
`;

const Cards = styled.div`
  padding: 2vw 3rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  div:not(:first-child) {
    margin-left: 1rem;
  }

  @media screen and (max-width: 900px) {
    div {
      margin-left: 1rem;
    }
  }
`;

const ChartContainer = styled.div`
  @media screen and (max-width: 900px) {
    padding: 0;
  }
  padding: 0 3rem;
`;
