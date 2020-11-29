import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { 
    Container, 
    Grid, 
    // useTheme
    } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import SquarePurchase from "../Purchase/SquarePurchase";
import { createOrder } from '../../actions/actionsOrder';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    }
}));


function Home() {
    const classes = useStyles();
    // const theme = useTheme();

    const cartContents = useSelector(store => store.cartReducer);
    const orderDetails = useSelector(store => store.orderReducer);
    // const error = useSelector(store => store.error);
    const dispatch = useDispatch();

    // console.log("Cart Contents", cartContents)

    useEffect(() => {
        dispatch(createOrder(cartContents.products));
    }, [dispatch]);

    // console.log(productCatalog);
    // console.log("Order Details", orderDetails);

    const render = () => {
        if(!orderDetails.hasOwnProperty("order")) {
            return (
                <Grid item xs={12}>
                    <p>Processing</p>
                </Grid>
            )
        }

        if (orderDetails.hasOwnProperty("order")) {
            return (
                <Grid container className={classes.root} spacing={2}>
                    <SquarePurchase orderDetails={orderDetails.order}/>
                </Grid>
            )
        }
    }

    return (
            <Container>
                {render()}
            </Container>
          );
}

export default Home;