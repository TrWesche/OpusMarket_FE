import React, {  useState } from 'react';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import LuxonUtils from '@date-io/luxon';
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker
} from '@material-ui/pickers';
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
import {
  GATHERING_MANAGEMENT_HOME_PATH
} from "../../routes/_pathDict";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '2rem',
    marginBottom: '2rem',
    paddingTop: '1rem',
    paddingBottom: '1rem',
    backgroundColor: 'white',
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  textWidth: {
    minWidth: '35ch'
  }
}));

export default function NewGatheringConfiguration() {
  const history = useHistory();
  const classes = useStyles();
  const [values, setValues] = useState({
    title: '',
    description: '',
    link: ''
  });

  const [alertValues, setAlertValues] = useState({
    open: false,
    text: "",
    severity: "success"
  });

  const [selectedDate, handleDateChange] = useState(new Date());

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
    const gatheringData = {...values, "gathering_dt": selectedDate.toUTC().toISO()};

    try {
      await apiOpus.createGathering(gatheringData);

      history.push(GATHERING_MANAGEMENT_HOME_PATH);
    } catch (error) {
      if (error[0] && error[0].length > 0) {
        const errorText = error[0];
        setAlertValues({open: true, text: errorText, severity: "error"});
      } else {
        setAlertValues({open: true, text: "We encountered a problem, if this persists please contact support.", severity: "error"});
      }
    }
  };


  return (
    <Container className={classes.root}>
      {renderAlert()}
      <Grid container spacing={2} className={classes.displayArea}>
        <Grid item xs={12}>
          <Typography className={classes.title} variant="h6" noWrap>
            Create New Gathering
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <form onSubmit={handleSubmit}>
            <Grid item xs={12}>
              <FormControl fullWidth className={clsx(classes.margin)} variant="outlined">
                <OutlinedInput
                  required
                  id="gathering-title"
                  value={values.title}
                  onChange={handleChange('title')}
                  aria-describedby="gathering-title-helper-text"
                  inputProps={{
                    'aria-label': 'title',
                  }}
                  labelWidth={0}
                />
                <FormHelperText id="gathering-title-helper-text">Title</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth className={clsx(classes.margin)} variant="outlined">
                <OutlinedInput
                  required
                  id="gathering-description"
                  value={values.description}
                  onChange={handleChange('description')}
                  aria-describedby="gathering-description-helper-text"
                  inputProps={{
                    'aria-label': 'description',
                  }}
                  labelWidth={0}
                />
                <FormHelperText id="gathering-description-helper-text">Description</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth className={clsx(classes.margin)} variant="outlined">
                <OutlinedInput
                  id="gathering-link"
                  value={values.link}
                  onChange={handleChange('link')}
                  aria-describedby="gathering-link-helper-text"
                  type="url"
                  inputProps={{
                    'aria-label': 'link',
                  }}
                  labelWidth={0}
                />
                <FormHelperText id="gathering-link-helper-text">Link</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <MuiPickersUtilsProvider className={clsx(classes.margin, classes.textWidth)} utils={LuxonUtils}>
                <KeyboardDateTimePicker 
                  required
                  inputVariant="outlined"
                  className={clsx(classes.margin, classes.textWidth)}
                  label="Date & Time"
                  id="gathering-date-time"
                  value={selectedDate}
                  onChange={handleDateChange}
                />
              </MuiPickersUtilsProvider>
            </Grid> 

            <Grid item xs={12}>
              <Button className={clsx(classes.margin)} type="submit" aria-label="create merchant account" variant="contained" color="primary">
                  Create Gathering
              </Button>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}
