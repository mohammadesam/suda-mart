import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import Menu from "@material-ui/core/Menu";
import { makeStyles } from "@material-ui/core/styles";
import { DefaultTheme, DefaultThemeStyled, DarkThemeStyled } from "./theme";
import { selectTheme, setTheme } from "../features/appSlice";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Badge, MenuItem } from "@material-ui/core";
import { Link } from "react-router-dom";
import { login } from "../features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { getCart } from "../features/cartSlice";
import Cookies from "js-cookie";
import MobileView from "./navBar/mobileView";
import Logo from "./navBar/Logo";
const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.main,
    boxShadow: "none",
    height: 70,
  },
  toolBar: {
    display: "flex",
    alignItems: "center",
  },
  menuIcon: {
    color: theme.palette.secondary.main,
    flexGrow: 1,
    padding: 0,
  },
  linksTypography: {
    flexGrow: 1,
    "& > a": {
      marginLeft: theme.spacing(3),
      color: DefaultTheme.palette.secondary.main,
    },
    "& a": {
      color: theme.palette.secondary.main,
      fontWeight: "Bold",
    },
  },
  MenuLinksTypography: {
    flexGrow: 1,
    "& > a": {
      marginLeft: theme.spacing(3),
      color: DefaultTheme.palette.action.main,
    },
    "& a": {
      color: theme.palette.action.main,
      fontWeight: "Bold",
    },
  },
  cartBadge: {
    "& > span": {
      background: theme.palette.secondary.main,
      color: theme.palette.warning.main,
      fontWeight: "bold",
    },
  },

  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
  },

  sectionMobile: {
    display: "flex",
    alignItems: "center",
    paddingTop: 0,
    paddingBottom: 0,
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },

  userImage: {
    width: 30,
    height: 30,
    cursor: "pointer",
    marginLeft: 10,
  },

  buttons: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  LoginButton: {
    background: theme.palette.secondary.main,
    color: theme.palette.warning.main,
    padding: "3px 20px !important",
    "&:hover": {
      background: theme.palette.action.main,
      color: "black",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "3px 12px !important",
      fontSize: 12,
    },
  },
  logo: {
    fill: theme.palette.secondary.main,
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      width: 100,
      height: 30,
    },
    [theme.breakpoints.up("sm")]: {
      transform: "translateY(-2px)",
      width: 160,
      height: 30,
    },
  },

  logoWarper: {
    marginRight: 10,
    display: "flex",
    alignItems: "center",
  },

  cartIcon: {
    color: theme.palette.action.main,
  },
  themeIcon: {
    marginLeft: theme.spacing(1),
    padding: 0,
    "& > span > svg": {
      color: theme.palette.action.main,
    },
  },
}));

function NavBar({ changeTheme }) {
  let user =
    Cookies.get("user") !== undefined
      ? JSON.parse(Cookies.get("user"))
      : undefined;
  let dispatch = useDispatch();
  dispatch(login(user));
  let theme = useSelector(selectTheme);
  let cartItems = useSelector(getCart);
  let [cartItemsNumber, setCartItemsNumber] = useState(0);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [userAnchor, setUserAnchor] = useState(null);

  const handleClick = (event, menu) => {
    if (menu === "mobile") setAnchorEl(event.currentTarget);
    else setUserAnchor(event.currentTarget);
  };
  const handleClose = (menu) => {
    if (menu === "mobile") setAnchorEl(null);
    else setUserAnchor(null);
  };

  const handleThemeChange = () => {
    changeTheme();
    let newTheme =
      theme === DefaultThemeStyled ? DarkThemeStyled : DefaultThemeStyled;
    dispatch(setTheme(newTheme));
  };

  useEffect(() => {
    let number = cartItems.reduce((sum, item) => (sum += item.quantity), 0);
    setCartItemsNumber(number);
  }, [cartItems]);

  return (
    <AppBar className={classes.root}>
      <ToolBar className={classes.toolBar}>
        <IconButton
          aria-label="menu"
          edge="start"
          className={classes.sectionMobile}
          onClick={(e) => handleClick(e, "mobile")}
        >
          {" "}
          <MenuIcon className={classes.menuIcon} />{" "}
        </IconButton>
        <Logo classes={classes} />
        {/*mobile menu Links*/}
        <MobileView
          classes={classes}
          anchorEl={anchorEl}
          handleClose={handleClose}
        />
        {/** Desktop  menu Links */}
        <Typography
          className={`${classes.sectionDesktop} ${classes.linksTypography}`}
        >
          <Link to="/"> Home </Link>
          <Link to="/products"> Products </Link>
          <Link to="#"> About </Link>
        </Typography>
        <div className={classes.buttons}>
          {/** cart icon */}
          <IconButton>
            <Badge badgeContent={cartItemsNumber} className={classes.cartBadge}>
              <Link to="/cart">
                <ShoppingCartIcon className={classes.cartIcon} />
              </Link>
            </Badge>
          </IconButton>
          {/** user Iamge or login button */}
          {user === undefined ? (
            <Button color="secondary" className={classes.LoginButton}>
              <Link to="/login"> Login </Link>
            </Button>
          ) : (
            <img
              src="/images/profilePhoto.svg"
              alt="user Avatar"
              aria-label="userMenu"
              className={classes.userImage}
              onClick={(e) => handleClick(e, "user")}
            />
          )}

          {/** user Menu */}
          <Menu
            anchorEl={userAnchor}
            onClose={() => handleClose("user")}
            open={Boolean(userAnchor)}
            id="userMenu"
            className={classes.MenuLinksTypography}
          >
            <MenuItem>
              <Link to="/dashboard/normal_user/">Account</Link>
            </MenuItem>
            {user && user.role === "admin" ? (
              <MenuItem>
                <Link to="/dashboard"> Dashboard </Link>
              </MenuItem>
            ) : null}
            <MenuItem>
              <a href="/api/users/logout">Logout</a>
            </MenuItem>
          </Menu>
        </div>
        <IconButton onClick={handleThemeChange} className={classes.themeIcon}>
          <Brightness3Icon className={classes.themeIcon} />
        </IconButton>
      </ToolBar>
    </AppBar>
  );
}

export default NavBar;
