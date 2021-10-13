import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function ErrorPage({ msg }) {
  return (
    <Container>
      <h1> OOPS </h1>
      <h3> {msg} </h3>
      <Button>
        <Link to="/"> Back to Home Page </Link>{" "}
      </Button>
    </Container>
  );
}

export default ErrorPage;
const Container = styled.div`
  text-align: center;
  margin: 40px 0;
`;

const Button = styled.button`
  margin-top: 30px;
  padding: 10px 15px;
  background: #0145d4;
  border: none;
  outline: none;
  border-radius: 30px;
  transition: 0.3s;
  cursor: pointer;
  a {
    color: white;
  }
  &:hover {
    opacity: 0.8;
  }
`;
