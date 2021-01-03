import React from 'react';
import { 
    Grid,
    Typography,
    Divider
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import ProductOrderControls from './ProductOrderControls';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        border: 'none'
    },
    hSection: {
        margin: '0',
        flexGrow: 1,
        backgroundColor: 'white'
    }, 
    title: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        textAlign: 'left',
        width: '100%'
    },
    rating: {
        fontSize: '1.1rem',
        textAlign: 'left',
        width: '100%',
        margin: "0.25rem"
    },
    description: {
        textAlign: 'left',
        alignItems: 'top',
        width: '100%',
        margin: '0.5rem 0'
    },
    price_line: {
        display: "flex",
        alignItems: "left"
    },
    base_price: {
        display: "inline-flex",
        color: "black",
        margin: "0.5rem 0.25rem"
    },
    base_price_strikethrough: {
        display: "inline-flex",
        color: "grey",
        textDecoration: "line-through",
        margin: "0.5rem 0.25rem"
    },
    promotion: {
        display: "inline-flex",
        color: "red",
        margin: "0.5rem 0.25rem"
    }
}));


export default function ProductDetailsContainer({product_id, name, description, base_price, avg_rating, promotions, modifiers}) {
    const classes = useStyles();

    const renderPromotion = () => {
        if (promotions && promotions.length > 0) {
            return (
                <div className={classes.price_line}>
                    <Typography className={classes.base_price_strikethrough}>{`$${base_price/100}`}</Typography>
                    <Typography className={classes.promotion}>{`$${promotions[0].promotion_price/100}`}</Typography>
                </div>
            )
        } else {
            return (
                <div className={classes.price_line}>
                    <Typography className={classes.base_price}>{`$${base_price/100}`}</Typography>
                </div>
            )
        }
    };

    return (
        <Grid item className={classes.hSection} xs={12} md={7}>
            <Grid item xs={12}>
                <Typography className={classes.title}>{name}</Typography>
                <Typography className={classes.rating}>Rating: {avg_rating.toPrecision(2)}</Typography>
                <Divider />
                {renderPromotion()}
                <Typography className={classes.description}>{description}</Typography>
            </Grid>
            <Grid item xs={12}>
                <ProductOrderControls className={classes.root} product_id={product_id} modifiers={modifiers}/>
            </Grid>
        </Grid>
    );
}
