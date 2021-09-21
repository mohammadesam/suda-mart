import React from "react";
import styled from "styled-components";
function StaticCard({ className }) {
  return (
    <Container className={className}>
      <div>
        <p> Profits </p>
        <h1> $75 </h1>
      </div>
      <p> +12%🔼 </p>
    </Container>
  );
}

export default StaticCard;

const Container = styled.div`
  min-width: 180px;
  height: 120px;
  display: flex;
  padding: 20px;
  border: solid 1px black;
  margin: 1rem 1rem 1rem 0;

  &.small {
    height: 90px !important;
    padding: 10px 20px;
  }

  div {
    width: 50%;
    border-right: solid 1px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;

    p {
      margin: 0 0 10px 0;
    }
  }

  & > p {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`;
