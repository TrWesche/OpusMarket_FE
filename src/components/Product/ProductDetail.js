import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { 
    Container,
    Grid,
    Typography
} from "@material-ui/core";
import { fetchProductDetails } from "../../actions/actionsProductDetail";
import { makeStyles } from '@material-ui/core/styles';

import ProductImageContainer from "./Components/ProductImageContainer";
import ProductDetailsContainer from "./Components/ProductDetailsContainer";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '2rem'
  },
  vSection: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '0'
  },
  hSection: {
    margin: '0',
    flexGrow: 1
  }
}));

export default function ProductDetail() {
  const classes = useStyles();
  const params = useParams();
  const dispatch = useDispatch();

  const {
    merchant_id, 
    name, 
    description, 
    base_price, 
    avg_rating, 
    images, 
    promotion, 
    modifiers, 
    reviews} = useSelector(store => store.productDetail);


  useEffect(() => {
    dispatch(fetchProductDetails(+params.productID));
  }, [dispatch]);

  return (
    <Container className={classes.root}>
      <Grid container className={classes.vSection} spacing={1}>
        <ProductImageContainer 
          imageList={images} 
          merchant_id={merchant_id} 
        />
        <ProductDetailsContainer 
          product_id={+params.productID}
          name={name} 
          description={description} 
          base_price={base_price} 
          avg_rating={+avg_rating} 
          promotions={promotion}
          modifiers={modifiers}
        />
      </Grid>

      <Grid container className={classes.vSection} spacing={1}>
        <Grid item xs={12}>
          <Typography className={classes.backgroundColor}>Reviews</Typography>
        </Grid>
      </Grid>
      
    </Container>
  );
}
