import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Container,
  Grid,
  Typography,
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormHelperText,
  FormControl,
  Button,
  Link,
  Snackbar
} from "@material-ui/core";
import {

} from '@material-ui/icons';
import {
  Alert
} from '@material-ui/lab';

import {AuthContext} from "../../App/AuthContext";

import apiOpus from "../../../utils/apiOpusMarket";
import {
  MERCHANT_ACCOUNT_PROFILE_PATH
} from "../../../routes/_pathDict";

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
}));

export default function NewMerchantForm() {
  const {authToken} = useContext(AuthContext);

  const history = useHistory();
  const classes = useStyles();
  const [values, setValues] = React.useState({
    password: '',
    email: '',
    display_name: '',
    showPassword: false,
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
      const res = await apiOpus.updateMerchantDetails(values);
      // updateContextCookies('sid');
      // setAlertValues({open: true, text: "Login Successful!", severity: "success"});
      history.push(`/merchants/${authToken.id}`);
    } catch (error) {
      if (error[0] && error[0].length > 0) {
        const errorText = error[0];
        setAlertValues({open: true, text: errorText, severity: "error"});
      } else {
        setAlertValues({open: true, text: "We encountered a problem, if this persists please contact support.", severity: "error"});
      }
    }
  };

  const handleCancel = async (e) => {
    e.preventDefault();
    history.push(MERCHANT_ACCOUNT_PROFILE_PATH);
  };


  return (
    <Container>
      {renderAlert()}
      <Grid container spacing={2} className={classes.displayArea}>
        <Grid item xs={12}>
          <Typography className={classes.title} variant="h6" noWrap>
            Merchant Update About
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <form onSubmit={handleSubmit}>
            <Grid item xs={12}>
              <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                <OutlinedInput
                  required
                  id="merchant-headline"
                  value={values.headline}
                  onChange={handleChange('headline')}
                  aria-describedby="merchant-headline-helper-text"
                  inputProps={{
                    'aria-label': 'headline',
                  }}
                  labelWidth={0}
                />
                <FormHelperText id="merchant-headline-helper-text">Headline</FormHelperText>
              </FormControl>

              <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                <OutlinedInput
                  required
                  id="merchant-about"
                  value={values.about}
                  onChange={handleChange('about')}
                  aria-describedby="merchant-about-helper-text"
                  inputProps={{
                    'aria-label': 'about me',
                  }}
                  labelWidth={0}
                />
                <FormHelperText id="merchant-about-helper-text">About / Bio</FormHelperText>
              </FormControl>

              <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                <OutlinedInput
                  required
                  id="merchant-banner-img"
                  value={values.logo_wide_url}
                  onChange={handleChange('logo_wide_url')}
                  aria-describedby="merchant-banner-img-helper-text"
                  inputProps={{
                    'aria-label': 'banner',
                  }}
                  labelWidth={0}
                />
                <FormHelperText id="merchant-banner-img-helper-text">Store Banner Image</FormHelperText>
              </FormControl>

              <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                <OutlinedInput
                  required
                  id="merchant-thumbnail"
                  value={values.logo_narrow_url}
                  onChange={handleChange('logo_narrow_url')}
                  aria-describedby="merchant-thumbnail-helper-text"
                  inputProps={{
                    'aria-label': 'thumbnail',
                  }}
                  labelWidth={0}
                />
                <FormHelperText id="merchant-thumbnail-helper-text">Store Thumbnail Image</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" aria-label="update merchant store details" variant="contained" color="primary">
                  Update Store Details
              </Button>
            </Grid>
          </form>
        </Grid>
        <Grid item xs={12}>
          <Link href="#" onClick={handleCancel}>Cancel</Link>
        </Grid>
      </Grid>
    </Container>
  );
}
