import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { DefaultTheme } from "../theme";
import { useHistory } from "react-router-dom";
import Chip from "@material-ui/core/Chip";
import { List } from "@material-ui/icons";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
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
}));

function NormalUser() {
  let classes = useStyles(DefaultTheme);
  let history = useHistory();

  let handleGoBack = () => {
    history.push("/");
  };

  return (
    <Container className={classes.root}>
      <ArrowBackIcon className={classes.backIcon} onClick={handleGoBack} />
      <ThemeProvider theme={DefaultTheme}>
        <Container className={classes.header}>
          <Typography>
            <img src="/logo192.png" alt="user" className={classes.userIcon} />
          </Typography>
          <Typography variant="h4"> Hello Ammar </Typography>
        </Container>
        <Container className={classes.ordersContainer}>
          <List />
          <Typography className={classes.orderLabel}> Orders </Typography>
        </Container>
      </ThemeProvider>
    </Container>
  );
}

export default NormalUser;
