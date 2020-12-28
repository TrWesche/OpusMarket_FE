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


function ProductModifierConfiguration(productData, setProductData) {
    const classes = useStyles();

    const handleAdd = (e) => {
        e.preventDefault();
        const modifiers = [...productData.modifiers];
        modifiers.push({
            product_id: productData.id,
            name: "",
            description: ""
        });


        setProductData({...productData, "modifiers": modifiers});
    }

    const handleDelete = (index) => (e) => {
        const modifiers = [...productData.modifiers];
        modifiers.splice(index, 1);

        setProductData({...productData, "modifiers": modifiers});
    }

    const handleChange = (prop, index) => (e) => {
        const modifiers = [...productData.modifiers];
        modifiers[index][prop] = e.target.value;

        setProductData({ ...productData, "modifiers": modifiers });
    };

    // TODO: The product_id should be hidden in the future, currently going to be used for validation
    return (
        <Grid container spacing={2} className={classes.root}>
            {productData.modifiers.map((modifier, index) => {
                return (
                    <Grid item className={classes.formRow} xs={12}>
                        <FormControl className={classes.rowInputs} key={`product-modifier-productid-${index}`} variant="outlined">
                            <OutlinedInput
                                disabled
                                id={`product-modifier-productid-${index}`}
                                value={modifier.product_id}
                                onChange={handleChange('product_id', index)}
                                aria-describedby={`product-modifier-productid-${index}-helper-text`}
                                inputProps={{
                                'aria-label': 'product id',
                                }}
                                labelWidth={0}
                            />
                            <FormHelperText id={`product-modifier-productid-${index}-helper-text`}>ID</FormHelperText>
                        </FormControl>

                        <FormControl className={classes.rowInputs} key={`product-modifier-name-${index}`} variant="outlined">
                            <OutlinedInput
                                required
                                id={`product-modifier-name-${index}`}
                                value={modifier.name}
                                onChange={handleChange('name', index)}
                                aria-describedby={`product-modifier-name-${index}-helper-text`}
                                inputProps={{
                                'aria-label': 'name',
                                }}
                                labelWidth={0}
                            />
                            <FormHelperText id={`product-modifier-name-${index}-helper-text`}>Name</FormHelperText>
                        </FormControl>
            
                        <FormControl className={classes.rowInputs} key={`product-modifier-description-${index}`} variant="outlined">
                            <OutlinedInput
                                required
                                id={`product-modifier-description-${index}`}
                                value={modifier.description}
                                onChange={handleChange('description', index)}
                                aria-describedby={`product-modifier-description-${index}-helper-text`}
                                inputProps={{
                                'aria-label': 'description',
                                }}
                                labelWidth={0}
                            />
                            <FormHelperText id={`product-modifier-description-${index}-helper-text`}>Description</FormHelperText>
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
                Add New Modifier
        </Button>
        </Grid>
    );
}

export default ProductModifierConfiguration;