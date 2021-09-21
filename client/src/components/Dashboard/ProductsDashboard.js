import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getProducts } from "../../features/productsSlice";
import styled from "styled-components";
import DashboardSidebar from "./DashboardSidebar";
import StaticCard from "./StaticCard";
import AddProduct from "./AddProduct";
import Container from "@material-ui/core/Container";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { dashboardTheme } from "../theme";
import { Button, Typography } from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@material-ui/icons/Delete";
import Chip from "@material-ui/core/Chip";
import clsx from "clsx";
const useStyle = makeStyles((theme) => ({
  root: {
    color: theme.palette.primary.main,
  },

  container: {
    width: "100vw",
    minHeight: "100vh",
    margin: 0,
    padding: 0,
  },
  contentContainer: {
    [theme.breakpoints.down("md")]: {
      left: 0,
      width: "100vw",
      padding: 0,
    },

    [theme.breakpoints.up("md")]: {
      width: "calc(100vw - 60px)",
      position: "relative",
      height: "100%",
      margin: 0,
    },
  },

  cardsContainer: {
    width: "100%",
    padding: "1rem",
    display: "inline-flex",
    flexWrap: "wrap",
    [theme.breakpoints.down("md")]: {
      justifyContent: "space-around",
    },
    [theme.breakpoints.up("md")]: {
      justifyContent: "space-between",
    },
  },

  Title: {
    [theme.breakpoints.down("md")]: {
      padding: 8,
      "& > h2": {
        fontSize: "1.8rem",
      },
    },
    [theme.breakpoints.up("md")]: {
      padding: "1rem",
      "& > h2": {
        fontSize: "2.2rem",
      },
    },
    width: "100%",
    margin: 0,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
    "& > button": {
      background: dashboardTheme.palette.action.main,
      color: "white",
      borderRadius: 25,
      padding: "8px 12px",

      "&:hover": {
        background: dashboardTheme.palette.secondary.main,
      },
    },
  },

  tableContainer: {
    height: 500,
    "& .dataCell.negative div": {
      color: dashboardTheme.palette.warning.main,
      border: `solid 1px ${dashboardTheme.palette.warning.main}`,
      fontSize: "0.8rem",
      fontWeight: "bold",
    },
    "& .dataCell.positive div": {
      color: dashboardTheme.palette.success.main,
      border: `solid 1px ${dashboardTheme.palette.success.main}`,
      fontSize: "0.8rem",
      fontWeight: "bold",
    },
  },
}));

let deleteProduct = () => {
  alert("hi");
};
const columns = [
  { field: "image", headerName: "ID", cellClassName: "center", width: 90 },
  { field: "title", headerName: " Name", editable: true, width: 150 },
  { field: "price", headerName: "price", editable: true, width: 150 },
  {
    field: "numberOfOrders",
    headerName: "Number Of Orders",
    type: "number",
    align: "center",
    cellClassName: (params) => {
      return clsx("dataCell", {
        negative: params.value <= 4,
        positive: params.value > 4,
      });
    },
    renderCell: (params) => {
      return <Chip label={params.value} variant="outlined" />;
    },
    width: 180,
  },

  {
    field: "stock",
    headerName: "stock",
    type: "number",
    align: "center",
    headerAlign: "center",

    renderCell: (params) => {
      return <Chip label={params.value} color="primary" variant="outlined" />;
    },
    width: 150,
  },

  {
    field: "images",
    headerName: "delete",
    align: "center",
    renderCell: () => {
      return (
        <DeleteIcon
          onClick={deleteProduct}
          styles={{ width: 40, height: 40, cursor: "pointer" }}
        />
      );
    },
    editable: false,
    width: 120,
  },
];

let PRODUCTS = [
  {
    id: 1,
    title: "Sport shoe",
    image: 1,
    price: 12.99,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    color: "red",
    label: ["shoes", "sport"],
    numberOfOrders: 4,
    stock: 12,
  },

  {
    id: 2,
    title: "Watch",
    image: 2,
    price: 82.99,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    color: "gold",
    label: ["accus", "clothes"],
    numberOfOrders: 15,
    stock: 1,
  },
  {
    id: 3,
    title: "Shampoo",
    image: 4,
    price: 9.99,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    color: "white",
    label: ["clean", "body"],
    numberOfOrders: 15,
    stock: 8,
  },
  {
    id: 4,
    title: "Blue man Perfume",
    image: 5,
    price: 99.75,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    color: "red",
    label: ["perfume", "casual"],
    numberOfOrders: 15,
    stock: 12,
  },
];

function ProductsDashboard() {
  const classes = useStyle();
  let products = useSelector(getProducts);
  console.log(products);
  let [addProductMenu, toggleAddProductMenu] = useState(false);

  const handleAddProduct = () => {
    toggleAddProductMenu(!addProductMenu);
  };

  const handleAddMenuClose = () => {
    toggleAddProductMenu(false);
  };
  return (
    <Container1>
      <DashboardSidebar selectedId={1} />
      {addProductMenu ? (
        <AddProduct className="addProduct" closeMenu={handleAddMenuClose} />
      ) : (
        <MainMenu>
          <ThemeProvider theme={dashboardTheme}>
            <Container className={classes.contentContainer}>
              <Container className={classes.Title}>
                <Typography variant="h2">Products</Typography>
                <Button onClick={handleAddProduct}> Add Product </Button>
              </Container>
              <Container className={classes.cardsContainer}>
                {[0, 0, 0, 0].map((item, index) => {
                  return <StaticCard key={index} />;
                })}
              </Container>
              <Container className={classes.tableContainer}>
                <DataGrid
                  rows={PRODUCTS}
                  columns={columns}
                  checkboxSelection
                  disableSelectionOnClick
                  autoPageSize
                />
              </Container>
            </Container>
          </ThemeProvider>
        </MainMenu>
      )}
    </Container1>
  );
}

export default ProductsDashboard;
const Container1 = styled.div`
  @media screen and (max-width: 900px) {
    flex-direction: column;
  }
  max-width: 100vw;
  display: flex;
`;

const MainMenu = styled.div`
  @media screen and (max-width: 900px) {
    left: 0;
    padding: 0 0.5rem;
  }
  min-height: 100vh;
  font-family: Roboto, serif;
  background: #f6f7f8;
  position: relative;
  left: 60px;
`;
// const TopPart = styled.div`
//   @media screen and (max-width: 900px) {
//     padding: 3rem 0;
//   }
//   width: 100%;
//   padding: 3rem 3rem 3rem 0;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;

//   h1 {
//     font-size: 2.5rem;
//   }

//   button {
//   }
// `;

// const AddButton = styled.button`
//   padding: 10px 18px;
//   background: #256fc5;
//   color: white;
//   border-radius: 15px;
//   outline: none;
//   border: 0;
//   cursor: pointer;
//   box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.3);
// `;
// const Cards = styled.div`
//   display: flex;
//   justify-content: space-between;
//   flex-wrap: wrap;
//   padding-right: 3rem;
// `;
// const Filter = styled.div`
//   width: 100%;
//   height: 25px;
// `;
// const ProductsList = styled.div`
//   @media screen and (max-width: 900px) {
//     padding: 0;
//     overflow-x: scroll;
//   }
//   width: 100%;
//   padding: 2rem 4rem;
// `;
// const ListHeader = styled.div`
//   min-width: 650px;
//   width: 100%;
//   display: inline-grid;
//   grid-template-columns: 40px repeat(8, 12%);

//   .double {
//     grid-column: span 2;
//   }
// `;
// const ListContainer = styled.div`
//   min-width: 650px;
//   margin-top: 2rem;
//   display: flex;
//   flex-direction: column;
// `;
