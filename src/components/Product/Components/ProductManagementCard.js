import React from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import apiOpus from "../../../utils/apiOpusMarket";
import { fetchCatalogProducts } from "../../../actions/actionsProductCatalog";

// import BaseProductConfiguration from "../Forms/BaseProductConfiguration";
// import ProductImagesConfiguration from "../Forms/ProductImagesConfiguration";
// import ProductMetaConfiguration from "../Forms/ProductMetaConfiguration";
// import ProductModifierConfiguration from "../Forms/ProductModifierConfiguration";
// import ProductPromotionConfiguration from "../Forms/ProductPromotionConfiguration";
// import ProductCouponConfiguration from "../Forms/ProductCouponConfiguration";

const useStyles = makeStyles({
    root: {
      display: 'flex'
    },
    media: {
      width: 100,
      height: 100,
      overflow: 'clip'
    },
    pricing: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      alignContent: 'start'
    },
    stdPriceNoSale: {
      display: 'flex',
      fontSize: '0.75rem'
    },
    stdPriceSale: {
      display: 'flex',
      textDecoration: 'line-through',
      color: '#AAAAAA',
      fontSize: '0.6rem'
    },
    salePrice: {
      display: 'flex',
      fontWeight: 'bold',
      color: '#AA0000',
      fontSize: '0.75rem'
    },
    productName: {
      display: 'flex',
      overflow: 'clip',
      fontSize: '1rem'
    },
    productDescription: {
      display: 'flex',
      overflow: 'clip',
      fontSize: '0.75rem',
    },
    imgContainer: {
      padding: '0.2rem 0.4rem',
    },
    detailsContainer: {
      padding: '0.2rem 0.4rem',
      minWidth: '40ch',
      flexGrow: 2
    },
    buttons: {
      display: 'flex',
      margin: '0.4rem'
    },
    buttonsContainer: {
      display: 'flex',
      justifyContent: 'end',
      flexWrap: 'wrap',
      flexGrow: 1
    }
});


function ProductManagementCard({cardData, merchantId}) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleViewProductDetails = () => {
    history.push(`/catalog/${cardData.id}`);
  }

  const handleDeleteProduct = async (productId) => {
    try {
      await apiOpus.deleteProduct(productId);

      dispatch(fetchCatalogProducts({searchParameters: {mid: merchantId}, searchType: "catalog"}))
    } catch (error) {
      console.log(error) 
    }
    
  }

  const priceRender = () => {
    if(cardData.promotion_price) {
      return (
        <div className={classes.pricing}>
          <Typography variant="body1" aria-label="base price" className={classes.stdPriceSale}>
            ${cardData.base_price/100}
          </Typography>
          <Typography variant="body2" aria-label="sale price" className={classes.salePrice}>
            ${cardData.promotion_price/100}
          </Typography>
        </div>
      )
    } else {
      return (
        <div className={classes.pricing}>
          <Typography variant="body1" aria-label="base price" className={classes.stdPriceNoSale}>
            ${cardData.base_price/100}
          </Typography>
        </div>
      )
    }
  }

  const cardMediaRender = () => {
    if(cardData.img_urls[0]) {
      return (
        <CardMedia
          className={classes.media}
          image={cardData.img_urls[0]}
          title={cardData.name}
        />
      )
    } else {
      return (
        <CardContent className={classes.media}>
          <Typography>No Image Avaiable</Typography>
        </CardContent>
      )
    }
  }

  return (
    <Card className={classes.root} variant="outlined">
      <div className={classes.imgContainer}>
        {cardMediaRender()}
      </div>
      <div className={classes.detailsContainer}>
        <Typography className={classes.productName}>
          {cardData.name}
        </Typography>
        <Typography className={classes.productDescription}>
          {cardData.description}
        </Typography>
        {priceRender()}
      </div>
      <div className={classes.buttonsContainer}>
        <Button className={classes.buttons} variant="contained" color="primary" onClick={handleViewProductDetails}>
          View Listing
        </Button>
      </div>
      <div className={classes.buttonsContainer}>
        <Button disabled className={classes.buttons} variant="contained" onClick={handleViewProductDetails}>
          Update Basic Info
        </Button>
        <Button disabled className={classes.buttons} variant="contained" onClick={handleViewProductDetails}>
          Update Images
        </Button>
        <Button disabled className={classes.buttons} variant="contained" onClick={handleViewProductDetails}>
          Update Meta Data
        </Button>
        <Button disabled className={classes.buttons} variant="contained" onClick={handleViewProductDetails}>
          Update Modifiers
        </Button>
        <Button disabled className={classes.buttons}  variant="contained" onClick={handleViewProductDetails}>
          Update Promotion
        </Button>
        <Button disabled className={classes.buttons}  variant="contained" onClick={handleViewProductDetails}>
          Update Coupons
        </Button>
        <Button className={classes.buttons}  variant="contained" color="secondary" onClick={() => handleDeleteProduct(cardData.id)}>
          Delete Product
        </Button>
      </div>
    </Card>
  );
}

export default ProductManagementCard;