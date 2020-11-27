import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    IconButton,
    Typography,
    TextField,
    Grid
} from '@material-ui/core';
import { 
  RemoveShoppingCart,
  AddCircleOutline } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { updateProductQuantity, removeProductFromCart, fetchCouponData } from '../../../actions/actionsCart';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    media: {
      maxWidth: 80,
      overflow: 'clip'
    },
    actionBar: {
      backgroundColor: '#F0FAFA'
    },
    pricing: {
      flexDirection: 'column',
      alignContent: 'start'
    },
    actionButtons: {
      flexDirection: 'row',
      minWidth: 140
    },
    stdPriceNoSale: {
      fontSize: '0.9rem'
    },
    stdPriceSale: {
      textDecoration: 'line-through',
      color: '#AAAAAA',
      fontSize: '0.75rem'
    },
    salePrice: {
      fontWeight: 'bold',
      color: '#AA0000',
      fontSize: '0.9rem'
    },
    productInformation: {
      flexDirection: 'column',
      textAlign: 'start'
    },
    productQty: {
      maxWidth: 100,
    },
    productCoupon: {
      maxWidth: 100,
    },
    removeFromCartIcon: {
      height: 28,
      width: 28,
      margin: theme.spacing(1)
    },
    addIcon: {
      height: 28,
      width: 28
    }
}));


function ProductCardCol({cardData}) {
  const INITIAL_STATE_COUPON = {couponCode: ""};
  const [formDataCoupon, setFormDataCoupon] = useState(INITIAL_STATE_COUPON);

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleRemoveFromCart = () => {
    dispatch(removeProductFromCart(cardData.id));
  }

  const handleUpdateQuantity = (e) => {
    dispatch(updateProductQuantity(e.target.value, cardData.id));
  }
  
  const handleChangeCoupon = (e) => {
    let { name, value } = e.target;
    
    setFormDataCoupon(fData => ({
        ...fData,
        [name]: value
    }));
  }

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if(!cardData.coupon_code || cardData.coupon_code !== formDataCoupon.couponCode) {
      dispatch(fetchCouponData(cardData.id, formDataCoupon.couponCode));
    }
  }

  const handleViewProductDetails = () => {
    history.push(`/catalog/${cardData.id}`);
  }

  const priceRender = () => {
    const basePriceStyle = (cardData.coupon_discount || cardData.promotion_price) ? classes.stdPriceSale : classes.stdPriceNoSale;
    let salePricing;

    const basePrice = (
      <Typography variant="body2" aria-label="base price" className={basePriceStyle}>
        ${cardData.base_price/100}
      </Typography>
    );
    
    if(cardData.coupon_discount && cardData.promotion_price) {
      salePricing = (
        <React.Fragment>
          <Typography variant="body1" aria-label="sale price" className={classes.salePrice}>
            Sale Price: ${cardData.promotion_price/100}
          </Typography>
          <Typography variant="body1" aria-label="sale price" className={classes.salePrice}>
            Coupon Discount: {cardData.coupon_discount*100}%
          </Typography>
          <Typography variant="body1" aria-label="sale price" className={classes.salePrice}>
            Final Price: ${Math.floor(cardData.promotion_price*(1-cardData.coupon_discount))/100}
          </Typography>
        </React.Fragment>
      )
    } else if (cardData.coupon_discount) {
      salePricing = (
        <React.Fragment>
          <Typography variant="body1" aria-label="sale price" className={classes.salePrice}>
            Coupon Discount: {cardData.coupon_discount*100}%
          </Typography>
          <Typography variant="body1" aria-label="sale price" className={classes.salePrice}>
            Final Price: ${Math.floor(cardData.base_price*(1-cardData.coupon_discount))/100}
          </Typography>
        </React.Fragment>
      )
    } else if (cardData.promotion_price) {
      salePricing = (
        <React.Fragment>
          <Typography variant="body1" aria-label="sale price" className={classes.salePrice}>
            Sale Price: ${cardData.promotion_price/100}
          </Typography>
        </React.Fragment>
      )
    }

    if(salePricing) {
      return (
        <div className={classes.pricing}>
          {basePrice}
          {salePricing}
        </div>
      )
    } else {
      return (
        <div className={classes.pricing}>
          {basePrice}
        </div>
      )
    }
  }

  return (
    <Card className={classes.root} variant="outlined">
      <CardActionArea onClick={handleViewProductDetails}>
        <div>
          <CardMedia
            className={classes.media}
            image={cardData.img_url}
            title={cardData.name}
          />
          <CardContent className={classes.productInformation}>
            <Typography variant="caption" component="h6">
              {cardData.name}
            </Typography>
          </CardContent>
        </div>
      </CardActionArea> 
      {priceRender()}

      <CardActions className={classes.actionBar}>
        <div className={classes.actionButtons}>
          
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <TextField
                id="product-quantity"
                label="Quantity"
                type="number"
                value={cardData.quantity}
                variant="outlined"
                className={classes.productQty}
                size="small"
                onChange={handleUpdateQuantity}
              />
            </Grid>
            <Grid item>
              <IconButton onClick={handleRemoveFromCart} aria-label="remove from cart" className={classes.removeFromCartIcon}>
                <RemoveShoppingCart/>
              </IconButton>
            </Grid>
          </Grid>


          <form onSubmit={handleApplyCoupon}>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <TextField
                  id="couponCode"
                  name="couponCode"
                  label="Coupon"
                  value={formDataCoupon.couponCode}
                  className={classes.productCoupon}
                  size="small"
                  onChange={handleChangeCoupon}
                />
              </Grid>
              <Grid item>
                <IconButton type="submit" aria-label="remove from cart" className={classes.addIcon}>
                  <AddCircleOutline/>
                </IconButton>
              </Grid>
            </Grid>
          </form>
        
        </div>
      </CardActions>
    </Card>
  );
}

export default ProductCardCol;