import React from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    IconButton,
    Typography
} from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { addProductToCart } from '../../../actions/actionsCart';

const useStyles = makeStyles({
    root: {
      // display: 'flex'
      // maxWidth: 345,
    },
    media: {
      height: 140,
      overflow: 'clip'
    },
    actionBar: {
      alignContent: 'space-between',
      backgroundColor: '#F0FAFA'
    },
    pricing: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      alignContent: 'start'
    },
    actionButtons: {
      display: 'flex'
    },
    stdPriceNoSale: {
      display: 'flex'
    },
    stdPriceSale: {
      display: 'flex',
      textDecoration: 'line-through',
      color: '#AAAAAA',
      fontSize: '0.75rem'
    },
    salePrice: {
      display: 'flex',
      fontWeight: 'bold',
      color: '#AA0000'
    },
    productName: {
      overflow: 'clip',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
});


function ProductCardRow({cardData}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleAddToCart = () => {
    dispatch(addProductToCart(1, cardData));
  }

  const handleViewProductDetails = () => {
    history.push(`/catalog/${cardData.id}`);
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
          <Typography>No Image Provided</Typography>
        </CardContent>
      )
    }
  }

  return (
    <Card className={classes.root} variant="outlined">
      <CardActionArea onClick={handleViewProductDetails}>
        {cardMediaRender()}
        <CardContent>
          <Typography className={classes.productName} gutterBottom variant="caption" component="h6">
            {cardData.name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.actionBar}>
        {priceRender()}
        <div className={classes.actionButtons}>
          <IconButton onClick={handleAddToCart} aria-label="add to cart">
            <AddShoppingCart />
          </IconButton>
        </div>
      </CardActions>
    </Card>
  );
}

export default ProductCardRow;