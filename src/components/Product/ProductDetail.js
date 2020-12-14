import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { 
    Container,
    Grid, 
    Divider
} from "@material-ui/core";
import { fetchProductDetails } from "../../actions/actionsProductDetail";
import { makeStyles } from '@material-ui/core/styles';

import ProductImageContainer from "./Components/ProductImageContainer";
import ProductDetailsContainer from "./Components/ProductDetailsContainer";
import ProductReviewsContainer from "./Components/ProductReviewsContainer";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '2rem',
    backgroundColor: "white",
    paddingTop: '1rem'
  },
  vSection: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '0'
  },
  hSection: {
    margin: '0',
    flexGrow: 1
  },
  dividerMargin: {
    margin: '1rem 0'
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

      <Divider className={classes.dividerMargin}/>

      <ProductReviewsContainer reviews={reviews}/>
    </Container>
  );
}
