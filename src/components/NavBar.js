import React, {useState} from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import NinjaCoderLogo from "../NinjaCoder-logo.png"


const useStyles = makeStyles((theme) => ({
  btn: {
    textDecoration: "none",
    color: "inherit",
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

function NavBar(props) {
  
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "navbar-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
    </Menu>
  );

  const mobileMenuId = "navbar-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleMobileMenuClose}>
        <Link className={classes.btn} to="/courses">
          Courses
        </Link>
      </MenuItem>

      {props.user ? (
        <>
          <MenuItem onClick={handleMobileMenuClose}>
            <Link className={classes.btn} to="/profile">
              Profile
            </Link>
          </MenuItem>
          <MenuItem onClick={handleMobileMenuClose}>
            <Link
              className={classes.btn}
              to="/"
              onClick={props.onLogOut}
            >
              Logout
            </Link>
          </MenuItem>
        </>
      ) : (
        <>
          <MenuItem onClick={handleMobileMenuClose}>
            <Link className={classes.btn} to="/signin">
              SignIn
            </Link>
          </MenuItem>
          <MenuItem onClick={handleMobileMenuClose}>
            <Link className={classes.btn} to="/signup">
              SignUp
            </Link>
          </MenuItem>
        </>
      )}
    </Menu>
  );

  return (
    <div className={classes.grow}>
    
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6">
            <Button component={Link} to="/">   
              <img style={{width: '35px' , marginRight: "8px"}} src={NinjaCoderLogo} alt="NinjaCoder logo"/> 
              NinjaCoder
            </Button>
          </Typography>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <MenuItem>
              <Link className={classes.btn} to="/courses">
                Courses
              </Link>
            </MenuItem>
            {props.user ? (
              <>
                <MenuItem onClick={handleMobileMenuClose}>
                  <Link className={classes.btn} to="/profile">
                    Profile
                  </Link>
                </MenuItem>

                <MenuItem onClick={handleMobileMenuClose}>
                  <Link
                    className={classes.btn}
                    to="/"
                    onClick={props.onLogOut}
                    color="inherit"
                  >
                    Logout
                  </Link>
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem>
                  <Link className={classes.btn} to="/signin">
                    SignIn
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link className={classes.btn} to="/signup">
                    SignUp
                  </Link>
                </MenuItem>
              </>
            )}
          </div>
          <div className={classes.sectionMobile}>

            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
            <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

export default NavBar;