import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Grid,
  OutlinedInput,
  FormHelperText,
  FormControl,
  FormGroup,
  IconButton,
  Button,
  FormControlLabel,
  Switch
} from "@material-ui/core";

import {
    Delete,
    Add
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '2rem',
    marginBottom: '2rem',
    backgroundColor: 'white',
    display: 'flex',
    flexWrap: 'wrap',
  },
  formRow: {
    display: 'flex',
  },
  rowInputs: {
    display: 'inline-flex',
    flexGrow: 1,
    margin: theme.spacing(2)
  }
}));


function ProductPromotionConfiguration({productData, setProductData}) {
    const classes = useStyles();

    const handleAdd = (e) => {
        e.preventDefault();
        const promotions = [...productData.promotions];
        promotions.push({
            product_id: productData.id,
            promotion_price: '',
            active: true
        });

        setProductData({...productData, "promotions": promotions});
    }

    const handleDelete = (index) => (e) => {
        const promotions = [...productData.promotions];
        promotions.splice(index, 1);

        setProductData({...productData, "promotions": promotions});
    }

    const handleChange = (prop, index) => (e) => {
        const promotions = [...productData.promotions];
        if (prop === "promotion_price") {
            promotions[index][prop] = +e.target.value;
        } else {
            promotions[index][prop] = e.target.value;
        }
        

        setProductData({ ...productData, "promotions": promotions });
    };

    const handleToggle = (prop, index) => (e) => {
        const promotions = [...productData.promotions];
        promotions[index][prop] = !promotions[index][prop];

        setProductData({...productData, "promotions": promotions});
    }

    // Backend only supports 1 promotion addition at this time so limit frontend to one
    const renderAddButton = () => {
        if (productData.promotions.length === 0) {
            return (
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.button}
                    startIcon={<Add />}
                    onClick={handleAdd}
                >
                    Add Promotion
                </Button>
            )
        }
    }

    // TODO: The product_id should be hidden in the future, currently going to be used for validation
    return (
        <Grid container spacing={2} className={classes.root}>
            {productData.promotions.map((promotion, index) => {
                return (
                    <Grid item className={classes.formRow} xs={12}>
                        <FormControl className={classes.rowInputs} key={`product-promotion-productid-${index}`} variant="outlined">
                            <OutlinedInput
                                disabled
                                id={`product-promotion-productid-${index}`}
                                value={promotion.product_id}
                                onChange={handleChange('product_id', index)}
                                aria-describedby={`product-promotion-productid-${index}-helper-text`}
                                inputProps={{
                                'aria-label': 'product id',
                                }}
                                labelWidth={0}
                            />
                            <FormHelperText id={`product-promotion-productid-${index}-helper-text`}>ID</FormHelperText>
                        </FormControl>

                        <FormControl className={classes.rowInputs} key={`product-promotion-price-${index}`} variant="outlined">
                            <OutlinedInput
                                required
                                id={`product-promotion-price-${index}`}
                                value={promotion.promotion_price}
                                onChange={handleChange('promotion_price', index)}
                                aria-describedby={`product-promotion-price-${index}-helper-text`}
                                type="number"
                                inputProps={{
                                'aria-label': 'price',
                                }}
                                labelWidth={0}
                            />
                            <FormHelperText id={`product-promotion-price-${index}-helper-text`}>Price (Format: XX.xx)</FormHelperText>
                        </FormControl>

                        <FormControl component="fieldset" className={classes.rowInputs} key={`product-promotion-active-${index}`} variant="outlined">
                            <FormGroup>
                                <FormControlLabel
                                    id={`product-promotion-active-${index}`}
                                    control={<Switch 
                                        color="primary" 
                                        checked={promotion.active}
                                        onChange={handleToggle('active', index)}
                                    />}
                                    label="Active"
                                    labelPlacement="bottom"
                                />
                            </FormGroup>
                        </FormControl>

                        <IconButton aria-label="delete" onClick={handleDelete(index)}>
                            <Delete />
                        </IconButton>
                    </Grid>
                )
            })}
            {renderAddButton()}
        </Grid>
    );
}

export default ProductPromotionConfiguration;