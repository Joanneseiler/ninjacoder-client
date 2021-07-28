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
import NinjaCoderLogo from "../NinjaCoder-logo.svg"
import NinjaCoderFont from "../fontlogo.svg"

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

function MenuItems(props) {
  if (!props.user || !props.user.role) {
    return [
      <MenuItem onClick={props.handleClose}>
      <Link className={props.classes.btn} to="/courses">
        Courses
      </Link>
    </MenuItem>,
      <MenuItem key="mobileSignIn" onClick={props.handleClose}>
      <Link className={props.classes.btn} to="/signin">
        SignIn
      </Link>
    </MenuItem>,
    <MenuItem key="mobileSignUp" onClick={props.handleClose}>
      <Link className={props.classes.btn} to="/signup">
        SignUp
      </Link>
    </MenuItem>
    ];
  }

  if (props.user.role === 'parent') {
    return [
      <MenuItem onClick={props.handleClose}>
      <Link className={props.classes.btn} to="/courses">
        Courses
      </Link>
    </MenuItem>,
      <MenuItem key="mobileProfile" onClick={props.handleClose}>
        <Link 
        className={props.classes.btn} 
        to="/profile">
          Profile
        </Link>
      </MenuItem>,
      <MenuItem key="mobileAccount" onClick={props.handleClose}>
        <Link 
        className={props.classes.btn} 
        to="/account">
          Account
        </Link>
      </MenuItem>,
      <MenuItem key="mobileLogout" onClick={props.handleClose}>
        <Link
          className={props.classes.btn}
          to="/"
          onClick={props.onLogOut}>
          Logout
        </Link>
      </MenuItem>
    ];
  }

  if (props.user.role === 'tutor') {
    return [
      <MenuItem onClick={props.handleClose}>
      <Link className={props.classes.btn} to="/courses">
        Courses
      </Link>
    </MenuItem>,
      <MenuItem key="mobileCreateCourse" onClick={props.handleClose}>
        <Link 
        className={props.classes.btn} 
        to="/create-course">
          Course creation
        </Link>
      </MenuItem>,
      <MenuItem key="mobileProfile" onClick={props.handleClose}>
        <Link 
        className={props.classes.btn} 
        to="/profile">
          Profile
        </Link>
      </MenuItem>,
      <MenuItem key="mobileAccount" onClick={props.handleClose}>
        <Link 
        className={props.classes.btn} 
        to="/account">
          Account
        </Link>
      </MenuItem>,
      <MenuItem key="mobileLogout" onClick={props.handleClose}>
        <Link
          className={props.classes.btn}
          to="/"
          onClick={props.onLogOut}>
          Logout
        </Link>
      </MenuItem>
    ];
  }

}

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
      <MenuItems classes={classes} user={props.user} onLogOut={props.onLogOut} handleClose={handleMobileMenuClose}></MenuItems>
    </Menu>
  );

  return (
    <div className={classes.grow}>
    
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6">
            <Button component={Link} to="/">   
              <img style={{width: '35px' , marginRight: "8px"}} src={NinjaCoderLogo} alt="NinjaCoder logo"/> 
              <img style={{width: '130px' , marginRight: "8px"}} src={NinjaCoderFont} alt="NinjaCoder font"/>
            </Button>
          </Typography>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <MenuItems classes={classes} user={props.user} onLogOut={props.onLogOut} handleClose={handleMobileMenuClose}></MenuItems>
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