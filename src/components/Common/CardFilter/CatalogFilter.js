import React from "react";
import {
    Grid,
    // useTheme
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    }
}));

function CatalogFilter ({featuredProducts, productMetas}) {
    const classes = useStyles();
    const productFiltersList = [];

    const render = () => {
        if (featuredProducts && featuredProducts.length > 0) {
            productFiltersList.push("Featured Products")
        }

        if (productMetas) {
            productMetas.forEach(meta => {
                if (meta.title) {
                    productFiltersList.push(meta.title);
                }
            })
        }
    

        if(productFiltersList.length === 0) {
            return (
                <Grid item xs={12}>
                    <p>Loading...</p>
                </Grid>
            )
        }

        if (productFiltersList.length) {
            return (
                <Grid container className={classes.root} spacing={2}>
                    {productFiltersList.map(filter => {
                        return (
                            <Grid item xs={4} md={3} lg={2} key={`Filter-${filter}`}>
                                {filter}
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

export default CatalogFilter; 
