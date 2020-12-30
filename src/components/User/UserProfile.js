import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { 
  Container,
  Grid,
  Typography,
  Button
} from "@material-ui/core";

import {
  USER_ACCOUNT_UPDATE_PROFILE_PATH,
  USER_ACCOUNT_UPDATE_PASSWORD_PATH,
  ORDER_HISTORY_PATH
} from "../../routes/_pathDict";

import { fetchUserProfile } from "../../actions/actionsUserPrivate";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '2rem',
    marginBottom: '2rem',
    backgroundColor: 'white',
    display: 'flex',
    flexWrap: 'wrap',
  },
  vSection: {
    display: 'flex',
    position: 'relative',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  hSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    border: '0.2rem solid white',
    backgroundColor: theme.palette.grey[200]
  }
}));

export default function UserProfile() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const currentUser = useSelector(store => store.currentUser);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);
  
  const handleRedirectClick = (destination) => {
    history.push(destination);
  }

  const renderRedirects = () => {
    return (
      <React.Fragment>
        <Grid item xs={12} md={6} className={classes.hSection}>
          <Typography variant="subtitle1">Manage My Account</Typography>
          <Button onClick={() => handleRedirectClick(USER_ACCOUNT_UPDATE_PROFILE_PATH)}>
            Update Display Name & Email
          </Button>
          <Button disabled onClick={() => handleRedirectClick(USER_ACCOUNT_UPDATE_PASSWORD_PATH)}>
            Change Password
          </Button>
          <Button disabled>Delete Account</Button>
        </Grid>
        <Grid item xs={12} md={6} className={classes.hSection}>
          <Typography variant="subtitle1">Order History</Typography>
          <Button onClick={() => handleRedirectClick(ORDER_HISTORY_PATH)}>View Orders</Button>
        </Grid>
      </React.Fragment>
    )
  }

  const render = () => {
    if (Object.keys(currentUser).length === 0) {
      return (
        <Grid container spacing={2} className={classes.root}>
          <Grid item xs={12} className={classes.vSection}>
            <Typography>Loading...</Typography>
          </Grid>
        </Grid>
      )
    } else {
      return (
        <Grid container spacing={2} className={classes.root}>
          <Grid item xs={12} className={classes.vSection}>
            <Typography variant="h4">Hi {currentUser.first_name}</Typography>
          </Grid>
          <Grid item xs={12} className={classes.vSection}>
            <Typography variant="subtitle2">What would you like to do?</Typography>
          </Grid>
          {renderRedirects()}
        </Grid>
      )
    };
  };

  return (
    <Container className={classes.root}>
      {render()}
    </Container>
  );
}
