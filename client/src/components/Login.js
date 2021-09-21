import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
function Login({ type }) {
  const [password, setPassword] = useState("");
  const [matchedPassword, setMatchedPassword] = useState(false);
  function handlePasswordMatch(e, mode) {
    if (mode === "set") setPassword(e.target.value);
    else if (mode === "match") {
      return setMatchedPassword(e.target.value === password);
    }
  }
  if (type === "login") {
    return (
      <Container>
        <FormWarper>
          <h1> Login </h1>
          <form action="http://localhost:3500/users/login" method="POST">
            <div>
              <input
                required
                type="email"
                name="email"
                placeholder="Enter Your Email"
              />
            </div>
            <div>
              <input
                required
                type="password"
                name="password"
                placeholder="Password"
              />
            </div>

            <div className="checkbox">
              <input type="checkbox" name="stayLoggedIn" />
              <label>Keep Me Logged In</label>
            </div>

            <button type="submit"> Login </button>
            <p> or </p>
          </form>
          <Link to="/register">Back To Register</Link>
        </FormWarper>
      </Container>
    );
  } else {
    return (
      <Container>
        <FormWarper>
          <h1>Register</h1>
          <form action="http://localhost:3500/users/register" method="POST">
            <input
              required
              type="text"
              name="firstName"
              placeholder="First Name"
            />
            <input type="text" name="lastName" placeholder="Last Name" />

            <input
              required
              type="email"
              name="email"
              placeholder="Enter Your Email"
            />
            <select>
              Gender
              <option value="male"> Male </option>
              <option value="female"> Female </option>
            </select>

            <input
              required
              type="password"
              name="password"
              placeholder="Password"
              minLength="7"
              onChange={(e) => handlePasswordMatch(e, "set")}
            />
            <input
              type="password"
              name="password2"
              placeholder="Repeat Password"
              minLength="7"
              required
              className={matchedPassword ? "matched" : "notValid"}
              onChange={(e) => handlePasswordMatch(e, "match")}
            />

            <div className="checkbox">
              <input type="checkbox" name="stayLoggedIn" />
              <label>Keep Me Logged In</label>
            </div>

            <button type="submit"> Sign Up </button>
            <p> or </p>
          </form>
          <Link to="/login">Back To Login</Link>{" "}
        </FormWarper>
      </Container>
    );
  }
}

export default Login;
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  padding: 2rem 0;
`;

const FormWarper = styled.div`
  min-width: 320px;
  width: 60%;
  padding: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  animation: animateIn 1.5s ease-out 1;

  & > a {
    margin: 1rem 0 0 0;
    font-size: 0.8rem;
    &:hover {
      text-decoration: underline;
    }
  }

  & > form > input {
    width: 250px;
    padding: 1rem;
    height: 45px;
    margin-bottom: 20px;
  }

  select {
    width: 250px;
    margin-bottom: 20px;
    height: 40px;
    @media screen and (max-width: 700px) {
      width: 250px;
    }
  }

  @keyframes animateIn {
    from {
      transform: scale(0.5);
    }
    to {
      transform: scale(1);
    }
  }

  & > h1 {
    margin-bottom: 2rem;
  }

  & > form > div:not(.checkbox) {
    width: 90%;
    min-width: 320px;
    margin: 1rem;
    //padding: 1rem;
    display: flex;
    justify-content: space-around;

    select {
      @media screen and (max-width: 700px) {
        width: 100px;
      }
      width: 185px;
    }
  }

  form > div > input:not([type="checkbox"])::placeholder {
    color: black;
  }

  form > div > input:not([type="checkbox"]) {
    @media screen and (max-width: 700px) {
      width: 250px;
    }
    width: 300px;
    height: 45px;
    color: black;

    padding: 0.5rem;
    transition: 0.4s;

    &:focus:not(:valid),
    &.notValid:focus {
      border-color: red;
      //   box-shadow: 0 6px 15px rgba(255, 255, 255, 0.4);
    }

    &:valid:not(.notValid) {
      background: #6ebd52;
    }
  }

  form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
  }

  form > div {
    margin: 1rem 0;
    color: black;
    label {
      margin-left: 0.4rem;
      font-size: 0.9rem;
    }

    input[type="text"] {
      margin: 0 0.2rem 0 0;
    }
  }

  form > button {
    width: 150px;
    margin: 0.5rem 0;
    padding: 0.6rem 0;
    cursor: pointer;
    background: #085d55;
    color: white;
    border: none;

    a {
      color: white;
    }
  }

  form > p {
    width: 150px;
    text-align: center;
    position: relative;
    color: black;
    &:before {
      content: "";
      width: 40%;
      position: absolute;
      left: 0;
      top: 55%;
      height: 1px;
      background: rgba(0, 0, 0, 0.5);
    }

    &:after {
      content: "";
      width: 40%;
      position: absolute;
      right: 0;
      top: 55%;
      height: 1px;
      background: rgba(0, 0, 0, 0.5);
    }
  }
`;
