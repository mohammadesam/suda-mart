import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

let PRODUCTS = [
  {
    name: "Sport shoe",
    image: 1,
    price: 12.99,
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    color: "red",
    label: ["shoes", "sport"],
  },

  {
    name: "Watch",
    image: 2,
    price: 82.99,
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    color: "gold",
    label: ["accus", "clothes"],
  },
  {
    name: "Shampoo",
    image: 4,
    price: 9.99,
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    color: "white",
    label: ["clean", "body"],
  },
  {
    name: "Blue man Perfume",
    image: 5,
    price: 99.75,
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    color: "red",
    label: ["perfume", "casual"],
  },
];

function ProductDetails() {
  let { id } = useParams();
  let product = PRODUCTS[id];
  return (
    <Container>
      <LeftContainer>
        <img src={`/images/product ${product.image}.jpg`} />
      </LeftContainer>
      <RightContainer>
        <div>
          <h1> {product.name} </h1>
          <p className="desc">{product.desc}</p>
        </div>
        <div>
          <p className="title"> Price </p>
          <span>
            {" "}
            <strong>{product.price} $</strong>{" "}
          </span>
        </div>
        <div>
          {" "}
          <p className="title"> Color </p>
          <span> {product.color} </span>
        </div>
        <div>
          {" "}
          <p className="title"> catagories </p>
          <span> {product.label.join(" , ")} </span>
        </div>
        <ButtonsWarper>
          <button> Add to Cart </button>
        </ButtonsWarper>
      </RightContainer>
    </Container>
  );
}

export default ProductDetails;
const Container = styled.div`
  @media screen and (max-width: 600px) {
    flex-direction: column;
    align-items: center;

    div {
      width: 100%;
      padding: 0;
      margin: 1rem 0;
    }
  }
  padding: 5rem 3rem;
  display: flex;
  width: 100vw;
`;

const RightContainer = styled.div`
  padding: 0 2rem;
  width: 50%;
  display: flex;
  flex-direction: column;
  & > * {
    margin: 0 0 1rem 0;

    p {
      margin: 10px 0;
    }
  }

  & > div > .title {
    font-weight: bold;
    font-size: 1.2rem;
  }
`;

const LeftContainer = styled.div`
  width: 50%;
  padding: 0 3rem;
  img {
    width: 100%;
    height: 60vh;
  }
`;

const ButtonsWarper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  button {
    padding: 10px 20px;
    cursor: pointer;
    background: #c0770a;
    color: white;
    border: none;
  }
`;
