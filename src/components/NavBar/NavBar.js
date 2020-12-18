import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { 
    AppBar, 
    Toolbar,
    IconButton,
    Button,
    Badge,
    MenuItem,
    Menu,
    Link,
    } from "@material-ui/core";
import { 
    ShoppingBasket as ShoppingBasket,
    AccountCircle,
    MoreVert as MoreIcon } from "@material-ui/icons";
import { fade, makeStyles } from '@material-ui/core/styles';

import SearchForm from "./Components/SearchForm";

import {AuthContext} from "../App/AuthContext";
import {CookiesContext} from "../../contextProviders/CookiesContext";
import {
  VIEW_CART_PATH,
  USER_ACCOUNT_LOGIN_PATH,
  USER_ACCOUNT_NEW_PATH,
  USER_ACCOUNT_PROFILE_PATH,
  MERCHANT_ACCOUNT_PROFILE_PATH
} from "../../routes/_pathDict";
import apiOpus from "../../utils/apiOpusMarket";
import TemporaryDrawer from "./NavDrawer";

const useStyles = makeStyles((theme) => {
  return (
      {
          grow: {
            flexGrow: 1,
          },
          menuButton: {
            marginRight: theme.spacing(2),
          },
          title: {
            display: 'none',
            [theme.breakpoints.up('sm')]: {
              display: 'block',
            },
            color: "#FFFFFF",
            textDecoration: "none"
          },
          sectionDesktop: {
            display: 'none',
            [theme.breakpoints.up('md')]: {
              display: 'flex',
            },
          },
          sectionMobile: {
            display: 'flex',
            [theme.breakpoints.up('md')]: {
              display: 'none',
            },
          },
          account: {
            margin: '0px',
            padding: '0px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start'
          },
          accountLine1: {
            margin: '0 0 -6px 0',
            padding: '0px',
            fontSize: '0.7rem'
          },
          accountLine2: {
            margin: '0px',
            padding: '0px',
            fontWeight: 'bold',
            fontSize: '0.75rem'
          }
      }
  )
});

function NavBar() {
  const {authToken} = useContext(AuthContext);
  const {updateContextCookies} = useContext(CookiesContext);

  const cartContents = useSelector(store => store.cartReducer);
  const cartContentsQty = cartContents.products.reduce((acc, val) => {
    return val.quantity + acc;
  }, 0);

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const history = useHistory();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

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

  const handleViewCart = () => {
    history.push(VIEW_CART_PATH);
  };

  const handleLogin = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    history.push(USER_ACCOUNT_LOGIN_PATH);
  };

  const handleHome = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    history.push('/');
  };

  const handleRegister = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    history.push(USER_ACCOUNT_NEW_PATH);
  };

  const handleProfile = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    if(authToken.type === "user") {
      history.push(USER_ACCOUNT_PROFILE_PATH);
    } else if (authToken.type === "merchant") {
      history.push(MERCHANT_ACCOUNT_PROFILE_PATH);
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    setAnchorEl(null);
    handleMobileMenuClose();

    // Cleanup session on backend
    await apiOpus.logoutUser();

    // Cleanup session on frontend -> Looking for the session cookie will result 
    // in refresh of cookies removing now missing 'sid' cookie.
    updateContextCookies('sid');
    history.push('/');
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = () => {
    if (authToken) {
      return (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id={menuId}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleProfile}>My Account</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      )
    } else {
      return (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id={menuId}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleLogin}>Login</MenuItem>
          <MenuItem onClick={handleRegister}>Register</MenuItem>
        </Menu>
      )
    }
  };

  const renderProfileMenuText = () => {
    if (authToken) {
      return (
        <div className={classes.account}>
          <p className={classes.accountLine1}>Welcome</p>
      <p className={classes.accountLine2}>{authToken.first_name}</p>
        </div>
      )
    } else {
      return (
        <div className={classes.account}>
          <p className={classes.accountLine1}>Login or</p>
          <p className={classes.accountLine2}>Register</p>
        </div>
      )
    }
  }

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton onClick={handleViewCart} aria-label={`Your cart currently has ${cartContentsQty} items.`} color="inherit">
          <Badge badgeContent={cartContentsQty} color="secondary">
            <ShoppingBasket />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        {renderProfileMenuText()}
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <TemporaryDrawer />
          <Link className={classes.title} onClick={handleHome} href="#" variant="h6" noWrap>
            OpusMarket
          </Link>
          <SearchForm />

          <div className={classes.sectionDesktop}>
            <IconButton onClick={handleViewCart} aria-label={`Your cart currently has ${cartContentsQty} items.`} color="inherit">
              <Badge badgeContent={cartContentsQty} color="secondary">
                <ShoppingBasket />
              </Badge>
            </IconButton>
            <Button
              edge="end"
              aria-label="account of current user"
              size="large"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              startIcon={<AccountCircle />}
            >
              {renderProfileMenuText()}
            </Button>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu()}
    </div>
  );
}

export default NavBar;