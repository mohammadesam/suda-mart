import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { DefaultTheme } from "../theme";
import { useHistory } from "react-router-dom";
import Chip from "@material-ui/core/Chip";
import { List } from "@material-ui/icons";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useSelector } from "react-redux";
import { getUser } from "../../features/userSlice";
import OrderDetails from "./orderDetails";
import loadingScreen from "../LoadingScreen";
import ErrorPage from "../ErrorPage";
import LoadingScreen from "../LoadingScreen";
const ORDERS = [
  {
    _id: 20,
    products: [
      {
        name: "test",
        price: "22",
        quantity: 2,
      },
      {
        name: "test",
        price: "22",
        quantity: 2,
      },
    ],
    state: "done",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    color: DefaultTheme.palette.secondary.main,
    margin: 0,
    padding: 0,
  },
  header: {
    width: "100vw",
    height: 180,
    display: "flex",
    alignItems: "center",
    padding: "0 5vw",
    margin: 0,
    color: DefaultTheme.palette.secondary.main,
  },
  backIcon: {
    position: "absolute",
    top: 5,
    left: 7,
    cursor: "pointer",
  },
  userIcon: {
    width: 40,
    height: 40,
    marginRight: 20,
  },
  ordersContainer: {
    padding: "0 5vw",
    display: "flex",
  },
  orderLabel: {
    marginLeft: 5,
  },
  listItem: {
    display: "inline-flex",
    cursor: "pointer",
    transition: "0.3s",
    "&:hover": {
      background: "#f3f3f3",
    },
    "& > div": {
      margin: "20px 30px 10px 0",
    },
  },
  listContainer: {
    marginTop: 40,
    display: "flex",
    flexDirection: "column",
    padding: "0 5vw",
    listStyleType: "circle",
    listStylePosition: "inside",
  },
}));

function NormalUser() {
  let user = useSelector(getUser);
  let classes = useStyles(DefaultTheme);
  let history = useHistory();
  let [orders, setOrders] = useState([]);
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function getOrders() {
      try {
        let response = await fetch(
          `/api/dashboard/orders/userOrders/${user && user._id}`
        );
        let userOrders = await response.json();

        let formattedOrders = userOrders.map((order) => {
          return { ...order, date: getTimePassed(order.date) };
        });
        setOrders(formattedOrders);
        console.log(formattedOrders);
        setLoading(false);
      } catch (err) {
        setError("error happened please reload the page");
      }
    }
    getOrders();
  }, []);

  let handleGoBack = () => {
    history.push("/");
  };

  const openDetailsMenu = (id) => {
    setOpen(id);
  };

  if (open) {
    return <OrderDetails id={open} setOpen={setOpen} userType={"normalUser"} />;
  } else if (loading) {
    return (
      <>
        <ArrowBackIcon className={classes.backIcon} onClick={handleGoBack} />
        <LoadingScreen />
      </>
    );
  } else if (error) {
    return <ErrorPage />;
  }
  return (
    <Container className={classes.root}>
      <ArrowBackIcon className={classes.backIcon} onClick={handleGoBack} />
      <ThemeProvider theme={DefaultTheme}>
        <Container className={classes.header}>
          <Typography>
            <img src="/logo192.png" alt="user" className={classes.userIcon} />
          </Typography>
          <Typography variant="h4"> Hello {user.name} </Typography>
        </Container>
        <Container className={classes.ordersContainer}>
          <List />
          <Typography className={classes.orderLabel}> Orders </Typography>
        </Container>

        <ol className={classes.listContainer}>
          {orders.map((order, index) => {
            return (
              <>
                <li
                  key={index}
                  className={classes.listItem}
                  onClick={() => openDetailsMenu(order._id)}
                >
                  <div>
                    {" "}
                    <b>{index + 1}.</b>{" "}
                  </div>
                  <div> {order.products.length} </div>
                  <div>
                    {" "}
                    <Chip color="#g23" label={order.status} />
                  </div>
                  <div> ${order.total || "not set"} </div>
                  <div> {order.date} </div>
                </li>
                <hr />
              </>
            );
          })}
        </ol>
      </ThemeProvider>
    </Container>
  );
}

export default NormalUser;

function getTimePassed(date) {
  // dc date Constructor
  let dc = new Date(date).getTime();
  let nowDate = new Date().getTime();

  let diff = nowDate - dc;
  let min = {
    value: Math.floor(diff / (1000 * 60)),
    name: "Minutes Ago",
  };
  let hours = {
    value: Math.floor(diff / (1000 * 60 * 60)),
    name: "Hours Ago",
  };
  let days = {
    value: Math.floor(diff / (1000 * 60 * 60 * 24)),
    name: "Days age",
  };
  let weeks = {
    value: Math.floor(diff / (1000 * 60 * 60 * 24 * 7)),
    name: "Weeks Ago",
  };
  let months = {
    value: Math.floor(diff / (1000 * 60 * 60 * 24 * 30)),
    name: "Months Ago",
  };
  //let years = Math.floor(diff / (1000 * 60 * 60 * 24 * 30 * 12) )

  let time = [min, hours, days, weeks, months];
  for (let i = 0; i < time.length; i++) {
    let one = time[i];
    if (one.value === 0) {
      return `${time[i - 1].value} ${time[i - 1].name}`;
    }
  }

  if (min < 1) return "Just Now";
  return `${time[time.length - 1].value} ${time[time.length - 1].name}`;
}
