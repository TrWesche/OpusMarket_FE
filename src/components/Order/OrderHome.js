import React, { useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from "react-redux";
import { 
  Container, 
  Grid,
  Typography
} from "@material-ui/core";

import OrderCard from "./Components/OrderCard"
import { fetchUserOrders } from "../../actions/actionsOrderList";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '2rem',
    marginBottom: '2rem',
    padding: '1rem 0',
    backgroundColor: 'white'
  },
  pageTitle: {
    paddingBottom: '1rem'
  },
  margin: {
    margin: theme.spacing(1),
  },
  vSection: {
    flexGrow: 1,
  }
}));

export default function OrderHome() {
  const classes = useStyles();
  const dispatch = useDispatch();
  
  const orderList = useSelector(store => store.orderList)

  useEffect(() => {
    dispatch(fetchUserOrders())
  }, [dispatch]);


  const render = () => {
    if (!orderList.orders || orderList.orders.length === 0) {
      return (
        <Grid item xs={12}>
          <Typography>Your Orders Will Appear Here</Typography>
        </Grid>
      )
    } else {
      return (
        <Grid item xs={12}>
          {orderList.orders.map((order) => <OrderCard cardData={order} key={`order-${order.id}`} />)}
        </Grid>
      )
    }
  }

  return (
    <Container className={classes.root}>
      <Grid item xs={12}>
        <Typography className={classes.pageTitle} variant="h4">Order History</Typography>
      </Grid>
      <Grid container className={classes.vSection} spacing={2}>
        {render()}
      </Grid>
    </Container>
  );
}
