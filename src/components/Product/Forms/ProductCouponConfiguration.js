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


function ProductCouponConfiguration(productData, setProductData) {
    const classes = useStyles();

    const handleAdd = (e) => {
        e.preventDefault();
        const coupons = [...productData.coupons];
        coupons.push({
            product_id: productData.id,
            code: "",
            pct_discount: "",
            active: true
        });


        setProductData({...productData, "coupons": coupons});
    }

    const handleDelete = (index) => (e) => {
        const coupons = [...productData.coupons];
        coupons.splice(index, 1);

        setProductData({...productData, "coupons": coupons});
    }

    const handleChange = (prop, index) => (e) => {
        const coupons = [...productData.coupons];
        if (prop === "pct_discount") {
            coupons[index][prop] = +e.target.value;    
        } else {
            coupons[index][prop] = e.target.value;
        }

        setProductData({ ...productData, "coupons": coupons });
    };

    const handleToggle = (prop, index) => (e) => {
        const coupons = [...productData.coupons];
        coupons[index][prop] = !coupons[index][prop];

        setProductData({...productData, "coupons": coupons});
    }

    // TODO: The product_id should be hidden in the future, currently going to be used for validation
    return (
        <Grid container spacing={2} className={classes.root}>
            {productData.coupons.map((coupon, index) => {
                return (
                    <Grid item className={classes.formRow} xs={12}>
                        <FormControl className={classes.rowInputs} key={`product-coupon-productid-${index}`} variant="outlined">
                            <OutlinedInput
                                disabled
                                id={`product-coupon-productid-${index}`}
                                value={coupon.product_id}
                                onChange={handleChange('product_id', index)}
                                aria-describedby={`product-coupon-productid-${index}-helper-text`}
                                inputProps={{
                                'aria-label': 'product id',
                                }}
                                labelWidth={0}
                            />
                            <FormHelperText id={`product-coupon-productid-${index}-helper-text`}>ID</FormHelperText>
                        </FormControl>

                        <FormControl className={classes.rowInputs} key={`product-coupon-code-${index}`} variant="outlined">
                            <OutlinedInput
                                required
                                id={`product-coupon-code-${index}`}
                                value={coupon.code}
                                onChange={handleChange('code', index)}
                                aria-describedby={`product-coupon-code-${index}-helper-text`}
                                inputProps={{
                                'aria-label': 'code',
                                }}
                                labelWidth={0}
                            />
                            <FormHelperText id={`product-coupon-code-${index}-helper-text`}>Code</FormHelperText>
                        </FormControl>
            
                        <FormControl className={classes.rowInputs} key={`product-coupon-pct-discount-${index}`} variant="outlined">
                            <OutlinedInput
                                required
                                id={`product-coupon-pct-discount-${index}`}
                                value={coupon.pct_discount}
                                onChange={handleChange('pct_discount', index)}
                                aria-describedby={`product-coupon-pct-discount-${index}-helper-text`}
                                type="number"
                                inputProps={{
                                'aria-label': 'Percent Discount',
                                }}
                                labelWidth={0}
                            />
                            <FormHelperText id={`product-coupon-pct-discount-${index}-helper-text`}>% Discount (1-99)</FormHelperText>
                        </FormControl>

                        <FormControl component="fieldset" className={classes.rowInputs} key={`product-coupon-active-${index}`} variant="outlined">
                            <FormGroup>
                                <FormControlLabel
                                    id={`product-coupon-active-${index}`}
                                    control={<Switch 
                                        color="primary" 
                                        checked={coupon.active}
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
            <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                startIcon={<Add />}
                onClick={handleAdd}
            >
                Add New Coupon
        </Button>
        </Grid>
    );
}

export default ProductCouponConfiguration;