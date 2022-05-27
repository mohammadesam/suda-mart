import React, { useState, useEffect } from "react";
import DashboardSidebar from "./DashboardSidebar";
import Container from "@material-ui/core/Container";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { dashboardTheme } from "../theme";
import { Typography } from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@material-ui/icons/Delete";
import Chip from "@material-ui/core/Chip";
import Alert from "@material-ui/lab/Alert";
import ConfirmDialog from "./ConfirmDialog";
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

function Users() {
  const columns = [
    { field: "id", headerName: "ID", cellClassName: "center", width: 30 },
    { field: "name", headerName: "Name", editable: true, width: 120 },

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
      renderCell: (params) => {
        return (
          <DeleteIcon
            onClick={() => handleDeleteUser(params.id)}
            styles={{ width: 40, height: 40, cursor: "pointer" }}
          />
        );
      },
      editable: false,
      width: 120,
    },
  ];

  const classes = useStyle();
  const [users, setUsers] = useState([]);
  const [alert, setAlert] = useState(false);
  const [dialog, setDialog] = useState(false);

  useEffect(() => {
    async function getUsers() {
      let response = await fetch("/api/users/");
      let usersList = await response.json();
      let formattedUsers = usersList.map(
        ({ _id, name, email, role, numberOfOrders }) => ({
          id: _id,
          name,
          email,
          role,
          numberOfOrders: numberOfOrders || 0,
        })
      );
      setUsers(formattedUsers);
    }
    getUsers();
  }, []);

  const handleDeleteUser = (id) => {
    setDialog(id);
  };
  const deleteUser = (id) => {
    window.alert("deleted");
    setAlert(true);
  };

  let handleAlertClose = () => {
    setAlert(false);
  };
  return (
    <Container className={classes.container}>
      <ThemeProvider theme={dashboardTheme}>
        <DashboardSidebar selectedId={2} />
        <Container className={classes.contentContainer}>
          {alert ? (
            <Alert variant="filled" onClose={handleAlertClose}>
              User Deleted successfully
            </Alert>
          ) : null}
          <Container className={classes.Title}>
            <Typography variant="h2">Users</Typography>
          </Container>
          {/* Home Link */}
          <Link
            to="/"
            style={{ position: "absolute", top: "1rem", right: "1rem" }}
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
          {/* <Container className={classes.cardsContainer}>
            {[0, 0, 0, 0].map((item, index) => {
              return <StaticCard key={index} />;
            })}
          </Container> */}
          {dialog ? (
            <ConfirmDialog
              deleteHandler={deleteUser}
              phrase={"are you sure you want to delete this user"}
              dialog={dialog}
              setDialog={setDialog}
            />
          ) : null}
          <Container className={classes.tableContainer}>
            {users && (
              <DataGrid
                rows={users}
                columns={columns}
                checkboxSelection
                disableSelectionOnClick
                autoPageSize
              />
            )}
          </Container>
        </Container>
      </ThemeProvider>
    </Container>
  );
}

export default Users;
