import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { 
    Grid,
    Typography,
    Card,
    CardContent,
    CardActions,
    IconButton,
    TextField
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
  }
}));


export default function ProductOrderControls({product_id, modifiers}) {
    const classes = useStyles();
    const dispatch = useDispatch();  

    

    const [orderSelections, setOrderSelections] = useState({
        modifier_id: "",
        quantity: 1
    });

    const handleAddToCart = () => {
        console.log("Add To Cart Triggered", product_id);
        dispatch(addProductToCart(orderSelections.quantity, product_id));
    }

    const handleUpdateQuantity = (e) => {
        e.preventDefault();

        if (e.target.value > 1) {
            setOrderSelections({...orderSelections, quantity: e.target.value})
        } else {
            setOrderSelections({...orderSelections, quantity: 1})
        }
    }

    const renderModifiers = () => {
        if(modifiers.length > 0) {
            console.log(modifiers)
        }
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
                                className={classes.productQty}
                                size="small"
                                onChange={handleUpdateQuantity}
                            />
                        </Grid>
                        <Grid item xs={1} alignItems="flex-start">
                            <IconButton onClick={handleAddToCart} aria-label="add to cart">
                                <AddShoppingCart className={classes.addShoppingCartIcon} />
                            </IconButton>
                        </Grid>
                    </Grid>
                </CardActions>
            </Card>
        </Grid>
    );
}
