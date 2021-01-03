import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { 
    Grid,
    Typography,
    Card,
    CardContent,
    CardActions,
    IconButton,
    TextField,
    MenuItem
} from "@material-ui/core";
import { AddShoppingCart } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { addProductToCart } from '../../../actions/actionsCart';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: '1rem'
  },
  hSection: {
    margin: '0',
    flexGrow: 1,
    backgroundColor: 'white'
  },
  productOrder: {
      fontSize: '1.15rem',
      fontWeight: 'bold'
  },
  productVariant: {
      width: '100%'
  }
}));


export default function ProductOrderControls({product_id, name, description, base_price, promotions, img_urls, modifiers}) {
    const classes = useStyles();
    const dispatch = useDispatch();     

    const [orderSelections, setOrderSelections] = useState({
        modifier_id: 0,
        quantity: 1
    });

    const handleAddToCart = () => {
        const product = {
            id: product_id,
            name: name,
            description: description,
            base_price: base_price,
            img_urls: (img_urls[0] ? [img_urls[0].url] : [null]),
            promotion_price: (promotions[0] ? promotions[0].promotion_price : null)
        }

        dispatch(addProductToCart(orderSelections.quantity, product));
    }

    const handleUpdateQuantity = (e) => {
        e.preventDefault();

        if (e.target.value > 1) {
            setOrderSelections({...orderSelections, quantity: e.target.value})
        } else {
            setOrderSelections({...orderSelections, quantity: 1})
        }
    }

    const handleUpdateModifier = (e) => {
        e.preventDefault();
        setOrderSelections({...orderSelections, modifier_id: e.target.value})
    }

    const renderModifiers = () => {
        if(modifiers && modifiers.length > 0) {
            return (
                <Grid item xs={7}>
                    <TextField
                        id="select-variant"
                        select
                        label={modifiers[0].description}
                        value={orderSelections.modifier_id}
                        variant="outlined"
                        size="small"
                        onChange={handleUpdateModifier}
                        className={classes.productVariant}
                    >
                    {modifiers.map(modifier => {
                        return (
                            <MenuItem key={`variant-item-${modifier.id}`} value={modifier.id}>{modifier.name}</MenuItem>        
                        )
                    })}
                    </TextField>
                </Grid>
            )
        }
    }

    const renderAddToCart = () => {
        if(modifiers && modifiers.length > 0 && orderSelections.modifier_id === 0) {
            return (
                <Grid item xs={1}>
                    <IconButton onClick={handleAddToCart} aria-label="add to cart" disabled>
                        <AddShoppingCart className={classes.addShoppingCartIcon} />
                    </IconButton>
                </Grid>
            )
        }

        return (
            <Grid item xs={1}>
                <IconButton onClick={handleAddToCart} aria-label="add to cart">
                    <AddShoppingCart className={classes.addShoppingCartIcon} />
                </IconButton>
            </Grid>
        )
    }

    return (
        <Grid container className={classes.hSection} spacing={1}>
            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <Typography className={classes.productOrder}>Order</Typography>
                </CardContent>
                <CardActions className={classes.actionBar}>
                    <Grid container spacing={1} justify="center">
                        <Grid item xs={4}>
                            <TextField
                                id="product-quantity"
                                label="Quantity"
                                type="number"
                                value={orderSelections.quantity}
                                variant="outlined"
                                size="small"
                                onChange={handleUpdateQuantity}
                            />
                        </Grid>
                        {renderModifiers()}
                        {renderAddToCart()}
                    </Grid>
                </CardActions>
            </Card>
        </Grid>
    );
}
