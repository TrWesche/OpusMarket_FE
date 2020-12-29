import React from "react";
import {
    Grid,
    // useTheme
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import ProductManagementCard from "./ProductManagementCard";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    }
}));

function ProductManagementCardVList({ productDataList, listid, maxCards=null, redirect=null }) {
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
                            <Grid item xs={12} key={`${listid}-${productData.id}`}>
                                <ProductManagementCard cardData={productData}/>
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
                            <Grid item xs={12} key={`${listid}-${productData.id}`}>
                                <ProductManagementCard cardData={productData}/>
                            </Grid>    
                        )
                    })}
                    <Grid item xs={12} key={`${listid}-more`}>
                        <p>More Cards Available</p>
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

export default ProductManagementCardVList; 
