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


function ProductMetaConfiguration({productData, setProductData}) {
    const classes = useStyles();

    const handleAdd = (e) => {
        e.preventDefault();
        const metas = [...productData.metas];
        metas.push({
            product_id: productData.id,
            title: "",
            description: ""
        });


        setProductData({...productData, "metas": metas});
    }

    const handleDelete = (index) => (e) => {
        const metas = [...productData.metas];
        metas.splice(index, 1);

        setProductData({...productData, "metas": metas});
    }

    const handleChange = (prop, index) => (e) => {
        const metas = [...productData.metas];
        metas[index][prop] = e.target.value;

        setProductData({ ...productData, "metas": metas });
    };

    // TODO: The product_id should be hidden in the future, currently going to be used for validation
    return (
        <Grid container spacing={2} className={classes.root}>
            {productData.metas.map((meta, index) => {
                return (
                    <Grid item className={classes.formRow} xs={12}>
                        <FormControl className={classes.rowInputs} key={`product-meta-productid-${index}`} variant="outlined">
                            <OutlinedInput
                                disabled
                                id={`product-meta-productid-${index}`}
                                value={meta.product_id}
                                onChange={handleChange('product_id', index)}
                                aria-describedby={`product-meta-productid-${index}-helper-text`}
                                inputProps={{
                                'aria-label': 'product id',
                                }}
                                labelWidth={0}
                            />
                            <FormHelperText id={`product-meta-productid-${index}-helper-text`}>ID</FormHelperText>
                        </FormControl>

                        <FormControl className={classes.rowInputs} key={`product-meta-title-${index}`} variant="outlined">
                            <OutlinedInput
                                required
                                id={`product-meta-title-${index}`}
                                value={meta.title}
                                onChange={handleChange('title', index)}
                                aria-describedby={`product-meta-title-${index}-helper-text`}
                                inputProps={{
                                'aria-label': 'title',
                                }}
                                labelWidth={0}
                            />
                            <FormHelperText id={`product-meta-title-${index}-helper-text`}>Title</FormHelperText>
                        </FormControl>
            
                        <FormControl className={classes.rowInputs} key={`product-meta-description-${index}`} variant="outlined">
                            <OutlinedInput
                                required
                                id={`product-meta-description-${index}`}
                                value={meta.description}
                                onChange={handleChange('description', index)}
                                aria-describedby={`product-meta-description-${index}-helper-text`}
                                inputProps={{
                                'aria-label': 'description',
                                }}
                                labelWidth={0}
                            />
                            <FormHelperText id={`product-meta-description-${index}-helper-text`}>Description</FormHelperText>
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
                Add New Meta Tag
        </Button>
        </Grid>
    );
}

export default ProductMetaConfiguration;