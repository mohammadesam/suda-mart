import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
function SuccessPage() {
  return (
    <Container>
      <h1>Payment Successfully Completed ✔</h1>
      <Link to="/products">continue shopping</Link>
      <Link to="/account">Back to Your Account</Link>
    </Container>
  );
}

export default SuccessPage;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  font-family: Roboto, serif;

  h1 {
    text-align: center;
    margin: -10rem 0 8rem 0;
  }

  a {
    margin: 1rem 0;
    font-size: 1.2rem;
    color: #0142ad;
    transition: 0.25s;

    &:hover {
      text-decoration: underline;
    }
  }
`;
