import React from 'react';
import { useSelector } from "react-redux";

import { 
    Container,
    Grid,
    // useTheme
  } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import CartList from "../Common/CardList/CartList";
import OrderOverviewCard from "../Order/OrderOverviewCard";

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

  const renderCart = () => {
    if (cartContents.products.length > 0) {
      return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={8}>
                <CartList productDataList={cartContents.products} listid={"order-product"}/>
            </Grid>
            <Grid item xs={4}>
                <OrderOverviewCard productDataList={cartContents.products} />
            </Grid>
        </Grid>
      )
    } else {
      return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <p>Your cart is empty.</p>
            </Grid>
        </Grid>
      )
    }
  }



  return (
    <Container>
      <p>Cart</p>
      {renderCart()}
  </Container>
  );
}
