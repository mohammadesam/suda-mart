import React from "react";
import styled from "styled-components";

function AddProduct({ closeMenu }) {
  return (
    <Container>
      <CloseButton onClick={closeMenu}> X </CloseButton>
      <h1> Add Product </h1>
      <form
        method="POST"
        action="/api/dashboard/product"
        enctype="multipart/form-data"
      >
        <input type="text" name="title" placeholder="Product Name" />
        <input type="text" name="label" placeholder="Product Label" />
        <input type="file" name="image" />
        <input type="text" name="color" placeholder="Product Color" />
        <input
          type="number"
          name="price"
          step="0.1"
          min="0.1"
          placeholder="Price"
        />
        <input type="number" name="quantity" placeholder="Product quantity" />
        <input
          type="text"
          className="double"
          name="description"
          placeholder="Product Description"
        />
        <div className="button">
          <button> Add Product</button>
        </div>
      </form>
    </Container>
  );
}

export default AddProduct;
const Container = styled.div`
  @media screen and (max-width: 900px) {
    padding: 2rem 5px;
    width: 100vw;
    left: 0;
  }
  width: calc(100vw - 60px);
  left: 60px;
  padding: 5rem 3rem;
  z-index: 4;
  background: white;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    padding: 0 1rem 2rem 0;
    text-align: center;
  }
  & > form {
    @media screen and (max-width: 900px) {
      grid-template-columns: repeat(2, calc(150px + 2rem));
    }
    display: grid;
    grid-template-columns: repeat(2, calc(180px + 2rem));
    grid-template-rows: auto;

    input {
      width: calc(100% - 2rem);
      height: 40px;
      margin: 1.5rem 1rem;
      padding: 0 5px;
    }

    input.double {
      grid-column: span 2;
    }

    .button {
      grid-column: span 2;
      display: flex;
      justify-content: center;
      align-items: center;

      button {
        background: #f55a4e;
        padding: 10px 15px;
        outline: 0;
        color: white;
        border-radius: 10px;
        border: none;
        cursor: pointer;
      }
    }
  }
`;

const CloseButton = styled.div`
  position: absolute;
  cursor: pointer;
  font-weight: bolder;
  padding: 0 1rem 0 0;
  top: 1rem;
  right: 2rem;
`;
