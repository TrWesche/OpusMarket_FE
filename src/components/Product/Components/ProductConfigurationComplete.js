import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Grid,
  Typography
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

function ProductConfigurationComplete() {
  const classes = useStyles();

  return (
      <Grid container spacing={2} className={classes.root}>
        <Grid item className={classes.formRow} xs={12}>
            <Typography variant="h4">Product Configuration Complete!</Typography>
            <Typography variant="subtitle1">Click Finish to Save.</Typography>
        </Grid>
      </Grid>
  );
}

export default ProductConfigurationComplete;