import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LoadingScreen from "../LoadingScreen";
import ErrorPage from "../ErrorPage";
function UpdateProduct({ closeMenu, id }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    async function getProduct() {
      try {
        let response = await fetch("/api/dashboard/product/" + id);
        let data = await response.json();
        setData(data);
        setLoading(false);
      } catch (err) {
        setError("some thing went wrong please try again");
      }
    }
    getProduct();
  }, [id]);

  const handleEdit = (e) => {
    let newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/dashboard/product/update/${id}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        let resStatus = await response.json();
        if (resStatus.success) closeMenu();
        else console.log("error happened");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (error) return <ErrorPage msg={error} />;
  else if (loading) return <LoadingScreen />;
  return (
    <Container>
      <CloseButton onClick={closeMenu}> X </CloseButton>
      <h1> Update Product </h1>
      <form method="POST" onSubmit={handleSubmit} enctype="multipart/form-data">
        <input
          type="text"
          value={data.title || ""}
          required
          name="title"
          onChange={(e) => handleEdit(e)}
          placeholder="Product Name"
        />
        <input
          type="text"
          value={data.label || ""}
          name="label"
          onChange={(e) => handleEdit(e)}
          placeholder="Product Label"
        />
        <input type="file" name="image" />
        <input
          type="text"
          name="color"
          value={data.color}
          onChange={(e) => handleEdit(e)}
          placeholder="Product Color"
        />
        <input
          type="number"
          name="price"
          step="0.1"
          min="0.1"
          value={data.price}
          onChange={(e) => handleEdit(e)}
          placeholder="Price"
          required
        />
        <input
          type="number"
          required
          value={data.stock}
          onChange={(e) => handleEdit(e)}
          name="quantity"
          placeholder="Product quantity"
        />
        <input
          type="text"
          className="double"
          name="description"
          onChange={(e) => handleEdit(e)}
          value={data.description}
          placeholder="Product Description"
        />
        <div className="button">
          <button> Update Product Product</button>
        </div>
      </form>
    </Container>
  );
}

export default UpdateProduct;

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
