import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import Menu from "@material-ui/core/Menu";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { DefaultTheme, DefaultThemeStyled, DarkThemeStyled } from "./theme";
import { selectTheme, setTheme } from "../features/appSlice";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Badge, MenuItem } from "@material-ui/core";
import { Link } from "react-router-dom";
import { login, getUser } from "../features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { getCart } from "../features/cartSlice";
import Cookies from "js-cookie";

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
  cartBadge: {
    "& > span": {
      background: theme.palette.secondary.main,
      color: "#fff",
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
    Cookies.get("user") != undefined
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
        <Typography variant="h5" className={classes.logoWarper}>
          <svg
            width="200mm"
            height="40mm"
            viewBox="0 0 200 40"
            version="1.1"
            id="svg8"
            className={classes.logo}
          >
            <defs id="defs2">
              <rect
                x="145.8988"
                y="32.505951"
                width="251.73215"
                height="76.351189"
                id="rect52"
              />
            </defs>

            <g id="layer1">
              <text transform="matrix(1.0023843,0,0,1.3635115,-87.90392,-40.254967)">
                <tspan x="145.89844" y="56.773093">
                  <tspan>Suda Mart</tspan>
                </tspan>
              </text>
              <path
                d="m 7.2646356,37.562636 c -0.914063,-0.914064 -1.69101,-3.61425 -2.338299,-8.126489 -1.346043,-9.383237 -1.523552,-9.967099 -3.160385,-10.39514 -1.75266803,-0.458334 -1.93238503,-3.196305 -0.252124,-3.841081 0.657665,-0.25237 2.613692,-0.462663 4.346726,-0.467317 3.046403,-0.0082 3.32196,-0.222842 8.3034984,-6.4684513 2.833891,-3.552992 5.644697,-6.648849 6.246233,-6.87968 1.074153,-0.41219099 3.342309,0.931789 3.342309,1.980462 0,0.293689 -1.895483,2.973465 -4.212186,5.955056 l -4.212186,5.4210763 h 11.393733 c 6.266555,0 11.393736,-0.260058 11.393736,-0.577905 0,-0.317848 -1.754471,-2.746226 -3.898823,-5.3963963 -3.065354,-3.788421 -3.734848,-5.078907 -3.131773,-6.036678 1.630365,-2.58925999 3.152437,-1.678821 8.629949,5.162071 l 5.483929,6.8489083 h 3.547345 c 2.217467,0 3.897151,0.421492 4.48043,1.124301 1.1347,1.367231 0.482862,3.411413 -1.08781,3.411413 -1.264582,0 -1.354688,0.316712 -3.010985,10.583332 -0.789877,4.89607 -1.56962,7.482269 -2.45015,8.126489 -0.949412,0.694616 -6.159629,0.944941 -19.667908,0.944941 -16.728562,0 -18.4990964,-0.122748 -19.7452594,-1.368912 z M 19.216881,26.847276 c 0,-4.87839 -0.24072,-6.118173 -1.303396,-6.712876 -0.82684,-0.462723 -1.794225,-0.466733 -2.645833,-0.01097 -1.953882,1.045687 -1.986709,12.324816 -0.03905,13.414785 0.82684,0.462725 1.794226,0.466733 2.645833,0.01098 1.11237,-0.595321 1.342441,-1.743917 1.342441,-6.701909 z m 10.583334,0 c 0,-4.87839 -0.24072,-6.118173 -1.303396,-6.712876 -0.826841,-0.462723 -1.794226,-0.466733 -2.645833,-0.01097 -1.953884,1.045687 -1.986709,12.324816 -0.03905,13.414785 0.826841,0.462725 1.794227,0.466733 2.645833,0.01098 1.112372,-0.595321 1.342443,-1.743917 1.342443,-6.701909 z m 10.583333,0 c 0,-4.87839 -0.24072,-6.118173 -1.303395,-6.712876 -0.826842,-0.462723 -1.794227,-0.466733 -2.645834,-0.01097 -1.953884,1.045687 -1.986708,12.324816 -0.03905,13.414785 0.826842,0.462725 1.794227,0.466733 2.645833,0.01098 1.112372,-0.595321 1.342443,-1.743917 1.342443,-6.701909 z"
                id="path1535"
              />
            </g>
          </svg>
        </Typography>
        <Menu
          id="menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={() => handleClose("mobile")}
          className={classes.linksTypography}
        >
          <MenuItem onClick={handleClose}>
            <Link to="/"> Home </Link>
          </MenuItem>
          <MenuItem ocClick={handleClose}>
            <Link to="/products"> Products </Link>
          </MenuItem>
          <MenuItem ocClick={handleClose}>
            <Link to="#"> About </Link>
          </MenuItem>
        </Menu>
        <Typography
          className={`${classes.sectionDesktop} ${classes.linksTypography}`}
        >
          <Link to="/"> Home </Link>
          <Link to="/products"> Products </Link>
          <Link to="#"> About </Link>
        </Typography>
        <div className={classes.buttons}>
          {/** cart icon */}
          <IconButton href="/cart">
            <Badge badgeContent={cartItemsNumber} className={classes.cartBadge}>
              <ShoppingCartIcon className={classes.cartIcon} />
            </Badge>
          </IconButton>
          {/** user Iamge or login button */}
          {user === undefined ? (
            <Button
              color="secondary"
              className={classes.LoginButton}
              href="/login"
            >
              Login
            </Button>
          ) : (
            <>
              <img
                src="/logo192.png"
                alt="user"
                aria-label="userMenu"
                className={classes.userImage}
                onClick={(e) => handleClick(e, "user")}
              />
            </>
          )}

          {/** user Menu */}
          <Menu
            anchorEl={userAnchor}
            onClose={() => handleClose("user")}
            open={Boolean(userAnchor)}
            id="userMenu"
            className={classes.linksTypography}
          >
            <MenuItem>
              {" "}
              <Link to="/dashboard"> dashboard </Link>{" "}
            </MenuItem>
            <MenuItem>
              {" "}
              <Link to="#">Logout</Link>{" "}
            </MenuItem>
          </Menu>
        </div>

        <IconButton onClick={handleThemeChange} className={classes.themeIcon}>
          <Brightness3Icon className={classes.themeIcon} />
        </IconButton>
      </ToolBar>
    </AppBar>
  );

  // <Container>
  //     <Logo>
  //       <img src="/images/logo.svg" alt="" />
  //     </Logo>
  //     <Links>
  //       <Link to="/">
  //         <span>Home</span>
  //       </Link>
  //       <Link to="/products">
  //         <span>Products</span>
  //       </Link>
  //       <Link to="/">
  //         <span>Content</span>
  //       </Link>
  //     </Links>
  //     <CartContainer>
  //       <CartImage>
  //         <Link to="/cart">
  //           <img src="/images/shopping-cart.svg" alt="" />
  //         </Link>
  //       </CartImage>
  //       <Label className={cartItemsNumber > 0 ? "red" : "gray"}>
  //         {cartItemsNumber}
  //       </Label>
  //       <UserContainer>
  //         {user === undefined ? (
  //           <Link className="login" to="/login">
  //             {" "}
  //             Login
  //             <svg
  //               aria-hidden="true"
  //               role="img"
  //               width="15"
  //               height="15"
  //               preserveAspectRatio="xMidYMid meet"
  //               viewBox="0 0 24 24"
  //             >
  //               <path d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5l-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z" />
  //             </svg>
  //           </Link>
  //         ) : (
  //           <img
  //             src="/logo192.png"
  //             alt="user"
  //             onClick={() => setDropdown((d) => !d)}
  //           />
  //         )}
  //         <ul className={dropDown ? "show" : "hide"}>
  //           <li>
  //             <Link to="/dashboard">Account</Link>{" "}
  //           </li>
  //           <li>
  //             <Link to="/logout">logout</Link>{" "}
  //           </li>
  //         </ul>
  //       </UserContainer>
  //     </CartContainer>
  //   </Container>
}

export default NavBar;
// const Container = styled.nav`
//   display: flex;
//   width: 100vw;
//   height: 70px;
//   align-items: center;
// `;
// const Logo = styled.div`
//   width: 25%;
//   padding: 0 5em;

//   img {
//     width: 200px;
//     height: 70px;
//   }

//   @media screen and (max-width: 900px) {
//     & {
//       padding: 1.5em;
//     }
//     & > img {
//       width: 70px;
//     }
//   }
// `;

// const Links = styled.div`
//   @media screen and (max-width: 600px) {
//     & {
//       font-size: 0.6rem;
//       a > span {
//         margin: 0;
//         padding: 0 5px;
//       }

//       a {
//         margin: 5px !important;
//       }
//     }
//   }

//   position: relative;
//   width: 55%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   font-size: 1.2rem;
//   font-weight: bold;

//   a {
//     margin: 0 40px;
//     position: relative;
//     transition: 0.25s;
//   }
//   a > span::before {
//     position: absolute;
//     content: "";
//     bottom: -2px;
//     left: 0;
//     right: 0;
//     height: 2px;
//     transition: all 250ms;
//     transform: scaleX(0);
//     background: #c0770a;
//   }

//   a:hover {
//     span::before {
//       transform: scaleX(1);
//     }
//   }
// `;

// const CartContainer = styled.div`
//   width: 20%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const CartImage = styled.div`
//   img {
//     width: 30px;
//     height: 30px;
//     cursor: pointer;
//   }
// `;

// const Label = styled.span`
//   width: 29px;
//   height: 25px;
//   border-radius: 25px;
//   background: #797373;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   color: white;
//   margin: 0 7px;
//   font-weight: bold;
//   transition: 0.4s;

//   &.gay {
//     background: #797373;
//   }

//   &.red {
//     background: #f00;
//   }
// `;

// const UserContainer = styled.div`
//   margin: 0 0 0 1.2rem;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   position: relative;
//   img {
//     width: 30px;
//     height: 30px;
//     cursor: pointer;
//   }

//   ul {
//     position: absolute;
//     bottom: 0px;
//     list-style: none;
//     display: none;
//     transition: 0.25s;

//     li {
//       background: #fff;
//       padding: 10px 7px;
//       text-align: center;
//       cursor: pointer;
//       &:hover {
//         text-decoration: underline;
//       }
//     }
//   }

//   ul.show {
//     transform: translateY(80px);
//     display: block;
//   }

//   ul.hide {
//     display: none;
//   }

//   a.login {
//     padding: 0.2rem 0.4rem;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     background: transparent;
//     cursor: pointer;
//     border: solid 1px #c0770a;
//     outline: 0;
//     color: #c0770a;
//     font-size: 0.9rem;
//     svg {
//       fill: #c0770a;
//       margin: 0 5px;
//     }
//   }
// `;
