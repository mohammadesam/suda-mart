import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
function ProductListItem({ product }) {
  return (
    <Container>
      <img src={`${product.image}`} alt="product" />
      <span className="double">
        {" "}
        {product.title.length > 20
          ? product.title.substr(0, 20) + " ..."
          : product.title}{" "}
      </span>
      <span> {product.price} </span>
      <span className="double"> {product.id} </span>
      <Label>
        {" "}
        <span className="good"> 25 </span>{" "}
      </Label>
      <Label>
        <span className="bad"> 50 </span>
      </Label>
      <Link className="center">
        {" "}
        <img src="/images/trash-alt.svg" alt="delete" />{" "}
      </Link>
    </Container>
  );
}

export default ProductListItem;
const Container = styled.div`
  margin-top: 15px;
  width: 100%;
  display: inline-grid;
  grid-template-columns: 40px repeat(8, 12%);

  .double {
    grid-column: span 2;
  }

  img {
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }

  a > img {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
`;

const Label = styled.div`
  span {
    padding: 6px 16px;
    border-radius: 15px;
    color: white;
    font-size: 0.8rem;
  }

  span.good {
    background: #27ad0e;
  }

  span.bad {
    background: #e2311d;
  }
`;
