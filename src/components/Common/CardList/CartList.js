import React from "react";
import {
    Grid,
    // useTheme
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import ProductCardCart from "../ProductCard/ProductCardCart";


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    }
}));


function ProductList({ productDataList, listid }) {
    const classes = useStyles();

    const render = () => {
        if(productDataList === undefined || productDataList.length === 0) {
            return (
                <Grid item xs={12}>
                    <p>Loading...</p>
                </Grid>
            )
        }

        if (productDataList.length) {
            return (
                <Grid container className={classes.root} spacing={2}>
                    {productDataList.map(productData => {
                        return (
                            <Grid item xs={12} key={`${listid}-${productData.id}`}>
                                <ProductCardCart cardData={productData}/>
                            </Grid>    
                        )
                    })}
                </Grid>
            )
        }
    }

    return (
        <Grid item xs={12}>
            {render()}
        </Grid>
        
    )
}

export default ProductList; 
