import React from "react";
import {
    Grid,
    // useTheme
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import ProductCardGrid from "../ProductCard/ProductCardGrid";
import MoreProductsCardGrid from "../ProductCard/MoreProductsCardGrid";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    }
}));

function ProductGrid({ productDataList, listid, maxCards=null, redirect=null }) {
    const classes = useStyles();

    const render = () => {
        if(productDataList === undefined || productDataList.length === 0) {
            return (
                <Grid item xs={12}>
                    <p>Loading...</p>
                </Grid>
            )
        }

        if ((productDataList.length && !maxCards) || (productDataList.length && maxCards && productDataList.length <= maxCards)) {
            return (
                <Grid container className={classes.root} spacing={2}>
                    {productDataList.map(productData => {
                        return (
                            <Grid item xs={4} md={3} lg={2} key={`${listid}-${productData.id}`}>
                                <ProductCardGrid cardData={productData}/>
                            </Grid>    
                        )
                    })}
                </Grid>
            )
        }

        if (productDataList.length && maxCards && productDataList.length > maxCards) {
            const truncatedList = productDataList.slice(0, maxCards);
            return (
                <Grid container className={classes.root} spacing={2}>
                    {truncatedList.map(productData => {
                        return (
                            <Grid item xs={4} md={3} lg={2} key={`${listid}-${productData.id}`}>
                                <ProductCardGrid cardData={productData}/>
                            </Grid>    
                        )
                    })}
                    <Grid item xs={4} md={3} lg={2} key={`${listid}-more`}>
                        <MoreProductsCardGrid redirect={redirect}/>
                    </Grid>    
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
