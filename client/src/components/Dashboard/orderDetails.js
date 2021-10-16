import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import CloseIcon from "@material-ui/icons/Close";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { orange, green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  leftContainer: {
    padding: "10px 5vw",
    [theme.breakpoints.down("md")]: {
      width: "90vw",
    },
    [theme.breakpoints.up("md")]: {
      width: "60vw",
    },
    position: "relative",
    top: 150,
    "& > *:not(h3)": {
      paddingRight: "10vw",
      margin: "15px 0",
      display: "flex",
      justifyContent: "space-between",
    },
  },
  rightContainer: {
    padding: 10,
    [theme.breakpoints.down("md")]: {
      width: "90vw",
    },
    [theme.breakpoints.up("md")]: {
      width: "40vw",
    },
  },
  wrapper: {
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
    },
  },
  userName: {
    marginBottom: 40,
  },
  deliverButton: {
    background: orange[500],
    margin: "30px 20px",
    "&:hover": {
      background: orange[800],
    },
  },
  delivered: {
    background: green[400],
  },
}));

function OrderDetails({ id, setOpen, userType }) {
  const classes = useStyles();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    async function getOrders() {
      let response = await fetch(`/api/dashboard/orders/detailed/${id}`);
      let orderData = await response.json();
      console.log(orderData[0]);
      setOrder(orderData[0]);
      setLoading(false);
    }
    getOrders();
  }, [id]);

  return (
    <Dialog fullScreen open={id} onClose={handleClose}>
      <AppBar>
        <Toolbar>
          <IconButton onClick={handleClose}>
            <CloseIcon color="secondary" />
          </IconButton>
        </Toolbar>
      </AppBar>
      {loading ? (
        <h1> Loading ...</h1>
      ) : (
        <Container className={classes.wrapper}>
          <Container className={classes.leftContainer}>
            <Typography variant="h3" className={classes.userName}>
              {order.user.name}
            </Typography>
            <Typography variant="h5">
              {/* Total Items Number: {order.title} */}
            </Typography>
            <Typography variant="h6">
              status:<b> {order.status}</b>
            </Typography>
            <Typography variant="h6">
              total Price: <b>${order.price} </b>
            </Typography>
            <Typography variant="h6">
              Date: <b>{order.date} </b>
            </Typography>
          </Container>
          <Container className={classes.rightContainer}>
            <List style={{ position: "relative", top: 150 }}>
              {order &&
                order.products.map(({ product, quantity }) => {
                  let buff = new Buffer.from(product.image.data.data);
                  let base64Image = buff.toString("base64");
                  return (
                    <>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar
                            alt="product"
                            src={`data:${product.image.contentType};base64,${base64Image}`}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={product.title}
                          secondary={
                            <React.Fragment>
                              <Typography
                                sx={{ display: "inline" }}
                                component="span"
                                variant="body2"
                                color="primary"
                              >
                                {order.user.name}
                              </Typography>
                              {" " +
                                " " +
                                product.description.substr(0, 50) +
                                " "}
                              <strong>x{quantity}</strong>
                              <Typography variant="body2">
                                ${product.price * quantity}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                      <Divider variant="middle" component="li" />
                    </>
                  );
                })}
              {userType === "normalUser" ? null : (
                <Button
                  disabled={order.status === "paid" ? false : true}
                  href={`/api/dashboard/orders/deliver/${id}`}
                  className={`${classes.deliverButton} ${
                    order.status === "paid" ? "" : classes.delivered
                  }`}
                >
                  {order.status === "paid" ? "Deliver Order" : "Delivered ✔"}
                </Button>
              )}
            </List>
          </Container>
        </Container>
      )}
    </Dialog>
  );
}

export default OrderDetails;
