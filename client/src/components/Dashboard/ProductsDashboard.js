import React, { useEffect, useState } from "react";
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
import Alert from "@material-ui/lab/Alert";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import EditIcon from "@material-ui/icons/Edit";
import UpdateProduct from "./UpdateProduct";
import { Link } from "react-router-dom";
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
    marginTop: 30,
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

function ProductsDashboard() {
  const columns = [
    { field: "id", headerName: "ID", cellClassName: "center", width: 90 },
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
        return <Chip label={params.value || "no orders"} variant="outlined" />;
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
      field: "Edit",
      headerName: "edit",
      align: "center",
      renderCell: (params) => {
        return (
          <EditIcon
            onClick={() => handleUpdateProduct(params.id)}
            styles={{ width: 40, height: 40, cursor: "pointer" }}
          />
        );
      },
      editable: false,
      width: 120,
    },
    {
      field: "images",
      headerName: "delete",
      align: "center",
      renderCell: (params) => {
        return (
          <DeleteIcon
            onClick={() => handleDeleteProduct(params.id)}
            styles={{ width: 40, height: 40, cursor: "pointer" }}
          />
        );
      },
      editable: false,
      width: 120,
    },
  ];
  const classes = useStyle();
  const [products, setProducts] = useState([]);
  const [alert, setAlert] = useState(false);
  const [dialog, setDialog] = useState(false);
  let [addProductMenu, toggleAddProductMenu] = useState(false);
  let [updateProductMenu, toggleUpdateProductMenu] = useState(false);

  const handleUpdateProduct = (id) => {
    toggleUpdateProductMenu(id);
  };

  function handleCloseUpdateMenu() {
    toggleUpdateProductMenu(false);
  }

  const handleAddProduct = () => {
    toggleAddProductMenu(!addProductMenu);
  };

  const handleAddMenuClose = () => {
    toggleAddProductMenu(false);
  };

  let handleDeleteProduct = (id) => {
    setDialog(id);
  };

  let deleteProduct = async (id) => {
    fetch("/api/dashboard/deleteProduct", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((response) => {
        if (response.status === 200) console.log(response.status);
        setAlert(true);
      })
      .catch((err) => console.log(err));
  };

  let handleAlertClose = () => {
    setAlert(false);
  };

  let handleDialogClose = () => {
    setDialog(false);
  };
  let handleDialogApprove = () => {
    deleteProduct(dialog);
    setDialog(false);
  };

  useEffect(() => {
    async function getProducts() {
      let response = await fetch("/api/dashboard/products");
      let productsList = await response.json();
      let formattedProducts = productsList.map(
        ({ title, _id, price, description, numberOfOrders, stock }) => {
          return {
            title,
            id: _id,
            price,
            description,
            numberOfOrders,
            stock,
          };
        }
      );
      setProducts(formattedProducts);
    }
    getProducts();
  }, [alert]);
  if (updateProductMenu) {
    return (
      <UpdateProduct closeMenu={handleCloseUpdateMenu} id={updateProductMenu} />
    );
  }
  return (
    <Container1>
      <DashboardSidebar selectedId={1} />
      {addProductMenu ? (
        <AddProduct className="addProduct" closeMenu={handleAddMenuClose} />
      ) : (
        <MainMenu>
          {/* alert */}
          {alert ? (
            <Alert variant="filled" onClose={handleAlertClose}>
              {" "}
              Product Deleted successfully{" "}
            </Alert>
          ) : null}
          <ThemeProvider theme={dashboardTheme}>
            <Container className={classes.contentContainer}>
              <Container className={classes.Title}>
                <Typography variant="h2">Products</Typography>
                <Button onClick={handleAddProduct}> Add Product </Button>
              </Container>

              {dialog ? (
                <Dialog open={Boolean(dialog)} onClose={handleDialogClose}>
                  <DialogTitle>
                    {" "}
                    are you sure You want To delete This Product{" "}
                  </DialogTitle>
                  <DialogActions>
                    <Button
                      style={{
                        background: "#354555",
                        width: 50,
                        color: "white",
                      }}
                      onClick={handleDialogApprove}
                    >
                      {" "}
                      Delete{" "}
                    </Button>
                    <Button
                      style={{
                        border: "solid 1px #354555",
                        width: 50,
                        color: " #354555",
                      }}
                      onClick={handleDialogClose}
                    >
                      {" "}
                      Cancel{" "}
                    </Button>
                  </DialogActions>
                </Dialog>
              ) : null}
              {/* Back Home Link */}
              <Link
                to="/"
                style={{ position: "absolute", top: "0.5rem", right: "1rem" }}
              >
                <svg
                  aria-hidden="true"
                  role="img"
                  width="25"
                  height="25"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 1024 1024"
                >
                  <path
                    d="M946.5 505L534.6 93.4a31.93 31.93 0 0 0-45.2 0L77.5 505c-12 12-18.8 28.3-18.8 45.3c0 35.3 28.7 64 64 64h43.4V908c0 17.7 14.3 32 32 32H448V716h112v224h265.9c17.7 0 32-14.3 32-32V614.3h43.4c17 0 33.3-6.7 45.3-18.8c24.9-25 24.9-65.5-.1-90.5z"
                    fill="black"
                  />
                </svg>
              </Link>
              <Container className={classes.tableContainer}>
                {products && (
                  <DataGrid
                    rows={products}
                    columns={columns}
                    checkboxSelection
                    disableSelectionOnClick
                    autoPageSize
                  />
                )}
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
