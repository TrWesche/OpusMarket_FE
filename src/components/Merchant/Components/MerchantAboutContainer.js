import React from "react";
import { 
    Grid,
    Typography
    // withWidth
    } from "@material-ui/core";

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    }
}));

export default function MerchantAboutContainer({ about }) {
  const classes = useStyles();

  const renderAbout = () => {
    if (about[0].about) {
      return (
          <Grid item xs={12}>
              <Typography variant="h4">About Us</Typography>
              <Typography variant="body1">{about[0].about}</Typography>
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