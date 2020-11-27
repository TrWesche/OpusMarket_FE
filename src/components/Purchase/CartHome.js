import React, {useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";

import { 
    Container,
    Grid,
    // useTheme
  } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import CartList from "../Common/CardList/CartList";


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    width: '25ch',
  },
}));

export default function CartHome() {
  const classes = useStyles();
  
  const cartContents = useSelector(store => store.cartReducer);
  // const error = useSelector(store => store.error);
  // const dispatch = useDispatch();

  // const theme = useTheme();

  // useEffect(() => {
  //   dispatch(updateProductInCart());
  // }, [dispatch]);


  return (
    <Container>
      <p>Cart</p>
      <Grid container className={classes.root} spacing={2}>
          <Grid item xs={8}>
              <CartList productDataList={cartContents.products} listid={"order-product"}/>
          </Grid>
          <Grid item xs={4}>
              Order Totals and Proceed to Payment Here
          </Grid>
      </Grid>
  </Container>
  );
}
