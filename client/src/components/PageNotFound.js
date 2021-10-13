import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
function PageNotFound() {
  return (
    <Container>
      <h1> OOPS </h1>
      <h3>404 - Page not Found</h3>
      <p>
        {" "}
        this page You are looking For might Be removed or you may not have the
        right permission
      </p>
      <Button>
        <Link to="/"> Back to Home Page </Link>{" "}
      </Button>
    </Container>
  );
}

export default PageNotFound;
const Container = styled.div`
  width: 100vw;
  display: flex;
  position: relative;
  top: 120px;
  align-items: center;
  flex-direction: column;

  h1 {
    font-size: 7rem;
  }

  p {
    width: 80%;
    text-align: center;
    margin: 20px 0;
  }
`;

const Button = styled.button`
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
