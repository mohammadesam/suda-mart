import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
let countries = ["sudan", "egypt", "Ganaa", "somaila", "UK", "US"];

function Checkout() {
  let history = useHistory();
  let [address, setAddress] = useState("");
  let totalPrice = Math.floor(useParams().total * 100) / 100;

  function makePayment(e) {
    e.preventDefault();
    history.push(`/checkout/paypal/${totalPrice}`);
  }

  function handleAddress(e) {
    setAddress(e.target.value);
  }
  return (
    <Container>
      <h1> Check Out </h1>
      <form>
        <CountryDetails>
          <h3 style={{ color: "#2053cd" }}> Location Details </h3>
          <div key="10">
            <label> Country </label>
            <select>
              {countries.map((country) => {
                return <option value={country}> {country} </option>;
              })}
            </select>
          </div>
          <div key="11">
            <label> address </label>
            <textarea value={address} onChange={(e) => handleAddress()}>
              {" "}
            </textarea>
          </div>
        </CountryDetails>
        <Sammary>
          <h3> Summary </h3>
          <div key="1">
            <span> shipping cost </span>
            <span className="bold"> $0 </span>
          </div>

          <div key="2">
            {" "}
            <span>total Bill </span> <span className="bold">${totalPrice}</span>{" "}
          </div>
          <div>
            <span>discount </span> <span className="bold"> 0% </span>
          </div>
          <div key="3">
            {" "}
            <span>total To Pay</span>{" "}
            <span className="bold"> ${totalPrice} </span>{" "}
          </div>
          <button onClick={makePayment}> Checkout </button>
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
  align-item: center;

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
  }
`;
