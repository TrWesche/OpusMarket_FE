import React from 'react';
import { useHistory } from "react-router-dom";
// import { useDispatch } from "react-redux";
import {
    Card,
    CardActions,
    CardContent,
    Button,
    Typography,
    Grid
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import { createOrder } from '../../actions/actionsCart';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    orderIdContainer: {
      padding: '0.2rem 0.4rem',
    },
    detailsContainer: {
      padding: '0.2rem 0.4rem',
      minWidth: '40ch',
      flexGrow: 2
    },
    pricing: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      alignContent: 'start'
    },
    priceDisplay: {
      display: 'flex',
      fontSize: '0.75rem'
    },
}));


function OrderCard({cardData}) {
  const classes = useStyles();
  // const dispatch = useDispatch();
  const history = useHistory();

  const handleViewDetails = () => {
    console.log("View order details triggered")

    // dispatch(createOrder(productDataList));
    // history.push(`/cart/buy`);
  }

  const priceRender = () => {
    return (
      <div className={classes.pricing}>
        <Typography variant="body1" aria-label="base price" className={classes.priceDisplay}>
          ${cardData.order_total/100}
        </Typography>
      </div>
    )
  }

  return (
    <Card className={classes.root} variant="outlined">
      <div className={classes.orderIdContainer}>
        <CardContent>
          <Typography>Order #</Typography>
          <Typography>{cardData.id}</Typography>
        </CardContent>
      </div>
      <div className={classes.detailsContainer}>
        {priceRender()}
        <Typography className={classes.productDescription}>
          {cardData.order_status}
        </Typography>
        <Typography className={classes.productDescription}>
          {cardData.status_dt}
        </Typography>
      </div>
      <CardActions className={classes.actionBar}>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <Button onClick={() => handleViewDetails(cardData.id)}>
                View Order Details
              </Button>
            </Grid>
          </Grid>
      </CardActions>      
    </Card>
  );
}

export default OrderCard;