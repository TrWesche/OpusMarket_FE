import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Grid,
  OutlinedInput,
  FormHelperText,
  FormControl,
  IconButton,
  Button
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


function ProductImagesConfiguration(productData, setProductData) {
    const classes = useStyles();

    const handleAdd = (e) => {
        e.preventDefault();
        const images = [...productData.images];
        images.push({
            product_id: productData.id,
            url: "",
            alt_text: "",
            weight: 1
        });


        setProductData({...productData, "images": images});
    }

    const handleDelete = (index) => (e) => {
        const images = [...productData.images];
        images.splice(index, 1);

        setProductData({...productData, "images": images});
    }

    const handleChange = (prop, index) => (e) => {
        const images = [...productData.images];
        if (prop === "weight") {
            images[index][prop] = +e.target.value;    
        } else {
            images[index][prop] = e.target.value;
        }

        setProductData({ ...productData, "images": images });
    };

    // TODO: The product_id should be hidden in the future, currently going to be used for validation
    return (
        <Grid container spacing={2} className={classes.root}>
            {productData.images.map((image, index) => {
                return (
                    <Grid item className={classes.formRow} xs={12}>
                        <FormControl className={classes.rowInputs} key={`product-image-productid-${index}`} variant="outlined">
                            <OutlinedInput
                                disabled
                                id={`product-image-productid-${index}`}
                                value={image.product_id}
                                onChange={handleChange('product_id', index)}
                                aria-describedby={`product-image-productid-${index}-helper-text`}
                                inputProps={{
                                'aria-label': 'product id',
                                }}
                                labelWidth={0}
                            />
                            <FormHelperText id={`product-image-productid-${index}-helper-text`}>ID</FormHelperText>
                        </FormControl>

                        <FormControl className={classes.rowInputs} key={`product-image-url-${index}`} variant="outlined">
                            <OutlinedInput
                                required
                                id={`product-image-url-${index}`}
                                value={image.url}
                                onChange={handleChange('url', index)}
                                aria-describedby={`product-image-url-${index}-helper-text`}
                                type='url'
                                inputProps={{
                                'aria-label': 'url',
                                }}
                                labelWidth={0}
                            />
                            <FormHelperText id={`product-image-url-${index}-helper-text`}>URL</FormHelperText>
                        </FormControl>
            
                        <FormControl className={classes.rowInputs} key={`product-image-alttext-${index}`} variant="outlined">
                            <OutlinedInput
                                required
                                id={`product-image-alttext-${index}`}
                                value={image.alt_text}
                                onChange={handleChange('alt_text', index)}
                                aria-describedby={`product-image-alttext-${index}-helper-text`}
                                inputProps={{
                                'aria-label': 'alttext',
                                }}
                                labelWidth={0}
                            />
                            <FormHelperText id={`product-image-alttext-${index}-helper-text`}>Alt Text</FormHelperText>
                        </FormControl>

                        <FormControl className={classes.rowInputs} key={`product-image-weight-${index}`} variant="outlined">
                            <OutlinedInput
                                required
                                id={`product-image-weight-${index}`}
                                value={image.weight}
                                onChange={handleChange('weight', index)}
                                aria-describedby={`product-image-weight-${index}-helper-text`}
                                type="number"
                                inputProps={{
                                'aria-label': 'weight',
                                }}
                                labelWidth={0}
                            />
                            <FormHelperText id={`product-image-weight-${index}-helper-text`}>Weight</FormHelperText>
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
                Add New Image
        </Button>
        </Grid>
    );
}

export default ProductImagesConfiguration;