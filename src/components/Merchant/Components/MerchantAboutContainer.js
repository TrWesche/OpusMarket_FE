import React from "react";
import { 
    Grid,
    Typography
    // withWidth
    } from "@material-ui/core";

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: '100%',
        height: '515px'
    },
    wrapper: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }, 
    aboutHeader: {
      display: 'flex',
      justifyContent: 'center',
      marginLeft: theme.spacing(2),
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.primary.contrastText
    },
    aboutBody: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'stretch',
      height: '100%',
      maxHeight: '100%',
      overflowY: 'auto',
      marginLeft: theme.spacing(2),
      padding: theme.spacing(4),
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.contrastText
    }
}));

export default function MerchantAboutContainer({ about }) {
  const classes = useStyles();

  const renderAbout = () => {
    if (about[0].about) {
      return (
          <Grid item xs={12} className={classes.wrapper}>
              <Typography variant="h4" className={classes.aboutHeader}>About Us</Typography>
              <Typography variant="body1" className={classes.aboutBody}>{about[0].about}</Typography>
          </Grid>
      )
    } 
  }

  return (
    <Grid container xs={12} className={classes.root}>
        {renderAbout()}
    </Grid>
  );
}