import React, { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { 
    Container
  } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import {AuthContext} from "../App/AuthContext";

import { fetchMerchantProfile } from "../../actions/actionsMerchantPrivate";

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

function MerchantProfile() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {authToken} = useContext(AuthContext);

  const currentUser = useSelector(store => store.currentUser);

  useEffect(() => {
    dispatch(fetchMerchantProfile());
  }, [dispatch]);


  console.log(currentUser);

  return (
    <Container className={classes.root}>
      <p>Merchant Profile Under Construction</p>
    </Container>
  );
}

export default MerchantProfile;