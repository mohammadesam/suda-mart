import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { dashboardTheme } from "../theme";
import DashboardSidebar from "./DashboardSidebar";
import { Typography } from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";
import Chip from "@material-ui/core/Chip";
import DeleteIcon from "@material-ui/icons/Delete";
import Alert from "@material-ui/lab/Alert";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import OrderDetails from "./orderDetails";
import { yellow, green } from "@material-ui/core/colors";
import SeeMoreIcon from "@material-ui/icons/MoreHoriz";
import AirportShuttleIcon from "@material-ui/icons/AirportShuttle";
import PaymentIcon from "@material-ui/icons/Payment";
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
    "& .dataCell.paid div": {
      color: "black",
      background: "#FFCC00",
      fontSize: "0.8rem",
    },
    "& .dataCell.delivered div": {
      color: "white",
      background: green[600],
      fontSize: "0.8rem",
    },
  },
  loadingScreen: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
}));

const getStatusIcon = (status) => {
  if (status === "paid")
    return <PaymentIcon style={{ width: 18, color: "black" }} />;
  return <AirportShuttleIcon style={{ width: 18, color: "white" }} />;
};
function Orders() {
  const columns = [
    { field: "id", headerName: "ID", cellClassName: "center", width: 90 },
    { field: "title", headerName: " Name", editable: false, width: 150 },
    { field: "price", headerName: "price", editable: false, width: 150 },
    { field: "user", headerName: "User Name", editable: false, width: 150 },

    {
      field: "status",
      headerName: "status",
      type: "number",
      align: "center",
      cellClassName: (params) => {
        return clsx("dataCell", {
          paid: params.value === "paid",
          delivered: params.value === "delivered",
        });
      },
      renderCell: (params) => {
        return (
          <Chip
            label={params.value || "paid"}
            icon={getStatusIcon(params.value)}
            variant="outlined"
          />
        );
      },
      width: 180,
    },
    {
      field: "images",
      headerName: "delete",
      align: "center",
      renderCell: (params) => {
        return (
          <DeleteIcon
            onClick={() => handleDeleteOrder(params.id)}
            styles={{ width: 40, height: 40, cursor: "pointer", zIndex: 10 }}
          />
        );
      },

      editable: false,
      width: 80,
    },

    {
      field: "more",
      headerName: "More",
      align: "center",
      renderCell: (params) => {
        return (
          <SeeMoreIcon
            onClick={() => setOpenDetails(params.id)}
            styles={{ width: 40, height: 40, cursor: "pointer", zIndex: 10 }}
          />
        );
      },
      editable: false,
      width: 60,
    },
  ];
  const classes = useStyle(dashboardTheme);
  const [alert, setAlert] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      let response = await fetch("/api/dashboard/orders/short");
      let ordersData = await response.json();
      console.log(ordersData);
      setOrders(ordersData);
      setLoading(false);
    }
    getData();
  }, []);
  let deleteOrder = () => {
    fetch(`/api/dashboard/orders/delete/${dialog}`)
      .then(() => {
        setAlert(true);
      })
      .catch((err) => {
        window.alert("some thing went wrong");
      });
  };
  let handleDeleteOrder = (id) => {
    setDialog(id);
  };
  let handleAlertClose = () => {
    setAlert(false);
  };

  let handleDialogClose = () => {
    setDialog(false);
  };
  let handleDialogApprove = () => {
    deleteOrder(dialog);
    setDialog(false);
  };
  return (
    <Container className={classes.container}>
      <ThemeProvider theme={dashboardTheme}>
        <DashboardSidebar selectedId={3} />
        <Container className={classes.contentContainer}>
          {alert ? (
            <Alert variant="filled" onClose={handleAlertClose}>
              {" "}
              Product Deleted successfully{" "}
            </Alert>
          ) : null}
          {openDetails ? (
            <OrderDetails id={openDetails} setOpen={setOpenDetails} />
          ) : null}
          <Container className={classes.Title}>
            <Typography variant="h2">Orders</Typography>
          </Container>
          {dialog ? (
            <Dialog
              open={Boolean(dialog)}
              style={{ padding: 20 }}
              onClose={handleDialogClose}
            >
              <DialogTitle>
                {" "}
                are you sure You want To delete This Order{" "}
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
          <Container className={classes.tableContainer}>
            {loading ? (
              <h1 className={classes.loadingScreen}> Loading... </h1>
            ) : (
              <DataGrid
                rows={orders}
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

export default Orders;
