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
      textAlign: 'end',
      minWidth: 180,
      backgroundColor: '#F0FAFA'
    },
    actionButtons: {
      flexDirection: 'row',
      minWidth: 140
    },
    stdPriceNoSale: {
      fontSize: '0.75rem'
    },
    stdPriceSale: {
      textDecoration: 'line-through',
      color: '#AAAAAA',
      fontSize: '0.75rem'
    },
    salePrice: {
      color: '#AA0000',
      fontSize: '0.75rem'
    },
    totalPrice: {
      fontWeight: 'bold',
      fontSize: '0.75rem'
    },
    productInformation: {
      flexDirection: 'column',
      textAlign: 'start'
    },
    productQty: {
      maxWidth: 100,
    },
    productCoupon: {
      maxWidth: 100
    },
    resize: {
      fontSize: '0.75rem'
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
    let pricePerQty = cardData.base_price;
    let totalPrice;

    const basePrice = (
      <Typography variant="body2" aria-label="base price" className={basePriceStyle}>
        ${cardData.base_price/100}
      </Typography>
    );
    
    if(cardData.coupon_discount && cardData.promotion_price) {
      pricePerQty = Math.floor(cardData.promotion_price*(1-cardData.coupon_discount));
      salePricing = (
        <React.Fragment>
          <Typography variant="body1" aria-label="sale price" className={classes.salePrice}>
            Sale: ${cardData.promotion_price/100}
          </Typography>
          <Typography variant="body1" aria-label="coupon discount" className={classes.salePrice}>
            {cardData.coupon_code}: {cardData.coupon_discount*100}%
          </Typography>
          <Typography variant="body1" aria-label="final price" className={classes.salePrice}>
            Final: ${pricePerQty/100}
          </Typography>
        </React.Fragment>
      )
    } else if (cardData.coupon_discount) {
      pricePerQty = Math.floor(cardData.base_price*(1-cardData.coupon_discount));
      salePricing = (
        <React.Fragment>
          <Typography variant="body1" aria-label="coupon discount" className={classes.salePrice}>
            Coupon: {cardData.coupon_discount*100}%
          </Typography>
          <Typography variant="body1" aria-label="final price" className={classes.salePrice}>
            Final Price: ${pricePerQty/100}
          </Typography>
        </React.Fragment>
      )
    } else if (cardData.promotion_price) {
      pricePerQty = cardData.promotion_price;
      salePricing = (
        <React.Fragment>
          <Typography variant="body1" aria-label="sale price" className={classes.salePrice}>
            Sale Price: ${pricePerQty/100}
          </Typography>
        </React.Fragment>
      )
    }

    totalPrice = pricePerQty * cardData.quantity;
    
    if(salePricing) {
      return (
        <CardContent className={classes.pricing}>
          {basePrice}
          {salePricing}
          <Typography variant="body1" aria-label="total price" className={classes.totalPrice}>
            Total: ${totalPrice/100}
          </Typography>
        </CardContent>
      )
    } else {
      return (
        <CardContent className={classes.pricing}>
          {basePrice}
          <Typography variant="body1" aria-label="total price" className={classes.totalPrice}>
            Total: ${totalPrice/100}
          </Typography>
        </CardContent>
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
                  InputProps={{
                    classes: {
                      input: classes.resize
                    }
                  }}
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

      {priceRender()}
    </Card>
  );
}

export default ProductCardCol;