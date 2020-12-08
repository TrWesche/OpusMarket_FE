import React from "react";
import {
    Grid,
    // useTheme
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import ProductCardGrid from "../ProductCard/ProductCardGrid";


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    }
}));

// TODO: If time allows add overflow hide feature and "more" button
function ProductGrid({ productDataList, listid }) {
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
                            <Grid item xs={6} md={3} lg={2} key={`${listid}-${productData.id}`}>
                                <ProductCardGrid cardData={productData}/>
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

export default ProductGrid; 
