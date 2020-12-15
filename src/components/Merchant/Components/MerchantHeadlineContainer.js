import React from "react";
import { 
    Grid,
    // withWidth
    } from "@material-ui/core";

import { makeStyles } from '@material-ui/core/styles';


// TODO: Add responsive image swapping for the headline image based on screen size
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    img: {
        maxHeight: 300,
        display: 'block',
        overflow: 'hidden',
        width: '100%',
        objectFit: 'cover'
    },
}));

export default function MerchantHeadlineContainer({ about, display_name }) {
  const classes = useStyles();

  const renderLogo = () => {
    // if (about[0].logo_wide_url && about[0].logo_narrow_url) {

    // }

    if (about[0].logo_wide_url) {
      return (
        <Grid item xs={12}>
            <img className={classes.img} src={about[0].logo_wide_url} alt={display_name} />
        </Grid>
      )
    } else {
      return (
        <Grid item xs={12}>
            <p>{display_name}</p>
        </Grid>
      )
    }
  }

  const renderHeadline = () => {
      if (about[0].headline) {
          return (
            <Grid item xs={12}>
                <p>{about[0].headline}</p>
            </Grid>
          )
      }
  }

  return (
    <Grid container className={classes.root}>
        {renderLogo()}
        {renderHeadline()}
    </Grid>
  );
}