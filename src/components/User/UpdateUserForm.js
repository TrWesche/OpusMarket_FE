import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Container,
  Grid,
  Typography,
  OutlinedInput,
  FormHelperText,
  FormControl,
  Button,
  Snackbar
} from "@material-ui/core";
import {
  Alert
} from '@material-ui/lab';

import apiOpus from "../../utils/apiOpusMarket";
import {CookiesContext} from "../../contextProviders/CookiesContext";
import {
  USER_ACCOUNT_PROFILE_PATH
} from "../../routes/_pathDict";


const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '2rem',
    marginBottom: '2rem',
    backgroundColor: 'white',
    display: 'flex',
    flexWrap: 'wrap',
    padding: '1rem 0'
  },
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    width: '25ch',
  },
}));

export default function UserUpdateForm() {
  const history = useHistory();
  const classes = useStyles();
  const {updateContextCookies} = useContext(CookiesContext);

  const currentUser = useSelector(store => store.currentUser);

  const [values, setValues] = React.useState({
    email: currentUser.email,
    first_name: currentUser.first_name,
    last_name: currentUser.last_name
  });

  const [alertValues, setAlertValues] = useState({
    open: false,
    text: "",
    severity: "success"
  });

  const handleAlertClose = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertValues({...alertValues, open: false});
  };

  const renderAlert = () => {
    return (
      <Snackbar 
        open={alertValues.open} 
        autoHideDuration={6000} 
        onClose={handleAlertClose}
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
      >
        <Alert onClose={handleAlertClose} severity={alertValues.severity}>
          {alertValues.text}
        </Alert>
      </Snackbar>
    )
  };


  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await apiOpus.updateUserDetails(values);
      updateContextCookies('sid');
  
      history.push(USER_ACCOUNT_PROFILE_PATH);
    } catch (error) {
      if (error[0] && error[0].length > 0) {
        const errorText = error[0];
        setAlertValues({open: true, text: errorText, severity: "error"});
      } else {
        setAlertValues({open: true, text: "We encountered a problem, if this persists please contact us.", severity: "error"});
      }
    }
  };

  return (
    <Container className={classes.root}>
      {renderAlert()}
      <Grid container spacing={2} className={classes.displayArea}>
        <Grid item xs={12}>
          <Typography className={classes.title} variant="h6" noWrap>
            Update Account Details
          </Typography>
        </Grid>
      
        <Grid item xs={12}>
          <form onSubmit={handleSubmit}>
            <Grid item xs={12}>
              <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                <OutlinedInput
                  required
                  id="user-email"
                  value={values.email}
                  onChange={handleChange('email')}
                  aria-describedby="user-email-helper-text"
                  inputProps={{
                    'aria-label': 'email',
                  }}
                  labelWidth={0}
                />
                <FormHelperText id="user-email-helper-text">Email</FormHelperText>
              </FormControl>

              <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                <OutlinedInput
                  required
                  id="user-firstname"
                  value={values.first_name}
                  onChange={handleChange('first_name')}
                  aria-describedby="user-firstname-helper-text"
                  inputProps={{
                    'aria-label': 'first name',
                  }}
                  labelWidth={0}
                />
                <FormHelperText id="user-firstname-helper-text">First Name</FormHelperText>
              </FormControl>

              <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                <OutlinedInput
                  required
                  id="user-lastname"
                  value={values.last_name}
                  onChange={handleChange('last_name')}
                  aria-describedby="user-lastname-helper-text"
                  inputProps={{
                    'aria-label': 'last name',
                  }}
                  labelWidth={0}
                />
                <FormHelperText id="user-lastname-helper-text">Last Name</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" aria-label="create user account" variant="contained" color="primary">
                  Update
              </Button>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}
