import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Grid,
  OutlinedInput,
  FormHelperText,
  FormControl
} from "@material-ui/core";

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

function BaseProductConfiguration({productData, setProductData}) {
  const classes = useStyles();

  const handleChange = (prop) => (event) => {
    setProductData({ ...productData, [prop]: event.target.value });
  };

  return (
      <Grid container spacing={2} className={classes.root}>
        <Grid item className={classes.formRow} xs={12}>
          <FormControl className={classes.rowInputs} variant="outlined">
            <OutlinedInput
              required
              id="product-name"
              value={productData.name}
              onChange={handleChange('name')}
              aria-describedby="product-name-helper-text"
              inputProps={{
                'aria-label': 'name',
              }}
              labelWidth={0}
            />
            <FormHelperText id="product-name-helper-text">Name</FormHelperText>
          </FormControl>

          <FormControl className={classes.rowInputs} variant="outlined">
            <OutlinedInput
              required
              id="product-base-price"
              value={productData.base_price}
              onChange={handleChange('base_price')}
              type='number'
              aria-describedby="product-base-price-helper-text"
              inputProps={{
                'aria-label': 'base price',
              }}
              labelWidth={0}
            />
            <FormHelperText id="product-base-price-helper-text">Price (Format: XX.xx)</FormHelperText>
          </FormControl>
        </Grid>

        <Grid item className={classes.formRow} xs={12}>
          <FormControl className={classes.rowInputs} variant="outlined">
            <OutlinedInput
              multiline
              id="product-description"
              value={productData.description}
              onChange={handleChange('description')}
              aria-describedby="product-description-helper-text"
              inputProps={{
                'aria-label': 'description',
              }}
              labelWidth={0}
            />
            <FormHelperText id="product-description-helper-text">Description</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
  );
}

export default BaseProductConfiguration;