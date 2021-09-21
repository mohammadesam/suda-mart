import React, { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import Container from "@material-ui/core/Container";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { dashboardTheme } from "../theme";
import StaticCard from "./StaticCard";
import { Typography } from "@material-ui/core";
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
    },

    [theme.breakpoints.up("md")]: {
      width: "calc(100vw - 60px)",
      position: "relative",
      left: 60,
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
    width: "100%",
    margin: 0,
    padding: "1rem",

    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
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
  { field: "id", headerName: "ID", cellClassName: "center", width: 30 },
  { field: "firstName", headerName: "First Name", editable: true, width: 120 },
  { field: "lastName", headerName: "Last Name", editable: true, width: 120 },
  { field: "email", headerName: "Email", editable: true, width: 120 },

  {
    field: "numberOfOrders",
    headerName: "Number Of Orders",
    type: "number",
    align: "center",
    renderCell: (params) => {
      return <Chip label={params.value} variant="outlined" />;
    },
    width: 180,
  },

  {
    field: "role",
    headerName: "Role",
    type: "string",
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      return <Chip label={params.value} color="primary" variant="outlined" />;
    },
    width: 100,
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
    firstName: "ali",
    lastName: "ahmad",
    email: "hello@gmail.com",
    role: "admin",
    numberOfOrders: 5,
  },

  {
    id: 2,
    firstName: "ali",
    lastName: "ahmad",
    email: "hello@gmail.com",
    role: "admin",
    numberOfOrders: 5,
  },
  {
    id: 3,
    firstName: "ali",
    lastName: "ahmad",
    email: "hello@gmail.com",
    role: "admin",
    numberOfOrders: 5,
  },
  {
    id: 4,
    firstName: "ali",
    lastName: "ahmad",
    email: "hello@gmail.com",
    role: "admin",
    numberOfOrders: 5,
  },
];

function Users() {
  const classes = useStyle();
  return (
    <Container className={classes.container}>
      <ThemeProvider theme={dashboardTheme}>
        <DashboardSidebar selectedId={2} />
        <Container className={classes.contentContainer}>
          <Container className={classes.Title}>
            <Typography variant="h2">Users</Typography>
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
    </Container>
  );
}

export default Users;
