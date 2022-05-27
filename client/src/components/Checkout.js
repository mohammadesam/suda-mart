import React from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { getUser } from "../features/userSlice";
import Map from "./Map";

// let countries = ["sudan", "egypt", "Ganaa", "somaila", "UK", "US"];

function Checkout() {
  let navigate = useNavigate();
  let totalPrice = Math.floor(useParams().total * 100) / 100;
  const shippingCost = 8;
  let user = useSelector(getUser);

  function makePayment(e) {
    e.preventDefault();
    navigate(`/checkout/paypal/${shippingCost}`);
  }

  return (
    <Container>
      <h1> Check Out </h1>
      {user ? null : (
        <Alert>
          {" "}
          <span>&#9888;</span> You are not logged In !{" "}
          <Link to="/login">Login Now</Link>{" "}
        </Alert>
      )}
      <form>
        <CountryDetails>
          <h3 style={{ color: "#2053cd" }}> Select Your Location </h3>
          <Map width="360px" height="300px" />
        </CountryDetails>
        <Sammary>
          <h3> Summary </h3>
          <div key="1">
            <span> shipping cost </span>
            <span className="bold"> {shippingCost} AED</span>
          </div>

          <div key="2">
            {" "}
            <span>Total Bill </span>{" "}
            <span className="bold">{totalPrice} AED</span>{" "}
          </div>
          <div>
            <span>discount </span> <span className="bold"> 0% </span>
          </div>
          <div key="3">
            {" "}
            <span>Total To Pay</span>{" "}
            <span className="bold"> {totalPrice + shippingCost} AED</span>{" "}
          </div>
          <button
            disabled={!Boolean(user)}
            className={Boolean(user) ? "" : "disabled"}
            onClick={makePayment}
          >
            {" "}
            Checkout{" "}
          </button>
        </Sammary>
      </form>
    </Container>
  );
}

export default Checkout;
const Container = styled.div`
  @media screen and (max-width: 700px) {
    padding: 0;

    div {
      margin: 1rem 0;
    }
  }
  width: 100vw;
  background: #f6eee8;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 0 0 0 7rem;

  h1 {
    margin: 5rem 0 3rem 0;
    text-align: center;
  }

  form {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const CountryDetails = styled.div`
  width: 50%;
  min-width: 400px;
  height: 350px;
  padding: 1rem 3rem;
  background: white;
  div {
    display: flex;
    flex-direction: column;
    margin: 1rem 0;

    label {
      margin: 10px 0;
    }

    textarea {
      padding: 10px;
    }

    select {
      font-size: 1.3rem;
      padding: 5px;
    }
  }
`;

const Sammary = styled.div`
  margin: 0 2rem 2rem 2rem;
  min-width: 250px;
  width: 30%;
  height: 350px;
  background: white;
  display: flex;
  flex-direction: column;
  padding: 2rem;

  h3 {
    color: #2053cd;
    margin: -1rem 0 1rem 0;
  }
  div {
    margin: 1rem 0;
    width: 100%;
    margin: 0.4rem 0;
    display: flex;
    justify-content: space-between;

    .bold {
      font-weight: bold;
    }
  }

  button {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 0.6rem 0;
    background: #2053cd;
    color: white;
    margin: 5rem 0 0 0;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      background: #3769df;
    }

    &.disabled {
      opacity: 0.6;
      cursor: none;
    }
  }
`;

let Alert = styled.div`
  width: 80vw;
  background: #fe3448;
  color: black;
  padding: 10px;
  margin: 20px 0;
  font-weight: bold;

  a {
    margin: 0 5px;
    text-decoration: underline;
    color: white;
  }
`;
