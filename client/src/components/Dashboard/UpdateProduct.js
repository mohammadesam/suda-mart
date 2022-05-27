import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LoadingScreen from "../LoadingScreen";
import ErrorPage from "../ErrorPage";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import { Chip } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import AddOffer from "./AddOffer";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function UpdateProduct({ closeMenu, id }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState({});
  const [allCatagories, setAllCatagories] = useState([]);
  const [catagories, setCatagories] = useState([]);
  const [currentOffer, setCurrentOffer] = useState();

  useEffect(() => {
    async function getProduct() {
      try {
        let response = await fetch("/api/dashboard/product/" + id);
        let data = await response.json();
        setData(data);
        setCurrentOffer(data.offer);
        setLoading(false);
        let catagories = await fetch("/api/settings/");
        let settings = await catagories.json();
        const settingsData = await settings[0];
        const catagoriesData = settingsData.catagories.map((category) => {
          return category.name;
        });
        setAllCatagories([...catagoriesData]);
        setCatagories(data.label);
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
    const newData = { ...data, label: catagories };
    console.log(newData);
    e.preventDefault();
    fetch(`/api/dashboard/product/update/${id}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newData),
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

  const handleCatagoriesChange = (e) => {
    setCatagories(e.target.value);
  };

  function getMenuStyle(catagories, selected) {
    if (catagories.includes(selected)) {
      console.log("test");
      return { fontWeight: "bold", color: "red" };
    } else {
      return { fontWeight: "normal", color: "black" };
    }
  }

  if (error) return <ErrorPage msg={error} />;
  else if (loading) return <LoadingScreen />;
  return (
    <Container>
      <CloseButton onClick={closeMenu}> X </CloseButton>
      <h1> Update Product </h1>

      {currentOffer?.available ? (
        <Alert severity="info" style={{ margin: "15px 0" }}>
          this product has a {currentOffer.percent}% OFF
        </Alert>
      ) : null}

      <form method="POST" onSubmit={handleSubmit} enctype="multipart/form-data">
        <input
          type="text"
          value={data.title || ""}
          required
          name="title"
          onChange={(e) => handleEdit(e)}
          placeholder="Product Name"
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
          name="stock"
          value={data.stock}
          onChange={(e) => handleEdit(e)}
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
        <TagsContainer>
          <FormControl>
            <InputLabel id="demo-mutiple-chip-label">Category</InputLabel>
            <Select
              style={{ minWidth: "120px" }}
              labelId="demo-mutiple-chip-label"
              id="demo-mutiple-chip"
              multiple
              value={catagories}
              onChange={handleCatagoriesChange}
              input={<Input id="select-multiple-chip" />}
              renderValue={(selected) => (
                <div>
                  {selected.map((value) => (
                    <Chip key={value} label={value} style={{ margin: 1 }} />
                  ))}
                </div>
              )}
              MenuProps={MenuProps}
            >
              {allCatagories.map((category) => {
                let st = getMenuStyle(catagories, category);
                return (
                  <MenuItem key={category} value={category} style={st}>
                    {category}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </TagsContainer>

        <div className="button">
          <button> Update Product </button>
          <AddOffer offer={currentOffer} setOffer={setCurrentOffer} id={id} />
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
        margin: 0 1rem;
        transition: 0.3s ease;
        &:hover {
          opacity: 0.8;
        }
      }

      button.add-offer {
        background: #333;
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

const TagsContainer = styled.div`
  margin: 1rem 0;
`;
