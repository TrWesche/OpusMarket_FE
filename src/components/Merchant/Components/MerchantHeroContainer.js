import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Tabs,
    Tab
} from '@material-ui/core';
import SwipeableViews from "react-swipeable-views";
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


// TODO: Functional Tabs
export default function MerchantHeroContainer({gatherings, featured_products, bios}) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
        <Grid container className={classes.root}>
            <FeaturedProductsStepper featuredProducts={featured_products} />
            <MerchantBiosStepper merchantBios={bios} />
            <MerchantGatheringsList gatherings={gatherings} />
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <Tab label="Item One">
                    
                </Tab>
                <Tab label="Item Two">
                    
                </Tab>
                <Tab label="Item Three">
                    
                </Tab>
            </Tabs>
        </Grid>
  );
}
