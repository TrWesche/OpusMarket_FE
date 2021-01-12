import React from 'react';
import { DateTime } from 'luxon';
import { useHistory } from "react-router-dom";
import {
    Card,
    CardActions,
    CardContent,
    Button,
    Typography,
    Grid
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    orderIdContainer: {
      padding: '0.2rem 0.4rem',
      minWidth: '20ch',
      backgroundColor: theme.palette.grey[200]
    },
    detailsContainer: {
      padding: '0.5rem 0.75rem',
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
      fontSize: '1.25rem'
    },
    orderStatus: {
      display: 'flex',
      fontSize: '1rem'
    }
}));


function OrderCard({cardData}) {
  const classes = useStyles();
  const history = useHistory();

  const handleViewDetails = () => {
    history.push(`/orders/${cardData.id}`);
  }

  const priceRender = () => {
    return (
      <Typography variant="body1" aria-label="base price" className={classes.priceDisplay}>
        Order Total: ${cardData.order_total/100}
      </Typography>
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
        <Typography className={classes.orderStatus}>
          Status: {cardData.order_status}
        </Typography>
        <Typography className={classes.orderStatus}>
          {DateTime.fromISO(cardData.status_dt).toLocaleString(DateTime.DATETIME_SHORT)}
        </Typography>
      </div>
      <CardActions className={classes.actionBar}>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <Button disabled onClick={handleViewDetails} variant="outlined">
                View Order Details
              </Button>
            </Grid>
          </Grid>
      </CardActions>      
    </Card>
  );
}

export default OrderCard;