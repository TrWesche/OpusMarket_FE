import React from "react";
import {
    Grid,
    useTheme
} from "@material-ui/core";
import cardListStyles from "./cardListStyles";
import ProductCard from "../ProductCard/ProductCard";

function CardList() {
    const classes = cardListStyles();
    const theme = useTheme();

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
