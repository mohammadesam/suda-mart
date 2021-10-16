import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";

function MobileView({ anchorEl, handleClose, classes }) {
  return (
    <Menu
      id="menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={() => handleClose("mobile")}
      className={classes.MenuLinksTypography}
    >
      <MenuItem onClick={handleClose}>
        <Link to="/"> Home </Link>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <Link to="/products"> Products </Link>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <Link to="#"> About </Link>
      </MenuItem>
    </Menu>
  );
}

export default MobileView;
