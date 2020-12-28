import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Container,
  Button,
  Link,
  Grid,
  Typography,
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormHelperText,
  FormControl
} from "@material-ui/core";
import {
  Visibility,
  VisibilityOff
} from '@material-ui/icons';

import apiOpus from "../../utils/apiOpusMarket";
import {CookiesContext} from "../../contextProviders/CookiesContext";
import {
  MERCHANT_ACCOUNT_NEW_PATH,
  USER_ACCOUNT_LOGIN_PATH
} from "../../routes/_pathDict";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    width: '25ch',
  },
  classes: {
    margin: theme.spacing(1),
  },
  displayArea: {
    margin: theme.spacing(2),
  }
}));

export default function MerchantLoginForm() {
  const {updateContextCookies} = useContext(CookiesContext);

  const history = useHistory();
  const classes = useStyles();
  const [values, setValues] = React.useState({
    password: '',
    email: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await apiOpus.loginMerchant(values);
      updateContextCookies('sid');
      history.push('/');
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleNewMerchantRedirect = async (e) => {
    e.preventDefault();
    history.push(MERCHANT_ACCOUNT_NEW_PATH);
  };

  const handleUserRedirect = async (e) => {
    e.preventDefault();
    history.push(USER_ACCOUNT_LOGIN_PATH);
  };
  
  return (
    <Container>
      <Grid container spacing={2} className={classes.displayArea}>
        <Grid item xs={12}>
          <Typography className={classes.title} variant="h6" noWrap>
            Merchant Login
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit}>
            <Grid item xs={12}>
              <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                <OutlinedInput
                  id="merchant-email"
                  value={values.email}
                  onChange={handleChange('email')}
                  aria-describedby="merchant-email-helper-text"
                  inputProps={{
                    'aria-label': 'email',
                  }}
                  labelWidth={0}
                />
                <FormHelperText id="merchant-email-helper-text">Email</FormHelperText>
              </FormControl>
              <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                <InputLabel htmlFor="merchant-password">Password</InputLabel>
                <OutlinedInput
                  id="merchant-password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" aria-label="merchant login" variant="contained" color="primary">
                  Login
              </Button>
            </Grid>
          </form>
        </Grid>
        <Grid item xs={12}>
          <Link href="#" onClick={handleNewMerchantRedirect}>New? Create your account here!</Link>
        </Grid>
        <Grid item xs={12}>
          <Link href="#" onClick={handleUserRedirect}>Looking for the user login?</Link>
        </Grid>
      </Grid>
    </Container>
  );
}
