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

  const [displayData, setDisplayData] = useState({
    img_url: '',
    img_alt_text: "Image Not Found"
  })

  useEffect(() => {
    dispatch(fetchProductDetails(+params.productID));
  }, [dispatch]);

  useEffect(() => {
    if (images) {
      setDisplayData({...displayData, img_url: images[0].url, img_alt_text: images[0].alt_text});
    }
  }, [images]);

  const handleImageChange = (e) => {
    e.preventDefault();
    setDisplayData({...displayData, img_url: e.target.src, img_alt_text: e.target.alt});
  }

  return (
    <Container className={classes.root}>
      <Grid container className={classes.vSection} spacing={1}>
        <ProductImageContainer 
          heroImage={displayData} 
          imageList={images} 
          merchant_id={merchant_id} 
          handleImageClick={handleImageChange} 
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
