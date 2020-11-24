import React from "react";
import {
    Grid,
    // useTheme
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import ProductCard from "../ProductCard/ProductCard";


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    }
}));



function CardList({ cardData }) {
    const classes = useStyles();
    // const theme = useTheme();

    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={6} md={4} lg={3}>
               <ProductCard />
            </Grid>
            <Grid item xs={6} md={4} lg={3}>
               <ProductCard />
            </Grid>
            <Grid item xs={6} md={4} lg={3}>
               <ProductCard />
            </Grid>
            <Grid item xs={6} md={4} lg={3}>
               <ProductCard />
            </Grid>
        </Grid>
    )
}

export default CardList; 
