import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { 
    AppBar, 
    Toolbar,
    IconButton,
    Typography, 
    InputBase,
    Badge,
    MenuItem,
    Menu,
    Link
    } from "@material-ui/core";
import { 
    Menu as MenuIcon,
    Mail as MailIcon,
    ShoppingBasket as ShoppingBasket,
    Search as SearchIcon,
    AccountCircle,
    Notifications as NotificationsIcon,
    MoreVert as MoreIcon } from "@material-ui/icons";
import { fade, makeStyles } from '@material-ui/core/styles';

import {AuthContext} from "../App/AuthContext";
import {CookiesContext} from "../../contextProviders/CookiesContext";
import {
  VIEW_CART_PATH,
  USER_ACCOUNT_LOGIN_PATH,
  USER_ACCOUNT_NEW_PATH,
  USER_ACCOUNT_PROFILE_PATH,
  USER_ACCOUNT_UPDATE_PROFILE_PATH,
  MERCHANT_ACCOUNT_LOGIN_PATH,
  MERCHANT_ACCOUNT_NEW_PATH,
  MERCHANT_ACCOUNT_PROFILE_PATH,
  MERCHANT_ACCOUNT_UPDATE_PROFILE_PATH
} from "../../routes/_pathDict";
import apiOpus from "../../utils/apiOpusMarket";

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
          search: {
            position: 'relative',
            flexGrow: 1,
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
              backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginRight: theme.spacing(10),
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
              marginLeft: theme.spacing(10),
              width: 'auto',
            },
          },
          searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
          inputRoot: {
            color: 'inherit',
            width: '100%'
          },
          inputInput: {
            padding: theme.spacing(2, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(6)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',

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
      }
  )
});

function NavBar() {
  const {authToken} = useContext(AuthContext);
  const {updateContextCookies} = useContext(CookiesContext);

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
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
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
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Link className={classes.title} onClick={handleHome} href="#" variant="h6" noWrap>
            OpusMarket
          </Link>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>

          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton onClick={handleViewCart} aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={5} color="secondary">
                <ShoppingBasket />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
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