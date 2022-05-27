import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { DefaultTheme } from "../theme";
import { useNavigate } from "react-router-dom";
import Chip from "@material-ui/core/Chip";
import { List } from "@material-ui/icons";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useSelector } from "react-redux";
import { getUser } from "../../features/userSlice";
import OrderDetails from "./orderDetails";
import ErrorPage from "../ErrorPage";
import LoadingScreen from "../LoadingScreen";

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
    justifyContent: "space-between",
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
  let navigate = useNavigate();
  let [orders, setOrders] = useState([]);
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState(null);
  let [totalPaid, setTotalPaid] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function getOrders() {
      if (user === undefined)
        setError(
          "oops it seems You are not logged In please login and try again"
        );
      try {
        let response = await fetch(
          `/api/dashboard/orders/userOrders/${user && user._id}`
        );
        let userOrders = await response.json();
        // resting the variable each fetch
        setTotalPaid(0);
        let formattedOrders = userOrders.map((order) => {
          setTotalPaid((current) => current + (order.total || 0));
          return { ...order, date: getTimePassed(order.date) };
        });
        setOrders(formattedOrders);
        setLoading(false);
      } catch (err) {
        setError("error happened please reload the page");
      }
    }
    getOrders();
  }, [user]);

  let handleGoBack = () => {
    navigate("/", { replace: true });
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

  if(!user) {
    return <ErrorPage />
  }
  return (
    <Container className={classes.root}>
      <ArrowBackIcon className={classes.backIcon} onClick={handleGoBack} />
      <ThemeProvider theme={DefaultTheme}>
        <Container className={classes.header}>
          <Typography>
            <img
              src="/images/profile-photo.svg"
              alt="user"
              className={classes.userIcon}
            />
          </Typography>
          <Typography variant="h4"> Hello {user.name} </Typography>
        </Container>
        <Container className={classes.ordersContainer}>
          <div style={{ display: "flex" }}>
            <List />
            <Typography className={classes.orderLabel}> Orders </Typography>
          </div>
          <Typography variant="h5" classes>
            Total Spent: {" $" + Math.round(totalPaid * 100) / 100}
          </Typography>
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
                    <b>{index + 1}.</b>
                  </div>
                  <div> {order.products.length} Products </div>
                  <div>
                    <Chip color="#g23" label={order.status} />
                  </div>
                  <div>
                    ${Math.floor(Number(order.total) * 100) / 100 || "not set"}
                  </div>
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

  if (min.value < 1) return "Just Now";
  for (let i = 0; i < time.length; i++) {
    let one = time[i];
    if (one.value === 0) {
      return `${time[i - 1].value} ${time[i - 1].name}`;
    }
  }

  return `${time[time.length - 1].value} ${time[time.length - 1].name}`;
}
