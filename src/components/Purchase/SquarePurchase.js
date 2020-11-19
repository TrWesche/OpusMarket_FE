// To be implemented using SqPaymentForm 
// https://developer.squareup.com/blog/online-payments-form-react/

// https://github.com/square/react-square-payment-form

import React from 'react';
import { 
  Container
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';


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

export default function SquarePurchase() {
  const classes = useStyles();
  return (
    <Container>
      <p>Square Purchase Under Construction</p>
    </Container>
  );
}
