import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid
} from '@material-ui/core';
import FeaturedProductsStepper from "./FeaturedProductsStepper";
import MerchantBiosStepper from "./MerchantBiosStepper";
import MerchantGatheringsList from "./MerchantGatheringsList";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    // maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function MerchantHeroContainer({gatherings, featured_products, bios}) {
    const classes = useStyles();

    return (
        <Grid container className={classes.root}>
            <Grid item xs={12}>
                <FeaturedProductsStepper featuredProducts={featured_products} />
            </Grid>
            <Grid item xs={12}>
                <MerchantBiosStepper merchantBios={bios} />
            </Grid>
            <Grid item xs={12}>
                <MerchantGatheringsList gatherings={gatherings} />
            </Grid>
        </Grid>
  );
}
