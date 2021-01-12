// To be implemented using SqPaymentForm 
// https://developer.squareup.com/blog/online-payments-form-react/

// https://github.com/square/react-square-payment-form

// https://square.github.io/react-square-payment-form/docs/paymentform

import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import {
  Grid,
  Typography,
  Link
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { 
  SquarePaymentForm,
  ApplePayButton,
  CreditCardCVVInput,
  CreditCardExpirationDateInput,
  CreditCardNumberInput,
  CreditCardPostalCodeInput,
  CreditCardSubmitButton,
  GooglePayButton,
  MasterpassButton
} from 'react-square-payment-form';
import 'react-square-payment-form/lib/default.css';
import apiOpus from '../../utils/apiOpusMarket';
import { ORDER_HISTORY_PATH } from "../../routes/_pathDict";

const APPLICATION_ID = process.env.REACT_APP_SQUARE_APP_ID;
const LOCATION_ID = process.env.REACT_APP_SQUARE_LOC_ID;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: '2rem',
    marginBottom: '2rem'
  },
  vSection: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(3)
  }
}));


const SquarePurchase = ({orderDetails}) => {
  const classes = useStyles();
  const history = useHistory();

  const [errorMessages, setErrorMessages] = useState([]);

  async function cardNonceResponseReceived(errors, nonce, cardData, buyerVerificationToken) {
    if (errors) {
      setErrorMessages(errors.map(error => error.message));
      return;
    }

    setErrorMessages([]);

    const data = {
      nonce: nonce,
      buyerVerificationToken: buyerVerificationToken,
      order_id: orderDetails.id
    }

    await apiOpus.processPaymentSquare(data);
    history.push(ORDER_HISTORY_PATH);
  }

  const lineItems = orderDetails.products.map(product => {
    return {
      label: product.product_name,
      quantity: product.quantity,
      amount: product.final_price,
      pending: false
    }
  })

  function createPaymentRequest() {
    return {
      requestShippingAddress: true,
      requestBillingInfo: true,
      currencyCode: 'USD',
      countryCode: 'US',
      total: {
        label: `OpusMarket - Order: ${orderDetails.id}`,
        amount: `${orderDetails.order_total}`,
        pending: false,
      },
      lineItems: lineItems,
    };
  }

  function createVerificationDetails() {
    return {
      amount: `${orderDetails.order_total / 100}`,
      currencyCode: 'USD',
      intent: 'CHARGE',
      billingContact: {
        familyName: 'Smith',
        givenName: 'John',
        email: 'jsmith@example.com',
        country: 'GB',
        city: 'London',
        addressLines: ["1235 Emperor's Gate"],
        postalCode: 'SW7 4JA',
        phone: '020 7946 0532',
      },
    };
  }

  function postalCode() {
    const postalCode = ''; // your logic here
    return postalCode;
  }

  function focusField() {
    return 'cardNumber';
  }

  const loadingView = <div className="sq-wallet-loading"></div>;
  const unavailableApple = (
    <div className="sq-wallet-unavailable">Apple pay unavailable. Open safari on desktop or mobile to use.</div>
  );
  const unavailableGoogle = <div className="sq-wallet-unavailable">Google pay unavailable.</div>;
  const unavailableMasterpass = <div className="sq-wallet-unavailable">Masterpass unavailable.</div>;

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} className={classes.vSection}>
        <Typography variant='h4'>Complete Purchase</Typography>
      </Grid>
      <Grid item xs={12} className={classes.vSection}>
        <Typography variant="subtitle1">Please do not enter personal information in the form below!</Typography>
      </Grid>
      <Grid item xs={12} className={classes.vSection}>
        <Typography variant='body1'>
          This payment form is linked to a Square sandbox.  To test payment functionality please use a Square Test Card, such as "Card Number: 4111 1111 1111 111 / CVV: 111".  Postal code and expiration date are not checked for this card number.
        </Typography>
      </Grid>
      <Grid item xs={12} className={classes.vSection}>
        <Typography variant='body1'>
          A full list of Square Test Cards can be found at the link below.  Please note all error handling functionalities have not been implemented.
        </Typography>
      </Grid>
      <Grid item xs={12} className={classes.vSection}>
        <Link href="https://developer.squareup.com/docs/testing/test-values">Square Sandbox Testing Values</Link>
      </Grid>
      <Grid item xs={12} className={classes.vSection}>
        <SquarePaymentForm
          sandbox={true}
          applicationId={APPLICATION_ID}
          locationId={LOCATION_ID}
          cardNonceResponseReceived={cardNonceResponseReceived}
          createPaymentRequest={createPaymentRequest}
          createVerificationDetails={createVerificationDetails}
          postalCode={postalCode}
          focusField={focusField}
        >
          <ApplePayButton loadingView={loadingView} unavailableView={unavailableApple} />
          <GooglePayButton loadingView={loadingView} unavailableView={unavailableGoogle} />
          <MasterpassButton loadingView={loadingView} unavailableView={unavailableMasterpass} />

          <div className="sq-divider">
            <span className="sq-divider-label">Or</span>
            <hr className="sq-divider-hr" />
          </div>

          <fieldset className="sq-fieldset">
            <CreditCardNumberInput />

            <div className="sq-form-third">
              <CreditCardExpirationDateInput />
            </div>

            <div className="sq-form-third">
              <CreditCardPostalCodeInput />
            </div>

            <div className="sq-form-third">
              <CreditCardCVVInput />
            </div>
          </fieldset>

          <CreditCardSubmitButton>Pay ${orderDetails.order_total/100}</CreditCardSubmitButton>

          <div className="sq-error-message">
            {errorMessages.map(errorMessage => (
              <li key={`sq-error-${errorMessage}`}>{errorMessage}</li>
            ))}
          </div>
        </SquarePaymentForm>
      </Grid>
    </Grid>
  );
};

export default SquarePurchase;
